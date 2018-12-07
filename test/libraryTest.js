const deepEqual = require("assert").deepEqual;
const { extractFileContent,
  extractLines,
  extractBytes,
  head,
  handleException,
  zipFileNameWithFileContent,
  createHead,
  classifyInputs
} = require("../src/library.js");

describe("Test for extractLines" , function(){
  it("should return nothing for an empty string" , function(){
    let empty = "";
    deepEqual(extractLines(empty,0),"");
    deepEqual(extractLines(empty,1),"");
  });

  it("should return given number of lines from a given text", function(){
    let names = "keerthy\namju\nmoothu";
    deepEqual(extractLines(names,0),"");
    deepEqual(extractLines(names,2),"keerthy\namju");
    deepEqual(extractLines(names,4),"keerthy\namju\nmoothu");
  });
});

describe("Test for extractBytes" , function(){
  it("should return nothing for an empty string" , function(){
    let empty = "";
    deepEqual(extractBytes(empty,0),"");
    deepEqual(extractBytes(empty,1),"");
  });

  it("should return given number of bytes from a given text", function(){
    let names = "keerthy\namju\nmoothu";
    deepEqual(extractBytes(names,0),"");
    deepEqual(extractBytes(names,2),"ke");
  });
});

describe("Test for extractFileContent" , function(){

  describe(" Test for default option -n and default noOfLines 10" , function(){
    it("should return the first 10 lines of the given text",function(){
      let names = "keerthy\namju";
      let empty = "";
      deepEqual(extractFileContent(empty),"");
      deepEqual(extractFileContent(names),"keerthy\namju");
    });
  });

});

describe("classifyInputs", function() {

  describe("passing only file names",function(){

    it("should return an object with noOfLines as 10 and file name in files array while passing file name as input",function(){
      deepEqual(classifyInputs(["file.txt"]),{option : "n", noOfLines : 10 , files : ["file.txt"]});
    });

    it("should return an object with noOfLines as 10 and file names in files array while passing file names as input",function(){
      deepEqual(classifyInputs(["file.txt","file2.txt"]),{option : "n", noOfLines : 10 , files : ["file.txt","file2.txt"]})
    })

  });

  it('should return an object with option n and noOfLines, file in files array while passing the noOfLines & file as input', () => {
    deepEqual(classifyInputs(['-5', 'file.txt']), { option: 'n', noOfLines: 5, files: ['file.txt'] });
    deepEqual(classifyInputs(['-10', 'file.txt', 'file2.txt', 'file3.txt']), { option: 'n', noOfLines: 10, files: ['file.txt', 'file2.txt', 'file3.txt'] });
  });

  it('should return an object of option, noOfLines and files when all three arguments are passed', function(){
    deepEqual(classifyInputs(['-n1','file.txt']), { option: 'n', noOfLines: 1, files: ['file.txt'] });
    deepEqual(classifyInputs(['-n','10', 'file.txt']), { option: 'n', noOfLines: 10, files: ['file.txt'] });
    deepEqual(classifyInputs(['-n','-1', 'file.txt', 'file2.txt']), { option: 'n', noOfLines: -1, files: ['file.txt', 'file2.txt']});
  });

  it('should return an object of option c and noOfLines of givrn balue for passing input',function(){
    deepEqual(classifyInputs(['-c1','file.txt', 'file2.txt']), { option: 'c', noOfLines: 1, files: ['file.txt', 'file2.txt'] });
    deepEqual(classifyInputs(['-c','1','file.txt']), { option: 'c', noOfLines: 1, files: ['file.txt'] });
    deepEqual(classifyInputs(['-c','1','file.txt', 'file2.txt']), { option: 'c', noOfLines: 1, files: ['file.txt', 'file2.txt'] });
  });
});

describe("Test for zipFileNameWithFileContent" , function(){
  it("should return an empty array for 2 empty array " , function(){
    deepEqual(zipFileNameWithFileContent([],[],[]),[]);
  }); 

  it("should return an empty array if first array is empty " , function(){
    deepEqual(zipFileNameWithFileContent([],[1],[]),[]);
    deepEqual(zipFileNameWithFileContent([],["cat"],[]),[]);
  });

  it("should return an array which contain heading and contents if two arrays are non-empty " , function(){
    deepEqual(zipFileNameWithFileContent(["animal"],["cat"],[true]),[ '==> animal <==\ncat\n' ]);
    deepEqual(zipFileNameWithFileContent(["animal","birds"],["cat","hen"],[true,true]),[ '==> animal <==\ncat\n', '==> birds <==\nhen\n' ]);
  });

});

describe("Test for createHead" , function(){
  it("should return an heading like ==> heading <==\n when any text is given" , function(){
    deepEqual(createHead(""),'==>  <==\n');
    deepEqual(createHead("1"),'==> 1 <==\n');
    deepEqual(createHead("keerthy"),'==> keerthy <==\n');
  });
});

