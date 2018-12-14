const { deepEqual } = require("assert");
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
  describe(" Test for default option -n and default numberOfLines 10", function() {
    it("should return the first 10 lines of the given text", function() {
      let numbers = "1\n2";
      let empty = "";
      deepEqual(extractFileContent(empty), "");
      deepEqual(extractFileContent(numbers), "1\n2");
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

  it("should return an array which contain heading and contents ", function() {
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

describe("Test for createFileHeading", function() {
  it("should return an heading like ==> heading <==\n when any text is given", function() {
    deepEqual(createFileHeading(""), "==>  <==\n");
    deepEqual(createFileHeading("1"), "==> 1 <==\n");
    deepEqual(createFileHeading("keerthy"), "==> keerthy <==\n");
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

  it("should return first given number of lines of the text if  no of lines are given ", function() {
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

  it("should return first given number of lines of the text if option 'n' is also given ", function() {
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
      head(fs, ["-n5", "numbers"]),
      "head: numbers: No such file or directory"
    );
    deepEqual(
      head(fs, ["-c5", "numbers"]),
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
      head(fs, ["animals"]),
      "head: animals: No such file or directory"
    );
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
      head(fs, ["numbers", "animals", "numbers"]),
      "==> numbers <==\n" +
        numbers +
        "\n\nhead: animals: No such file or directory\n\n==> numbers <==\n" +
        numbers
    );
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
  describe(" Test for default option -n and default numberOfLines 10", function() {
    it("should return the first 10 lines of the given text", function() {
      let numbers = "1\n2";
      let empty = "";
      deepEqual(extractFileContentForTail(empty), "");
      deepEqual(extractFileContentForTail(numbers), "1\n2");
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
    deepEqual(tail(fs, [numbers]), numbers);
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
    deepEqual(tail(fs, ["-5", numbers]), numbers);
    deepEqual(tail(fs, ["-1", numbers]), "3");
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
    deepEqual(tail(fs, ["-n1", numbers]), "3");
    deepEqual(tail(fs, ["-n5", numbers]), numbers);
    deepEqual(tail(fs, ["-n", 1, numbers]), "3");
    deepEqual(tail(fs, ["-n", 5, numbers]), numbers);
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
    deepEqual(tail(fs, ["-c1", numbers]), "3");
    deepEqual(tail(fs, ["-c", 1, numbers]), "3");
    deepEqual(tail(fs, ["-c", 9, numbers]), "1\n2\n3");
    deepEqual(tail(fs, ["-c9", numbers]), "1\n2\n3");
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
    deepEqual(
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
    deepEqual(
      tail(fs, ["-n5", "numbers", "numbers"]),
      "==> numbers <==\n" + numbers + "\n\n==> numbers <==\n" + numbers
    );
    deepEqual(
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
    deepEqual(
      tail(fs, ["animals"]),
      "tail: animals: No such file or directory"
    );

    deepEqual(
      tail(fs, ["numbers", "animals"]),
      "==> numbers <==\n" +
        numbers +
        "\n\ntail: animals: No such file or directory"
    );
    deepEqual(
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
    deepEqual(getFormattedContent(["numbers"], ["1\n2\n3\n"], fs), "1\n2\n3\n");
    deepEqual(
      getFormattedContent(["numbers", "numbers"], ["1", "1"], fs),
      "==> numbers <==\n1\n\n==> numbers <==\n1"
    );
  });
});
