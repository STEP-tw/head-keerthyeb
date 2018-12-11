const deepEqual = require("assert").deepEqual;
const {
  extractFileContent,
  tail,
  handleOutput,
  isSingleFile,
  extractFileContentForTail,
  selectLastLines,
  selectLastBytes,
  handleTailException,
  extractLines,
  extractBytes,
  head,
  handleHeadException,
  isValidOption,
  getParameters,
  zipFileNameWithFileContent,
  createHead,
  classifyInputs
} = require("../src/library.js");

describe("Test for extractLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    deepEqual(extractLines(empty, 0), "");
    deepEqual(extractLines(empty, 1), "");
  });

  it("should return given number of lines from a given text", function() {
    let numbers = "1\n2\n3";
    deepEqual(extractLines(numbers, 0), "");
    deepEqual(extractLines(numbers, 2), "1\n2");
    deepEqual(extractLines(numbers, 4), "1\n2\n3");
  });
});

describe("Test for extractBytes", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    deepEqual(extractBytes(empty, 0), "");
    deepEqual(extractBytes(empty, 1), "");
  });

  it("should return given number of bytes from a given text", function() {
    let numbers = "1\n2\n3";
    deepEqual(extractBytes(numbers, 0), "");
    deepEqual(extractBytes(numbers, 2), "1\n");
  });
});

