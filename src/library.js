const { isNatural } = require("./util.js");
const {
  handleHeadError,
  handleTailError,
  isFileExist,
  isSingleFile
} = require("./handleException.js");
const { getParameters, classifyInputs } = require("./handleInput.js");

const head = function(fs, args) {
  let headMethods = {
    exceptionHandler: handleHeadError,
    extractor: extractFileContent,
    type: "head"
  };
  return runCommand(fs, args, headMethods);
};

const tail = function(fs, args) {
  let tailMethods = {
    exceptionHandler: handleTailError,
    extractor: extractFileContentForTail,
    type: "tail"
  };
  return runCommand(fs, args, tailMethods);
};

const runCommand = function(fs, args, filterer) {
  let { option, numberOfLines, files } = classifyInputs(args);
  let exception = filterer.exceptionHandler(numberOfLines, option, files, fs);
  if (exception) {
    return exception;
  }
  let fileContents = files.map(file => readFile(fs, file));
  let extractedContent = fileContents.map(fileContent =>
    filterer.extractor(fileContent, numberOfLines, option)
  );
  return getFormattedContent(files, extractedContent, fs, filterer.type);
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
      return type + ": " + file + ": No such file or directory\n";
    }
    return createHead(file) + fileContents[index] + "\n";
  });
};

const createHead = function(file) {
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
  createHead,
  zipFileNameWithFileContent
};
