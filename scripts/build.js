const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'dpdb-formatted.json');
const outputFile = path.join(__dirname, '..', 'dpdb.json');
const formattedJSON = fs.readFileSync(inputFile, 'utf8');

const dpdbData = JSON.parse(formattedJSON);
const now = new Date().toISOString();
const newUpdate = now.slice(0, -5) + now.slice(-1);
dpdbData.last_updated = newUpdate;
const updatedFormattedJSON = JSON.stringify(dpdbData, null, 2);

// Use JSON.stringify/parse to ensure that the JSON is valid
// rather than just stripping out space/newline chars
const minifiedJSON = JSON.stringify(JSON.parse(updatedFormattedJSON));

fs.writeFileSync(inputFile, updatedFormattedJSON);
fs.writeFileSync(outputFile, minifiedJSON);
