const assert = require("assert");
const {
  getParameters,
  classifyInputs,
  isOptionOnly
} = require("../src/handleInput.js");

describe("getParameters", function() {
  describe("should return an object which includes option, numberOfLines and file names", function() {
    it("should return the object if only count and fileName is given ", () => {
      let actualOutput = getParameters(["-5", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 5,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if only count and file Names are given", function() {
      let actualOutput = getParameters([
        "-10",
        "file.txt",
        "file2.txt",
        "file3.txt"
      ]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 10,
        fileNames: ["file.txt", "file2.txt", "file3.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option is also given ", function() {
      let actualOutput = getParameters(["-n1", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 1,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option and count are seperate", function() {
      let actualOutput = getParameters(["-n", "10", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 10,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option, count and file names are given", function() {
      let actualOutput = getParameters(["-n", "-1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: -1,
        fileNames: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given together", function() {
      let actualOutput = getParameters(["-c1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        fileNames: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given seperately ", function() {
      let actualOutput = getParameters(["-c", "1", "file.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given seperately for multiple files", function() {
      let actualOutput = getParameters(["-c", "1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        fileNames: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("classifyInputs", function() {
  describe("should return an object which includes option, numberOfLines and file names", function() {
    it("should return the object if only file name is given", function() {
      let actualOutput = classifyInputs(["file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 10,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if only file names are given", function() {
      let actualOutput = classifyInputs(["file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 10,
        fileNames: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if only count and file name are given", () => {
      let actualOutput = classifyInputs(["-5", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 5,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if only count and file names are given", function() {
      let actualOutput = classifyInputs([
        "-10",
        "file.txt",
        "file2.txt",
        "file3.txt"
      ]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 10,
        fileNames: ["file.txt", "file2.txt", "file3.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object when option and count are given together", function() {
      let actualOutput = classifyInputs(["-n1", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 1,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object when option and count are given separately", function() {
      let actualOutput = classifyInputs(["-n", "10", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 10,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object when the count is negative", function() {
      let actualOutput = classifyInputs(["-n", "-1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: -1,
        fileNames: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given together", function() {
      let actualOutput = classifyInputs(["-c1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        fileNames: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given separately", function() {
      let actualOutput = classifyInputs(["-c", "1", "file.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        fileNames: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given with multiple files", function() {
      let actualOutput = classifyInputs(["-c", "1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        fileNames: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("isOptionOnly", function() {
  it("should return true if option and count are seperate", function() {
    let actualOutput = isOptionOnly("-n");
    assert.deepEqual(actualOutput, true);
  });

  it("should return false if argument contain number", function() {
    let actualOutput = isOptionOnly("-n5");
    assert.deepEqual(actualOutput, false);
  });

  it("should return false if argument doesn't contain option", function() {
    let actualOutput = isOptionOnly("-5");
    assert.deepEqual(actualOutput, false);
  });
});
