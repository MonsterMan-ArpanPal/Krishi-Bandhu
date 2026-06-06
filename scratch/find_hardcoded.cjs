const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const visibleTextRegex = /([A-Za-z]+[A-Za-z\s,\.\(\)\-\!\?]*[A-Za-z]+)/g;

console.log("Visible strings in page.tsx HTML elements:");
for (let i = 490; i < lines.length; i++) {
  const line = lines[i];
  // Look for text in tags: e.g. <span>Text</span> or <button>Text</button>
  // Or text between elements
  if (line.includes('<') && line.includes('>') && !line.includes('//') && !line.includes('console.log')) {
    const textBetweenTags = line.replace(/<[^>]+>/g, ' ').trim();
    if (textBetweenTags && visibleTextRegex.test(textBetweenTags) && !textBetweenTags.includes('className') && !textBetweenTags.includes('t[lang]') && !textBetweenTags.includes('activeProfile')) {
      console.log(`${i + 1}: ${line.trim()}  ==>  Found: "${textBetweenTags}"`);
    }
  }
}
