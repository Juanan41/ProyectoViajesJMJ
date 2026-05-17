const fs = require('fs');
const path = require('path');

function processHtmlFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processHtmlFiles(fullPath);
    } else if (fullPath.endsWith('.html')) {
      processFile(fullPath);
    }
  });
}

const stringsFound = new Set();

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  content = content.replace(/>([^<>{}]+?)\|\s*translate\s*</g, (match, text) => {
    const cleanText = text.trim();
    stringsFound.add(cleanText);
    changed = true;
    return match.replace(text + '| translate', `{{ '${cleanText}' | translate }}`);
  });

  content = content.replace(/>([^<>{}]+?)</g, (match, text) => {
    const trimmed = text.trim();

    if (
      trimmed.length > 1 &&
      /[a-zA-ZáéíóúÁÉÍÓÚñÑ¿¡]/.test(trimmed) &&
      !trimmed.includes('{{') &&
      !trimmed.includes('}}')
    ) {
      if (trimmed.startsWith('@')) return match;

      stringsFound.add(trimmed);
      changed = true;
      return match.replace(trimmed, `{{ '${trimmed.replace(/'/g, "\\'")}' | translate }}`);
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated -> ${filePath}`);
  }
}

console.log('Scanning HTML files for raw text...\n');

const pagesDir = path.join(__dirname, 'src', 'app', 'pages');
const componentsDir = path.join(__dirname, 'src', 'app', 'components');
const layoutDir = path.join(__dirname, 'src', 'app', 'layout');

[pagesDir, componentsDir, layoutDir].forEach((dir) => {
  if (fs.existsSync(dir)) {
    processHtmlFiles(dir);
  }
});

console.log('\n======================================================');
console.log('      NEW STRINGS FOUND (Copy to translation.ts)      ');
console.log('======================================================\n');

const esOutput = Array.from(stringsFound)
  .sort()
  .map((str) => `      '${str.replace(/'/g, "\\'")}': '${str.replace(/'/g, "\\'")}',`)
  .join('\n');
console.log('/* --- SPANISH DICTIONARY (es) --- */\n');
console.log(esOutput);

console.log('\n/* --- ENGLISH DICTIONARY (en) --- */\n');
const enOutput = Array.from(stringsFound)
  .sort()
  .map(
    (str) =>
      `      '${str.replace(/'/g, "\\'")}': '${str.replace(/'/g, "\\'")}', // TODO: Translate to English`,
  )
  .join('\n');
console.log(enOutput);
console.log('\n======================================================\n');
