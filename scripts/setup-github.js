// ABOUTME: Script to create a private GitHub repository and push the local repo
// ABOUTME: Uses GitHub CLI (gh) to automate repository creation and initial push

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function runCommand(command, options = {}) {
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    throw error;
  }
}

async function setupGitHub() {
  console.log('🚀 GitHub Repository Setup for DataLion Help Center\n');
  
  try {
    // Check if gh is installed
    try {
      execSync('gh --version', { stdio: 'ignore' });
    } catch {
      console.error('❌ GitHub CLI (gh) is not installed.');
      console.log('📝 Install it from: https://cli.github.com/');
      console.log('   On macOS: brew install gh');
      console.log('   Then run: gh auth login');
      process.exit(1);
    }
    
    // Check if already in a git repo
    try {
      execSync('git status', { stdio: 'ignore' });
      console.log('✅ Git repository already initialized');
    } catch {
      console.log('📝 Initializing git repository...');
      runCommand('git init');
    }
    
    // Get repository details
    const repoName = await question('Repository name (datalion-help-center): ') || 'datalion-help-center';
    const repoDescription = await question('Repository description: ') || 'DataLion Help Center Documentation';
    const makePrivate = await question('Make repository private? (Y/n): ');
    const isPrivate = makePrivate.toLowerCase() !== 'n';
    
    console.log('\n📝 Creating GitHub repository...');
    
    // Create the repository
    const visibility = isPrivate ? '--private' : '--public';
    try {
      runCommand(`gh repo create ${repoName} ${visibility} --description "${repoDescription}" --source .`);
      console.log('✅ Repository created successfully!');
    } catch (error) {
      console.log('⚠️  Repository creation failed. It might already exist.');
      const useExisting = await question('Use existing repository? (y/N): ');
      if (useExisting.toLowerCase() !== 'y') {
        process.exit(1);
      }
    }
    
    // Set up remote if needed
    try {
      execSync('git remote get-url origin', { stdio: 'ignore' });
      console.log('✅ Remote origin already configured');
    } catch {
      console.log('📝 Adding remote origin...');
      const username = execSync('gh api user -q .login', { encoding: 'utf8' }).trim();
      runCommand(`git remote add origin git@github.com:${username}/${repoName}.git`);
    }
    
    // Create initial commit if needed
    try {
      execSync('git log -1', { stdio: 'ignore' });
      console.log('✅ Repository has commits');
    } catch {
      console.log('📝 Creating initial commit...');
      runCommand('git add -A');
      runCommand('git commit -m "Initial commit: DataLion Help Center setup"');
    }
    
    // Push to GitHub
    const pushToGitHub = await question('\nPush to GitHub? (Y/n): ');
    if (pushToGitHub.toLowerCase() !== 'n') {
      console.log('\n📤 Pushing to GitHub...');
      runCommand('git branch -M main');
      runCommand('git push -u origin main');
      console.log('✅ Successfully pushed to GitHub!');
      
      // Get repository URL
      const repoUrl = execSync('gh repo view --json url -q .url', { encoding: 'utf8' }).trim();
      console.log(`\n🌐 Repository URL: ${repoUrl}`);
    }
    
    // Set up GitHub Pages
    const setupPages = await question('\nSet up GitHub Pages? (y/N): ');
    if (setupPages.toLowerCase() === 'y') {
      console.log('\n📝 Configuring GitHub Pages...');
      runCommand('gh api repos/{owner}/{repo}/pages -X POST -F source.branch=gh-pages -F source.path=/');
      console.log('✅ GitHub Pages configured!');
      console.log('📝 Note: You\'ll need to run "npm run deploy" to publish the site');
    }
    
    console.log('\n✨ GitHub setup complete!');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run if called directly
if (require.main === module) {
  setupGitHub();
}

module.exports = setupGitHub;