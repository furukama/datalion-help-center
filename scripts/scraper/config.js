// ABOUTME: Configuration for the Atlassian help center scraper
// ABOUTME: Defines URLs, selectors, and scraping parameters

module.exports = {
  // Base URL for the Atlassian help center
  baseUrl: 'https://datalion.atlassian.net/servicedesk/customer/portals',
  
  // Authentication settings (to be filled in by user)
  auth: {
    email: process.env.ATLASSIAN_EMAIL || '',
    apiToken: process.env.ATLASSIAN_API_TOKEN || '',
    password: process.env.ATLASSIAN_PASSWORD || ''
  },
  
  // Scraping configuration
  scraping: {
    // Wait time between requests to avoid rate limiting (ms)
    requestDelay: 1000,
    
    // Timeout for page loads (ms)
    pageTimeout: 30000,
    
    // Maximum number of retries for failed requests
    maxRetries: 3,
    
    // Concurrent pages to scrape
    concurrency: 2
  },
  
  // Output configuration
  output: {
    // Directory to save scraped content
    contentDir: './scraped-content',
    
    // Directory for downloaded images
    imagesDir: './static/img/atlassian-import',
    
    // JSON file for structured data
    dataFile: './scraped-content/scraped-data.json',
    
    // URL mapping file for redirects
    urlMappingFile: './scraped-content/url-mappings.json'
  },
  
  // CSS selectors for content extraction
  selectors: {
    // Article list selectors
    articleList: '.article-list, .kb-article-list, [data-testid="article-list"]',
    articleLink: 'a[href*="/article/"], a[href*="/kb/"]',
    
    // Article content selectors
    articleTitle: 'h1, .article-title, [data-testid="article-title"]',
    articleContent: '.article-content, .kb-article-content, [data-testid="article-content"], main',
    articleMeta: '.article-meta, .article-metadata',
    
    // Category/section selectors
    categoryList: '.category-list, .portal-categories',
    categoryTitle: '.category-title, .category-name',
    
    // Image selectors
    contentImages: 'img[src], img[data-src]',
    
    // Navigation selectors
    breadcrumb: '.breadcrumb, nav[aria-label="breadcrumb"]',
    sidebar: '.sidebar, .navigation-sidebar'
  },
  
  // Content processing rules
  processing: {
    // Elements to remove from content
    removeElements: [
      'script',
      'style',
      '.feedback-widget',
      '.share-buttons',
      '.related-articles',
      '[data-testid="feedback"]'
    ],
    
    // Attributes to preserve on elements
    preserveAttributes: ['href', 'src', 'alt', 'title', 'width', 'height'],
    
    // Image processing
    images: {
      download: true,
      optimize: true,
      maxWidth: 1200
    }
  }
};