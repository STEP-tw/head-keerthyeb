const { isZero } = require("./numbers.js");

const getFirstNLines = function(fileContent, numberOfLines) {
  return fileContent
    .split("\n")
    .slice(0, numberOfLines)
    .join("\n");
};

const getLastNLines = function(fileContent, numberOfLines) {
  if (isZero(numberOfLines)) {
    return "";
  }
  return fileContent
    .split("\n")
    .slice(-Math.abs(numberOfLines))
    .join("\n");
};

const getFirstNCharacters = function(fileContent, noOfBytes) {
  return fileContent
    .split("")
    .slice(0, noOfBytes)
    .join("");
};

const getLastNCharacters = function(fileContent, noOfBytes) {
  if (isZero(noOfBytes)) {
    return "";
  }
  return fileContent
    .split("")
    .slice(-Math.abs(noOfBytes))
    .join("");
};

module.exports = {
  getFirstNCharacters,
  getFirstNLines,
  getLastNCharacters,
  getLastNLines
};
