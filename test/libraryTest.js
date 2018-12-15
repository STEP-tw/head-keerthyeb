const assert = require("assert");
const {
  extractFileContent,
  tail,
  getFormattedContent,
  extractFileContentForTail,
  selectLastLines,
  selectLastBytes,
  extractLines,
  extractBytes,
  head,
  zipFileNameWithFileContent,
  createFileHeading
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

describe("Test for extractLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(extractLines(empty, 0), "");
    assert.deepEqual(extractLines(empty, 1), "");
  });

  it("should return given number of lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(extractLines(numbers, 0), "");
    assert.deepEqual(extractLines(numbers, 2), "1\n2");
    assert.deepEqual(extractLines(numbers, 4), "1\n2\n3");
  });
});

describe("Test for extractBytes", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(extractBytes(empty, 0), "");
    assert.deepEqual(extractBytes(empty, 1), "");
  });

  it("should return given number of bytes from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(extractBytes(numbers, 0), "");
    assert.deepEqual(extractBytes(numbers, 2), "1\n");
  });
});

describe("Test for extractFileContent", function() {
  describe("test for empty file", function() {
    it("should return nothing for an empty line", function() {
      let empty = "";
      assert.deepEqual(extractFileContent(empty), "");
    });
  });

  describe(" Test for default option -n and default numberOfLines 10", function() {
    it("should return the first 10 lines of the given text", function() {
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].join("\n");
      let expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
      assert.deepEqual(extractFileContent(numbers), expectedOutput);
    });
  });
});

describe("Test for zipFileNameWithFileContent", function() {
  it("should return an empty array for 2 empty array ", function() {
    assert.deepEqual(zipFileNameWithFileContent([], [], []), []);
  });

  it("should return an empty array if first array is empty ", function() {
    assert.deepEqual(zipFileNameWithFileContent([], [1], []), []);
    assert.deepEqual(zipFileNameWithFileContent([], ["cat"], []), []);
  });

  it("should return an array which contain heading and contents ", function() {
    let expectedOutput = ["==> animal <==\ncat\n"];
    let actualOutput = zipFileNameWithFileContent(["animal"], ["cat"], [true]);
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array which contain heading and contents for multiple files", function() {
    let expectedOutput = zipFileNameWithFileContent(
      ["animal", "birds"],
      ["cat", "hen"],
      [true, true]
    );
    let actualOutput = ["==> animal <==\ncat\n", "==> birds <==\nhen\n"];
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("Test for createFileHeading", function() {
  it("should return an heading like ==> heading <==\n when any text is given", function() {
    assert.deepEqual(createFileHeading(""), "==>  <==\n");
    assert.deepEqual(createFileHeading("1"), "==> 1 <==\n");
    assert.deepEqual(createFileHeading("keerthy"), "==> keerthy <==\n");
  });
});

describe("Test for head function", function() {
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

  it("should return first given number of lines of the text if option and number of lines are together", function() {
    assert.deepEqual(head(fs, ["-n1", "numbers"]), "1");
    assert.deepEqual(head(fs, ["-n5", "numbers"]), "1\n2\n3\n4\n5");
  });

  it("should return given number of lines if option and number of lines are seperated by space ", function() {
    assert.deepEqual(head(fs, ["-n", 1, "numbers"]), "1");
    assert.deepEqual(head(fs, ["-n", 5, "numbers"]), "1\n2\n3\n4\n5");
  });

  it("should return first given number of characters ", function() {
    assert.deepEqual(head(fs, ["-c1", "numbers"]), "1");
    assert.deepEqual(head(fs, ["-c5", "numbers"]), "1\n2\n3");
  });

  it("should return given number of bytes if option and number of bytes are seperated by space", function() {
    assert.deepEqual(head(fs, ["-c", 1, "numbers"]), "1");
    assert.deepEqual(head(fs, ["-c", 5, "numbers"]), "1\n2\n3");
  });

  it("should return first 10 lines of the 2 strings ", function() {
    let actualOutput = head(fs, ["numbers", "randomText"]);
    let numbersOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join("\n");
    let expectedOutput =
      "==> numbers <==\n" +
      numbersOutput +
      "\n\n==> randomText <==\n" +
      files.randomText;
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
      randomTextOutput;
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return first given number of characters of the 2 strings ", function() {
    let actualOutput = head(fs, ["-c", 5, "numbers", "randomText"]);
    let expectedOutput =
      "==> numbers <==\n1\n2\n3" + "\n\n==> randomText <==\nab\ncd";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message if file is not exist ", function() {
    let actualOutput = head(fs, ["-n5", "names"]);
    let expectedOutput = "head: names: No such file or directory";
    assert.deepEqual(actualOutput, expectedOutput);

    actualOutput = head(fs, ["-c5", "names"]);
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for missing files in the begining", function() {
    let actualOutput = head(fs, ["animals"]);
    let expectedOutput = "head: animals: No such file or directory";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error mesaage for missing file at the end", function() {
    let actualOutput = head(fs, ["-n1", "numbers", "animals"]);
    let expectedOutput =
      "==> numbers <==\n" + 1 + "\n\nhead: animals: No such file or directory";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return error message for missing file in the middle", function() {
    let actualOutput = head(fs, ["-n1", "numbers", "animals", "randomText"]);
    let expectedOutput =
      "==> numbers <==\n" +
      1 +
      "\n\nhead: animals: No such file or directory\n\n==> randomText <==\nab";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("Test for selectLastLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(selectLastLines(empty, 0), "");
    assert.deepEqual(selectLastLines(empty, 1), "");
  });

  it("should return given number of last lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(selectLastLines(numbers, 0), "");
    assert.deepEqual(selectLastLines(numbers, 2), "2\n3");
    assert.deepEqual(selectLastLines(numbers, 4), "1\n2\n3");
  });
});

describe("Test for selectLastBytes", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(selectLastBytes(empty, 0), "");
    assert.deepEqual(selectLastBytes(empty, 1), "");
  });

  it("should return given number of last bytes from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(selectLastBytes(numbers, 0), "");
    assert.deepEqual(selectLastBytes(numbers, 2), "\n3");
  });
});

