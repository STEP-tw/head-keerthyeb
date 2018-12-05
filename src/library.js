const extractFileContent = function(fileContent, noOfLines = 10 , option = "n"){
  const options = { "n" : extractLines}
  return  options[option](fileContent,noOfLines);
}

const extractLines = function(fileContent,noOfLines){
  return fileContent.split("\n").slice(0,noOfLines).join("\n");
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
  classifyInputs
};

