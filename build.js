const fs = require('fs');
const path = require('path');

const filesToCopy = [
  'index.html',
  'script.js',
  'styles.css',
  'manifest.json',
  'favicon.svg',
  'sw.js',
  'recovery_script.js',
  'config.js',
  'tailwind.min.js',
  'lucide.min.js'
];

const destDir = path.join(__dirname, 'www');

console.log('Building web assets for Capacitor...');

// Create www directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Ensure capacitor.js is copied from node_modules for vanilla JS usage without a bundler
const capSrc = path.join(__dirname, 'node_modules', '@capacitor', 'core', 'dist', 'capacitor.js');
const capDest = path.join(destDir, 'capacitor.js');
if (fs.existsSync(capSrc)) {
  fs.copyFileSync(capSrc, capDest);
  console.log(`[OK] Copied: capacitor core -> www/capacitor.js`);
} else {
  console.warn(`[WARN] capacitor.js not found in node_modules!`);
}

// Copy files
filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`[OK] Copied: ${file} -> www/${file}`);
  } else {
    console.warn(`[WARN] File not found: ${file}`);
  }
});

// Copy assets folder recursively
const assetsSrc = path.join(__dirname, 'assets');
const assetsDest = path.join(destDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, assetsDest, { recursive: true });
  console.log(`[OK] Copied assets folder -> www/assets`);
}

// Generate config.js with Supabase credentials and optional Cloud API URL
const cloudApiUrl = process.env.CLOUD_API_URL || process.env.VITE_CLOUD_API_URL || '';
const supabaseUrl = process.env.SUPABASE_URL || "https://jbypylccjrkzwvleprxt.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpieXB5bGNjanJrend2bGVwcnh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMzYwNjYsImV4cCI6MjEwMzYxMjA2Nn0.m32pZJ0ELRB6iNutnpJmpgl3uZATBTEggPTBrAo_yfg";

let configContent = `window.__SUPABASE_URL__ = ${JSON.stringify(supabaseUrl)};\nwindow.__SUPABASE_KEY__ = ${JSON.stringify(supabaseKey)};\n`;
if (cloudApiUrl) {
  configContent += `window.__CLOUD_API_URL__ = ${JSON.stringify(cloudApiUrl.replace(/\/+$/, ''))};\n`;
  console.log(`[OK] config.js → CLOUD_API_URL=${cloudApiUrl}`);
}
fs.writeFileSync(path.join(destDir, 'config.js'), configContent);
fs.writeFileSync(path.join(__dirname, 'config.js'), configContent);

console.log('Build completed successfully!');
