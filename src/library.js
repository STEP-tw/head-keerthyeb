const {isNatural} = require('./util.js');
const {
  handleHeadException,
  handleTailException,
  isFileExist,
  isSingleFile,
} = require('./handleException.js');
const {getParameters, classifyInputs} = require('./handleInput.js');

const head = function(fs, args) {
  let {option, noOfLines, files} = classifyInputs(args);
  let exception = handleHeadException(noOfLines, option, files, fs);
  if (exception) {
    return exception;
  }
  let fileContents = files.map(file => readFile(fs, file));
  let extractedContent = fileContents.map(fileContent =>
    extractFileContent(fileContent, noOfLines, option),
  );
  return handleOutput(files, extractedContent, fs);
};

const tail = function(fs, args) {
  let {option, noOfLines, files} = classifyInputs(args);
  let exception = handleTailException(noOfLines, option, files, fs);
  if (exception) {
    return exception;
  }
  let fileContents = files.map(file => readFile(fs, file));
  let extractedContent = fileContents.map(fileContent =>
    extractFileContentForTail(fileContent, noOfLines, option),
  );
  return handleOutput(files, extractedContent, fs, 'tail');
};

const handleOutput = function(files, extractedContent, fs, type = 'head') {
  if (isSingleFile(files)) {
    return extractedContent.join('');
  }
  let filesExistStatus = files.map(file => isFileExist(fs, file));
  let contents = zipFileNameWithFileContent(
    files,
    extractedContent,
    filesExistStatus,
    type,
  ).join('\n');
  let startIndex = 0;
  let lastIndex = contents.lastIndexOf('\n');
  return contents.substring(startIndex, lastIndex);
};

const extractFileContent = function(fileContent, noOfLines = 10, option = 'n') {
  const options = {n: extractLines, c: extractBytes};
  return options[option](fileContent, noOfLines);
};

const extractFileContentForTail = function(
  fileContent,
  noOfLines = 10,
  option = 'n',
) {
  const options = {n: selectLastLines, c: selectLastBytes};
  return options[option](fileContent, noOfLines);
};

const zipFileNameWithFileContent = function(
  files,
  fileContents,
  filesExistStatus,
  type,
) {
  return files.map(function(file, index) {
    if (!filesExistStatus[index]) {
      return type + ': ' + file + ': No such file or directory\n';
    }
    return createHead(file) + fileContents[index] + '\n';
  });
};

const createHead = function(file) {
  return '==> ' + file + ' <==\n';
};

const extractLines = function(fileContent, noOfLines) {
  return fileContent
    .split('\n')
    .slice(0, noOfLines)
    .join('\n');
};

const selectLastLines = function(fileContent, noOfLines) {
  return fileContent
    .split('\n')
    .reverse()
    .slice(0, noOfLines)
    .reverse()
    .join('\n');
};

const extractBytes = function(fileContent, noOfBytes) {
  return fileContent
    .split('')
    .slice(0, noOfBytes)
    .join('');
};

const selectLastBytes = function(fileContent, noOfBytes) {
  return fileContent
    .split('')
    .reverse()
    .slice(0, noOfBytes)
    .reverse()
    .join('');
};

const readFile = function(fs, file) {
  if (!isFileExist(fs, file)) {
    return '';
  }
  return fs.readFileSync(file, 'UTF8');
};

module.exports = {
  extractFileContent,
  extractLines,
  readFile,
  extractBytes,
  tail,
  handleOutput,
  handleOutput,
  extractFileContentForTail,
  selectLastBytes,
  selectLastLines,
  head,
  createHead,
  zipFileNameWithFileContent,
};
