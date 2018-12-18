const { isNatural } = require("./util/numbers.js");

const handleHeadError = function(count, option, files, fs) {
  if (!isValidOption(option)) {
    return displayIllegalOptionError("head", option);
  }
  if (!isNatural(count)) {
    return diplayIllegalCountError("head", count, option);
  }
  if (isSingleFile(files) && !isFileExist(fs, files[0])) {
    return displayFileNotFoundError("head", files[0]);
  }
  return "";
};

const handleTailError = function(count, option, files, fs) {
  if (!isValidOption(option)) {
    return displayIllegalOptionError("tail", option);
  }
  if (isNaN(count)) {
    return diplayIllegalCountError("tail", count, option);
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
    head: "head: illegal " + options[option] + " count -- ",
    tail: "tail: illegal offset -- "
  };
  return error[command] + count;
};

module.exports = {
  handleHeadError,
  handleTailError,
  isSingleFile,
  isFileExist,
  displayFileNotFoundError,
  diplayIllegalCountError,
  displayIllegalOptionError,
  isValidOption
};
