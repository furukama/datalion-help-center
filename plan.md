# Claude Code Prompt Plan: Atlassian to Docusaurus Migration

## Phase 1: Initial Setup
```
Set up a new Docusaurus project for DataLion help center with the following requirements:
- Project name: datalion-help-center
- Configure for multi-language support (German and English)
- Set up custom branding with DataLion colors/logo
- Configure for deployment to GitHub Pages at help.datalion.com
- Set up proper SEO meta tags and site configuration
- Include search functionality (Algolia DocSearch)
- Create a proper folder structure for organizing help articles
```

## Phase 2: Content Scraping Strategy
```
I need you to scrape all content from our Atlassian help center at https://datalion.atlassian.net/servicedesk/customer/portals

For each article, extract:
- Title and metadata
- Full content with formatting (headings, lists, code blocks, etc.)
- All images and attachments
- Article categories/sections
- Any internal links between articles

Create a structured data format (JSON) to store all this information before converting to Markdown.

Handle the following challenges:
- Atlassian may require authentication - help me set up proper scraping
- Preserve all formatting and structure
- Download and organize all images locally
- Map internal Atlassian links to future Docusaurus routes
```

## Phase 3: Content Conversion
```
Convert the scraped Atlassian content to Docusaurus-compatible Markdown:

- Transform HTML/rich text to clean Markdown
- Convert images to local references and organize in static/img folder
- Update internal links to work with new site structure
- Preserve formatting: headings, code blocks, tables, lists
- Create proper frontmatter for each article (title, description, tags, etc.)
- Organize articles into logical categories matching current structure
- Handle any special Atlassian-specific elements (callouts, info boxes, etc.)

Create a migration report showing:
- Number of articles processed
- Any formatting issues or manual review needed
- Broken links or missing images
- Suggested category organization
```

## Phase 4: Site Organization & Navigation
```
Based on the migrated content, set up:
- Proper sidebar navigation structure
- Category pages and organization
- Search configuration
- Language switching (prepare structure for German translation)
- Custom CSS for DataLion branding
- Footer and header customization
- 404 page and error handling
```

## Phase 5: GitHub Pages Deployment
```
Configure the project for GitHub Pages deployment:
- Set up GitHub Actions for automatic deployment
- Configure custom domain (help.datalion.com)
- Set up proper CNAME and DNS instructions
- Add deployment badges and documentation
- Create README with maintenance instructions
- Set up branch protection and review process
```

## Phase 6: Quality Assurance Script
```
Create a QA script that:
- Checks all internal links work correctly
- Verifies all images load properly
- Validates HTML structure and accessibility
- Tests search functionality
- Checks mobile responsiveness
- Generates a report of any issues found
```

## Phase 7: Migration Documentation
```
Create comprehensive documentation including:
- How to add/edit articles
- Multi-language workflow
- Deployment process
- Troubleshooting guide
- Content style guide
- How to handle images and attachments
- Review and approval process for changes
```

## Technical Considerations

### Authentication Handling
- May need to provide Atlassian credentials or API tokens
- Consider using headless browser for JavaScript-heavy pages
- Implement rate limiting to avoid being blocked

### Image Handling
- Download all images to `static/img/` with organized subfolders
- Convert image references in articles
- Optimize images for web (optional compression)
- Handle different image formats

### Link Mapping
- Create a URL mapping file for redirects
- Update internal links to new structure
- Handle external links appropriately
- Consider setting up redirects from old URLs

### Error Handling
- Graceful handling of missing pages or broken content
- Logging of all issues for manual review
- Backup of original scraped data
- Rollback capabilities

## Expected Deliverables

1. **Fully configured Docusaurus site** with DataLion branding
2. **All content migrated** from Atlassian in proper Markdown format
3. **GitHub repository** ready for team collaboration
4. **Deployment pipeline** for GitHub Pages
5. **Migration report** with any issues or recommendations
6. **Documentation** for ongoing maintenance

## Success Criteria

- [ ] All existing help articles are accessible and properly formatted
- [ ] Site loads fast and is mobile-friendly
- [ ] Search works across all content
- [ ] Easy for technical team to add/edit content
- [ ] Ready for multi-language expansion
- [ ] SEO-optimized and Google-indexable
- [ ] Professional appearance matching DataLion brand

## Follow-up Tasks (Manual)

After Claude Code completes the technical migration:
- Review content for accuracy and formatting
- Add German translations where needed
- Update any outdated information
- Test user flows and navigation
- Set up analytics and monitoring
