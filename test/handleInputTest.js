const assert = require("assert");
const { getParameters, classifyInputs } = require("../src/handleInput.js");

describe("getParameters", function() {
  describe("should return an object which includes option, numberOfLines and file names", function() {
    it("should return the object if only count and fileName is given ", () => {
      let actualOutput = getParameters(["-5", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 5,
        files: ["file.txt"]
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
        files: ["file.txt", "file2.txt", "file3.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option is also given ", function() {
      let actualOutput = getParameters(["-n1", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 1,
        files: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option and count are seperate", function() {
      let actualOutput = getParameters(["-n", "10", "file.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: 10,
        files: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option, count and file names are given", function() {
      let actualOutput = getParameters(["-n", "-1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "n",
        numberOfLines: -1,
        files: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given together", function() {
      let actualOutput = getParameters(["-c1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        files: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given seperately ", function() {
      let actualOutput = getParameters(["-c", "1", "file.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        files: ["file.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the object if option 'c' and count are given seperately for multiple files", function() {
      let actualOutput = getParameters(["-c", "1", "file.txt", "file2.txt"]);
      let expectedOutput = {
        option: "c",
        numberOfLines: 1,
        files: ["file.txt", "file2.txt"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("classifyInputs", function() {
  describe("passing only file names", function() {
    it("should return an object with numberOfLines as 10 and file name in files array while passing file name as input", function() {
      assert.deepEqual(classifyInputs(["file.txt"]), {
        option: "n",
        numberOfLines: 10,
        files: ["file.txt"]
      });
    });

    it("should return an object with numberOfLines as 10 and file names in files array while passing file names as input", function() {
      assert.deepEqual(classifyInputs(["file.txt", "file2.txt"]), {
        option: "n",
        numberOfLines: 10,
        files: ["file.txt", "file2.txt"]
      });
    });
  });

  it("should return an object with option n and numberOfLines, file in files array while passing the numberOfLines & file as input", () => {
    assert.deepEqual(classifyInputs(["-5", "file.txt"]), {
      option: "n",
      numberOfLines: 5,
      files: ["file.txt"]
    });
    assert.deepEqual(
      classifyInputs(["-10", "file.txt", "file2.txt", "file3.txt"]),
      {
        option: "n",
        numberOfLines: 10,
        files: ["file.txt", "file2.txt", "file3.txt"]
      }
    );
  });

  it("should return an object of option, numberOfLines and files when all three arguments are passed", function() {
    assert.deepEqual(classifyInputs(["-n1", "file.txt"]), {
      option: "n",
      numberOfLines: 1,
      files: ["file.txt"]
    });
    assert.deepEqual(classifyInputs(["-n", "10", "file.txt"]), {
      option: "n",
      numberOfLines: 10,
      files: ["file.txt"]
    });
    assert.deepEqual(classifyInputs(["-n", "-1", "file.txt", "file2.txt"]), {
      option: "n",
      numberOfLines: -1,
      files: ["file.txt", "file2.txt"]
    });
  });

  it("should return an object of option c and numberOfLines of givrn balue for passing input", function() {
    assert.deepEqual(classifyInputs(["-c1", "file.txt", "file2.txt"]), {
      option: "c",
      numberOfLines: 1,
      files: ["file.txt", "file2.txt"]
    });
    assert.deepEqual(classifyInputs(["-c", "1", "file.txt"]), {
      option: "c",
      numberOfLines: 1,
      files: ["file.txt"]
    });
    assert.deepEqual(classifyInputs(["-c", "1", "file.txt", "file2.txt"]), {
      option: "c",
      numberOfLines: 1,
      files: ["file.txt", "file2.txt"]
    });
  });
});
