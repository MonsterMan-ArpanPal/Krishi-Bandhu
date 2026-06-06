const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF for easier manipulation
const hasCRLF = content.includes('\r\n');
if (hasCRLF) {
  content = content.replace(/\r\n/g, '\n');
}

// 1. Add the import statement if not already added
const importNew = `import {
  getProfiles,
  createProfile,
  deleteProfile,
  getLogs,
  addLogEntry,
  deleteLogEntry,
  askAI,
  getAIAdvisory,
} from "~/server/actions";
import {
  karnatakaDistricts,
  cropOptions,
  apmcPrices,
  governmentSchemes,
} from "~/data/shared-data";`;

// If importNew is not in content, we add it
if (!content.includes('import {\n  karnatakaDistricts,')) {
  const importOld = `import {
  getProfiles,
  createProfile,
  deleteProfile,
  getLogs,
  addLogEntry,
  deleteLogEntry,
  askAI,
  getAIAdvisory,
} from "~/server/actions";`;
  if (content.includes(importOld)) {
    content = content.replace(importOld, importNew);
    console.log("Successfully added import statement");
  } else {
    console.log("Error: could not find actions import in page.tsx");
    process.exit(1);
  }
} else {
  console.log("Import statement already exists");
}

// 2. Remove local declarations using substring matching
const startTag = '// Karnataka Districts with automatic Agro-Climatic Zone mapping';
const startIndex = content.indexOf(startTag);

if (startIndex === -1) {
  console.log("Error: could not find start tag of karnatakaDistricts");
  process.exit(1);
}

// Find the end tag (the end of governmentSchemes definition)
const endTagMarker = 'const governmentSchemes = [';
const endTagMarkerIndex = content.indexOf(endTagMarker);
if (endTagMarkerIndex === -1) {
  console.log("Error: could not find governmentSchemes marker");
  process.exit(1);
}

// Now find the first ]; after the governmentSchemes marker
const closingBracketIndex = content.indexOf('];', endTagMarkerIndex);
if (closingBracketIndex === -1) {
  console.log("Error: could not find closing bracket of governmentSchemes");
  process.exit(1);
}

const endIndex = closingBracketIndex + 2; // Include the ]; characters

console.log(`Removing text from index ${startIndex} to ${endIndex}`);
const textToRemove = content.substring(startIndex, endIndex);
console.log("Text to remove sample:", textToRemove.substring(0, 100) + " ... " + textToRemove.substring(textToRemove.length - 100));

content = content.substring(0, startIndex) + content.substring(endIndex);
console.log("Successfully removed local declarations of districts, cropOptions, prices, and schemes");

// Restore CRLF if file had it originally
if (hasCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated page.tsx!");
