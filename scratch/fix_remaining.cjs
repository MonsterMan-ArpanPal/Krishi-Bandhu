const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');
const hasCRLF = content.includes('\r\n');
if (hasCRLF) content = content.replace(/\r\n/g, '\n');

const lines = content.split('\n');
let fixCount = 0;

// Fix line 907 - High Severity (need to see exact context)
console.log(`Line 907: "${lines[906].trim()}"`);
console.log(`Line 912: "${lines[911].trim()}"`);
console.log(`Line 989: "${lines[988].trim()}"`);

// Fix line 907: High Severity - use line-based replacement
if (lines[906] && lines[906].includes('High Severity')) {
  lines[906] = lines[906].replace('High Severity', '{t[lang].highSeverity}');
  fixCount++;
  console.log('✅ Fixed: High Severity (line 907)');
}

// Fix line 912: Infection Spotted / Yellow Rust Detected ternary
if (lines[911] && lines[911].includes('Infection Spotted') && lines[911].includes('Yellow Rust Detected')) {
  lines[911] = lines[911]
    .replace('"Infection Spotted"', 't[lang].infectionSpotted')
    .replace('"Yellow Rust Detected"', 't[lang].pestAlertTitle');
  fixCount++;
  console.log('✅ Fixed: Infection Spotted / Yellow Rust Detected (line 912)');
}

// Fix line 989: Eligible Profile  
if (lines[988] && lines[988].includes('Eligible Profile')) {
  lines[988] = lines[988].replace('🎯 Eligible Profile', '{t[lang].eligibleProfile}');
  fixCount++;
  console.log('✅ Fixed: Eligible Profile (line 989)');
}

content = lines.join('\n');
if (hasCRLF) content = content.replace(/\n/g, '\r\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log(`\nTotal additional fixes: ${fixCount}`);
