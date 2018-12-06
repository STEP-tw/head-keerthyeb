const head = function(fs,args){
  let { option , noOfLines , files } = classifyInputs(args);
  let exception = handleException(noOfLines, option, files, fs);
  if(exception){
    return exception;
  }
  let fileContents = files.map(file => readFile(fs,file));
  let extractedContent = fileContents.map(fileContent => extractFileContent(fileContent, noOfLines, option));
  let filesExistStatus = files.map( file => isFileExist(fs,file));
  if(files.length == 1){
    return extractedContent.join("");
  }
  let contents = zipFileNameWithFileContent(files,extractedContent,filesExistStatus).join("\n");
  let startIndex = 0;
  let lastIndex = contents.lastIndexOf("\n");
  return contents.substring(startIndex,lastIndex);
}

const extractFileContent = function(fileContent, noOfLines = 10 ,option = "n"){
  const options = { "n" : extractLines , "c" : extractBytes }
  return  options[option](fileContent,noOfLines);
}

const zipFileNameWithFileContent = function(files,fileContents,filesExistStatus){
  let index = 0;
  return files.map( function(file){
    if(!(filesExistStatus[index])){
      index++;
      return "head: "+file+": No such file or directory\n";
    }
    return createHead(file)+fileContents[index++]+ "\n"
  });
}

const createHead = function(file){
  return "==> "+file+" <==\n";
}

const extractLines = function(fileContent,noOfLines){
  return fileContent.split("\n").slice(0,noOfLines).join("\n");
}

const extractBytes = function(fileContent,noOfBytes){
  return fileContent.split("").slice(0,noOfBytes).join("");
}

const handleException = function( noOfLines , option , files, fs){
  let illegalOption = "head: illegal option -- "+option;
  let usage = "usage: head [-n lines | -c bytes] [file ...]";
  let illegalCount = { "n" : "head: illegal line count -- " + noOfLines,
                       "c" : "head: illegal byte count -- " + noOfLines };

  if( option != "n" && option != "c"){
    return illegalOption + "\n" + usage;
  }
  if( noOfLines <= 0 || isNaN(noOfLines)){
    return illegalCount[option];
  }
  if(files.length == 1 && !(fs.existsSync(files[0]))){
    return "head: "+files[0]+": No such file or directory";
  }
  return "";
}

const readFile = function(fs,file){
  if(!isFileExist(fs,file)){
    return "";
  }
  return fs.readFileSync(file,"UTF8");
}

const isFileExist = function(fs,file){
  return fs.existsSync(file);
}

const classifyInputs = function(args){
  let inputs = { option : "n" , noOfLines : 10};
  let filesNameIndex  = 0;

  if(args[0].includes("-")){
    inputs = { option : args[0][1], noOfLines : args[0].slice(2)};
    filesNameIndex++;

    if(args[0][1].match(/[1-9]/)){
      inputs = { option : "n" , noOfLines : args[0].slice(1)};
    }

    if(args[0].length == 2 && isNaN(args[0][1])){
      inputs = { option : args[0][1] , noOfLines : args[1]};
      filesNameIndex++;
    }
  }

  inputs.files = args.slice(filesNameIndex);
  return inputs;
}

module.exports = { extractFileContent,
  extractLines,
  readFile,
  extractBytes,
  classifyInputs,
  handleException,
  head,
  createHead,
  zipFileNameWithFileContent
};

