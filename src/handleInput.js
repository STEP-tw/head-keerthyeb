const {isNatural} = require('./util.js');

const getParameters = function(args) {
  if (isNatural(args[0][1])) {
    return {option: 'n', noOfLines: args[0].slice(1), files: args.slice(1)};
  }

  if (args[0].length == 2 && isNaN(args[0][1])) {
    return {option: args[0][1], noOfLines: args[1], files: args.slice(2)};
  }
  return {
    option: args[0][1],
    noOfLines: args[0].slice(2),
    files: args.slice(1),
  };
};

const classifyInputs = function(args) {
  if (args[0].includes('-')) {
    return getParameters(args);
  }

  return {option: 'n', noOfLines: 10, files: args};
};

module.exports = {getParameters, classifyInputs};