describe("Test for extractFileContent", function() {
  describe(" Test for default option -n and default noOfLines 10", function() {
    it("should return the first 10 lines of the given text", function() {
      let numbers = "1\n2";
      let empty = "";
      deepEqual(extractFileContent(empty), "");
      deepEqual(extractFileContent(numbers), "1\n2");
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

describe("Test for zipFileNameWithFileContent", function() {
  it("should return an empty array for 2 empty array ", function() {
    deepEqual(zipFileNameWithFileContent([], [], []), []);
  });

  it("should return an empty array if first array is empty ", function() {
    deepEqual(zipFileNameWithFileContent([], [1], []), []);
    deepEqual(zipFileNameWithFileContent([], ["cat"], []), []);
  });

  it("should return an array which contain heading and contents if two arrays are non-empty ", function() {
    deepEqual(zipFileNameWithFileContent(["animal"], ["cat"], [true]), [
      "==> animal <==\ncat\n"
    ]);
    deepEqual(
      zipFileNameWithFileContent(
        ["animal", "birds"],
        ["cat", "hen"],
        [true, true]
      ),
      ["==> animal <==\ncat\n", "==> birds <==\nhen\n"]
    );
  });
});

describe("Test for createHead", function() {
  it("should return an heading like ==> heading <==\n when any text is given", function() {
    deepEqual(createHead(""), "==>  <==\n");
    deepEqual(createHead("1"), "==> 1 <==\n");
    deepEqual(createHead("keerthy"), "==> keerthy <==\n");
  });
});

describe("Test for handleHeadException", function() {
  it("should return empty if all arguments are valid ", function() {
    let fs = {
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(handleHeadException(2, "n", ["file1", "file2"], fs), "");
    deepEqual(handleHeadException(2, "c", ["file"], fs), "");
  });

  it("should return illegal option message for illegal option ", function() {
    let fs = {
      existsSync: function(file) {
        return true;
      }
    };
    let illegalOption = "head: illegal option -- ";
    let usage = "usage: head [-n lines | -c bytes] [file ...]";
    deepEqual(
      handleHeadException(2, "-p", ["file1", "file2"], fs),
      illegalOption + "-p\n" + usage
    );
  });

  it("should return illegal byte count message for illegal count and option 'c' ", function() {
    let fs = {
      existsSync: function(file) {
        return true;
      }
    };
    let illegalCountMsg = "head: illegal byte count -- ";
    deepEqual(
      handleHeadException(-2, "c", ["file1", "file2"], fs),
      illegalCountMsg + "-2"
    );
  });

  it("should return illegal line count message for illegal count and option 'n' ", function() {
    let fs = {
      existsSync: function(file) {
        return true;
      }
    };
    let illegalCountMsg = "head: illegal line count -- ";
    deepEqual(
      handleHeadException(-2, "n", ["file1", "file2"], fs),
      illegalCountMsg + "-2"
    );
  });

  it("should return error msg if the file not exist ", function() {
    let fs = {
      existsSync: function(file) {
        return false;
      }
    };
    let error = "head: file1: No such file or directory";
    deepEqual(handleHeadException(2, "n", ["file1"], fs), error);
  });
});

describe("Test for head function", function() {
  it("should return first 10 lines of the text if only file name is given ", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(head(fs, [numbers]), numbers);
  });

  it("should return first given number of lines of the text if file name and no of lines are given ", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(head(fs, ["-5", numbers]), numbers);
    deepEqual(head(fs, ["-1", numbers]), "1");
  });

  it("should return first given number of lines of the text if file name, no of lines and option 'n' are given ", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(head(fs, ["-n1", numbers]), "1");
    deepEqual(head(fs, ["-n5", numbers]), numbers);
    deepEqual(head(fs, ["-n", 1, numbers]), "1");
    deepEqual(head(fs, ["-n", 5, numbers]), numbers);
  });

  it("should return first given number of characters ", function() {
    let numbers = "1\n2\n3";
    let fs = {
      readFileSync: function(file) {
        return file;
      },
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(head(fs, ["-c1", numbers]), "1");
    deepEqual(head(fs, ["-c", 1, numbers]), "1");
    deepEqual(head(fs, ["-c", 9, numbers]), "1\n2\n3");
    deepEqual(head(fs, ["-c9", numbers]), "1\n2\n3");
  });

  it("should return first 10 lines of the 2 strings ", function() {
    let numbers = "1\n2\n3\n";
    let fs = {
      readFileSync: function(file) {
        return numbers;
      },
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(
      head(fs, ["numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
  });

  it("should return first given number of lines of the 2 strings ", function() {
    let numbers = "1\n2\n3\n";
    let fs = {
      readFileSync: function(file) {
        return numbers;
      },
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(
      head(fs, ["-n", 5, "numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
    deepEqual(
      head(fs, ["-n5", "numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
    deepEqual(
      head(fs, ["-5", "numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
  });

  it("should return first given number of characters of the 2 strings ", function() {
    let numbers = "1\n2\n3\n";
    let fs = {
      readFileSync: function(file) {
        return numbers;
      },
      existsSync: function(file) {
        return true;
      }
    };
    deepEqual(
      head(fs, ["-c", 5, "numbers", "numbers"]),
      "==> numbers <==\n1\n2\n3" + "\n\n==> numbers <==\n1\n2\n3"
    );
    deepEqual(
      head(fs, ["-c5", "numbers", "numbers"]),
      "==> numbers <==\n1\n2\n3" + "\n\n==> numbers <==\n1\n2\n3"
    );
  });

  it("should return error message if file is not exist ", function() {
    let fs = {
      readFileSync: function(file) {
        return numbers;
      },
      existsSync: function(file) {
        return false;
      }
    };
    deepEqual(
      head(fs, ["numbers"]),
      "head: numbers: No such file or directory"
    );
    deepEqual(
      head(fs, ["-n5", "numbers"]),
      "head: numbers: No such file or directory"
    );
    deepEqual(
      head(fs, ["-5", "numbers"]),
      "head: numbers: No such file or directory"
    );
    deepEqual(
      head(fs, ["-n", 5, "numbers"]),
      "head: numbers: No such file or directory"
    );
    deepEqual(
      head(fs, ["-c5", "numbers"]),
      "head: numbers: No such file or directory"
    );
    deepEqual(
      head(fs, ["-c", 5, "numbers"]),
      "head: numbers: No such file or directory"
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
    deepEqual(
      head(fs, ["numbers", "animals"]),
      "==> numbers <==\n" +
        numbers +
        "\n\nhead: animals: No such file or directory"
    );
    deepEqual(
      head(fs, ["animals", "numbers"]),
      "head: animals: No such file or directory\n\n==> numbers <==\n" + numbers
    );
    deepEqual(
      head(fs, ["-n5", "animals", "numbers"]),
      "head: animals: No such file or directory\n\n==> numbers <==\n" + numbers
    );
    deepEqual(
      head(fs, ["-n", 5, "animals", "numbers"]),
      "head: animals: No such file or directory\n\n==> numbers <==\n" + numbers
    );
    deepEqual(
      head(fs, ["-5", "animals", "numbers"]),
      "head: animals: No such file or directory\n\n==> numbers <==\n" + numbers
    );
    deepEqual(
      head(fs, ["numbers", "animals", "numbers"]),
      "==> numbers <==\n" +
        numbers +
        "\n\nhead: animals: No such file or directory\n\n==> numbers <==\n" +
        numbers
    );
  });
});

describe("Test for isValidOption", function() {
  it("should return true if option is valid", function() {
    deepEqual(isValidOption("c"), true);
    deepEqual(isValidOption("n"), true);
    deepEqual(isValidOption("2"), false);
    deepEqual(isValidOption("p"), false);
  });
});

describe("getParameters", function() {
  it("should return an object with option n and noOfLines, file in files array while passing the noOfLines & file as input", () => {
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

  it("should return an object of option, noOfLines and files when all three arguments are passed", function() {
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

  it("should return an object of option c and noOfLines of givrn balue for passing input", function() {
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

describe("Test for selectLastLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    deepEqual(selectLastLines(empty, 0), "");
    deepEqual(selectLastLines(empty, 1), "");
  });

  it("should return given number of last lines from a given text", function() {
    let numbers = "1\n2\n3";
    deepEqual(selectLastLines(numbers, 0), "");
    deepEqual(selectLastLines(numbers, 2), "2\n3");
    deepEqual(selectLastLines(numbers, 4), "1\n2\n3");
  });
});

describe("Test for selectLastBytes", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    deepEqual(selectLastBytes(empty, 0), "");
    deepEqual(selectLastBytes(empty, 1), "");
  });

  it("should return given number of last bytes from a given text", function() {
    let numbers = "1\n2\n3";
    deepEqual(selectLastBytes(numbers, 0), "");
    deepEqual(selectLastBytes(numbers, 2), "\n3");
  });
});

describe("Test for extractFileContentForTail", function() {
  describe(" Test for default option -n and default noOfLines 10", function() {
    it("should return the first 10 lines of the given text", function() {
      let numbers = "1\n2";
      let empty = "";
      deepEqual(extractFileContentForTail(empty), "");
      deepEqual(extractFileContentForTail(numbers), "1\n2");
    });
  });
});

describe("Test for isSingleFile", function() {
  it("should return true  if the files array contain only one file", function() {
    deepEqual(isSingleFile([]), false);
    deepEqual(isSingleFile(["file"]), true);
    deepEqual(isSingleFile(["file1", "file2"]), false);
  });
});
