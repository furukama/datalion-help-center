// ABOUTME: Organizes converted content into Docusaurus folder structure
// ABOUTME: Handles category creation and article placement

const fs = require('fs-extra');
const path = require('path');

async function organizeContent(articles, outputDir) {
  console.log('📂 Organizing content structure...');
  
  // Group articles by category
  const categorizedArticles = groupByCategory(articles);
  
  // Create category structure
  const categoryConfig = await createCategoryStructure(categorizedArticles, outputDir);
  
  // Generate category metadata
  await generateCategoryMetadata(categoryConfig, outputDir);
  
  return categoryConfig;
}

function groupByCategory(articles) {
  const grouped = {};
  
  articles.forEach(article => {
    const category = article.category || 'General';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(article);
  });
  
  // Sort articles within each category
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => {
      // Sort by sidebar position if available
      const posA = a.frontmatter?.sidebar_position || 999;
      const posB = b.frontmatter?.sidebar_position || 999;
      if (posA !== posB) {
        return posA - posB;
      }
      // Otherwise sort alphabetically
      return a.title.localeCompare(b.title);
    });
  });
  
  return grouped;
}

async function createCategoryStructure(categorizedArticles, outputDir) {
  const categoryConfig = {};
  
  // Define category order
  const categoryOrder = {
    'Getting Started': 1,
    'User Guide': 2,
    'Administration': 3,
    'Integrations': 4,
    'API Reference': 5,
    'Troubleshooting': 6,
    'FAQ': 7,
    'General': 99
  };
  
  for (const [category, articles] of Object.entries(categorizedArticles)) {
    const categorySlug = slugify(category);
    const categoryPath = path.join(outputDir, categorySlug);
    
    // Ensure category directory exists
    await fs.ensureDir(categoryPath);
    
    categoryConfig[category] = {
      slug: categorySlug,
      path: categoryPath,
      label: category,
      position: categoryOrder[category] || 50,
      articles: articles.map(a => ({
        title: a.title,
        slug: a.slug,
        path: a.docusaurusPath
      }))
    };
  }
  
  return categoryConfig;
}

async function generateCategoryMetadata(categoryConfig, outputDir) {
  // Create _category_.json files for each category
  for (const [category, config] of Object.entries(categoryConfig)) {
    const categoryJson = {
      label: config.label,
      position: config.position,
      collapsible: true,
      collapsed: false,
      link: {
        type: 'generated-index',
        title: config.label,
        description: `Browse ${config.label} documentation`,
        keywords: [config.label.toLowerCase(), 'datalion']
      }
    };
    
    const categoryJsonPath = path.join(config.path, '_category_.json');
    await fs.writeJson(categoryJsonPath, categoryJson, { spaces: 2 });
  }
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateSidebarStructure(categoryConfig) {
  // Generate sidebar configuration based on folder structure
  const sidebar = [];
  
  // Sort categories by position
  const sortedCategories = Object.entries(categoryConfig)
    .sort(([, a], [, b]) => a.position - b.position);
  
  for (const [category, config] of sortedCategories) {
    const categoryItem = {
      type: 'category',
      label: config.label,
      items: config.articles.map(article => ({
        type: 'doc',
        id: path.relative('docs', article.path).replace(/\.md$/, '').replace(/\\/g, '/')
      }))
    };
    
    sidebar.push(categoryItem);
  }
  
  return sidebar;
}

async function createNavigationFiles(categoryConfig, outputDir) {
  // Create navigation helper files
  const navData = {
    categories: Object.entries(categoryConfig).map(([name, config]) => ({
      name,
      slug: config.slug,
      articleCount: config.articles.length,
      position: config.position
    }))
  };
  
  const navPath = path.join(outputDir, '.navigation.json');
  await fs.writeJson(navPath, navData, { spaces: 2 });
}

module.exports = {
  organizeContent,
  groupByCategory,
  createCategoryStructure,
  generateCategoryMetadata,
  generateSidebarStructure,
  createNavigationFiles
};