describe("Test for handleException" , function(){
  it("should return empty if all arguments are valid " , function(){
    let fs = { existsSync : function(file){ return true }};
    deepEqual(handleException(2,"n",["file1","file2"],fs),"");
    deepEqual(handleException(2,"c",["file"],fs),"");
  }); 

  it("should return illegal option message for illegal option " , function(){
    let fs = { existsSync : function(file){ return true }};
    let illegalOption = "head: illegal option -- ";
    let usage = "usage: head [-n lines | -c bytes] [file ...]";
    deepEqual(handleException(2,"-p",["file1","file2"],fs), illegalOption + "-p\n" + usage );
  });

  it("should return illegal byte count message for illegal count and option 'c' " , function(){
    let fs = { existsSync : function(file){ return true }};
    let illegalCountMsg = "head: illegal byte count -- " 
    deepEqual(handleException(-2,"c",["file1","file2"],fs), illegalCountMsg + "-2");
  });

  it("should return illegal line count message for illegal count and option 'n' " , function(){
    let fs = { existsSync : function(file){ return true }};
    let illegalCountMsg = "head: illegal line count -- "
    deepEqual(handleException(-2,"n",["file1","file2"],fs), illegalCountMsg + "-2");
  });

  it("should return error msg if the file not exist " , function(){
    let fs = { existsSync : function(file){ return false }};
    let error =  "head: file1: No such file or directory";
    deepEqual(handleException(2,"n",["file1"],fs), error);
  });

});

describe("Test for head function" , function(){
  it("should return first 10 lines of the text if only file name is given " , function(){
    let names = "keerthy\namju\nmoothu";
    let fs = { readFileSync : function(file){ return file;} , existsSync : function(file){ return true }};
    deepEqual(head(fs,[names]),names);
  });

  it("should return first given number of lines of the text if file name and no of lines are given " , function(){
    let names = "keerthy\namju\nmoothu";
    let fs = { readFileSync : function(file){ return file;} , existsSync : function(file){ return true }};
    deepEqual(head(fs,["-5",names]),names);
    deepEqual(head(fs,["-1",names]),"keerthy");
  });

  it("should return first given number of lines of the text if file name, no of lines and option 'n' are given " , function(){
    let names = "keerthy\namju\nmoothu";
    let fs = { readFileSync : function(file){ return file;} , existsSync : function(file){ return true }};
    deepEqual(head(fs,["-n1", names]),"keerthy");
    deepEqual(head(fs,["-n5", names]),names);
    deepEqual(head(fs,["-n", 1, names]),"keerthy");
    deepEqual(head(fs,["-n", 5, names]),names);
  });

  it("should return first given number of characters " , function(){
    let names = "keerthy\namju\nmoothu";
    let fs = { readFileSync : function(file){ return file;} , existsSync : function(file){ return true }};
    deepEqual(head(fs,["-c1", names]),"k");
    deepEqual(head(fs,["-c", 1, names]),"k");
    deepEqual(head(fs,["-c", 9, names]),"keerthy\na");
    deepEqual(head(fs,["-c9", names]),"keerthy\na");
  });

  it("should return first 10 lines of the 2 strings " , function(){
    let names = "keerthy\namju\nmoothu\n";
    let fs = { readFileSync : function(file){ return names;} , existsSync : function(file){ return true }};
    deepEqual(head(fs,["names","names"]),"==> names <==\n"+ names + "\n\n==> names <==\n"+names);
  });

  it("should return first given number of lines of the 2 strings " , function(){
    let names = "keerthy\namju\nmoothu\n";
    let fs = { readFileSync : function(file){ return names;} , existsSync : function(file){ return true }};
    deepEqual(head(fs,["-n",5,"names","names"]),"==> names <==\n"+ names + "\n\n==> names <==\n"+names);
    deepEqual(head(fs,["-n5","names","names"]),"==> names <==\n"+ names + "\n\n==> names <==\n"+names);
    deepEqual(head(fs,["-5","names","names"]),"==> names <==\n"+ names + "\n\n==> names <==\n"+names);
  });

   it("should return first given number of characters of the 2 strings " , function(){
    let names = "keerthy\namju\nmoothu\n";
    let fs = { readFileSync : function(file){ return names;} , existsSync : function(file){ return true }};
    deepEqual(head(fs,["-c",5,"names","names"]),"==> names <==\nkeert" + "\n\n==> names <==\nkeert");
    deepEqual(head(fs,["-c5","names","names"]),"==> names <==\nkeert" + "\n\n==> names <==\nkeert");
  });

  it("should return error message if file is not exist " , function(){
    let fs = { readFileSync : function(file){ return names;} , existsSync : function(file){ return false }};
    deepEqual(head(fs,["names"]),"head: names: No such file or directory");
    deepEqual(head(fs,["-n5","names"]),"head: names: No such file or directory");
    deepEqual(head(fs,["-5","names"]),"head: names: No such file or directory");
    deepEqual(head(fs,["-n",5,"names"]),"head: names: No such file or directory");
    deepEqual(head(fs,["-c5","names"]),"head: names: No such file or directory");
    deepEqual(head(fs,["-c",5,"names"]),"head: names: No such file or directory");
  });

  it("should return error message for missing files" , function(){
    let fs = { readFileSync : function(file){ return names;} ,
               existsSync : function(file){ if(file == "names"){return true;} return false; }};
    let names = "keerthy\namju\nmoothu\n";
    deepEqual(head(fs,["names","animals"]),"==> names <==\n" + names + "\n\nhead: animals: No such file or directory");
    deepEqual(head(fs,["animals","names"]),"head: animals: No such file or directory\n\n==> names <==\n" + names );
    deepEqual(head(fs,["-n5","animals","names"]),"head: animals: No such file or directory\n\n==> names <==\n" + names );
    deepEqual(head(fs,["-n",5,"animals","names"]),"head: animals: No such file or directory\n\n==> names <==\n" + names );
    deepEqual(head(fs,["-5","animals","names"]),"head: animals: No such file or directory\n\n==> names <==\n" + names );
    deepEqual(head(fs,["names","animals","names"]),"==> names <==\n" + names + "\n\nhead: animals: No such file or directory\n\n==> names <==\n" + names);
   });

});
