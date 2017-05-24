const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const inputFile = path.join(__dirname, '..', 'dpdb-formatted.json');
const outputFile = path.join(__dirname, '..', 'dpdb.json');
const dpdbStr = fs.readFileSync(inputFile, 'utf8');
let dpdbObj;

try {
  dpdbObj = JSON.parse(dpdbStr);
} catch (err) {
  throw new Error(`Could not parse as JSON from file "${inputFile}"`);
  console.error(err);
  process.exit(1);
}

if (argv.includes('--write') || argv.includes('-w')) {
  // Rewrite the files only if the source file, `dpdb-formatted.json`,
  // contains valid JSON.
  console.log(`Writing to file "${inputFile}"`);
  fs.writeFileSync(inputFile, JSON.stringify(dpdbObj, null, 2));
  console.log(`Writing to file "${outputFile}"`);
  fs.writeFileSync(outputFile, JSON.stringify(dpdbObj));
}
