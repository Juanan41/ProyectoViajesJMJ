const fs = require('fs');

const destRaw = fs.readFileSync('src/app/data/destinations.ts', 'utf8');

// extremely hacky way to extract names and descriptions
const namesMatch = destRaw.match(/name:\s*['"](.*?)['"]/g) || [];
const descMatch = destRaw.match(/description:\s*['"](.*?)['"]/g) || [];
const categoryMatch = destRaw.match(/category:\s*['"](.*?)['"]/g) || [];

let set = new Set();

[...namesMatch, ...descMatch, ...categoryMatch].forEach((m) => {
  const val = m.replace(/^(name|description|category):\s*['"](.*?)['"]$/, '$2');
  set.add(val);
});

const sorted = Array.from(set).sort();
fs.writeFileSync('extracted-destinations.json', JSON.stringify(sorted, null, 2));
