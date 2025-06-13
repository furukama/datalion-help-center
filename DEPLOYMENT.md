# DataLion Help Center Deployment Guide

This guide explains how to deploy the DataLion Help Center to GitHub Pages.

## Automatic Deployment

The site is configured for automatic deployment using GitHub Actions.

### How it works

1. **On push to main branch**: The site automatically builds and deploys
2. **On pull requests**: A test build runs to ensure changes don't break the site

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. The workflow will handle the rest automatically

## Manual Deployment

If you need to deploy manually:

```bash
# Build the site
npm run build

# Deploy to GitHub Pages
GIT_USER=<GITHUB_USERNAME> npm run deploy
```

## Custom Domain Setup

To use help.datalion.com:

1. The CNAME file is already configured in `static/CNAME`
2. Configure DNS settings:
   - Add CNAME record: `help.datalion.com` → `furukama.github.io`
   - Or for apex domain, add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. In GitHub repository settings:
   - Go to Settings → Pages
   - Add custom domain: `help.datalion.com`
   - Enable "Enforce HTTPS"

## Environment Variables

No environment variables are required for deployment.

## Deployment Checklist

Before deploying:

- [ ] Run `npm run build` locally to ensure build succeeds
- [ ] Check for broken links: `npm run serve`
- [ ] Verify all images load correctly
- [ ] Test search functionality
- [ ] Review mobile responsiveness

## Monitoring Deployments

1. Check Actions tab in GitHub for deployment status
2. Visit https://furukama.github.io/datalion-help-center/ to verify deployment
3. For custom domain: https://help.datalion.com

## Rollback

To rollback to a previous version:

1. Find the last working commit in GitHub
2. Revert to that commit:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```
3. The site will automatically redeploy

## Troubleshooting

### Build Failures

1. Check GitHub Actions logs for error details
2. Common issues:
   - Missing dependencies: Run `npm ci`
   - Node version mismatch: Use Node 18
   - Broken links: Fix or remove broken references

### Domain Not Working

1. Verify DNS propagation (can take up to 24 hours)
2. Check CNAME file exists in `static/CNAME`
3. Ensure custom domain is configured in repository settings

### 404 Errors

1. Check baseUrl in `docusaurus.config.js`
2. Verify the build output in Actions artifacts
3. Ensure GitHub Pages is enabled in repository settings