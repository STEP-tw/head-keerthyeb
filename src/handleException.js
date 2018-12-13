const { isNatural } = require("./util.js");

const handleHeadException = function(noOfLines, option, files, fs) {
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
    return "head: " + files[0] + ": No such file or directory";
  }
  return "";
};

const handleTailException = function(noOfLines, option, files, fs) {
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
    return "tail: " + files[0] + ": No such file or directory";
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

module.exports = {
  handleHeadException,
  handleTailException,
  isSingleFile,
  isFileExist,
  isValidOption
};
