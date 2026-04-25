const fs = require('fs');
const path = require('path');

const directoryPath = '/Users/saintfyi/duitrack';

const replacements = [
  {
    regex: /bg-gradient-to-r from-primary to-secondary text-white/g,
    replacement: 'bg-primary text-darker'
  },
  {
    regex: /bg-gradient-to-r from-primary to-secondary/g,
    replacement: 'bg-primary'
  },
  {
    regex: /bg-gradient-to-br from-dark via-dark to-darker/g,
    replacement: 'bg-darker'
  },
  {
    regex: /bg-gradient-to-b from-darker via-dark to-darker/g,
    replacement: 'bg-darker'
  },
  {
    regex: /bg-gradient-to-r from-green-500\/20 to-green-500\/10/g,
    replacement: 'bg-green-500/20'
  }
];

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.next')) {
        walkDir(fullPath);
      }
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content;
        
        replacements.forEach(r => {
          newContent = newContent.replace(r.regex, r.replacement);
        });

        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent);
          console.log('Updated:', fullPath);
        }
      }
    }
  });
}

walkDir(directoryPath);
