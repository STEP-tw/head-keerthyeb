const {
  getHeadLines,
  getTailLines,
  getLastNCharacters,
  getFirstNCharacters
} = require("./util/string.js");

const {
  displayFileNotFoundError,
  handleError,
  isFileExist,
  isSingleFile
} = require("./handleException.js");

const { classifyInputs } = require("./handleInput.js");

const head = function(commandArguments, fs) {
  return runCommand(fs, commandArguments, "head");
};

const tail = function(commandArguments, fs) {
  return runCommand(fs, commandArguments, "tail");
};

const runCommand = function(fs, commandArguments, command) {
  let { option, numberOfLines, files } = classifyInputs(commandArguments);
  let errorMessage = handleError(numberOfLines, option, files, command, fs);
  if (errorMessage) {
    return errorMessage;
  }
  let fileDetails = files.map(file => getFileDetails(fs, file));
  fileDetails = fileDetails.map(fileDetail => {
    let content = extractFileContent(
      command,
      fileDetail.content,
      numberOfLines,
      option
    );
    let formatedDetails = {
      file: fileDetail.file,
      content,
      isExist: fileDetail.isExist
    };
    return formatedDetails;
  });
  return getFormattedContent(fileDetails, command).join("\n");
};

const getFormattedContent = function(fileDetails, type) {
  return fileDetails.map(function(fileDetail) {
    if (fileDetail.isExist) {
      if (isSingleFile(fileDetails)) {
        return fileDetail.content;
      }
      return formatText(fileDetail.file) + fileDetail.content + "\n";
    }
    return displayFileNotFoundError(type, fileDetail.file) + "\n";
  });
};

const extractFileContent = function(
  command,
  fileContent,
  count = 10,
  option = "n"
) {
  let commands = {
    head: { n: getHeadLines, c: getFirstNCharacters },
    tail: { n: getTailLines, c: getLastNCharacters }
  };
  return commands[command][option](fileContent, count);
};

const formatText = function(file) {
  return "==> " + file + " <==\n";
};

const getFileDetails = function(fs, file) {
  let fileDetails = {
    file: file,
    content: readFile(fs, file),
    isExist: true
  };
  if (!isFileExist(fs, file)) {
    fileDetails.isExist = false;
  }
  return fileDetails;
};

const readFile = function(fs, file) {
  if (!isFileExist(fs, file)) {
    return "";
  }
  return fs.readFileSync(file, "UTF8");
};

module.exports = {
  extractFileContent,
  readFile,
  tail,
  getFormattedContent,
  head,
  formatText
};
