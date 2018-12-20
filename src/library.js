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
  let { option, numberOfLines, fileNames } = classifyInputs(commandArguments);
  let errorMessage = handleError(numberOfLines, option, command);
  if (errorMessage) {
    return errorMessage;
  }
  let fileDetails = fileNames.map(fileName => getFileDetails(fs, fileName));
  fileDetails = fileDetails.map(fileDetail => {
    let content = extractFileContent(
      command,
      fileDetail.content,
      numberOfLines,
      option
    );
    let formatedDetails = {
      fileName: fileDetail.fileName,
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
      return formatText(fileDetail.fileName) + fileDetail.content + "\n";
    }
    return displayFileNotFoundError(type, fileDetail.fileName) + "\n";
  });
};

const extractFileContent = function(
  command,
  fileContent,
  count = 10,
  option = "n"
) {
  const delimiter = { c: "", n: "\n" };
  const rangeBound = { head: [0, count], tail: [-count] };
  return fileContent
    .split(delimiter[option])
    .slice(rangeBound[command][0], rangeBound[command][1])
    .join(delimiter[option]);
};

const formatText = function(fileName) {
  return "==> " + fileName + " <==\n";
};

const getFileDetails = function(fs, fileName) {
  let fileDetails = {
    fileName: fileName,
    content: readFileContent(fs, fileName),
    isExist: true
  };
  if (!isFileExist(fs, fileName)) {
    fileDetails.isExist = false;
  }
  return fileDetails;
};

const readFileContent = function(fs, fileName) {
  if (!isFileExist(fs, fileName)) {
    return "";
  }
  return fs.readFileSync(fileName, "UTF8");
};

module.exports = {
  extractFileContent,
  tail,
  getFormattedContent,
  head,
  formatText
};
