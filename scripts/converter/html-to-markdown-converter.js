#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const https = require('https');
const TurndownService = require('turndown');

// Download image from remote URL with timeout
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    // Set timeout for 30 seconds
    const timeout = setTimeout(() => {
      reject(new Error(`Download timeout for ${url}`));
    }, 30000);
    
    const request = protocol.get(url, (response) => {
      clearTimeout(timeout);
      
      if (response.statusCode === 200) {
        const fileStream = require('fs').createWriteStream(outputPath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
        
        fileStream.on('error', (err) => {
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
    
    // Also set timeout on the request itself
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Request timeout for ${url}`));
    });
  });
}

// Get file extension from content type
function getExtensionFromContentType(contentType) {
  const typeMap = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/bmp': '.bmp',
    'image/webp': '.webp',
    'image/svg+xml': '.svg'
  };
  return typeMap[contentType] || '.png';
}

// Basic HTML to Markdown converter
function createTurndownService() {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*'
  });

  // Initialize arrays on the service instance
  turndownService.imageDownloads = [];
  turndownService.imageCopies = [];

  // Custom rule for code blocks (CSS, Java, etc.)
  turndownService.addRule('codeBlocks', {
    filter: function (node) {
      return node.nodeName === 'DIV' && 
             node.className && 
             node.className.includes('code panel');
    },
    replacement: function (content, node) {
      // Find the pre element with the code
      const preElement = node.querySelector('pre');
      if (preElement) {
        const codeContent = preElement.textContent.trim();
        // Extract language hint from data-syntaxhighlighter-params if available
        const params = preElement.getAttribute('data-syntaxhighlighter-params');
        let language = '';
        if (params) {
          const match = params.match(/brush:\s*(\w+)/);
          if (match) {
            language = match[1];
            // Convert java to css if the content looks like CSS
            if (language === 'java' && codeContent.includes('<style')) {
              language = 'css';
            }
          }
        }
        return '\n\n```' + language + '\n' + codeContent + '\n```\n\n';
      }
      return content;
    }
  });

  // Custom rule for blockquotes with curly braces - wrap in code blocks
  turndownService.addRule('blockquoteCurlyBraces', {
    filter: 'blockquote',
    replacement: function (content, node) {
      // Check if blockquote contains curly braces
      if (/\{\{[^}]*\}\}/.test(node.textContent)) {
        // Remove any HTML tags and wrap entire content in code blocks
        const cleanContent = node.textContent.trim();
        return '\n\n```\n' + cleanContent + '\n```\n\n';
      }
      // Default blockquote behavior for other cases
      return '\n\n> ' + content.replace(/^\n+|\n+$/g, '').replace(/\n/g, '\n> ') + '\n\n';
    }
  });

  // Custom rule for escaping special patterns in paragraphs
  turndownService.addRule('escapePatterns', {
    filter: function (node) {
      // Only process paragraph nodes that contain our patterns
      // Exclude if they contain strong tags with %% patterns (handled by strongPercent rule)
      const hasStrongWithPercent = node.querySelector('strong') && 
                                    node.querySelector('strong').textContent.includes('%%');
      
      return node.nodeName === 'P' && (
        /\{[^{}\[\]]*\}/.test(node.textContent) ||
        /\{\{[^}]*\}\}/.test(node.textContent) ||
        /\[{[^}]*}\]/.test(node.textContent) ||
        /%%[^%]*%%/.test(node.textContent) ||
        /<(text|num|id|label)>/.test(node.textContent) ||
        /<\/>/.test(node.textContent) ||
        /<>/.test(node.textContent) ||
        node.textContent.trim() === '='
      ) && !hasStrongWithPercent;
    },
    replacement: function (content, node) {
      // Get the text content and process it
      let text = node.textContent;
      
      // Special case for simple line starting with "e.g.:" or "z.B.:" and containing JSON
      if ((text.startsWith('e.g.:') || text.startsWith('z.B.:')) && text.includes('{')) {
        // Wrap the entire JSON part after "e.g.: " or "z.B.: " in backticks
        text = text.replace(/^((?:e\.g\.|z\.B\.):\s*)(.+)$/, '$1`$2`');
      }
      // Check if we have complex patterns like {{...%%...%%...}}
      else if (/\{\{.*%%.*%%.*\}\}/.test(text)) {
        // For lines with {{...%%...%%...}}, wrap the entire {{...}} expression
        text = text.replace(/\{\{[^}]+\}\}/g, '`$&`');
      } else {
        // Otherwise process patterns individually
        // Handle [{...}] patterns
        text = text.replace(/\[{[^}]*}\]/g, '`$&`');
        
        // Handle {{...}} patterns
        text = text.replace(/\{\{[^}]*\}\}/g, '`$&`');
        
        // Handle {...} patterns that are not part of {{ or [{
        // Match any content including escaped brackets
        text = text.replace(/(?<!\{)(?<!\[)\{[^{}]*\}(?!\})/g, '`$&`');
        
        // Handle %%...%% patterns
        text = text.replace(/%%[^%]*%%/g, '`$&`');
      }
      
      // Handle <text>, <num>, <id>, and <label> tags
      text = text.replace(/<(text|num|id|label)>/g, '`<$1>`');
      
      // Handle <> and </> patterns
      text = text.replace(/<>/g, '`<>`');
      text = text.replace(/<\/>/g, '`</>`');
      
      // Handle single = in paragraph
      if (text.trim() === '=') {
        text = '`=`';
      }
      
      return '\n\n' + text + '\n\n';
    }
  });


  // Custom rule for <strong> tags containing %%...%%
  turndownService.addRule('strongPercent', {
    filter: function (node) {
      return node.nodeName === 'STRONG' && /%%.*?%%/.test(node.textContent);
    },
    replacement: function (content, node) {
      // Wrap the entire content in backticks and make it bold
      return '**`' + node.textContent + '`**';
    }
  });

  // Custom rule to wrap <text>, <num>, and <label> in backticks
  turndownService.addRule('angleText', {
    filter: function (node) {
      return node.nodeType === 3 && /<(text|num|label)>/.test(node.textContent);
    },
    replacement: function (content) {
      // Replace <text>, <num>, and <label> tags with backtick-wrapped versions
      return content.replace(/<(text|num|label)>/g, '`<$1>`');
    }
  });

  // Custom image handling rule
  turndownService.addRule('images', {
    filter: 'img',
    replacement: function (content, node) {
      const src = node.getAttribute('src');
      const alt = node.getAttribute('alt') || '';
      const contentType = node.getAttribute('data-linked-resource-content-type');
      
      if (!src) return '';
      
      // Handle remote URLs
      if (src.startsWith('http://') || src.startsWith('https://')) {
        const urlParts = new URL(src);
        let filename = path.basename(urlParts.pathname);
        
        // If no file extension, infer from content type
        if (!path.extname(filename) && contentType) {
          const ext = getExtensionFromContentType(contentType);
          filename = filename + ext;
        }
        
        // Download the image (async, but we'll handle this in post-processing)
        const imagePath = `/img/${filename}`;
        
        // Store download info for later processing
        if (!turndownService.imageDownloads) turndownService.imageDownloads = [];
        turndownService.imageDownloads.push({
          url: src,
          filename: filename,
          localPath: path.join(process.cwd(), 'static', 'img', filename)
        });
        
        return `![${alt}](${imagePath})`;
      }
      
      // Handle local attachments paths - extract filename and map to /img/
      if (src.startsWith('attachments/')) {
        const filename = path.basename(src);
        return `![${alt}](/img/${filename})`;
      }
      
      // Handle images/icons paths (like emoticons) - extract filename and copy to /img/
      if (src.startsWith('images/icons/')) {
        const filename = path.basename(src);
        
        // Store copy info for later processing
        if (!turndownService.imageCopies) turndownService.imageCopies = [];
        turndownService.imageCopies.push({
          sourcePath: src,
          filename: filename,
          localPath: path.join(process.cwd(), 'static', 'img', filename)
        });
        
        return `![${alt}](/img/${filename})`;
      }
      
      // Handle other local images - use existing path
      return `![${alt}](${src})`;
    }
  });

  return turndownService;
}

function extractBreadcrumbs(htmlContent) {
  // Extract breadcrumbs to determine directory structure
  const breadcrumbMatch = htmlContent.match(/<div[^>]*id="breadcrumb-section"[^>]*>[\s\S]*?<\/div>/i);
  const breadcrumbs = [];
  
  if (breadcrumbMatch) {
    // Extract all breadcrumb links
    const linkMatches = breadcrumbMatch[0].matchAll(/<a[^>]*href="[^"]*"[^>]*>([^<]+)<\/a>/gi);
    
    for (const match of linkMatches) {
      const text = match[1].trim();
      // Skip the first "Helpcenter" breadcrumb as it's the root
      if (text !== 'Helpcenter') {
        // Convert text to valid directory name
        const dirName = text
          .toLowerCase()
          .replace(/[äöüß]/g, char => ({ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss'}[char]))
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        breadcrumbs.push(dirName);
      }
    }
  }
  
  return breadcrumbs;
}

async function convertHtmlToMarkdown(htmlContent, filename) {
  const turndownService = createTurndownService();
  
  // Extract breadcrumbs before removing sections
  const breadcrumbs = extractBreadcrumbs(htmlContent);
  
  // Remove everything from Attachments section onwards
  htmlContent = htmlContent.replace(/<div[^>]*class="pageSection group"[^>]*>[\s\S]*$/gi, '');
  
  // Remove footer section
  htmlContent = htmlContent.replace(/<div[^>]*id="footer"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  // Convert HTML to Markdown
  let markdown = turndownService.turndown(htmlContent);
  
  // Process any image downloads
  if (turndownService.imageDownloads && turndownService.imageDownloads.length > 0) {
    // Ensure static/img directory exists
    const imgDir = path.join(process.cwd(), 'static', 'img');
    await fs.mkdir(imgDir, { recursive: true });
    
    // Download all remote images
    for (const download of turndownService.imageDownloads) {
      try {
        // Check if file already exists
        try {
          await fs.access(download.localPath);
          continue;
        } catch (err) {
          // File doesn't exist, proceed with download
        }
        
        await downloadImage(download.url, download.localPath);
      } catch (error) {
        console.error(`Failed to download ${download.url}:`, error.message);
      }
    }
  }
  
  // Process any local image copies
  if (turndownService.imageCopies && turndownService.imageCopies.length > 0) {
    
    // Ensure static/img directory exists
    const imgDir = path.join(process.cwd(), 'static', 'img');
    await fs.mkdir(imgDir, { recursive: true });
    
    // Copy all local images
    for (const copy of turndownService.imageCopies) {
      try {
        // Check if destination file already exists
        try {
          await fs.access(copy.localPath);
          continue;
        } catch (err) {
          // File doesn't exist, proceed with copy
        }
        
        // Check if source file exists in scraped-content directory
        const sourcePath = path.join(process.cwd(), 'scraped-content/temp/html-export/DC', copy.sourcePath);
        await fs.copyFile(sourcePath, copy.localPath);
      } catch (error) {
        console.error(`Failed to copy ${copy.sourcePath}:`, error.message);
      }
    }
  }
  
  return { markdown: markdown.trim(), breadcrumbs };
}

async function processHtmlFile(inputPath, outputPath, baseOutputDir) {
  try {
    console.log(`Processing: ${path.basename(inputPath)}`);
    
    const htmlContent = await fs.readFile(inputPath, 'utf-8');
    
    const { markdown, breadcrumbs } = await convertHtmlToMarkdown(htmlContent, path.basename(inputPath));
    
    // Determine the output directory based on breadcrumbs
    let finalOutputDir = baseOutputDir;
    if (breadcrumbs.length > 0) {
      finalOutputDir = path.join(baseOutputDir, ...breadcrumbs);
      // Create the directory structure
      await fs.mkdir(finalOutputDir, { recursive: true });
    }
    
    // Update the output path to use the new directory
    const finalOutputPath = path.join(finalOutputDir, path.basename(outputPath));
    
    // Create frontmatter
    const title = path.basename(inputPath, '.html');
    const frontmatter = `---
title: "${title}"
description: "DataLion documentation"
---

`;
    
    const finalMarkdown = frontmatter + markdown;
    
    await fs.writeFile(finalOutputPath, finalMarkdown, 'utf-8');
    console.log(`✓ Converted: ${path.relative(baseOutputDir, finalOutputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
    return false;
  }
}

async function processAllHtmlFiles(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir, { withFileTypes: true });
    let successful = 0;
    let failed = 0;
    
    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.html')) {
        const inputPath = path.join(inputDir, file.name);
        const outputPath = path.join(outputDir, file.name.replace('.html', '.md'));
        
        const success = await processHtmlFile(inputPath, outputPath, outputDir);
        if (success) {
          successful++;
        } else {
          failed++;
        }
      }
    }
    
    console.log(`\nConversion complete: ${successful} successful, ${failed} failed`);
  } catch (error) {
    console.error('Error processing HTML files:', error);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.log('Usage: node html-to-markdown-converter.js <input-dir> <output-dir>');
    console.log('Example: node html-to-markdown-converter.js ./temp/html-export/DC ./docs');
    process.exit(1);
  }

  const [inputDir, outputDir] = args;
  
  console.log('Converting HTML files to Markdown...');
  console.log(`Input directory: ${path.resolve(inputDir)}`);
  console.log(`Output directory: ${path.resolve(outputDir)}`);
  
  // Ensure output directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error(`Error creating output directory: ${error.message}`);
    process.exit(1);
  }
  
  await processAllHtmlFiles(inputDir, outputDir);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { convertHtmlToMarkdown, processHtmlFile };