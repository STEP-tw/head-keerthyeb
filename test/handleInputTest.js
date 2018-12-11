const { deepEqual } = require("assert");
const { getParameters, classifyInputs } = require("../src/handleInput.js");

describe("getParameters", function() {
  it("should return an object with option n and noOfLines, file in files array ", () => {
    deepEqual(getParameters(["-5", "file.txt"]), {
      option: "n",
      noOfLines: 5,
      files: ["file.txt"]
    });
    deepEqual(getParameters(["-10", "file.txt", "file2.txt", "file3.txt"]), {
      option: "n",
      noOfLines: 10,
      files: ["file.txt", "file2.txt", "file3.txt"]
    });
  });

  it("should return an object of option, noOfLines and files ", function() {
    deepEqual(getParameters(["-n1", "file.txt"]), {
      option: "n",
      noOfLines: 1,
      files: ["file.txt"]
    });
    deepEqual(getParameters(["-n", "10", "file.txt"]), {
      option: "n",
      noOfLines: 10,
      files: ["file.txt"]
    });
    deepEqual(getParameters(["-n", "-1", "file.txt", "file2.txt"]), {
      option: "n",
      noOfLines: -1,
      files: ["file.txt", "file2.txt"]
    });
  });

  it("should return an object of option c and noOfLines of given value for passing input", function() {
    deepEqual(getParameters(["-c1", "file.txt", "file2.txt"]), {
      option: "c",
      noOfLines: 1,
      files: ["file.txt", "file2.txt"]
    });
    deepEqual(getParameters(["-c", "1", "file.txt"]), {
      option: "c",
      noOfLines: 1,
      files: ["file.txt"]
    });
    deepEqual(getParameters(["-c", "1", "file.txt", "file2.txt"]), {
      option: "c",
      noOfLines: 1,
      files: ["file.txt", "file2.txt"]
    });
  });
});

describe("classifyInputs", function() {
  describe("passing only file names", function() {
    it("should return an object with noOfLines as 10 and file name in files array while passing file name as input", function() {
      deepEqual(classifyInputs(["file.txt"]), {
        option: "n",
        noOfLines: 10,
        files: ["file.txt"]
      });
    });

    it("should return an object with noOfLines as 10 and file names in files array while passing file names as input", function() {
      deepEqual(classifyInputs(["file.txt", "file2.txt"]), {
        option: "n",
        noOfLines: 10,
        files: ["file.txt", "file2.txt"]
      });
    });
  });

  it("should return an object with option n and noOfLines, file in files array while passing the noOfLines & file as input", () => {
    deepEqual(classifyInputs(["-5", "file.txt"]), {
      option: "n",
      noOfLines: 5,
      files: ["file.txt"]
    });
    deepEqual(classifyInputs(["-10", "file.txt", "file2.txt", "file3.txt"]), {
      option: "n",
      noOfLines: 10,
      files: ["file.txt", "file2.txt", "file3.txt"]
    });
  });

  it("should return an object of option, noOfLines and files when all three arguments are passed", function() {
    deepEqual(classifyInputs(["-n1", "file.txt"]), {
      option: "n",
      noOfLines: 1,
      files: ["file.txt"]
    });
    deepEqual(classifyInputs(["-n", "10", "file.txt"]), {
      option: "n",
      noOfLines: 10,
      files: ["file.txt"]
    });
    deepEqual(classifyInputs(["-n", "-1", "file.txt", "file2.txt"]), {
      option: "n",
      noOfLines: -1,
      files: ["file.txt", "file2.txt"]
    });
  });

  it("should return an object of option c and noOfLines of givrn balue for passing input", function() {
    deepEqual(classifyInputs(["-c1", "file.txt", "file2.txt"]), {
      option: "c",
      noOfLines: 1,
      files: ["file.txt", "file2.txt"]
    });
    deepEqual(classifyInputs(["-c", "1", "file.txt"]), {
      option: "c",
      noOfLines: 1,
      files: ["file.txt"]
    });
    deepEqual(classifyInputs(["-c", "1", "file.txt", "file2.txt"]), {
      option: "c",
      noOfLines: 1,
      files: ["file.txt", "file2.txt"]
    });
  });
});
