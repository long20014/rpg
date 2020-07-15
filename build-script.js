const concat = require('concat');
const fs = require('fs-extra');

(async function build() {
  const files = [
    './dist/out-tsc/inline.bundle.js',
    './dist/out-tsc/polifills.bundle.js',
    './dist/out-tsc/main.bundle.js',
  ]
  await fs.ensureDir('element')

  await concat(files, 'elements/custom-button.js')
})();

