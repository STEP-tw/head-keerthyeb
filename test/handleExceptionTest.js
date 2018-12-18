const assert = require("assert");
const {
  handleHeadError,
  handleTailError,
  displayFileNotFoundError,
  isSingleFile,
  isValidOption
} = require("../src/handleException.js");

const files = {
  randomText: ["ab", "cd", "ef", "gh", "ij", "jk", "lm", "no", "pq", "rs"].join(
    "\n"
  ),
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n")
};

const fs = {
  existsSync: file => {
    return files.hasOwnProperty(file);
  }
};

describe("Test for handleHeadError", function() {
  it("should return nothing if option 'n', count and file name are valid", function() {
    assert.deepEqual(handleHeadError(2, "n", ["numbers"], fs), "");
  });

  it("should return nothing if option 'c', count and file name are valid ", function() {
    assert.deepEqual(handleHeadError(2, "c", ["numbers"], fs), "");
  });

  it("should return illegal option message for illegal option ", function() {
    let illegalOption = "head: illegal option -- ";
    let usage = "usage: head [-n lines | -c bytes] [file ...]";
    let actualOutput = handleHeadError(2, "-p", ["numbers"], fs);
    let expectedOutput = illegalOption + "-p\n" + usage;
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return illegal byte count message for illegal count and option 'c' ", function() {
    let illegalCountMsg = "head: illegal byte count -- ";
    let actualOutput = handleHeadError(-2, "c", ["numbers"], fs);
    let expectedOutput = illegalCountMsg + "-2";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return illegal line count message for illegal count and option 'n' ", function() {
    let illegalCountMsg = "head: illegal line count -- ";
    let actualOutput = handleHeadError(-2, "n", ["numbers"], fs);
    let expectedOutput = illegalCountMsg + "-2";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error msg if the file not exist ", function() {
    let fileMissingError = "head: file1: No such file or directory";
    let actualOutput = handleHeadError(2, "n", ["file1"], fs);
    assert.deepEqual(actualOutput, fileMissingError);
  });
});

describe("Test for handleTailError", function() {
  it("should return empty if all arguments are valid with option 'n' ", function() {
    let actualOutput = handleTailError(2, "n", ["numbers", "randomText"], fs);
    assert.deepEqual(actualOutput, "");
  });

  it("should return nothing if all arguments are valid with option 'c'", function() {
    let actualOutput = handleTailError(2, "c", ["numbers"], fs);
    assert.deepEqual(actualOutput, "");
  });

  it("should return illegal option message for illegal option ", function() {
    let illegalOption = "tail: illegal option -- ";
    let usage =
      "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    let actualOutput = handleTailError(2, "-p", ["numbers", "randomText"], fs);
    let expectedOutput = illegalOption + "-p\n" + usage;
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return illegal offset message for illegal count ", function() {
    let illegalOffsetMsg = "tail: illegal offset -- ";
    let actualOutput = handleTailError("p", "c", ["numbers", "randomText"], fs);
    let expectedOutput = illegalOffsetMsg + "p";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return nothing for legal count and negative numbers ", function() {
    let illegalOffsetMsg = "tail: illegal offset -- ";
    let actualOutput = handleTailError(
      "-2",
      "c",
      ["numbers", "randomText"],
      fs
    );
    assert.deepEqual(actualOutput, "");
  });

  it("should treat zero as a legal value", function() {
    let actualOutput = handleTailError("0", "c", ["numbers", "randomText"], fs);
    assert.deepEqual(actualOutput, "");
  });

  it("should return error msg if the file not exist ", function() {
    let error = "tail: file1: No such file or directory";
    assert.deepEqual(handleTailError(2, "n", ["file1"], fs), error);
  });
});

describe("Test for isSingleFile", function() {
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

describe("Test for isValidOption", function() {
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

describe("Test for displayFileNotFoundError", function() {
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
