const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let startLine = -1;
let endLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const handleSendChat =')) {
    startLine = i + 1;
    break;
  }
}

if (startLine !== -1) {
  // Read next 30 lines
  endLine = startLine + 30;
  for (let i = startLine; i <= endLine; i++) {
    console.log(`${i}: ${lines[i - 1]}`);
  }
} else {
  console.log("Could not find handleSendChat");
}
