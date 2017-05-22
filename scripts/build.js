const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'dpdb-formatted.json');
const outputFile = path.join(__dirname, '..', 'dpdb.json');
const formattedJSON = fs.readFileSync(inputFile, 'utf8');

// Use JSON.stringify/parse to ensure that the JSON is valid
// rather than just stripping out space/newline chars
const minifiedJSON = JSON.stringify(JSON.parse(formattedJSON));

fs.writeFileSync(outputFile, minifiedJSON);
