// ABOUTME: Main converter script to transform scraped Atlassian content to Docusaurus Markdown
// ABOUTME: Handles HTML to Markdown conversion, frontmatter generation, and file organization

const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');
const { htmlToMarkdown } = require('./htmlToMarkdown');
const { generateFrontmatter } = require('./frontmatterGenerator');
const { organizeContent } = require('./contentOrganizer');
const { updateInternalLinks } = require('../scraper/urlMapper');
const { generateReport } = require('./reportGenerator');

class ContentConverter {
  constructor() {
    this.config = {
      inputDir: './scraped-content',
      outputDir: './docs',
      dataFile: './scraped-content/scraped-data.json',
      urlMappingFile: './scraped-content/url-mappings.json',
      reportFile: './conversion-report.json'
    };
    
    this.stats = {
      totalArticles: 0,
      converted: 0,
      failed: 0,
      warnings: [],
      errors: []
    };
  }

  async initialize() {
    console.log('🔄 Initializing content converter...');
    
    // Load scraped data
    if (!await fs.pathExists(this.config.dataFile)) {
      throw new Error('No scraped data found. Run the scraper first.');
    }
    
    this.scrapedData = await fs.readJson(this.config.dataFile);
    this.urlMappings = await fs.readJson(this.config.urlMappingFile);
    
    // Clear output directory
    await fs.emptyDir(this.config.outputDir);
    
    console.log(`✅ Loaded ${this.scrapedData.articles.length} articles for conversion`);
  }

  async convertArticle(article) {
    console.log(`📝 Converting: ${article.originalTitle}`);
    
    try {
      // Convert HTML to Markdown
      const markdown = await htmlToMarkdown(
        article.htmlContent,
        article.structuredContent,
        article.codeBlocks,
        article.tables
      );
      
      // Update internal links
      const markdownWithLinks = updateInternalLinks(markdown, this.urlMappings);
      
      // Update image references
      const markdownWithImages = this.updateImageReferences(markdownWithLinks, article);
      
      // Generate frontmatter
      const frontmatter = generateFrontmatter(article);
      
      // Combine frontmatter and content
      const fullContent = `${frontmatter}\n\n${markdownWithImages}`;
      
      // Determine output path
      const outputPath = this.getOutputPath(article);
      
      // Ensure directory exists
      await fs.ensureDir(path.dirname(outputPath));
      
      // Write file
      await fs.writeFile(outputPath, fullContent);
      
      this.stats.converted++;
      console.log(`✅ Converted: ${article.originalTitle} → ${outputPath}`);
      
      return {
        success: true,
        outputPath,
        article: article.originalTitle
      };
    } catch (error) {
      this.stats.failed++;
      this.stats.errors.push({
        article: article.originalTitle,
        error: error.message
      });
      
      console.error(`❌ Failed to convert: ${article.originalTitle}`, error.message);
      
      return {
        success: false,
        article: article.originalTitle,
        error: error.message
      };
    }
  }

  updateImageReferences(markdown, article) {
    if (!article.localImages || article.localImages.length === 0) {
      return markdown;
    }
    
    let updatedMarkdown = markdown;
    
    for (const image of article.localImages) {
      // Convert to Docusaurus static path
      const docusaurusPath = `/${image.relativePath}`;
      
      // Replace original URL with local path
      updatedMarkdown = updatedMarkdown.replace(
        new RegExp(this.escapeRegExp(image.originalSrc), 'g'),
        docusaurusPath
      );
      
      // Also try to replace any encoded versions
      const encodedSrc = encodeURI(image.originalSrc);
      updatedMarkdown = updatedMarkdown.replace(
        new RegExp(this.escapeRegExp(encodedSrc), 'g'),
        docusaurusPath
      );
    }
    
    return updatedMarkdown;
  }

  getOutputPath(article) {
    // Create path based on category and slug
    const categorySlug = article.category.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Special handling for intro/getting started content
    if (article.slug === 'getting-started' || article.slug === 'introduction') {
      return path.join(this.config.outputDir, categorySlug, '_index.md');
    }
    
    return path.join(this.config.outputDir, categorySlug, `${article.slug}.md`);
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async convertAllContent() {
    console.log('\n🚀 Starting content conversion...\n');
    
    this.stats.totalArticles = this.scrapedData.articles.length;
    
    const results = [];
    
    for (const article of this.scrapedData.articles) {
      const result = await this.convertArticle(article);
      results.push(result);
    }
    
    return results;
  }

  async createCategoryPages() {
    console.log('\n📁 Creating category index pages...');
    
    const categories = [...new Set(this.scrapedData.articles.map(a => a.category))];
    
    for (const category of categories) {
      const categorySlug = category.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      const categoryPath = path.join(this.config.outputDir, categorySlug);
      await fs.ensureDir(categoryPath);
      
      // Check if index already exists
      const indexPath = path.join(categoryPath, '_index.md');
      if (!await fs.pathExists(indexPath)) {
        // Create category index
        const content = `---
title: ${category}
sidebar_position: 1
---

# ${category}

Welcome to the ${category} section of the DataLion Help Center.

## Available Articles

import DocCardList from '@theme/DocCardList';

<DocCardList />
`;
        
        await fs.writeFile(indexPath, content);
        console.log(`✅ Created category page: ${category}`);
      }
    }
  }

  async createRootIndex() {
    console.log('📄 Creating root documentation index...');
    
    const indexPath = path.join(this.config.outputDir, 'index.md');
    
    const content = `---
title: Documentation
sidebar_position: 0
---

# DataLion Documentation

Welcome to the DataLion Help Center. Browse our documentation by category below.

## Categories

import DocCardList from '@theme/DocCardList';

<DocCardList />

## Getting Help

If you can't find what you're looking for, please:

1. Use the search feature above
2. Check our [FAQ section](/docs/troubleshooting/faq)
3. Contact our support team at support@datalion.com
`;
    
    await fs.writeFile(indexPath, content);
    console.log('✅ Created root documentation index');
  }

  async saveReport() {
    console.log('\n📊 Generating conversion report...');
    
    const report = generateReport(this.stats, this.scrapedData);
    
    await fs.writeJson(this.config.reportFile, report, { spaces: 2 });
    
    console.log('\n📈 Conversion Summary:');
    console.log(`  ✅ Converted: ${this.stats.converted}/${this.stats.totalArticles}`);
    console.log(`  ❌ Failed: ${this.stats.failed}`);
    console.log(`  ⚠️  Warnings: ${this.stats.warnings.length}`);
    
    if (this.stats.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.stats.errors.forEach(error => {
        console.log(`  - ${error.article}: ${error.error}`);
      });
    }
  }

  async run() {
    try {
      await this.initialize();
      await this.convertAllContent();
      await this.createCategoryPages();
      await this.createRootIndex();
      await this.saveReport();
      
      console.log('\n✨ Content conversion completed successfully!');
    } catch (error) {
      console.error('💥 Conversion failed:', error);
      throw error;
    }
  }
}

// Run converter if called directly
if (require.main === module) {
  const converter = new ContentConverter();
  converter.run()
    .then(() => {
      console.log('✅ All done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = ContentConverter;