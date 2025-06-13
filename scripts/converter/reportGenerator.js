// ABOUTME: Generates detailed reports for the content conversion process
// ABOUTME: Tracks success, failures, and provides actionable insights

function generateReport(stats, scrapedData) {
  const report = {
    summary: {
      timestamp: new Date().toISOString(),
      totalArticles: stats.totalArticles,
      successfullyConverted: stats.converted,
      failed: stats.failed,
      conversionRate: ((stats.converted / stats.totalArticles) * 100).toFixed(2) + '%'
    },
    
    categoryBreakdown: generateCategoryBreakdown(scrapedData, stats),
    
    issues: {
      errors: stats.errors,
      warnings: stats.warnings,
      missingImages: findMissingImages(scrapedData),
      brokenLinks: findBrokenLinks(scrapedData)
    },
    
    recommendations: generateRecommendations(stats, scrapedData),
    
    nextSteps: [
      'Review and fix any conversion errors',
      'Verify all images are properly displayed',
      'Test internal links between articles',
      'Add any missing translations',
      'Configure search indexing',
      'Set up redirects from old URLs'
    ]
  };
  
  return report;
}

function generateCategoryBreakdown(scrapedData, stats) {
  const breakdown = {};
  
  scrapedData.articles.forEach(article => {
    const category = article.category || 'Uncategorized';
    if (!breakdown[category]) {
      breakdown[category] = {
        total: 0,
        converted: 0,
        failed: 0,
        articles: []
      };
    }
    
    breakdown[category].total++;
    breakdown[category].articles.push({
      title: article.originalTitle,
      status: 'unknown' // Would need to track this during conversion
    });
  });
  
  return breakdown;
}

function findMissingImages(scrapedData) {
  const missingImages = [];
  
  scrapedData.articles.forEach(article => {
    if (article.images && article.images.length > 0) {
      article.images.forEach(image => {
        // Check if image was successfully downloaded
        const wasDownloaded = article.localImages?.some(
          local => local.originalSrc === image.src
        );
        
        if (!wasDownloaded) {
          missingImages.push({
            article: article.originalTitle,
            imageUrl: image.src,
            alt: image.alt
          });
        }
      });
    }
  });
  
  return missingImages;
}

function findBrokenLinks(scrapedData) {
  const allUrls = new Set();
  const linkedUrls = new Set();
  
  // Collect all article URLs
  scrapedData.articles.forEach(article => {
    allUrls.add(article.url);
  });
  
  // Collect all linked URLs
  scrapedData.articles.forEach(article => {
    if (article.links) {
      article.links
        .filter(link => link.isInternal && !link.isAnchor)
        .forEach(link => linkedUrls.add(link.href));
    }
  });
  
  // Find linked URLs that don't exist in our dataset
  const brokenLinks = [];
  linkedUrls.forEach(url => {
    if (!Array.from(allUrls).some(articleUrl => articleUrl.includes(url))) {
      brokenLinks.push(url);
    }
  });
  
  return brokenLinks;
}

function generateRecommendations(stats, scrapedData) {
  const recommendations = [];
  
  // High failure rate
  if (stats.failed > stats.totalArticles * 0.1) {
    recommendations.push({
      type: 'error',
      message: 'High failure rate detected. Review error logs and adjust conversion settings.'
    });
  }
  
  // Missing images
  const totalImages = scrapedData.metadata.totalImages || 0;
  const downloadedImages = scrapedData.articles.reduce(
    (sum, article) => sum + (article.localImages?.length || 0), 0
  );
  
  if (downloadedImages < totalImages * 0.9) {
    recommendations.push({
      type: 'warning',
      message: `Only ${downloadedImages}/${totalImages} images were successfully downloaded. Check network settings or image URLs.`
    });
  }
  
  // Large categories
  const categories = {};
  scrapedData.articles.forEach(article => {
    const cat = article.category || 'Uncategorized';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  
  Object.entries(categories).forEach(([category, count]) => {
    if (count > 20) {
      recommendations.push({
        type: 'info',
        message: `Category "${category}" has ${count} articles. Consider creating subcategories for better organization.`
      });
    }
  });
  
  // SEO improvements
  const missingDescriptions = scrapedData.articles.filter(
    article => !article.metadata?.description
  ).length;
  
  if (missingDescriptions > 0) {
    recommendations.push({
      type: 'info',
      message: `${missingDescriptions} articles are missing meta descriptions. Consider adding them for better SEO.`
    });
  }
  
  return recommendations;
}

function generateMigrationChecklist(report) {
  return {
    preDeployment: [
      {
        task: 'Review conversion report',
        completed: false,
        priority: 'high'
      },
      {
        task: 'Fix all conversion errors',
        completed: false,
        priority: 'high',
        count: report.summary.failed
      },
      {
        task: 'Verify image display',
        completed: false,
        priority: 'medium',
        count: report.issues.missingImages.length
      },
      {
        task: 'Test internal links',
        completed: false,
        priority: 'medium',
        count: report.issues.brokenLinks.length
      },
      {
        task: 'Review auto-generated navigation',
        completed: false,
        priority: 'medium'
      },
      {
        task: 'Configure search indexing',
        completed: false,
        priority: 'low'
      }
    ],
    
    postDeployment: [
      {
        task: 'Set up URL redirects',
        completed: false,
        priority: 'high'
      },
      {
        task: 'Update support team documentation',
        completed: false,
        priority: 'medium'
      },
      {
        task: 'Monitor 404 errors',
        completed: false,
        priority: 'medium'
      },
      {
        task: 'Gather user feedback',
        completed: false,
        priority: 'low'
      }
    ]
  };
}

module.exports = {
  generateReport,
  generateCategoryBreakdown,
  findMissingImages,
  findBrokenLinks,
  generateRecommendations,
  generateMigrationChecklist
};