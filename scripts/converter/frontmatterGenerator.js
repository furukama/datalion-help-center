// ABOUTME: Generates Docusaurus frontmatter from article metadata
// ABOUTME: Creates SEO-friendly metadata and navigation properties

function generateFrontmatter(article) {
  const frontmatter = {
    title: article.title || article.originalTitle,
    description: generateDescription(article),
    keywords: generateKeywords(article),
    sidebar_label: generateSidebarLabel(article.title || article.originalTitle),
    sidebar_position: generateSidebarPosition(article),
    tags: generateTags(article),
    last_update: generateLastUpdate(article)
  };
  
  // Add custom metadata if available
  if (article.metadata) {
    if (article.metadata.author) {
      frontmatter.author = article.metadata.author;
    }
    if (article.metadata.version) {
      frontmatter.version = article.metadata.version;
    }
  }
  
  // Convert to YAML format
  return formatFrontmatter(frontmatter);
}

function generateDescription(article) {
  // Try to extract from content
  if (article.textContent) {
    const firstParagraph = article.textContent
      .split('\n')
      .find(line => line.trim().length > 20);
    
    if (firstParagraph) {
      // Limit to 160 characters for SEO
      return firstParagraph.trim().substring(0, 160).replace(/\s+/g, ' ').trim();
    }
  }
  
  return `Learn about ${article.title || article.originalTitle} in the DataLion Help Center`;
}

function generateKeywords(article) {
  const keywords = [];
  
  // Add category as keyword
  if (article.category) {
    keywords.push(article.category.toLowerCase());
  }
  
  // Extract keywords from title
  const titleWords = (article.title || article.originalTitle)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 3 && !isStopWord(word));
  
  keywords.push(...titleWords);
  
  // Add common keywords
  keywords.push('datalion', 'help', 'documentation');
  
  // Remove duplicates
  return [...new Set(keywords)];
}

function generateSidebarLabel(title) {
  // Shorten long titles for sidebar
  if (title.length > 30) {
    // Try to find a natural break point
    const shortened = title.substring(0, 30);
    const lastSpace = shortened.lastIndexOf(' ');
    if (lastSpace > 20) {
      return shortened.substring(0, lastSpace) + '...';
    }
  }
  return title;
}

function generateSidebarPosition(article) {
  // Generate position based on title or order in category
  const priorityTerms = {
    'introduction': 1,
    'getting started': 2,
    'overview': 3,
    'setup': 4,
    'installation': 5,
    'configuration': 6,
    'usage': 10,
    'examples': 20,
    'api': 30,
    'reference': 40,
    'troubleshooting': 50,
    'faq': 60
  };
  
  const lowerTitle = (article.title || article.originalTitle).toLowerCase();
  
  for (const [term, position] of Object.entries(priorityTerms)) {
    if (lowerTitle.includes(term)) {
      return position;
    }
  }
  
  // Default position
  return 100;
}

function generateTags(article) {
  const tags = [];
  
  // Add category as tag
  if (article.category && article.category !== 'Uncategorized') {
    tags.push(article.category);
  }
  
  // Extract potential tags from headings
  if (article.headings) {
    article.headings
      .filter(h => h.level === 2)
      .forEach(heading => {
        const tag = heading.text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim();
        if (tag && tag.length > 2 && tag.length < 20) {
          tags.push(tag);
        }
      });
  }
  
  // Limit to 5 tags
  return [...new Set(tags)].slice(0, 5);
}

function generateLastUpdate(article) {
  if (article.metadata?.lastUpdated) {
    return {
      date: new Date(article.metadata.lastUpdated).toISOString(),
      author: article.metadata.author || 'DataLion Team'
    };
  }
  
  if (article.scrapedAt) {
    return {
      date: article.scrapedAt,
      author: 'Migration Script'
    };
  }
  
  return null;
}

function formatFrontmatter(data) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      continue;
    }
    
    if (Array.isArray(value)) {
      if (value.length > 0) {
        lines.push(`${key}:`);
        value.forEach(item => {
          lines.push(`  - ${item}`);
        });
      }
    } else if (typeof value === 'object') {
      lines.push(`${key}:`);
      for (const [subKey, subValue] of Object.entries(value)) {
        lines.push(`  ${subKey}: ${formatValue(subValue)}`);
      }
    } else {
      lines.push(`${key}: ${formatValue(value)}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

function formatValue(value) {
  if (typeof value === 'string') {
    // Quote if contains special characters
    if (value.includes(':') || value.includes('#') || value.includes('@') || value.includes('|')) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  return value;
}

function isStopWord(word) {
  const stopWords = [
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all',
    'have', 'her', 'was', 'one', 'our', 'out', 'can', 'had',
    'but', 'what', 'some', 'can', 'not', 'this', 'with', 'from'
  ];
  return stopWords.includes(word);
}

module.exports = {
  generateFrontmatter,
  generateDescription,
  generateKeywords,
  generateTags
};