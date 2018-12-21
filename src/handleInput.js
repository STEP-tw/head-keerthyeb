const { isInteger } = require("./util/numbers.js");

const getParameters = function(args) {
  let firstArg = args[0];
  let option = firstArg[1];
  let fileNames = args.slice(1);
  let numberOfLines = firstArg.slice(1);

  if (isInteger(firstArg[1])) {
    return createParameterObject("n", numberOfLines, fileNames);
  }

  if (isOptionOnly(firstArg)) {
    numberOfLines = args[1];
    fileNames = args.slice(2);
    return createParameterObject(option, numberOfLines, fileNames);
  }
  return createParameterObject(option, firstArg.slice(2), fileNames);
};

const createParameterObject = function(option, numberOfLines, fileNames) {
  return { option, numberOfLines, fileNames };
};

const classifyInputs = function(args) {
  if (args[0].startsWith("-")) {
    return getParameters(args);
  }
  return createParameterObject("n", 10, args);
};

const isOptionOnly = function(arg) {
  return arg.length == 2 && isNaN(arg);
};

module.exports = { getParameters, classifyInputs, isOptionOnly };
