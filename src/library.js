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

const head = function(fs, commandArguments) {
  let headMethods = {
    contentExtractor: extractFileContent,
    type: "head"
  };
  return runCommand(fs, commandArguments, headMethods);
};

const tail = function(fs, commandArguments) {
  let tailMethods = {
    contentExtractor: extractFileContentForTail,
    type: "tail"
  };
  return runCommand(fs, commandArguments, tailMethods);
};

const runCommand = function(fs, commandArguments, commandOperation) {
  let { option, numberOfLines, files } = classifyInputs(commandArguments);
  let errorMessage = handleError(
    numberOfLines,
    option,
    files,
    commandOperation.type,
    fs
  );
  if (errorMessage) {
    return errorMessage;
  }
  let fileContents = files.map(file => readFile(fs, file));
  let extractedContent = fileContents.map(fileContent =>
    commandOperation.contentExtractor(fileContent, numberOfLines, option)
  );
  return getFormattedContent(
    files,
    extractedContent,
    fs,
    commandOperation.type
  );
};

const getFormattedContent = function(files, extractedContent, fs, type) {
  if (isSingleFile(files)) {
    return extractedContent.join("");
  }
  let filesExistStatus = files.map(file => isFileExist(fs, file));
  let contents = insertHeader(
    files,
    extractedContent,
    filesExistStatus,
    type
  ).join("\n");
  let startIndex = 0;
  let lastIndex = contents.lastIndexOf("\n");
  return contents.substring(startIndex, lastIndex);
};

const extractFileContent = function(
  fileContent,
  numberOfLines = 10,
  option = "n"
) {
  const options = { n: getHeadLines, c: getFirstNCharacters };
  return options[option](fileContent, numberOfLines);
};

const extractFileContentForTail = function(
  fileContent,
  numberOfLines = 10,
  option = "n"
) {
  const options = { n: getTailLines, c: getLastNCharacters };
  return options[option](fileContent, numberOfLines);
};

const insertHeader = function(files, fileContents, filesExistStatus, type) {
  return files.map(function(file, index) {
    if (!filesExistStatus[index]) {
      return displayFileNotFoundError(type, file) + "\n";
    }
    return formatText(file) + fileContents[index] + "\n";
  });
};

const formatText = function(file) {
  return "==> " + file + " <==\n";
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
  extractFileContentForTail,
  getFormattedContent,
  head,
  formatText,
  insertHeader
};
