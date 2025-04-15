const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

console.log(`${colors.bright}${colors.blue}Starting WhizWords build process for Vercel deployment...${colors.reset}\n`);

try {
  // Build the client app
  console.log(`${colors.yellow}Building client application...${colors.reset}`);
  execSync('cd client && npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}Client build complete!${colors.reset}\n`);

  // Create a dist directory for the server
  console.log(`${colors.yellow}Preparing server build...${colors.reset}`);
  if (!fs.existsSync(path.join(__dirname, '../dist'))) {
    fs.mkdirSync(path.join(__dirname, '../dist'));
  }

  // Copy necessary server files for production
  console.log(`${colors.yellow}Copying server files...${colors.reset}`);
  execSync('cp -r server dist/', { stdio: 'inherit' });
  
  // Create a basic public directory for static assets if not already created by build
  const publicDir = path.join(__dirname, '../dist/public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log(`\n${colors.bright}${colors.green}Build process completed successfully!${colors.reset}`);
  console.log(`${colors.blue}The application is ready for Vercel deployment.${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Build failed:${colors.reset}`, error);
  process.exit(1);
}