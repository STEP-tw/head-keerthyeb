const head = function(fs,args){
  let { option , noOfLines , fileNames } = classifyInputs(args);
  let fileContents = fileNames.map(file => readFile(fs,file));
  let extractedContent = fileContents.map ( fileContent => extractFileContent(fileContent , noOfLines , option));
  if(fileNames.length == 1){
    return extractedContent.join("");
  }
  return zipFileNameWithFileContent(fileNames,extractedContent).join("\n");
}

const extractFileContent = function(fileContent, noOfLines = 10 ,option = "n"){
  const options = { "n" : extractLines , "c" : extractBytes }
  return  options[option](fileContent,noOfLines);
}

const zipFileNameWithFileContent = function(fileNames,fileContents){
  let index = 0;
  return fileNames.map( fileName => createHead(fileName)+fileContents[index++]);
}

const createHead = function(fileName){
  return "==> "+fileName+" <==\n";
}

const extractLines = function(fileContent,noOfLines){
  return fileContent.split("\n").slice(0,noOfLines).join("\n");
}

const extractBytes = function(fileContent,noOfBytes){
  return fileContent.split("").slice(0,noOfBytes).join("");
}

const readFile = function(fs,file){
  return fs.readFileSync(file,"UTF8");
}

const classifyInputs = function(args){
  let option = "n";
  let filesNameIndex  = 0;
  let noOfLines = 10;
  let firstArg = args[0];
  let secondArg = args[1];

  if(firstArg.includes("-")){
    option = firstArg[1];
    noOfLines = firstArg.slice(2);
    filesNameIndex++;
    if(firstArg[1].match(/[1-9]/)){
      noOfLines = firstArg.slice(1);
      option = "n";
    }
    if(firstArg.length == 2 && isNaN(firstArg[1])){
      noOfLines = secondArg;
      filesNameIndex++;
    }
  }
  fileNames = args.slice(filesNameIndex);
  return { option , noOfLines , fileNames};
}

module.exports = { extractFileContent,
  extractLines,
  readFile,
  extractBytes,
  classifyInputs,
  head,
  createHead,
  zipFileNameWithFileContent
};

