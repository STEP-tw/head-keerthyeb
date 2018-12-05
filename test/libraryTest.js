const deepEqual = require("assert").deepEqual;
const { extractFileContent , extractLines } = require("../src/library.js");

describe("Test for extractLines" , function(){
  it("should return nothing for empty string" , function(){
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


