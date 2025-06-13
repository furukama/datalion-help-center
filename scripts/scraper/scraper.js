// ABOUTME: Main scraper script for extracting content from Atlassian help center
// ABOUTME: Uses Puppeteer for dynamic content and handles authentication

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');
const { extractArticleContent } = require('./contentExtractor');
const { downloadImages } = require('./imageHandler');
const { createUrlMapping } = require('./urlMapper');

class AtlassianScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.scrapedData = {
      articles: [],
      categories: [],
      urlMappings: {},
      metadata: {
        scrapedAt: new Date().toISOString(),
        totalArticles: 0,
        totalCategories: 0,
        totalImages: 0
      }
    };
  }

  async initialize() {
    console.log('🚀 Initializing Atlassian scraper...');
    
    // Create output directories
    await fs.ensureDir(config.output.contentDir);
    await fs.ensureDir(config.output.imagesDir);
    
    // Launch browser
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    // Set timeout
    this.page.setDefaultTimeout(config.scraping.pageTimeout);
  }

  async authenticate() {
    console.log('🔐 Attempting authentication...');
    
    if (!config.auth.email || (!config.auth.apiToken && !config.auth.password)) {
      console.warn('⚠️  No authentication credentials provided. Scraping public content only.');
      return false;
    }

    try {
      // Navigate to login page
      await this.page.goto(config.baseUrl, { waitUntil: 'networkidle2' });
      
      // Look for login button/link
      const loginButton = await this.page.$('a[href*="login"], button:has-text("Log in"), [data-testid="login"]');
      if (loginButton) {
        await loginButton.click();
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
      }
      
      // Fill in credentials
      await this.page.type('input[name="username"], input[type="email"], #username', config.auth.email);
      
      // Continue to password
      const continueButton = await this.page.$('button[type="submit"], #login-submit');
      if (continueButton) {
        await continueButton.click();
        await this.page.waitForTimeout(2000);
      }
      
      // Enter password
      await this.page.type('input[name="password"], input[type="password"], #password', config.auth.password || config.auth.apiToken);
      
      // Submit login
      const submitButton = await this.page.$('button[type="submit"], #login-submit');
      if (submitButton) {
        await submitButton.click();
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
      }
      
      console.log('✅ Authentication successful');
      return true;
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      return false;
    }
  }

  async scrapeCategories() {
    console.log('📁 Scraping categories...');
    
    try {
      await this.page.goto(config.baseUrl, { waitUntil: 'networkidle2' });
      
      // Wait for categories to load
      await this.page.waitForSelector(config.selectors.categoryList, { timeout: 10000 }).catch(() => {});
      
      const categories = await this.page.evaluate((selectors) => {
        const categoryElements = document.querySelectorAll(selectors.categoryList + ' a, ' + selectors.categoryList + ' [data-testid="category"]');
        return Array.from(categoryElements).map(el => ({
          title: el.textContent.trim(),
          url: el.href || el.getAttribute('data-href'),
          id: el.getAttribute('data-category-id') || el.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }));
      }, config.selectors);
      
      this.scrapedData.categories = categories;
      this.scrapedData.metadata.totalCategories = categories.length;
      
      console.log(`✅ Found ${categories.length} categories`);
      return categories;
    } catch (error) {
      console.error('❌ Error scraping categories:', error.message);
      return [];
    }
  }

  async scrapeArticleList(categoryUrl = null) {
    console.log(`📄 Scraping article list${categoryUrl ? ' from category' : ''}...`);
    
    try {
      const url = categoryUrl || config.baseUrl;
      await this.page.goto(url, { waitUntil: 'networkidle2' });
      
      // Wait for articles to load
      await this.page.waitForSelector(config.selectors.articleList, { timeout: 10000 }).catch(() => {});
      
      const articles = await this.page.evaluate((selectors) => {
        const articleElements = document.querySelectorAll(selectors.articleLink);
        return Array.from(articleElements).map(el => ({
          title: el.textContent.trim(),
          url: el.href,
          category: document.querySelector(selectors.categoryTitle)?.textContent.trim() || 'Uncategorized'
        }));
      }, config.selectors);
      
      console.log(`✅ Found ${articles.length} articles`);
      return articles;
    } catch (error) {
      console.error('❌ Error scraping article list:', error.message);
      return [];
    }
  }

  async scrapeArticle(articleUrl, articleTitle, category) {
    console.log(`📝 Scraping article: ${articleTitle}`);
    
    try {
      await this.page.goto(articleUrl, { waitUntil: 'networkidle2' });
      
      // Wait for content to load
      await this.page.waitForSelector(config.selectors.articleContent, { timeout: 10000 });
      
      // Extract article data
      const articleData = await extractArticleContent(this.page, config.selectors);
      
      // Add metadata
      articleData.url = articleUrl;
      articleData.originalTitle = articleTitle;
      articleData.category = category;
      articleData.scrapedAt = new Date().toISOString();
      
      // Generate slug for filename
      articleData.slug = articleTitle.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Download images if enabled
      if (config.processing.images.download && articleData.images.length > 0) {
        articleData.localImages = await downloadImages(
          articleData.images,
          config.output.imagesDir,
          articleData.slug
        );
        this.scrapedData.metadata.totalImages += articleData.localImages.length;
      }
      
      // Create URL mapping
      const docusaurusPath = `/docs/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${articleData.slug}`;
      this.scrapedData.urlMappings[articleUrl] = docusaurusPath;
      articleData.docusaurusPath = docusaurusPath;
      
      // Save article data
      this.scrapedData.articles.push(articleData);
      
      // Save individual article JSON
      const articleFile = path.join(config.output.contentDir, `${articleData.slug}.json`);
      await fs.writeJson(articleFile, articleData, { spaces: 2 });
      
      console.log(`✅ Scraped: ${articleTitle}`);
      return articleData;
    } catch (error) {
      console.error(`❌ Error scraping article "${articleTitle}":`, error.message);
      return null;
    }
  }

  async scrapeAllContent() {
    console.log('🔄 Starting full content scrape...');
    
    // First, get all categories
    const categories = await this.scrapeCategories();
    
    // Then scrape articles from each category
    for (const category of categories) {
      console.log(`\n📁 Processing category: ${category.title}`);
      const articles = await this.scrapeArticleList(category.url);
      
      // Scrape each article with rate limiting
      for (const article of articles) {
        await this.scrapeArticle(article.url, article.title, category.title);
        
        // Rate limiting
        await this.page.waitForTimeout(config.scraping.requestDelay);
      }
    }
    
    // Also scrape any uncategorized articles from main page
    const mainArticles = await this.scrapeArticleList();
    for (const article of mainArticles) {
      // Check if we haven't already scraped this article
      if (!this.scrapedData.articles.find(a => a.url === article.url)) {
        await this.scrapeArticle(article.url, article.title, 'General');
        await this.page.waitForTimeout(config.scraping.requestDelay);
      }
    }
    
    this.scrapedData.metadata.totalArticles = this.scrapedData.articles.length;
  }

  async saveResults() {
    console.log('💾 Saving scraped data...');
    
    // Save main data file
    await fs.writeJson(config.output.dataFile, this.scrapedData, { spaces: 2 });
    
    // Save URL mappings
    await fs.writeJson(config.output.urlMappingFile, this.scrapedData.urlMappings, { spaces: 2 });
    
    // Create summary report
    const report = {
      summary: {
        totalArticles: this.scrapedData.metadata.totalArticles,
        totalCategories: this.scrapedData.metadata.totalCategories,
        totalImages: this.scrapedData.metadata.totalImages,
        scrapedAt: this.scrapedData.metadata.scrapedAt
      },
      categories: this.scrapedData.categories.map(c => ({
        title: c.title,
        articleCount: this.scrapedData.articles.filter(a => a.category === c.title).length
      })),
      articles: this.scrapedData.articles.map(a => ({
        title: a.originalTitle,
        category: a.category,
        url: a.url,
        docusaurusPath: a.docusaurusPath,
        imageCount: a.images?.length || 0
      }))
    };
    
    await fs.writeJson(path.join(config.output.contentDir, 'scraping-report.json'), report, { spaces: 2 });
    
    console.log('✅ All data saved successfully!');
    console.log(`📊 Summary: ${report.summary.totalArticles} articles, ${report.summary.totalCategories} categories, ${report.summary.totalImages} images`);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.initialize();
      await this.authenticate();
      await this.scrapeAllContent();
      await this.saveResults();
    } catch (error) {
      console.error('❌ Fatal error:', error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// Run scraper if called directly
if (require.main === module) {
  const scraper = new AtlassianScraper();
  scraper.run()
    .then(() => {
      console.log('✨ Scraping completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Scraping failed:', error);
      process.exit(1);
    });
}

module.exports = AtlassianScraper;