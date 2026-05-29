const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Scanning page.tsx for potential raw English strings...");
lines.forEach((line, index) => {
  const lineNum = index + 1;
  // Ignore lines that are comments, imports, dictionary definitions, styles, classes, etc.
  if (lineNum < 244) return; // skip dictionary and imports
  
  // Look for text nodes in JSX, e.g. text outside brackets or quotes that looks like English text
  // We can look for tag-enclosed text: e.g. >Some English Text<
  // Or text followed by closing tag, or starting after opening tag
  const match = line.match(/>([^<{}>]+)</);
  if (match) {
    const text = match[1].trim();
    // check if it contains English letters and is not just spaces or symbols
    if (/[a-zA-Z]/.test(text) && !/className|key=|onClick|onChange/.test(text)) {
      console.log(`Row ${lineNum}: ${line.trim()}`);
    }
  }
  
  // Also look for hardcoded strings in attributes like placeholder="..." or title="..."
  const placeholderMatch = line.match(/(placeholder|title|label)="([^"]+)"/);
  if (placeholderMatch) {
    const text = placeholderMatch[2].trim();
    if (/[a-zA-Z]/.test(text) && !/className/.test(placeholderMatch[0])) {
      console.log(`Row ${lineNum} attribute: ${line.trim()}`);
    }
  }
});
