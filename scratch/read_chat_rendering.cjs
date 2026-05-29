const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let foundLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('messages.map(')) {
    foundLine = i + 1;
    break;
  }
}

if (foundLine !== -1) {
  for (let i = foundLine - 10; i <= foundLine + 20; i++) {
    console.log(`${i}: ${lines[i - 1]}`);
  }
} else {
  console.log("Could not find messages.map");
}