describe("Test for extractFileContentForTail", function() {
  describe(" Test for default option -n and default numberOfLines 10", function() {
    it("should return the first 10 lines of the given text", function() {
      let numbers = "1\n2";
      let empty = "";
      assert.deepEqual(extractFileContentForTail(empty), "");
      assert.deepEqual(extractFileContentForTail(numbers), "1\n2");
    });
  });
});

describe("Test for tail function", function() {
  it("should return last 10 lines of the text if only file name is given ", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    assert.deepEqual(tail(fs, [numbers]), numbers);
  });

  it("should return last given number of lines of the text", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    assert.deepEqual(tail(fs, ["-5", numbers]), numbers);
    assert.deepEqual(tail(fs, ["-1", numbers]), "3");
  });

  it("should return last given number of lines of the text if the option 'n' is also given ", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    assert.deepEqual(tail(fs, ["-n1", numbers]), "3");
    assert.deepEqual(tail(fs, ["-n5", numbers]), numbers);
    assert.deepEqual(tail(fs, ["-n", 1, numbers]), "3");
    assert.deepEqual(tail(fs, ["-n", 5, numbers]), numbers);
  });

  it("should return last given number of characters ", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    assert.deepEqual(tail(fs, ["-c1", numbers]), "3");
    assert.deepEqual(tail(fs, ["-c", 1, numbers]), "3");
    assert.deepEqual(tail(fs, ["-c", 9, numbers]), "1\n2\n3");
    assert.deepEqual(tail(fs, ["-c9", numbers]), "1\n2\n3");
  });

  it("should return last 10 lines of the 2 strings ", function() {
    let numbers = "1\n2\n3\n";
    let fs = {
      readFileSync: function(file) {
        return numbers;
      },
      existsSync: function(file) {
        return true;
      }
    };
    assert.deepEqual(
      tail(fs, ["numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
  });

  it("should return last given number of lines of the 2 strings ", function() {
    let numbers = "1\n2\n3\n";
    let fs = {
      readFileSync: function(file) {
        return numbers;
      },
      existsSync: function(file) {
        return true;
      }
    };
    assert.deepEqual(
      tail(fs, ["-n5", "numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
    assert.deepEqual(
      tail(fs, ["-5", "numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
  });

  it("should return error message for missing files", function() {
    let fs = {
      readFileSync: function(file) {
        return numbers;
      },
      existsSync: function(file) {
        if (file == "numbers") {
          return true;
        }
        return false;
      }
    };
    let numbers = "1\n2\n3\n";
    assert.deepEqual(
      tail(fs, ["animals"]),
      "tail: animals: No such file or directory"
    );

    assert.deepEqual(
      tail(fs, ["numbers", "animals"]),
      "==> numbers <==\n" +
        numbers +
        "\n\ntail: animals: No such file or directory"
    );
    assert.deepEqual(
      tail(fs, ["numbers", "animals", "numbers"]),
      "==> numbers <==\n" +
        numbers +
        "\n\ntail: animals: No such file or directory\n\n==> numbers <==\n" +
        numbers
    );
  });
});

describe("Test for getFormattedContent", function() {
  it("should return the output as head do", function() {
    let fs = {
      existsSync: function(file) {
        if (file == "numbers") {
          return true;
        }
        return false;
      }
    };
    assert.deepEqual(
      getFormattedContent(["numbers"], ["1\n2\n3\n"], fs),
      "1\n2\n3\n"
    );
    assert.deepEqual(
      getFormattedContent(["numbers", "numbers"], ["1", "1"], fs),
      "==> numbers <==\n1\n\n==> numbers <==\n1"
    );
  });
});
