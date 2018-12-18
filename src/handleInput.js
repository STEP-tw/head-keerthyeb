const { isNatural } = require("./util/numbers.js");

const getParameters = function(args) {
  if (isNatural(args[0][1])) {
    return {
      option: "n",
      numberOfLines: args[0].slice(1),
      files: args.slice(1)
    };
  }

  if (args[0].length == 2 && isNaN(args[0][1])) {
    return { option: args[0][1], numberOfLines: args[1], files: args.slice(2) };
  }
  return {
    option: args[0][1],
    numberOfLines: args[0].slice(2),
    files: args.slice(1)
  };
};

const classifyInputs = function(args) {
  if (args[0].includes("-")) {
    return getParameters(args);
  }

  return { option: "n", numberOfLines: 10, files: args };
};

module.exports = { getParameters, classifyInputs };
