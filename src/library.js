const extractFileContent = function(fileContent, noOfLines = 10 , option = "-n"){
  const options = { "-n" : extractLines}
  return  options[option](fileContent,noOfLines);
}

const extractLines = function(fileContent,noOfLines){
  return fileContent.split("\n").slice(0,noOfLines).join("\n");
}

module.exports = { extractFileContent , extractLines };

