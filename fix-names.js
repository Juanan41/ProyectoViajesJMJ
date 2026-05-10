const fs = require('fs');
const path = require('path');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) {
      let cnt = fs.readFileSync(p, 'utf8');
      let rep = cnt.replace(
        /\{\{\s*([a-zA-Z0-9_\?]+\.(name|description|category|roomType|paymentMethod))\s*\}\}/g,
        '{{ $1 | translate }}',
      );
      if (cnt !== rep) {
        fs.writeFileSync(p, rep);
        console.log('Fixed', p);
      }
    }
  }
}
walk('src/app/pages');
walk('src/app/components');
