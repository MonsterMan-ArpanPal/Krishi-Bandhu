const fs = require('fs');
const path = require('path');

const dtsPath = path.join(__dirname, '..', 'node_modules', '@google', 'generative-ai', 'dist', 'generative-ai.d.ts');

if (!fs.existsSync(dtsPath)) {
  console.error("SDK type definitions not found at:", dtsPath);
  process.exit(1);
}

const content = fs.readFileSync(dtsPath, 'utf8');
const lines = content.split('\n');

// Find RequestOptions interface
let printing = false;
let braceCount = 0;
for (const line of lines) {
  if (line.includes('interface RequestOptions')) {
    printing = true;
    braceCount = 0;
  }
  if (printing) {
    console.log(line);
    if (line.includes('{')) braceCount++;
    if (line.includes('}')) {
      braceCount--;
      if (braceCount === 0) {
        printing = false;
      }
    }
  }
}
