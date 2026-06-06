const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Search for pest-related text
const searchTerms = ['High Severity', 'Yellow Rust', 'Infection Spotted', 'Eligible Profile', 'severity', 'infection', 'eligible'];

for (const term of searchTerms) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(term)) {
      console.log(`Found "${term}" at line ${i + 1}: ${lines[i].trim()}`);
    }
  }
}
