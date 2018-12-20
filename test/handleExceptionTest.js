const assert = require("assert");
const {
  handleError,
  displayFileNotFoundError,
  diplayIllegalCountError,
  displayIllegalOptionError,
  isSingleFile,
  isValidOption
} = require("../src/handleException.js");

const files = {
  randomText: "ab\ncd\nef\ngh\nij\njk\nlm\nno\npq\nrs",
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n")
};

const fs = {
  existsSync: file => {
    return files.hasOwnProperty(file);
  }
};

describe("handleError", function() {
  describe("handle errors for head command", function() {
    let command = "head";

    it("should return nothing if option 'n', count and file name are valid", function() {
      assert.deepEqual(handleError(2, "n", command), "");
    });

    it("should return nothing if option 'c', count and file name are valid ", function() {
      assert.deepEqual(handleError(2, "c", command), "");
    });

    it("should return illegal option message for illegal option ", function() {
      let illegalOption = "head: illegal option -- ";
      let usage = "usage: head [-n lines | -c bytes] [file ...]";
      let actualOutput = handleError(2, "-p", command);
      let expectedOutput = illegalOption + "-p\n" + usage;
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return illegal byte count message for illegal count and option 'c' ", function() {
      let illegalCountMsg = "head: illegal byte count -- ";
      let actualOutput = handleError(-2, "c", command);
      let expectedOutput = illegalCountMsg + "-2";
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return illegal line count message for illegal count and option 'n' ", function() {
      let illegalCountMsg = "head: illegal line count -- ";
      let actualOutput = handleError(-2, "n", command);
      let expectedOutput = illegalCountMsg + "-2";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("Handle errors for tail command", function() {
    let command = "tail";

    it("should return empty if all arguments are valid with option 'n' ", function() {
      let actualOutput = handleError(2, "n", command);
      assert.deepEqual(actualOutput, "");
    });

    it("should return nothing if all arguments are valid with option 'c'", function() {
      let actualOutput = handleError(2, "c", command);
      assert.deepEqual(actualOutput, "");
    });

    it("should return illegal option message for illegal option ", function() {
      let illegalOption = "tail: illegal option -- ";
      let usage =
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      let actualOutput = handleError(2, "-p", command);
      let expectedOutput = illegalOption + "-p\n" + usage;
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return illegal offset message for illegal count ", function() {
      let illegalOffsetMsg = "tail: illegal offset -- ";
      let actualOutput = handleError("p", "c", command);
      let expectedOutput = illegalOffsetMsg + "p";
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return nothing for legal count and negative numbers ", function() {
      let actualOutput = handleError("-2", "c", command);
      assert.deepEqual(actualOutput, "");
    });

    it("should treat zero as a legal value", function() {
      let actualOutput = handleError("0", "c", command);
      assert.deepEqual(actualOutput, " ");
    });
  });
});

describe(" isSingleFile", function() {
  it("should return true  if the files array contain only one file", function() {
    assert.deepEqual(isSingleFile(["file"]), true);
  });

  it("should return false for empty array", function() {
    assert.deepEqual(isSingleFile([]), false);
  });

  it("should return false if the array contain more than one element", function() {
    assert.deepEqual(isSingleFile(["file1", "file2"]), false);
  });
});

describe(" isValidOption", function() {
  it("should return true if option is 'c'", function() {
    assert.deepEqual(isValidOption("c"), true);
  });

  it("should return true if option is 'n'", function() {
    assert.deepEqual(isValidOption("n"), true);
  });

  it("should return false if option is niether 'c' nor 'n'", function() {
    assert.deepEqual(isValidOption("2"), false);
    assert.deepEqual(isValidOption("p"), false);
  });
});

describe("displayFileNotFoundError", function() {
  it("should return an error message for head if the file name is given", function() {
    fileName = "numbers";
    let actualOutput = displayFileNotFoundError("head", fileName);
    let expectedOutput = "head: " + fileName + ": No such file or directory";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for tail if the file name is given", function() {
    let actualOutput = displayFileNotFoundError("tail", fileName);
    let expectedOutput = "tail: " + fileName + ": No such file or directory";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("displayIllegalOptionError", function() {
  it("should return an error message for head if the option is given", function() {
    let usage = "usage: head [-n lines | -c bytes] [file ...]";
    let illegalOption = "head: illegal option -- ";
    let actualOutput = displayIllegalOptionError("head", "p");
    let expectedOutput = illegalOption + "p\n" + usage;
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for tail if the option is given", function() {
    let usage =
      "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    let illegalOption = "tail: illegal option -- ";
    let actualOutput = displayIllegalOptionError("tail", "p");
    let expectedOutput = illegalOption + "p\n" + usage;
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("displayIllegalCountError", function() {
  it("should return an error message for head if the count is given", function() {
    let actualOutput = diplayIllegalCountError("head", -1, "n");
    let expectedOutput = "head: illegal line count -- -1";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an error message for head if the count is given for option 'c'", function() {
    let actualOutput = diplayIllegalCountError("head", -1, "c");
    let expectedOutput = "head: illegal byte count -- -1";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for tail if the count is given", function() {
    let actualOutput = diplayIllegalCountError("tail", -2);
    let expectedOutput = "tail: illegal offset -- -2";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
