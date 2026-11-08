const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputPublic = path.join(rootDir, '.output', 'public');
const distClient = path.join(rootDir, 'dist', 'client');
const rendererPath = path.join(rootDir, '.output', 'server', '_chunks', 'renderer-template.mjs');

console.log('[prepare-gh-pages] Preparing static assets for GitHub Pages...');

// Ensure target directories exist
fs.mkdirSync(outputPublic, { recursive: true });
fs.mkdirSync(distClient, { recursive: true });
fs.mkdirSync(path.join(distClient, 'assets'), { recursive: true });

let htmlContent = '';

if (fs.existsSync(rendererPath)) {
  const content = fs.readFileSync(rendererPath, 'utf8');
  const match = content.match(/new HTTPResponse\('([\s\S]*?)',/);
  if (match && match[1]) {
    htmlContent = match[1]
      .replace(/\\n/g, '\n')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/<\\\/script>/g, '</script>');
  }
}

// Fallback to root index.html if renderer-template was not found
if (!htmlContent && fs.existsSync(path.join(rootDir, 'index.html'))) {
  htmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
}

// Locate CSS and JS assets
let cssFile = null;
let jsFiles = [];

const assetsDir = path.join(outputPublic, 'assets');
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  files.forEach((f) => {
    if (f.endsWith('.css') && f.startsWith('styles-')) cssFile = f;
    if (f.endsWith('.js') && f.startsWith('index-')) jsFiles.push(f);
  });
}

const baseUrl = process.env.VITE_BASE_URL || '/';
const normalizedBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

// If baseUrl is set (e.g. /Harshath.Developer.io/), fix asset URLs
if (baseUrl && baseUrl !== '/') {
  htmlContent = htmlContent.replace(/(href|src)="\/(assets\/[^"]+)"/g, `$1="${normalizedBase}$2"`);
}

// Ensure CSS stylesheet link is injected into <head>
if (cssFile && !htmlContent.includes(cssFile)) {
  const cssTag = `<link rel="stylesheet" href="${normalizedBase}assets/${cssFile}">`;
  htmlContent = htmlContent.replace('</head>', `  ${cssTag}\n  </head>`);
}

// Write index.html and 404.html to both .output/public and dist/client
fs.writeFileSync(path.join(outputPublic, 'index.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(outputPublic, '404.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(distClient, 'index.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(distClient, '404.html'), htmlContent, 'utf8');

// Write .nojekyll
fs.writeFileSync(path.join(outputPublic, '.nojekyll'), '', 'utf8');
fs.writeFileSync(path.join(distClient, '.nojekyll'), '', 'utf8');

// Copy all assets from .output/public/assets to dist/client/assets
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  files.forEach((f) => {
    const src = path.join(assetsDir, f);
    const dest = path.join(distClient, 'assets', f);
    fs.copyFileSync(src, dest);
  });
}

console.log('[prepare-gh-pages] Successfully prepared index.html, 404.html, .nojekyll and assets in both .output/public and dist/client');
