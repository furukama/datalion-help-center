// ABOUTME: Setup script for configuring Atlassian scraper authentication
// ABOUTME: Helps users set up environment variables for scraping

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🔧 DataLion Help Center Scraper Setup\n');
  console.log('This script will help you configure authentication for the Atlassian scraper.\n');
  
  // Check if .env exists
  const envPath = path.join(__dirname, '../../.env');
  const envExists = await fs.pathExists(envPath);
  
  if (envExists) {
    const overwrite = await question('⚠️  .env file already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('❌ Setup cancelled.');
      process.exit(0);
    }
  }
  
  console.log('\n📝 Please provide your Atlassian credentials:\n');
  
  // Collect credentials
  const email = await question('Email address: ');
  const authMethod = await question('Authentication method (password/token): ');
  
  let credentials = `ATLASSIAN_EMAIL=${email}\n`;
  
  if (authMethod.toLowerCase() === 'token') {
    console.log('\n💡 To create an API token:');
    console.log('1. Go to https://id.atlassian.com/manage-profile/security/api-tokens');
    console.log('2. Click "Create API token"');
    console.log('3. Copy the generated token\n');
    
    const token = await question('API Token: ');
    credentials += `ATLASSIAN_API_TOKEN=${token}\n`;
  } else {
    const password = await question('Password: ');
    credentials += `ATLASSIAN_PASSWORD=${password}\n`;
  }
  
  // Save to .env
  await fs.writeFile(envPath, credentials);
  console.log('\n✅ Credentials saved to .env file');
  
  // Add .env to .gitignore if not already there
  const gitignorePath = path.join(__dirname, '../../.gitignore');
  const gitignore = await fs.readFile(gitignorePath, 'utf8');
  
  if (!gitignore.includes('.env')) {
    await fs.appendFile(gitignorePath, '\n# Environment variables\n.env\n');
    console.log('✅ Added .env to .gitignore');
  }
  
  console.log('\n🚀 Setup complete! You can now run the scraper with:');
  console.log('   npm run scrape\n');
  
  rl.close();
}

setup().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});