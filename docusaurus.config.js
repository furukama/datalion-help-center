// ABOUTME: Main Docusaurus configuration file for DataLion help center
// ABOUTME: Configures site metadata, themes, plugins, and multi-language support

const config = {
  title: 'DataLion Help Center',
  tagline: 'Your guide to using DataLion effectively',
  favicon: 'img/favicon.ico',
  
  // Custom fields
  customFields: {
    companyName: 'DataLion',
    supportEmail: 'support@datalion.com',
    tagline: 'Insight is King'
  },

  // Set the production url of your site here
  url: 'https://furukama.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/datalion-help-center/',

  // GitHub pages deployment config
  organizationName: 'furukama', // Usually your GitHub org/user name
  projectName: 'datalion-help-center', // Usually your repo name
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
      },
      de: {
        label: 'Deutsch',
        direction: 'ltr',
        htmlLang: 'de-DE',
        calendar: 'gregory',
      },
    },
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: false, // Auto-generate from folder structure
          // Please change this to your repo
          editUrl: 'https://github.com/datalion/datalion-help-center/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
          sidebarCollapsible: true,
          sidebarCollapsed: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    ({
      // Replace with your project's social card
      image: 'img/datalion-social-card.jpg',
      navbar: {
        title: 'DataLion Help',
        logo: {
          alt: 'DataLion Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/datalion/datalion-help-center',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'DataLion Homepage',
                href: 'https://datalion.com',
              },
              {
                label: 'Support',
                href: 'https://datalion.com/support',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/datalion',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DataLion. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'datalion-help',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),
};

module.exports = config;