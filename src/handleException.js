const { isNaturalNumber, isInteger } = require("./util/numbers.js");

const handleError = function(count, option, command) {
  let isValidCount = {
    head: isNaturalNumber,
    tail: isInteger
  };
  if (!isValidOption(option)) {
    return displayIllegalOptionError(command, option);
  }

  if (!isValidCount[command](count)) {
    return diplayIllegalCountError(command, count, option);
  }

  return "";
};

const isValidOption = function(option) {
  return option == "n" || option == "c";
};

const isSingleFile = function(files) {
  return files.length == 1;
};

const isFileExist = function(fs, file) {
  return fs.existsSync(file);
};

const displayFileNotFoundError = function(command, fileName) {
  return command + ": " + fileName + ": No such file or directory";
};

const displayIllegalOptionError = function(command, option) {
  let usage = {
    head: "usage: head [-n lines | -c bytes] [file ...]",
    tail: "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  };
  let illegalOption = command + ": illegal option -- " + option;
  return illegalOption + "\n" + usage[command];
};

const diplayIllegalCountError = function(command, count, option) {
  let options = {
    n: "line",
    c: "byte"
  };
  let error = {
    head: `head: illegal ${options[option]} count -- `,
    tail: "tail: illegal offset -- "
  };
  return error[command] + count;
};

module.exports = {
  handleError,
  isSingleFile,
  isFileExist,
  displayFileNotFoundError,
  diplayIllegalCountError,
  displayIllegalOptionError,
  isValidOption
};
