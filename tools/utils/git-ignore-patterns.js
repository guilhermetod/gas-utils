const { readFileSync } = require('fs');

module.exports = readFileSync('.gitignore', 'utf8')
  .split('\n')
  .filter(Boolean);
