// ABOUTME: Generates test data to demonstrate the converter functionality
// ABOUTME: Creates sample articles with various content types

const fs = require('fs-extra');
const path = require('path');

async function generateTestData() {
  console.log('🧪 Generating test data for converter...');
  
  const testData = {
    articles: [
      {
        title: 'Getting Started with DataLion',
        originalTitle: 'Getting Started with DataLion',
        slug: 'getting-started',
        category: 'Getting Started',
        url: 'https://datalion.atlassian.net/articles/getting-started',
        docusaurusPath: '/docs/getting-started/getting-started',
        htmlContent: `
          <h1>Getting Started with DataLion</h1>
          <p>Welcome to DataLion! This guide will help you get up and running quickly.</p>
          
          <h2>Prerequisites</h2>
          <ul>
            <li>A DataLion account</li>
            <li>Modern web browser</li>
            <li>Basic understanding of data analytics</li>
          </ul>
          
          <h2>First Steps</h2>
          <ol>
            <li>Log in to your DataLion account</li>
            <li>Navigate to the Dashboard</li>
            <li>Create your first project</li>
          </ol>
          
          <div class="panel panel-info">
            <p><strong>Tip:</strong> You can import existing data from CSV, Excel, or connect to databases.</p>
          </div>
          
          <h2>Creating Your First Dashboard</h2>
          <p>Follow these steps to create a dashboard:</p>
          
          <pre><code class="language-javascript">
const dashboard = new Dashboard({
  title: 'Sales Overview',
  widgets: ['chart', 'table', 'metric']
});
          </code></pre>
        `,
        textContent: 'Getting Started with DataLion. Welcome to DataLion! This guide will help you get up and running quickly...',
        metadata: {
          lastUpdated: '2024-01-15',
          author: 'DataLion Team'
        },
        headings: [
          { level: 1, text: 'Getting Started with DataLion', id: 'getting-started-with-datalion' },
          { level: 2, text: 'Prerequisites', id: 'prerequisites' },
          { level: 2, text: 'First Steps', id: 'first-steps' },
          { level: 2, text: 'Creating Your First Dashboard', id: 'creating-your-first-dashboard' }
        ],
        images: [],
        links: [
          { text: 'Dashboard', href: '/docs/user-guide/dashboard', isInternal: true }
        ],
        codeBlocks: [
          {
            language: 'javascript',
            code: "const dashboard = new Dashboard({\n  title: 'Sales Overview',\n  widgets: ['chart', 'table', 'metric']\n});"
          }
        ]
      },
      {
        title: 'Dashboard Overview',
        originalTitle: 'Dashboard Overview',
        slug: 'dashboard-overview',
        category: 'User Guide',
        url: 'https://datalion.atlassian.net/articles/dashboard-overview',
        docusaurusPath: '/docs/user-guide/dashboard-overview',
        htmlContent: `
          <h1>Dashboard Overview</h1>
          <p>The DataLion dashboard is your central hub for data visualization and analysis.</p>
          
          <h2>Dashboard Components</h2>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Description</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Widget</td>
                <td>Individual visualization element</td>
                <td>Charts, tables, metrics</td>
              </tr>
              <tr>
                <td>Filter</td>
                <td>Data filtering controls</td>
                <td>Date ranges, categories</td>
              </tr>
              <tr>
                <td>Layout</td>
                <td>Widget arrangement</td>
                <td>Grid, flex, custom</td>
              </tr>
            </tbody>
          </table>
          
          <div class="alert alert-warning">
            <p><strong>Note:</strong> Dashboard performance depends on data volume and complexity.</p>
          </div>
        `,
        textContent: 'Dashboard Overview. The DataLion dashboard is your central hub...',
        metadata: {
          lastUpdated: '2024-01-20'
        },
        headings: [
          { level: 1, text: 'Dashboard Overview', id: 'dashboard-overview' },
          { level: 2, text: 'Dashboard Components', id: 'dashboard-components' }
        ],
        tables: [
          {
            headers: ['Component', 'Description', 'Usage'],
            rows: [
              ['Widget', 'Individual visualization element', 'Charts, tables, metrics'],
              ['Filter', 'Data filtering controls', 'Date ranges, categories'],
              ['Layout', 'Widget arrangement', 'Grid, flex, custom']
            ]
          }
        ]
      },
      {
        title: 'API Reference',
        originalTitle: 'API Reference',
        slug: 'api-reference',
        category: 'Integrations',
        url: 'https://datalion.atlassian.net/articles/api-reference',
        docusaurusPath: '/docs/integrations/api-reference',
        htmlContent: `
          <h1>API Reference</h1>
          <p>DataLion provides a comprehensive REST API for integration.</p>
          
          <h2>Authentication</h2>
          <p>All API requests require authentication using an API key:</p>
          
          <pre><code class="language-bash">
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.datalion.com/v1/data
          </code></pre>
          
          <h2>Endpoints</h2>
          <h3>GET /api/v1/dashboards</h3>
          <p>Retrieve all dashboards for the authenticated user.</p>
          
          <h3>POST /api/v1/data</h3>
          <p>Upload data to DataLion.</p>
          
          <pre><code class="language-json">
{
  "dataset": "sales",
  "data": [
    {"date": "2024-01-01", "revenue": 1000},
    {"date": "2024-01-02", "revenue": 1500}
  ]
}
          </code></pre>
        `,
        textContent: 'API Reference. DataLion provides a comprehensive REST API...',
        metadata: {},
        headings: [
          { level: 1, text: 'API Reference', id: 'api-reference' },
          { level: 2, text: 'Authentication', id: 'authentication' },
          { level: 2, text: 'Endpoints', id: 'endpoints' },
          { level: 3, text: 'GET /api/v1/dashboards', id: 'get-apiv1dashboards' },
          { level: 3, text: 'POST /api/v1/data', id: 'post-apiv1data' }
        ],
        codeBlocks: [
          {
            language: 'bash',
            code: 'curl -H "Authorization: Bearer YOUR_API_KEY" \\\n     https://api.datalion.com/v1/data'
          },
          {
            language: 'json',
            code: '{\n  "dataset": "sales",\n  "data": [\n    {"date": "2024-01-01", "revenue": 1000},\n    {"date": "2024-01-02", "revenue": 1500}\n  ]\n}'
          }
        ]
      }
    ],
    categories: [
      { title: 'Getting Started', id: 'getting-started' },
      { title: 'User Guide', id: 'user-guide' },
      { title: 'Integrations', id: 'integrations' }
    ],
    urlMappings: {
      'https://datalion.atlassian.net/articles/getting-started': '/docs/getting-started/getting-started',
      'https://datalion.atlassian.net/articles/dashboard-overview': '/docs/user-guide/dashboard-overview',
      'https://datalion.atlassian.net/articles/api-reference': '/docs/integrations/api-reference'
    },
    metadata: {
      scrapedAt: new Date().toISOString(),
      totalArticles: 3,
      totalCategories: 3,
      totalImages: 0
    }
  };
  
  // Save test data
  const outputDir = './scraped-content';
  await fs.ensureDir(outputDir);
  
  await fs.writeJson(path.join(outputDir, 'scraped-data.json'), testData, { spaces: 2 });
  await fs.writeJson(path.join(outputDir, 'url-mappings.json'), testData.urlMappings, { spaces: 2 });
  
  console.log('✅ Test data generated successfully!');
  console.log(`📁 Data saved to: ${outputDir}`);
}

// Run if called directly
if (require.main === module) {
  generateTestData()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

module.exports = generateTestData;