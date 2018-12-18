const { isNatural } = require("./util/numbers.js");

const handleHeadError = function(noOfLines, option, files, fs) {
  let illegalOption = "head: illegal option -- " + option;
  let usage = "usage: head [-n lines | -c bytes] [file ...]";
  let illegalCount = {
    n: "head: illegal line count -- " + noOfLines,
    c: "head: illegal byte count -- " + noOfLines
  };

  if (!isValidOption(option)) {
    return illegalOption + "\n" + usage;
  }
  if (!isNatural(noOfLines)) {
    return illegalCount[option];
  }
  if (isSingleFile(files) && !isFileExist(fs, files[0])) {
    return displayFileNotFoundError("head", files[0]);
  }
  return "";
};

const handleTailError = function(noOfLines, option, files, fs) {
  let illegalOption = "tail: illegal option -- " + option;
  let usage = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
  let illegalCount = "tail: illegal offset -- " + noOfLines;

  if (!isValidOption(option)) {
    return illegalOption + "\n" + usage;
  }
  if (isNaN(noOfLines)) {
    return illegalCount;
  }
  if (isSingleFile(files) && !isFileExist(fs, files[0])) {
    return displayFileNotFoundError("tail", files[0]);
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

const displayFileNotFoundError = function(option, fileName) {
  return option + ": " + fileName + ": No such file or directory";
};

module.exports = {
  handleHeadError,
  handleTailError,
  isSingleFile,
  isFileExist,
  displayFileNotFoundError,
  isValidOption
};
