const { isNaturalNumber } = require("./util/numbers.js");

const getParameters = function(args) {
  let firstArg = args[0];
  if (isNaturalNumber(firstArg[1])) {
    return {
      option: "n",
      numberOfLines: firstArg.slice(1),
      fileNames: args.slice(1)
    };
  }

  if (isOptionOnly(firstArg)) {
    return {
      option: firstArg[1],
      numberOfLines: args[1],
      fileNames: args.slice(2)
    };
  }
  return {
    option: firstArg[1],
    numberOfLines: firstArg.slice(2),
    fileNames: args.slice(1)
  };
};

const classifyInputs = function(args) {
  if (args[0].includes("-")) {
    return getParameters(args);
  }

  return { option: "n", numberOfLines: 10, fileNames: args };
};

const isOptionOnly = function(arg) {
  return arg.length == 2 && isNaN(arg);
};

module.exports = { getParameters, classifyInputs, isOptionOnly };
