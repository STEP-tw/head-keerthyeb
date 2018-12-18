const assert = require("assert");
const {
  getFirstNCharacters,
  getLastNCharacters,
  getHeadLines,
  getTailLines
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

describe("getHeadLines", function() {
  it("should return nothing for an empty string", function() {
    assert.deepEqual(getHeadLines("", 1), "");
  });

  it("should return given number of lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getHeadLines(numbers, 2), "1\n2");
  });
});

describe("getTailLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(getTailLines("", 1), "");
  });

  it("should return given number of last lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getTailLines(numbers, 2), "2\n3");
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
