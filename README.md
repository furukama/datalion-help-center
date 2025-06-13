# DataLion Help Center

[![Deploy to GitHub Pages](https://github.com/furukama/datalion-help-center/actions/workflows/deploy.yml/badge.svg)](https://github.com/furukama/datalion-help-center/actions/workflows/deploy.yml)
[![Test Build](https://github.com/furukama/datalion-help-center/actions/workflows/test-build.yml/badge.svg)](https://github.com/furukama/datalion-help-center/actions/workflows/test-build.yml)

This is the official help documentation for DataLion, built with Docusaurus.

🌐 **Live Site**: [https://furukama.github.io/datalion-help-center/](https://furukama.github.io/datalion-help-center/)

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The site is configured for deployment to GitHub Pages at help.datalion.com.

```bash
npm run deploy
```

## Multi-language Support

The site is configured to support English (en) and German (de) languages. To add translations:

1. Run `npm run write-translations -- --locale de`
2. Edit the generated translation files in `i18n/de/`
3. Translate content files in `i18n/de/docusaurus-plugin-content-docs/current/`

## Adding Content

### Creating a New Article

1. Create a new Markdown file in the `docs/` directory
2. Add frontmatter with title and description
3. Write your content using Markdown
4. Update `sidebars.js` if needed to include the new article

### Images

Place images in `static/img/` and reference them in Markdown:

```markdown
![Alt text](/img/screenshot.png)
```

## Configuration

- Main configuration: `docusaurus.config.js`
- Sidebar configuration: Auto-generated from folder structure
- Custom CSS: `src/css/custom.css`
- Brand colors: `#cd9542` (DataLion gold)

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
datalion-help-center/
├── docs/                    # Documentation files
├── src/                     # Source files
│   ├── components/         # React components
│   ├── css/               # Custom CSS
│   └── pages/             # Custom pages
├── static/                 # Static files
│   └── img/              # Images
├── docusaurus.config.js   # Main configuration
├── sidebars.js           # Sidebar configuration
└── package.json          # Dependencies
```