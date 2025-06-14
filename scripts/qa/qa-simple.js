#!/usr/bin/env node

// ABOUTME: Simplified QA check script for DataLion help center
// ABOUTME: Performs essential quality checks on the documentation

const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

async function runQAChecks() {
  console.log('🔍 Running QA Checks for DataLion Help Center\n');
  
  const results = {
    passed: 0,
    warnings: 0,
    errors: 0,
    details: []
  };
  
  // Check 1: Build exists
  console.log('📁 Checking build...');
  if (await fs.pathExists('./build')) {
    results.passed++;
    console.log('  ✅ Build directory exists');
  } else {
    results.errors++;
    results.details.push('ERROR: Build directory not found. Run "npm run build" first.');
    console.log('  ❌ Build directory not found');
  }
  
  // Check 2: Documentation files
  console.log('\n📝 Checking documentation files...');
  const docFiles = await glob('**/*.md', { cwd: './docs' });
  console.log(`  ✅ Found ${docFiles.length} documentation files`);
  results.passed++;
  
  // Check 3: Images
  console.log('\n🖼️  Checking images...');
  const imageFiles = await glob('**/*.{png,jpg,jpeg,gif,svg}', { cwd: './static/img' });
  console.log(`  ✅ Found ${imageFiles.length} images`);
  results.passed++;
  
  // Check 4: Check for broken internal links in docs
  console.log('\n🔗 Checking internal links...');
  let brokenLinks = 0;
  for (const file of docFiles) {
    const content = await fs.readFile(path.join('./docs', file), 'utf8');
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
    
    for (const link of links) {
      const href = link.match(/\]\(([^)]+)\)/)[1];
      if (href.startsWith('./') || href.startsWith('../')) {
        const targetPath = path.resolve(path.dirname(path.join('./docs', file)), href);
        const targetMd = targetPath.endsWith('.md') ? targetPath : targetPath + '.md';
        
        if (!await fs.pathExists(targetMd) && !await fs.pathExists(targetPath)) {
          console.log(`  ⚠️  Broken link in ${file}: ${href}`);
          brokenLinks++;
          results.warnings++;
        }
      }
    }
  }
  
  if (brokenLinks === 0) {
    console.log('  ✅ All internal links are valid');
    results.passed++;
  } else {
    results.details.push(`WARNING: Found ${brokenLinks} broken internal links`);
  }
  
  // Check 5: SEO basics
  console.log('\n🔍 Checking SEO basics...');
  let seoIssues = 0;
  for (const file of docFiles.slice(0, 5)) { // Check first 5 files
    const content = await fs.readFile(path.join('./docs', file), 'utf8');
    
    // Check for frontmatter
    if (!content.startsWith('---')) {
      console.log(`  ⚠️  Missing frontmatter: ${file}`);
      seoIssues++;
      results.warnings++;
    } else {
      const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatter && !frontmatter[1].includes('description:')) {
        console.log(`  ⚠️  Missing description in frontmatter: ${file}`);
        seoIssues++;
        results.warnings++;
      }
    }
  }
  
  if (seoIssues === 0) {
    console.log('  ✅ SEO basics look good');
    results.passed++;
  } else {
    results.details.push(`WARNING: Found ${seoIssues} SEO issues`);
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 QA CHECK SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`⚠️  Warnings: ${results.warnings}`);
  console.log(`❌ Errors: ${results.errors}`);
  
  if (results.details.length > 0) {
    console.log('\nDetails:');
    results.details.forEach(detail => console.log(`  - ${detail}`));
  }
  
  // Save report
  await fs.writeJson('./qa-report.json', results, { spaces: 2 });
  console.log('\n📄 Report saved to qa-report.json');
  
  // Exit code
  if (results.errors > 0) {
    console.log('\n❌ QA check failed!');
    process.exit(1);
  } else {
    console.log('\n✅ QA check passed!');
    process.exit(0);
  }
}

// Run checks
runQAChecks().catch(error => {
  console.error('❌ QA check failed:', error.message);
  process.exit(1);
});