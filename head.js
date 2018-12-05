const fs = require('fs');
const { head }= require("./src/library.js");

const main = function(){
  console.log(head(fs,process.argv.slice(2)));
}

main();


