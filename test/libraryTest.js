const deepEqual = require("assert").deepEqual;
const { extractFilecontent , extractLines } = require("../src/library.js");

describe("Test for extractLines" , function(){
  it("should return nothing for empty file" , function(){
    let empty = "";
    deepEqual(extractLines(empty,0),"");
    deepEqual(extractLines(empty,1),"");
  });

  it("should return  given number of line from an file", function(){
    let names = "keerthy\namju\nmoothu";
    deepEqual(extractLines(names,0),"");
    deepEqual(extractLines(names,2),"keerthy\namju");
    deepEqual(extractLines(names,4),"keerthy\namju\nmoothu");
  });
});

describe("Test for extractFilecontent" , function(){

  describe(" Test for default option -n and default noOfLines 10" , function(){
    it("should return the first 10 lines of the given file",function(){
      let names = "keerthy\namju";
      let empty = "";
      deepEqual(extractFilecontent(empty),"");
      deepEqual(extractFilecontent(names),"keerthy\namju");
    });
  });

});


