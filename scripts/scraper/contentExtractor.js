// ABOUTME: Content extraction utilities for parsing Atlassian help articles
// ABOUTME: Handles HTML to structured data conversion and content cleaning

const cheerio = require('cheerio');
const config = require('./config');

async function extractArticleContent(page, selectors) {
  const content = await page.evaluate((selectors, removeElements) => {
    // Remove unwanted elements
    removeElements.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
    
    // Extract main content
    const contentElement = document.querySelector(selectors.articleContent);
    const titleElement = document.querySelector(selectors.articleTitle);
    
    // Extract metadata
    const metaElement = document.querySelector(selectors.articleMeta);
    const metadata = {};
    if (metaElement) {
      const metaText = metaElement.textContent;
      if (metaText.includes('Last updated')) {
        metadata.lastUpdated = metaText.match(/Last updated:?\s*(.+)/i)?.[1]?.trim();
      }
      if (metaText.includes('Created')) {
        metadata.created = metaText.match(/Created:?\s*(.+)/i)?.[1]?.trim();
      }
    }
    
    // Extract breadcrumb
    const breadcrumbElement = document.querySelector(selectors.breadcrumb);
    const breadcrumb = [];
    if (breadcrumbElement) {
      breadcrumbElement.querySelectorAll('a, span').forEach(el => {
        const text = el.textContent.trim();
        if (text && text !== '>' && text !== '/') {
          breadcrumb.push(text);
        }
      });
    }
    
    // Extract images
    const images = [];
    document.querySelectorAll(selectors.contentImages).forEach(img => {
      const src = img.src || img.getAttribute('data-src');
      if (src) {
        images.push({
          src: src.startsWith('http') ? src : new URL(src, window.location.origin).href,
          alt: img.alt || '',
          title: img.title || '',
          width: img.width || img.naturalWidth,
          height: img.height || img.naturalHeight
        });
      }
    });
    
    return {
      title: titleElement?.textContent.trim() || '',
      htmlContent: contentElement?.innerHTML || '',
      textContent: contentElement?.textContent.trim() || '',
      metadata,
      breadcrumb,
      images
    };
  }, selectors, config.processing.removeElements);
  
  // Process content with cheerio for better parsing
  const $ = cheerio.load(content.htmlContent);
  
  // Clean and structure content
  const structuredContent = extractStructuredContent($);
  
  return {
    ...content,
    structuredContent,
    headings: extractHeadings($),
    codeBlocks: extractCodeBlocks($),
    links: extractLinks($),
    tables: extractTables($)
  };
}

function extractStructuredContent($) {
  const sections = [];
  let currentSection = null;
  
  $('body').children().each((i, elem) => {
    const $elem = $(elem);
    const tagName = elem.tagName.toLowerCase();
    
    if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
      // Start new section
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        level: parseInt(tagName.charAt(1)),
        title: $elem.text().trim(),
        content: [],
        html: ''
      };
    } else if (currentSection) {
      // Add to current section
      currentSection.content.push({
        type: getContentType(elem, $),
        html: $.html(elem),
        text: $elem.text().trim()
      });
      currentSection.html += $.html(elem);
    } else {
      // Content before first heading
      if (sections.length === 0) {
        sections.push({
          level: 0,
          title: 'Introduction',
          content: [{
            type: getContentType(elem, $),
            html: $.html(elem),
            text: $elem.text().trim()
          }],
          html: $.html(elem)
        });
      }
    }
  });
  
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
}

function getContentType(elem, $) {
  const tagName = elem.tagName.toLowerCase();
  const $elem = $(elem);
  
  if (tagName === 'pre' || $elem.find('code').length > 0) return 'code';
  if (tagName === 'img') return 'image';
  if (tagName === 'table') return 'table';
  if (tagName === 'ul' || tagName === 'ol') return 'list';
  if (tagName === 'blockquote') return 'quote';
  if (tagName === 'div' && $elem.hasClass('alert')) return 'alert';
  if (tagName === 'div' && $elem.hasClass('note')) return 'note';
  return 'paragraph';
}

function extractHeadings($) {
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
    const $elem = $(elem);
    headings.push({
      level: parseInt(elem.tagName.charAt(1)),
      text: $elem.text().trim(),
      id: $elem.attr('id') || $elem.text().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
  });
  return headings;
}

function extractCodeBlocks($) {
  const codeBlocks = [];
  $('pre code, pre, .code-block').each((i, elem) => {
    const $elem = $(elem);
    const code = $elem.text().trim();
    const language = $elem.attr('class')?.match(/language-(\w+)/)?.[1] || 
                    $elem.attr('data-language') || 
                    'plaintext';
    
    if (code) {
      codeBlocks.push({
        code,
        language,
        html: $.html(elem)
      });
    }
  });
  return codeBlocks;
}

function extractLinks($) {
  const links = [];
  $('a[href]').each((i, elem) => {
    const $elem = $(elem);
    const href = $elem.attr('href');
    if (href) {
      links.push({
        text: $elem.text().trim(),
        href,
        isInternal: !href.startsWith('http') || href.includes('atlassian.net'),
        isAnchor: href.startsWith('#')
      });
    }
  });
  return links;
}

function extractTables($) {
  const tables = [];
  $('table').each((i, elem) => {
    const $table = $(elem);
    const headers = [];
    const rows = [];
    
    // Extract headers
    $table.find('thead th, tr:first-child th').each((i, th) => {
      headers.push($(th).text().trim());
    });
    
    // Extract rows
    $table.find('tbody tr, tr').each((i, tr) => {
      const row = [];
      $(tr).find('td').each((j, td) => {
        row.push($(td).text().trim());
      });
      if (row.length > 0) {
        rows.push(row);
      }
    });
    
    if (headers.length > 0 || rows.length > 0) {
      tables.push({
        headers,
        rows,
        html: $.html(elem)
      });
    }
  });
  return tables;
}

module.exports = {
  extractArticleContent,
  extractStructuredContent,
  extractHeadings,
  extractCodeBlocks,
  extractLinks,
  extractTables
};