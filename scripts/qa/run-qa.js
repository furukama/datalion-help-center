#!/usr/bin/env node

// ABOUTME: Simple runner for QA checks with options
// ABOUTME: Provides command-line interface for running specific QA tests

const QAChecker = require('./qa-check');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('build', {
    alias: 'b',
    type: 'boolean',
    description: 'Build the site before running QA checks',
    default: false
  })
  .option('serve', {
    alias: 's',
    type: 'boolean',
    description: 'Run against local server instead of build directory',
    default: false
  })
  .option('production', {
    alias: 'p',
    type: 'boolean',
    description: 'Run against production site',
    default: false
  })
  .option('quick', {
    alias: 'q',
    type: 'boolean',
    description: 'Run quick checks only (skip external links)',
    default: false
  })
  .help()
  .alias('help', 'h')
  .argv;

async function runQA() {
  const { execSync } = require('child_process');
  
  // Build if requested
  if (argv.build) {
    console.log('🔨 Building site...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Build failed');
      process.exit(1);
    }
  }
  
  // Determine base URL
  let baseUrl = 'http://localhost:3000';
  if (argv.production) {
    baseUrl = 'https://furukama.github.io/datalion-help-center';
  } else if (argv.serve) {
    // Start server in background
    console.log('🚀 Starting development server...');
    const { spawn } = require('child_process');
    const server = spawn('npm', ['run', 'serve'], {
      detached: true,
      stdio: 'ignore'
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Clean up on exit
    process.on('exit', () => {
      try {
        process.kill(-server.pid);
      } catch (e) {}
    });
  }
  
  // Run QA checks
  const qa = new QAChecker({
    baseUrl,
    buildDir: './build',
    docsDir: './docs',
    skipExternalLinks: argv.quick
  });
  
  await qa.run();
}

runQA().catch(error => {
  console.error('❌ QA run failed:', error);
  process.exit(1);
});