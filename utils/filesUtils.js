const fs = require('fs');
function readFile() {
  const data = fs.readFileSync("./data/Products.json", "utf-8"); // this is synchronous function
  return JSON.parse(data);
}

module.exports = {
  readFile
}