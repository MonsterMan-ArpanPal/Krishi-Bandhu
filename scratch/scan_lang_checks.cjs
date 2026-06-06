const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Scanning page.tsx for inline language checks and string literals...");
lines.forEach((line, index) => {
  const lineNum = index + 1;
  if (lineNum < 244) return; // skip header
  
  if (line.includes('lang ===') || line.includes('lang ==') || line.includes('language ===')) {
    console.log(`Line ${lineNum}: ${line.trim()}`);
  }
  
  // Look for any raw English text in curly braces, e.g. {"Some text"} or 'Some text' or "Some text" inside JSX
  // We can look for lines containing double or single quotes with letters, but ignoring tag attributes
  // Also look for inline strings in JSX
  const inlineStr = line.match(/>\s*[a-zA-Z\s,.-]+\s*</);
  if (inlineStr && !/className/.test(line)) {
    console.log(`Line ${lineNum} JSX text: ${line.trim()}`);
  }
});
