const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let foundLine = -1;

for (let i = 950; i < lines.length; i++) {
  if (lines[i].includes('msg.text') || lines[i].includes('msg.text.split')) {
    foundLine = i + 1;
    console.log(`${foundLine}: ${lines[i]}`);
  }
}
