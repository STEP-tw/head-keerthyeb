/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
*/

const fs = require('fs');
const { extractFileContent } = require("./src/library.js");

const main = function(){
  let fileName = process.argv[2];
  let fileContent = fs.readFileSync(fileName,"UTF8");
  console.log(extractFileContent(fileContent));
}

main();


