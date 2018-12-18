const assert = require("assert");
const {
  getFirstNCharacters,
  getLastNCharacters,
  getHeadLines,
  getTailLines
} = require("../../src/util/string.js");

describe("Test for getFirstNCharacters", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(getFirstNCharacters(empty, 0), "");
    assert.deepEqual(getFirstNCharacters(empty, 1), "");
  });

  it("should return given number of bytes from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getFirstNCharacters(numbers, 0), "");
    assert.deepEqual(getFirstNCharacters(numbers, 2), "1\n");
  });
});

describe("Test for getHeadLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(getHeadLines(empty, 0), "");
    assert.deepEqual(getHeadLines(empty, 1), "");
  });

  it("should return given number of lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getHeadLines(numbers, 0), "");
    assert.deepEqual(getHeadLines(numbers, 2), "1\n2");
    assert.deepEqual(getHeadLines(numbers, 4), "1\n2\n3");
  });
});

describe("Test for getTailLines", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(getTailLines(empty, 0), "");
    assert.deepEqual(getTailLines(empty, 1), "");
  });

  it("should return given number of last lines from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getTailLines(numbers, 0), "");
    assert.deepEqual(getTailLines(numbers, 2), "2\n3");
    assert.deepEqual(getTailLines(numbers, 4), "1\n2\n3");
  });
});

describe("Test for getLastNCharacters", function() {
  it("should return nothing for an empty string", function() {
    let empty = "";
    assert.deepEqual(getLastNCharacters(empty, 0), "");
    assert.deepEqual(getLastNCharacters(empty, 1), "");
  });

  it("should return given number of last bytes from a given text", function() {
    let numbers = "1\n2\n3";
    assert.deepEqual(getLastNCharacters(numbers, 0), "");
    assert.deepEqual(getLastNCharacters(numbers, 2), "\n3");
  });
});
