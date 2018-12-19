const fs = require("fs");
const { tail } = require("./src/library.js");

const main = function() {
  console.log(tail(process.argv.slice(2), fs));
};

main();
