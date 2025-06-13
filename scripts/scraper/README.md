# Atlassian Help Center Scraper

This scraper extracts content from the Atlassian help center for migration to Docusaurus.

## Setup

1. **Configure Authentication**
   ```bash
   node scripts/scraper/setup.js
   ```
   
   Or manually create a `.env` file:
   ```env
   ATLASSIAN_EMAIL=your-email@example.com
   ATLASSIAN_API_TOKEN=your-api-token
   # OR
   ATLASSIAN_PASSWORD=your-password
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

## Usage

Run the scraper:
```bash
npm run scrape
```

## Output

The scraper creates:
- `scraped-content/` - JSON files with article data
- `static/img/atlassian-import/` - Downloaded images
- `scraped-content/scraped-data.json` - Complete dataset
- `scraped-content/url-mappings.json` - URL redirect mappings
- `scraped-content/scraping-report.json` - Summary report

## Configuration

Edit `scripts/scraper/config.js` to customize:
- CSS selectors for content extraction
- Rate limiting settings
- Image processing options
- Output directories

## Troubleshooting

- **Authentication fails**: Ensure your credentials are correct
- **Content not found**: Update CSS selectors in config.js
- **Rate limiting**: Increase `requestDelay` in config
- **Missing images**: Check network settings and permissions