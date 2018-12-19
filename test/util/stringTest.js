const assert = require("assert");
const {
  getFirstNCharacters,
  getLastNCharacters,
  getFirstNLines,
  getLastNLines
} = require("../../src/util/string.js");

describe("getFirstNCharacters", function() {
  it("should return nothing for an empty string", function() {
    assert.deepEqual(getFirstNCharacters("", 1), "");
  });

  it("should return given number of bytes from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getFirstNCharacters(numbers, 2), "1\n");
  });
});

describe("getFirstNLines", function() {
  it("should return nothing for an empty string", function() {
    assert.deepEqual(getFirstNLines("", 1), "");
  });

  it("should return given number of lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getFirstNLines(numbers, 2), "1\n2");
  });
});

describe("getLastNLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(getLastNLines("", 1), "");
  });

  it("should return given number of last lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getLastNLines(numbers, 2), "2\n3");
  });
});

describe("getLastNCharacters", function() {
  it("should return nothing for an empty string", function() {
    assert.deepEqual(getLastNCharacters("", 1), "");
  });

  it("should return given number of last bytes from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getLastNCharacters(numbers, 2), "\n3");
  });
});
