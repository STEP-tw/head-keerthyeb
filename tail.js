const fs = require('fs');
const {tail} = require('./src/library.js');

const main = function() {
  console.log(tail(fs, process.argv.slice(2)));
};

main();

