const { isNatural } = require("./util.js");
const {
  handleHeadError,
  handleTailError,
  displayFileNotFoundError,
  isFileExist,
  isSingleFile
} = require("./handleException.js");
const { getParameters, classifyInputs } = require("./handleInput.js");

const head = function(fs, commandArguments) {
  let headMethods = {
    errorHandler: handleHeadError,
    contentExtractor: extractFileContent,
    type: "head"
  };
  return runCommand(fs, commandArguments, headMethods);
};

const tail = function(fs, commandArguments) {
  let tailMethods = {
    errorHandler: handleTailError,
    contentExtractor: extractFileContentForTail,
    type: "tail"
  };
  return runCommand(fs, commandArguments, tailMethods);
};

const runCommand = function(fs, commandArguments, commandOperation) {
  let { option, numberOfLines, files } = classifyInputs(commandArguments);
  let errorMessage = commandOperation.errorHandler(numberOfLines, option, files, fs);
  if (errorMessage) {
    return errorMessage;
  }
  let fileContents = files.map(file => readFile(fs, file));
  let extractedContent = fileContents.map(fileContent =>
    commandOperation.contentExtractor(fileContent, numberOfLines, option)
  );
  return getFormattedContent(files, extractedContent, fs, commandOperation.type);
};

const getFormattedContent = function(files, extractedContent, fs, type) {
  if (isSingleFile(files)) {
    return extractedContent.join("");
  }
  let filesExistStatus = files.map(file => isFileExist(fs, file));
  let contents = zipFileNameWithFileContent(
    files,
    extractedContent,
    filesExistStatus,
    type
  ).join("\n");
  let startIndex = 0;
  let lastIndex = contents.lastIndexOf("\n");
  return contents.substring(startIndex, lastIndex);
};

const extractFileContent = function(fileContent, numberOfLines = 10, option = "n") {
  const options = { n: extractLines, c: extractBytes };
  return options[option](fileContent, numberOfLines);
};

const extractFileContentForTail = function(
  fileContent,
  numberOfLines = 10,
  option = "n"
) {
  const options = { n: selectLastLines, c: selectLastBytes };
  return options[option](fileContent, numberOfLines);
};

const zipFileNameWithFileContent = function(
  files,
  fileContents,
  filesExistStatus,
  type
) {
  return files.map(function(file, index) {
    if (!filesExistStatus[index]) {
      return displayFileNotFoundError(type, file)+'\n';
    }
    return createFileHeading(file) + fileContents[index] + "\n";
  });
};

const createFileHeading = function(file) {
  return "==> " + file + " <==\n";
};

const extractLines = function(fileContent, numberOfLines) {
  return fileContent
    .split("\n")
    .slice(0, numberOfLines)
    .join("\n");
};

const selectLastLines = function(fileContent, numberOfLines) {
  return fileContent
    .split("\n")
    .reverse()
    .slice(0, numberOfLines)
    .reverse()
    .join("\n");
};

const extractBytes = function(fileContent, noOfBytes) {
  return fileContent
    .split("")
    .slice(0, noOfBytes)
    .join("");
};

const selectLastBytes = function(fileContent, noOfBytes) {
  return fileContent
    .split("")
    .reverse()
    .slice(0, noOfBytes)
    .reverse()
    .join("");
};

const readFile = function(fs, file) {
  if (!isFileExist(fs, file)) {
    return "";
  }
  return fs.readFileSync(file, "UTF8");
};

module.exports = {
  extractFileContent,
  extractLines,
  readFile,
  extractBytes,
  tail,
  extractFileContentForTail,
  getFormattedContent,
  selectLastBytes,
  selectLastLines,
  head,
  createFileHeading,
  zipFileNameWithFileContent
};
