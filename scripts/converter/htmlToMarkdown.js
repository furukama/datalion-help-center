// ABOUTME: HTML to Markdown conversion utilities with Atlassian-specific handling
// ABOUTME: Uses Turndown with custom rules for special elements

const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');

function createTurndownService() {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full'
  });
  
  // Use GitHub Flavored Markdown
  turndownService.use(turndownPluginGfm.gfm);
  
  // Custom rule for code blocks with language
  turndownService.addRule('codeBlock', {
    filter: function (node) {
      return (
        node.nodeName === 'PRE' &&
        node.firstChild &&
        node.firstChild.nodeName === 'CODE'
      );
    },
    replacement: function (content, node) {
      const codeNode = node.firstChild;
      const language = codeNode.getAttribute('class')?.match(/language-(\w+)/)?.[1] || 
                      codeNode.getAttribute('data-language') || '';
      
      return '\n```' + language + '\n' + codeNode.textContent + '\n```\n';
    }
  });
  
  // Custom rule for Atlassian info/warning panels
  turndownService.addRule('panel', {
    filter: function (node) {
      return (
        node.nodeName === 'DIV' &&
        (node.classList.contains('panel') || 
         node.classList.contains('alert') ||
         node.classList.contains('note') ||
         node.classList.contains('warning') ||
         node.classList.contains('info'))
      );
    },
    replacement: function (content, node) {
      const type = getPanelType(node);
      const admonitionMap = {
        'info': 'info',
        'note': 'note',
        'warning': 'warning',
        'danger': 'danger',
        'tip': 'tip',
        'caution': 'caution'
      };
      
      const admonitionType = admonitionMap[type] || 'note';
      
      return `\n:::${admonitionType}\n${content.trim()}\n:::\n`;
    }
  });
  
  // Custom rule for inline code
  turndownService.addRule('inlineCode', {
    filter: function (node) {
      return (
        node.nodeName === 'CODE' &&
        node.parentNode.nodeName !== 'PRE'
      );
    },
    replacement: function (content) {
      if (!content) return '';
      // Escape backticks in content
      const escaped = content.replace(/`/g, '\\`');
      return '`' + escaped + '`';
    }
  });
  
  // Custom rule for images with captions
  turndownService.addRule('imageWithCaption', {
    filter: function (node) {
      return (
        node.nodeName === 'FIGURE' &&
        node.querySelector('img')
      );
    },
    replacement: function (content, node) {
      const img = node.querySelector('img');
      const caption = node.querySelector('figcaption');
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      const title = img.getAttribute('title') || caption?.textContent || '';
      
      let markdown = `![${alt}](${src}`;
      if (title) {
        markdown += ` "${title}"`;
      }
      markdown += ')';
      
      if (caption) {
        markdown += `\n*${caption.textContent}*`;
      }
      
      return markdown;
    }
  });
  
  // Handle nested lists properly
  turndownService.addRule('nestedList', {
    filter: ['ul', 'ol'],
    replacement: function (content, node) {
      const parent = node.parentNode;
      const isNested = parent.nodeName === 'LI';
      
      if (isNested) {
        // Indent nested lists
        content = content.split('\n').map(line => '  ' + line).join('\n');
      }
      
      return content;
    }
  });
  
  return turndownService;
}

function getPanelType(node) {
  const classNames = Array.from(node.classList);
  const typeMap = {
    'panel-info': 'info',
    'panel-warning': 'warning',
    'panel-danger': 'danger',
    'panel-success': 'tip',
    'alert-info': 'info',
    'alert-warning': 'warning',
    'alert-danger': 'danger',
    'note': 'note'
  };
  
  for (const className of classNames) {
    if (typeMap[className]) {
      return typeMap[className];
    }
  }
  
  // Check data attributes
  const dataType = node.getAttribute('data-type');
  if (dataType) {
    return dataType.toLowerCase();
  }
  
  return 'note';
}

async function htmlToMarkdown(htmlContent, structuredContent, codeBlocks, tables) {
  const turndownService = createTurndownService();
  
  // Convert main content
  let markdown = turndownService.turndown(htmlContent);
  
  // Post-process markdown
  markdown = postProcessMarkdown(markdown);
  
  // Handle special formatting
  markdown = handleSpecialFormatting(markdown, codeBlocks, tables);
  
  return markdown;
}

function postProcessMarkdown(markdown) {
  // Fix multiple blank lines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  
  // Fix spacing around headings
  markdown = markdown.replace(/\n(#{1,6}\s+[^\n]+)\n/g, '\n\n$1\n\n');
  
  // Fix spacing around code blocks
  markdown = markdown.replace(/\n```/g, '\n\n```');
  markdown = markdown.replace(/```\n/g, '```\n\n');
  
  // Fix spacing around admonitions
  markdown = markdown.replace(/\n:::/g, '\n\n:::');
  markdown = markdown.replace(/:::\n/g, ':::\n\n');
  
  // Remove trailing spaces
  markdown = markdown.split('\n').map(line => line.trimEnd()).join('\n');
  
  // Ensure document ends with newline
  if (!markdown.endsWith('\n')) {
    markdown += '\n';
  }
  
  return markdown;
}

function handleSpecialFormatting(markdown, codeBlocks, tables) {
  // Enhance code blocks with proper language tags
  if (codeBlocks && codeBlocks.length > 0) {
    codeBlocks.forEach(block => {
      if (block.language && block.language !== 'plaintext') {
        const oldPattern = '```\n' + block.code;
        const newPattern = '```' + block.language + '\n' + block.code;
        markdown = markdown.replace(oldPattern, newPattern);
      }
    });
  }
  
  // Ensure tables are properly formatted
  if (tables && tables.length > 0) {
    // Tables should already be handled by turndown-plugin-gfm
    // But we can add extra formatting if needed
  }
  
  return markdown;
}

module.exports = {
  htmlToMarkdown,
  createTurndownService,
  postProcessMarkdown
};