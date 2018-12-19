const assert = require("assert");
const {
  extractFileContent,
  tail,
  getFormattedContent,
  head,
  insertHeader,
  formatText
} = require("../src/library.js");

const files = {
  randomText: ["ab", "cd", "ef", "gh", "ij", "jk", "lm", "no", "pq", "rs"].join(
    "\n"
  ),
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n")
};

const fs = {
  existsSync: file => {
    return files.hasOwnProperty(file);
  },
  readFileSync: file => {
    return files[file];
  }
};

describe("extractFileContent", function() {
  describe("empty file", function() {
    it("should return nothing for an empty line", function() {
      let command = "head";
      assert.deepEqual(extractFileContent(command, ""), "");
    });
  });

  describe("for default option -n and default numberOfLines 10", function() {
    it("should return the first 10 lines of the given text", function() {
      let command = "head";
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n");
      let expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
      assert.deepEqual(extractFileContent(command, numbers), expectedOutput);
    });
  });

  describe("extractFileContent ForTail", function() {
    describe("for default option -n and default numberOfLines 10", function() {
      it("should return the first 10 lines of the given text", function() {
        let command = "head";
        let numbers = "1\n2";
        let empty = "";
        assert.deepEqual(extractFileContent(command, empty), "");
        assert.deepEqual(extractFileContent(command, numbers), "1\n2");
      });
    });
  });
});

describe("formatText", function() {
  it("should return an text like ==> text <==\n when any text is given", function() {
    assert.deepEqual(formatText("keerthy"), "==> keerthy <==\n");
  });
});

describe("head function", function() {
  it("should return first 10 lines of the file if only file name is given", function() {
    let actualOutput = head(fs, ["numbers"]);
    let expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return first given number of lines of the file", function() {
    let actualOutput = head(fs, ["-5", "numbers"]);
    let expectedOutput = [1, 2, 3, 4, 5].join("\n");
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return given number of lines of the text for attached option and count", function() {
    assert.deepEqual(head(fs, ["-n1", "numbers"]), "1");
  });

  it("should return given number of lines for separated option and count", function() {
    assert.deepEqual(head(fs, ["-n", 1, "numbers"]), "1");
  });

  it("should return first given number of characters for attached option and count", function() {
    assert.deepEqual(head(fs, ["-c1", "numbers"]), "1");
  });

  it("should return given number of bytes for separated option and count", function() {
    assert.deepEqual(head(fs, ["-c", 1, "numbers"]), "1");
  });

  it("should return first 10 lines of the 2 strings ", function() {
    let actualOutput = head(fs, ["numbers", "randomText"]);
    let numbersOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    let expectedOutput =
      "==> numbers <==\n" +
      numbersOutput +
      "\n\n==> randomText <==\n" +
      files.randomText +
      "\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return first given number of lines of the 2 strings ", function() {
    let actualOutput = head(fs, ["-n", 5, "numbers", "randomText"]);
    let numbersOutput = [1, 2, 3, 4, 5].join("\n");
    let randomTextOutput = ["ab", "cd", "ef", "gh", "ij"].join("\n");
    let expectedOutput =
      "==> numbers <==\n" +
      numbersOutput +
      "\n\n==> randomText <==\n" +
      randomTextOutput +
      "\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return first given number of characters of the 2 strings ", function() {
    let actualOutput = head(fs, ["-c", 5, "numbers", "randomText"]);
    let expectedOutput =
      "==> numbers <==\n1\n2\n3" + "\n\n==> randomText <==\nab\ncd\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message if file is not exist for option is 'n' ", function() {
    let actualOutput = head(fs, ["-n5", "names"]);
    let expectedOutput = "head: names: No such file or directory\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message if file is not exist for option is 'c'", function() {
    let actualOutput = head(fs, ["-c5", "names"]);
    let expectedOutput = "head: names: No such file or directory\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for missing files in the begining", function() {
    let actualOutput = head(fs, ["animals"]);
    let expectedOutput = "head: animals: No such file or directory\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error mesaage for missing file at the end", function() {
    let actualOutput = head(fs, ["-n1", "numbers", "animals"]);
    let expectedOutput =
      "==> numbers <==\n" +
      1 +
      "\n\nhead: animals: No such file or directory\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for missing file in the middle", function() {
    let actualOutput = head(fs, ["-n1", "numbers", "animals", "randomText"]);
    let expectedOutput =
      "==> numbers <==\n" +
      1 +
      "\n\nhead: animals: No such file or directory\n\n==> randomText <==\nab\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("tail function", function() {
  it("should return last 10 lines of the text if only file name is given ", function() {
    let actualOutput = tail(fs, ["numbers"]);
    let expectedOutput = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n");
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return last given number of lines of the text", function() {
    assert.deepEqual(tail(fs, ["-2", "numbers"]), "10\n11");
  });

  it("should return last given number of lines for attached option and count ", function() {
    assert.deepEqual(tail(fs, ["-n1", "numbers"]), "11");
  });

  it("should return given number of lines if option and count are seperate", function() {
    assert.deepEqual(tail(fs, ["-n", 1, "numbers"]), "11");
  });

  it("should return last given number of characters for attached option and count", function() {
    assert.deepEqual(tail(fs, ["-c1", "numbers"]), "1");
  });

  it("should return last given number of characters for seperated option and count", function() {
    assert.deepEqual(tail(fs, ["-c", 1, "numbers"]), "1");
  });

  it("should return last 10 lines of the 2 files ", function() {
    let actualOutput = tail(fs, ["numbers", "randomText"]);
    let numbersOutput = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n");
    let expectedOutput =
      "==> numbers <==\n" +
      numbersOutput +
      "\n\n==> randomText <==\n" +
      files.randomText +
      "\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return last given number of lines of the 2 files if only count is given", function() {
    let actualOutput = tail(fs, ["-1", "numbers", "randomText"]);
    let expectedOutput = "==> numbers <==\n11\n\n==> randomText <==\nrs\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return last given number of lines of 2 file if option is also given", function() {
    let actualOutput = tail(fs, ["-n1", "numbers", "randomText"]);
    let expectedOutput = "==> numbers <==\n11\n\n==> randomText <==\nrs\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for missing file in the begining", function() {
    let actualOutput = tail(fs, ["animals"]);
    let expectedOutput = "tail: animals: No such file or directory\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for missing file in the end", function() {
    let actualOutput = tail(fs, ["-n1", "numbers", "animals"]);
    let expectedOutput =
      "==> numbers <==\n11\n\ntail: animals: No such file or directory\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for missing file in the middle", function() {
    let actualOutput = tail(fs, ["-n1", "numbers", "animals", "randomText"]);
    let expectedOutput =
      "==> numbers <==\n11\n\ntail: animals: No such file or directory\n\n==> randomText <==\nrs\n";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getFormattedContent", function() {
  it("should return only the content if only one file is given", function() {
    let arguments = [{ file: "numbers", content: 1, isExist: true }];
    let actualOutput = getFormattedContent(arguments, "head");
    assert.deepEqual(actualOutput, [1]);
  });

  it("should return file name and content if 2 files are gievn", function() {
    let arguments = [
      { file: "numbers", content: 1, isExist: true },
      { file: "randomText", content: "rs", isExist: true }
    ];
    let actualOutput = getFormattedContent(arguments, "head");
    let expectedOutput = ["==> numbers <==\n1\n", "==> randomText <==\nrs\n"];
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
