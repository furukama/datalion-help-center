// ABOUTME: Comprehensive QA validation script for DataLion help center
// ABOUTME: Checks links, images, accessibility, SEO, and content quality

const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { glob } = require('glob');

class QAChecker {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'http://localhost:3000';
    this.buildDir = options.buildDir || './build';
    this.docsDir = options.docsDir || './docs';
    this.results = {
      totalChecks: 0,
      passed: 0,
      failed: 0,
      warningCount: 0,
      errors: [],
      warnings: [],
      summary: {}
    };
  }

  async run() {
    console.log('🔍 Starting DataLion Help Center QA Check...\n');
    
    try {
      // Check if build exists
      await this.checkBuildExists();
      
      // Run all checks
      await this.checkMarkdownFiles();
      await this.checkImages();
      await this.checkInternalLinks();
      await this.checkExternalLinks();
      await this.checkSEO();
      await this.checkAccessibility();
      await this.checkPerformance();
      await this.checkMobileResponsiveness();
      await this.checkSearchFunctionality();
      await this.checkMultiLanguageSupport();
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ QA Check failed:', error.message);
      process.exit(1);
    }
  }

  async checkBuildExists() {
    console.log('📁 Checking build directory...');
    
    if (!await fs.pathExists(this.buildDir)) {
      throw new Error(`Build directory not found: ${this.buildDir}. Run 'npm run build' first.`);
    }
    
    this.log('✅ Build directory exists', 'pass');
  }

  async checkMarkdownFiles() {
    console.log('\n📝 Checking Markdown files...');
    
    const mdFiles = await glob('**/*.md', { cwd: this.docsDir });
    let issues = 0;
    
    for (const file of mdFiles) {
      const filePath = path.join(this.docsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Check for required frontmatter
      if (!content.startsWith('---')) {
        this.log(`Missing frontmatter: ${file}`, 'error');
        issues++;
      } else {
        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          
          // Check required fields
          if (!frontmatter.includes('title:')) {
            this.log(`Missing title in frontmatter: ${file}`, 'error');
            issues++;
          }
          if (!frontmatter.includes('description:')) {
            this.log(`Missing description in frontmatter: ${file}`, 'warn');
          }
        }
      }
      
      // Check for broken markdown syntax
      const codeBlockRegex = /```[\s\S]*?```/g;
      const codeBlocks = content.match(codeBlockRegex) || [];
      const openBlocks = content.match(/```/g) || [];
      
      if (openBlocks.length % 2 !== 0) {
        this.log(`Unclosed code block: ${file}`, 'error');
        issues++;
      }
      
      // Check for empty headings
      if (content.match(/^#{1,6}\s*$/m)) {
        this.log(`Empty heading found: ${file}`, 'warn');
      }
      
      // Check for duplicate headings
      const headings = content.match(/^#{1,6}\s+(.+)$/gm) || [];
      const headingTexts = headings.map(h => h.replace(/^#{1,6}\s+/, '').trim());
      const duplicates = headingTexts.filter((h, i) => headingTexts.indexOf(h) !== i);
      
      if (duplicates.length > 0) {
        this.log(`Duplicate headings in ${file}: ${duplicates.join(', ')}`, 'warn');
      }
    }
    
    this.log(`Checked ${mdFiles.length} Markdown files, ${issues} issues found`, issues > 0 ? 'warn' : 'pass');
  }

  async checkImages() {
    console.log('\n🖼️  Checking images...');
    
    const imageFiles = await glob('**/*.{png,jpg,jpeg,gif,svg}', { cwd: path.join(this.buildDir, 'img') });
    const mdFiles = await glob('**/*.md', { cwd: this.docsDir });
    let missingImages = 0;
    let unusedImages = new Set(imageFiles);
    
    // Check image references in Markdown files
    for (const file of mdFiles) {
      const filePath = path.join(this.docsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Find image references
      const imageRefs = content.match(/!\[.*?\]\((.*?)\)/g) || [];
      const imgTags = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/g) || [];
      
      for (const ref of imageRefs) {
        const imagePath = ref.match(/!\[.*?\]\((.*?)\)/)[1];
        if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
          // Check if local image exists
          if (imagePath.startsWith('/')) {
            const localPath = imagePath.replace(/^\//, '');
            if (!imageFiles.includes(localPath)) {
              this.log(`Missing image: ${imagePath} in ${file}`, 'error');
              missingImages++;
            } else {
              unusedImages.delete(localPath);
            }
          }
        }
      }
    }
    
    // Report unused images
    if (unusedImages.size > 0) {
      this.log(`Found ${unusedImages.size} unused images`, 'warn');
    }
    
    // Check image sizes
    let largeImages = 0;
    for (const image of imageFiles) {
      const imagePath = path.join(this.buildDir, 'img', image);
      const stats = await fs.stat(imagePath);
      
      // Warn if image is larger than 500KB
      if (stats.size > 500 * 1024) {
        this.log(`Large image (${(stats.size / 1024 / 1024).toFixed(2)}MB): ${image}`, 'warn');
        largeImages++;
      }
    }
    
    this.log(`Checked ${imageFiles.length} images, ${missingImages} missing, ${largeImages} large files`, 
             missingImages > 0 ? 'error' : 'pass');
  }

  async checkInternalLinks() {
    console.log('\n🔗 Checking internal links...');
    
    const htmlFiles = await glob('**/*.html', { cwd: this.buildDir });
    let brokenLinks = 0;
    const checkedLinks = new Set();
    
    for (const file of htmlFiles) {
      const filePath = path.join(this.buildDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const $ = cheerio.load(content);
      
      // Find all internal links
      $('a[href^="/"], a[href^="./"], a[href^="../"]').each((i, elem) => {
        const href = $(elem).attr('href');
        const linkPath = path.resolve(path.dirname(filePath), href);
        
        if (!checkedLinks.has(linkPath)) {
          checkedLinks.add(linkPath);
          
          // Check if target exists
          if (!fs.existsSync(linkPath) && !fs.existsSync(linkPath + '.html') && !fs.existsSync(linkPath + '/index.html')) {
            this.log(`Broken internal link: ${href} in ${file}`, 'error');
            brokenLinks++;
          }
        }
      });
    }
    
    this.log(`Checked ${checkedLinks.size} internal links, ${brokenLinks} broken`, 
             brokenLinks > 0 ? 'error' : 'pass');
  }

  async checkExternalLinks() {
    console.log('\n🌐 Checking external links...');
    
    const mdFiles = await glob('**/*.md', { cwd: this.docsDir });
    const externalLinks = new Set();
    
    // Extract external links from Markdown files
    for (const file of mdFiles) {
      const filePath = path.join(this.docsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      const links = content.match(/https?:\/\/[^\s\)]+/g) || [];
      links.forEach(link => externalLinks.add(link.replace(/[.,;]$/, '')));
    }
    
    // Test external links (limited to avoid rate limiting)
    const linksToTest = Array.from(externalLinks).slice(0, 10);
    let deadLinks = 0;
    
    console.log(`  Testing ${linksToTest.length} of ${externalLinks.size} external links...`);
    
    for (const link of linksToTest) {
      try {
        await axios.head(link, { timeout: 5000 });
      } catch (error) {
        if (error.response && error.response.status >= 400) {
          this.log(`Dead external link (${error.response.status}): ${link}`, 'warn');
          deadLinks++;
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
          this.log(`Unreachable external link: ${link}`, 'warn');
          deadLinks++;
        }
      }
    }
    
    this.log(`Tested ${linksToTest.length} external links, ${deadLinks} unreachable`, 
             deadLinks > 0 ? 'warn' : 'pass');
  }

  async checkSEO() {
    console.log('\n🔍 Checking SEO...');
    
    const htmlFiles = await glob('**/*.html', { cwd: this.buildDir });
    let seoIssues = 0;
    
    for (const file of htmlFiles.slice(0, 5)) { // Check first 5 files
      const filePath = path.join(this.buildDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const $ = cheerio.load(content);
      
      // Check meta tags
      if (!$('meta[name="description"]').length) {
        this.log(`Missing meta description: ${file}`, 'warn');
        seoIssues++;
      }
      
      // Check title
      const title = $('title').text();
      if (!title) {
        this.log(`Missing page title: ${file}`, 'error');
        seoIssues++;
      } else if (title.length > 60) {
        this.log(`Title too long (${title.length} chars): ${file}`, 'warn');
      }
      
      // Check H1
      const h1Count = $('h1').length;
      if (h1Count === 0) {
        this.log(`Missing H1: ${file}`, 'warn');
      } else if (h1Count > 1) {
        this.log(`Multiple H1 tags (${h1Count}): ${file}`, 'warn');
      }
      
      // Check image alt text
      const imagesWithoutAlt = $('img:not([alt])').length;
      if (imagesWithoutAlt > 0) {
        this.log(`${imagesWithoutAlt} images without alt text: ${file}`, 'warn');
        seoIssues++;
      }
    }
    
    this.log(`SEO check completed, ${seoIssues} issues found`, 
             seoIssues > 0 ? 'warn' : 'pass');
  }

  async checkAccessibility() {
    console.log('\n♿ Checking accessibility...');
    
    const htmlFiles = await glob('**/*.html', { cwd: this.buildDir });
    let a11yIssues = 0;
    
    for (const file of htmlFiles.slice(0, 5)) { // Check first 5 files
      const filePath = path.join(this.buildDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const $ = cheerio.load(content);
      
      // Check for skip navigation link
      if (!$('a[href="#main"], a[href="#content"]').length) {
        this.log(`Missing skip navigation link: ${file}`, 'warn');
        a11yIssues++;
      }
      
      // Check heading hierarchy
      let lastLevel = 0;
      let hierarchyBroken = false;
      $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
        const level = parseInt(elem.tagName.charAt(1));
        if (level > lastLevel + 1) {
          hierarchyBroken = true;
        }
        lastLevel = level;
      });
      
      if (hierarchyBroken) {
        this.log(`Broken heading hierarchy: ${file}`, 'warn');
        a11yIssues++;
      }
      
      // Check for empty links
      const emptyLinks = $('a:empty').length;
      if (emptyLinks > 0) {
        this.log(`${emptyLinks} empty links: ${file}`, 'error');
        a11yIssues++;
      }
      
      // Check form labels
      const inputsWithoutLabels = $('input:not([type="hidden"]), select, textarea').filter((i, elem) => {
        const id = $(elem).attr('id');
        return !id || !$(`label[for="${id}"]`).length;
      }).length;
      
      if (inputsWithoutLabels > 0) {
        this.log(`${inputsWithoutLabels} form inputs without labels: ${file}`, 'error');
        a11yIssues++;
      }
    }
    
    this.log(`Accessibility check completed, ${a11yIssues} issues found`, 
             a11yIssues > 0 ? 'warn' : 'pass');
  }

  async checkPerformance() {
    console.log('\n⚡ Checking performance...');
    
    // Check build size
    const buildSize = await this.getDirectorySize(this.buildDir);
    const buildSizeMB = buildSize / 1024 / 1024;
    
    if (buildSizeMB > 50) {
      this.log(`Build size is large: ${buildSizeMB.toFixed(2)}MB`, 'warn');
    } else {
      this.log(`Build size: ${buildSizeMB.toFixed(2)}MB`, 'pass');
    }
    
    // Check for large JS bundles
    const jsFiles = await glob('**/*.js', { cwd: this.buildDir });
    let largeFiles = 0;
    
    for (const file of jsFiles) {
      const filePath = path.join(this.buildDir, file);
      const stats = await fs.stat(filePath);
      
      if (stats.size > 200 * 1024) { // 200KB
        this.log(`Large JS file (${(stats.size / 1024).toFixed(0)}KB): ${file}`, 'warn');
        largeFiles++;
      }
    }
    
    this.log(`Performance check completed, ${largeFiles} large JS files`, 
             largeFiles > 0 ? 'warn' : 'pass');
  }

  async checkMobileResponsiveness() {
    console.log('\n📱 Checking mobile responsiveness...');
    
    // Check viewport meta tag
    const htmlFiles = await glob('**/*.html', { cwd: this.buildDir });
    let viewportIssues = 0;
    
    for (const file of htmlFiles.slice(0, 5)) {
      const filePath = path.join(this.buildDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const $ = cheerio.load(content);
      
      const viewport = $('meta[name="viewport"]').attr('content');
      if (!viewport) {
        this.log(`Missing viewport meta tag: ${file}`, 'error');
        viewportIssues++;
      } else if (!viewport.includes('width=device-width')) {
        this.log(`Invalid viewport configuration: ${file}`, 'warn');
        viewportIssues++;
      }
    }
    
    this.log(`Mobile responsiveness check completed, ${viewportIssues} issues found`, 
             viewportIssues > 0 ? 'warn' : 'pass');
  }

  async checkSearchFunctionality() {
    console.log('\n🔎 Checking search functionality...');
    
    // Check if Algolia config exists
    const configPath = path.join(process.cwd(), 'docusaurus.config.js');
    const config = await fs.readFile(configPath, 'utf8');
    
    if (config.includes('algolia:')) {
      if (config.includes('YOUR_APP_ID') || config.includes('YOUR_SEARCH_API_KEY')) {
        this.log('Algolia search not configured (using placeholder values)', 'warn');
      } else {
        this.log('Algolia search is configured', 'pass');
      }
    } else {
      this.log('Search functionality not configured', 'warn');
    }
  }

  async checkMultiLanguageSupport() {
    console.log('\n🌍 Checking multi-language support...');
    
    // Check i18n directory
    const i18nExists = await fs.pathExists('./i18n');
    
    if (i18nExists) {
      const locales = await fs.readdir('./i18n');
      const nonDefaultLocales = locales.filter(l => l !== 'en');
      
      if (nonDefaultLocales.length > 0) {
        this.log(`Multi-language support configured for: ${nonDefaultLocales.join(', ')}`, 'pass');
        
        // Check for missing translations
        for (const locale of nonDefaultLocales) {
          const localeDocsPath = path.join('./i18n', locale, 'docusaurus-plugin-content-docs/current');
          if (!await fs.pathExists(localeDocsPath)) {
            this.log(`Missing translations for locale: ${locale}`, 'warn');
          }
        }
      } else {
        this.log('No additional languages configured', 'info');
      }
    } else {
      this.log('Multi-language support not set up', 'info');
    }
  }

  async getDirectorySize(dirPath) {
    let size = 0;
    const files = await glob('**/*', { cwd: dirPath });
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isFile()) {
        size += stats.size;
      }
    }
    
    return size;
  }

  log(message, type = 'info') {
    this.results.totalChecks++;
    
    switch (type) {
      case 'pass':
        console.log(`  ✅ ${message}`);
        this.results.passed++;
        break;
      case 'warn':
        console.log(`  ⚠️  ${message}`);
        this.results.warningCount++;
        this.results.warningCount.push(message);
        break;
      case 'error':
        console.log(`  ❌ ${message}`);
        this.results.failed++;
        this.results.errors.push(message);
        break;
      case 'info':
        console.log(`  ℹ️  ${message}`);
        break;
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 QA CHECK SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`\nTotal checks: ${this.results.totalChecks}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`⚠️  Warnings: ${this.results.warningCount}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    
    if (this.results.errors.length > 0) {
      console.log('\n❌ ERRORS (must fix):');
      this.results.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (this.results.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS (should fix):');
      this.results.warnings.slice(0, 10).forEach(warning => console.log(`  - ${warning}`));
      if (this.results.warnings.length > 10) {
        console.log(`  ... and ${this.results.warnings.length - 10} more warnings`);
      }
    }
    
    // Save detailed report
    const reportPath = './qa-report.json';
    fs.writeJsonSync(reportPath, this.results, { spaces: 2 });
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    // Exit code based on results
    if (this.results.failed > 0) {
      console.log('\n❌ QA check failed! Please fix the errors above.');
      process.exit(1);
    } else if (this.results.warningCount > 10) {
      console.log('\n⚠️  QA check passed with many warnings. Consider fixing them.');
      process.exit(0);
    } else {
      console.log('\n✅ QA check passed!');
      process.exit(0);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const qa = new QAChecker({
    baseUrl: process.env.BASE_URL || 'https://furukama.github.io/datalion-help-center',
    buildDir: './build',
    docsDir: './docs'
  });
  
  qa.run();
}

module.exports = QAChecker;