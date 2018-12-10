const head = function(fs, args) {
  let {option, noOfLines, files} = classifyInputs(args);
  let exception = handleException(noOfLines, option, files, fs);
  if (exception) {
    return exception;
  }
  let fileContents = files.map(file => readFile(fs, file));
  let extractedContent = fileContents.map(fileContent =>
    extractFileContent(fileContent, noOfLines, option),
  );
  return handleOutput(files, extractedContent, fs);
};

const tail = function(fs,args){
    return 
   }
  
const handleOutput = function(files, extractedContent, fs) {
  if (isSingleFile(files)) {
    return extractedContent.join('');
  }
  let filesExistStatus = files.map(file => isFileExist(fs, file));
  let contents = zipFileNameWithFileContent(
    files,
    extractedContent,
    filesExistStatus,
  ).join('\n');
  let startIndex = 0;
  let lastIndex = contents.lastIndexOf('\n');
  return contents.substring(startIndex, lastIndex);
};

const isSingleFile = function(files) {
  return files.length == 1;
};

const extractFileContent = function(fileContent, noOfLines = 10, option = 'n') {
  const options = {n: extractLines, c: extractBytes};
  return options[option](fileContent, noOfLines);
};

const zipFileNameWithFileContent = function(
  files,
  fileContents,
  filesExistStatus,
) {
  return files.map(function(file, index) {
    if (!filesExistStatus[index]) {
      return 'head: ' + file + ': No such file or directory\n';
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

const extractBytes = function(fileContent, noOfBytes) {
  return fileContent
    .split('')
    .slice(0, noOfBytes)
    .join('');
};


const handleException = function(noOfLines, option, files, fs) {
  let illegalOption = 'head: illegal option -- ' + option;
  let usage = 'usage: head [-n lines | -c bytes] [file ...]';
  let illegalCount = {
    n: 'head: illegal line count -- ' + noOfLines,
    c: 'head: illegal byte count -- ' + noOfLines,
  };

  if (!isValidOption(option)) {
    return illegalOption + '\n' + usage;
  }
  if (!isNatural(noOfLines)) {
    return illegalCount[option];
  }
  if (isSingleFile(files) && !fs.existsSync(files[0])) {
    return 'head: ' + files[0] + ': No such file or directory';
  }
  return '';
};

const isValidOption = function(option) {
  return option == 'n' || option == 'c';
};

const isNatural = function(element) {
  return element > 0 && !isNaN(element);
};

const readFile = function(fs, file) {
  if (!isFileExist(fs, file)) {
    return '';
  }
  return fs.readFileSync(file, 'UTF8');
};

const isFileExist = function(fs, file) {
  return fs.existsSync(file);
};

const getParameters = function(args) {
  if (isNatural(args[0][1])) {
    return {option: 'n', noOfLines: args[0].slice(1), files: args.slice(1)};
  }

  if (args[0].length == 2 && isNaN(args[0][1])) {
    return {option: args[0][1], noOfLines: args[1], files: args.slice(2)};
  }
  return {
    option: args[0][1],
    noOfLines: args[0].slice(2),
    files: args.slice(1),
  };
};

const classifyInputs = function(args) {
  if (args[0].includes('-')) {
    return getParameters(args);
  }

  return {option: 'n', noOfLines: 10, files: args};
};

module.exports = {
  extractFileContent,
  extractLines,
  readFile,
  extractBytes,
  classifyInputs,
  handleException,
  head,
  isValidOption,
  isNatural,
  getParameters,
  createHead,
  tail,
  zipFileNameWithFileContent,
};
