const fs = require('fs');
const path = require('path');

const logPath = path.join('C:', 'Users', 'ss', '.gemini', 'antigravity', 'brain', 'd87eccc9-3d92-4a01-b87f-b18a60379674', '.system_generated', 'logs', 'transcript.jsonl');

if (!fs.existsSync(logPath)) {
  console.error("Log file not found at:", logPath);
  process.exit(1);
}

const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  const obj = JSON.parse(line);
  if (obj.step_index === 16) {
    console.log("Found message call in step 16:");
    const message = obj.tool_calls[0].args.Message;
    console.log(message);
  }
}
