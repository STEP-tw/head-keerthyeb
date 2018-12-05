const deepEqual = require("assert").deepEqual;
const { extractFileContent,
  extractLines,
  extractBytes,
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

describe('classifyInputs',function(){
    it('should return an object with  option,noOfLines and files ',function(){
    deepEqual(classifyInputs(["file1"]),{ option: 'n', noOfLines: 10, fileNames: [ 'file1' ] })
    deepEqual(classifyInputs(["-n5","file1"]),{ option: 'n', noOfLines: 5, fileNames: [ 'file1' ] })
    deepEqual(classifyInputs(["-n","5","file1"]),{ option: 'n', noOfLines: 5, fileNames: [ 'file1' ] })
    deepEqual(classifyInputs(["-5","file1"]),{ option: 'n', noOfLines: 5, fileNames: [ 'file1' ] })
    deepEqual(classifyInputs(["file1","file2"]),{ option: 'n', noOfLines: 10, fileNames: [ 'file1', 'file2' ] })
    deepEqual(classifyInputs(["-n","5","file1","file2"]),{ option: 'n', noOfLines: 5, fileNames: [ 'file1','file2' ] })
    deepEqual(classifyInputs(["-n5","file1","file2"]),{ option: 'n', noOfLines: 5, fileNames: [ 'file1', 'file2' ] })
    deepEqual(classifyInputs(["-5","file1","file2"]),{ option: 'n', noOfLines: 5, fileNames: [ 'file1', 'file2' ] })
    deepEqual(classifyInputs(["-c5","file1"]),{ option: 'c', noOfLines: 5, fileNames: [ 'file1' ] })
    deepEqual(classifyInputs(["-c","5","file1"]),{ option: 'c', noOfLines: 5, fileNames: [ 'file1' ] })
    deepEqual(classifyInputs(["-c5","file1","file2"]),{ option: 'c', noOfLines: 5, fileNames: [ 'file1', 'file2' ] })
    deepEqual(classifyInputs(["-c","5","file1","file2"]),{ option: 'c', noOfLines: 5, fileNames: [ 'file1', 'file2' ] })
   });
});

describe("Test for zipFileNameWithFileContent" , function(){
  it("should return an empty array for 2 empty array " , function(){
    deepEqual(zipFileNameWithFileContent([],[]),[]);
  }); 

  it("should return an empty array if first array is empty " , function(){
    deepEqual(zipFileNameWithFileContent([],[1]),[]);
    deepEqual(zipFileNameWithFileContent([],["cat"]),[]);
  });
  
  it("should return an array which contain heading and contents if two arrays are non-empty " , function(){
    deepEqual(zipFileNameWithFileContent(["animal"],["cat"]),[ '==> animal <==\ncat' ]);
    deepEqual(zipFileNameWithFileContent(["animal","birds"],["cat","hen"]),[ '==> animal <==\ncat', '==> birds <==\nhen' ]);
  });


});


describe("Test for createHead" , function(){
  it("should return an heading like ==> heading <==\n when any text is given" , function(){
    deepEqual(createHead(""),'==>  <==\n');
    deepEqual(createHead("1"),'==> 1 <==\n');
    deepEqual(createHead("keerthy"),'==> keerthy <==\n');
  });
});

