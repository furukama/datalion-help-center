// ABOUTME: URL mapping utilities for converting Atlassian URLs to Docusaurus paths
// ABOUTME: Handles link conversion and redirect generation

const path = require('path');

function createUrlMapping(originalUrl, category, articleSlug) {
  // Remove query parameters and anchors
  const cleanUrl = originalUrl.split('?')[0].split('#')[0];
  
  // Generate Docusaurus path
  const categorySlug = category.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const docusaurusPath = `/docs/${categorySlug}/${articleSlug}`;
  
  return {
    original: originalUrl,
    clean: cleanUrl,
    docusaurus: docusaurusPath,
    category: categorySlug,
    article: articleSlug
  };
}

function updateInternalLinks(content, urlMappings) {
  let updatedContent = content;
  
  // Sort mappings by URL length (longest first) to avoid partial replacements
  const sortedMappings = Object.entries(urlMappings)
    .sort(([a], [b]) => b.length - a.length);
  
  for (const [originalUrl, docusaurusPath] of sortedMappings) {
    // Replace in href attributes
    const hrefRegex = new RegExp(`href=["']${escapeRegExp(originalUrl)}["']`, 'g');
    updatedContent = updatedContent.replace(hrefRegex, `href="${docusaurusPath}"`);
    
    // Replace in markdown links
    const mdLinkRegex = new RegExp(`\\]\\(${escapeRegExp(originalUrl)}\\)`, 'g');
    updatedContent = updatedContent.replace(mdLinkRegex, `](${docusaurusPath})`);
  }
  
  return updatedContent;
}

function generateRedirects(urlMappings) {
  const redirects = [];
  
  for (const [originalUrl, docusaurusPath] of Object.entries(urlMappings)) {
    // Extract path from full URL
    try {
      const url = new URL(originalUrl);
      const fromPath = url.pathname;
      
      redirects.push({
        from: fromPath,
        to: docusaurusPath
      });
    } catch (error) {
      // If not a valid URL, skip
      continue;
    }
  }
  
  return redirects;
}

function generateRedirectsPlugin(redirects) {
  // Generate Docusaurus redirect plugin configuration
  return {
    pluginName: '@docusaurus/plugin-client-redirects',
    pluginConfig: {
      redirects: redirects.map(r => ({
        from: r.from,
        to: r.to
      }))
    }
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function validateUrlMappings(urlMappings) {
  const issues = [];
  const seen = new Set();
  
  for (const [original, docusaurus] of Object.entries(urlMappings)) {
    // Check for duplicates
    if (seen.has(docusaurus)) {
      issues.push({
        type: 'duplicate',
        message: `Duplicate Docusaurus path: ${docusaurus}`,
        original
      });
    }
    seen.add(docusaurus);
    
    // Validate path format
    if (!docusaurus.startsWith('/docs/')) {
      issues.push({
        type: 'invalid_path',
        message: `Invalid Docusaurus path format: ${docusaurus}`,
        original
      });
    }
    
    // Check for special characters
    if (!/^[a-z0-9\-\/]+$/.test(docusaurus)) {
      issues.push({
        type: 'invalid_characters',
        message: `Invalid characters in path: ${docusaurus}`,
        original
      });
    }
  }
  
  return issues;
}

module.exports = {
  createUrlMapping,
  updateInternalLinks,
  generateRedirects,
  generateRedirectsPlugin,
  validateUrlMappings
};