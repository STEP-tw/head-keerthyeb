const assert = require("assert");
const {
  isNaturalNumber,
  isZero,
  isInteger
} = require("../../src/util/numbers.js");

describe("isNatural", function() {
  it("should return true if option is valid", function() {
    assert.deepEqual(isNaturalNumber(4), true);
  });

  it("should return return false if option is not a natural", function() {
    assert.deepEqual(isNaturalNumber("p"), false);
    assert.deepEqual(isNaturalNumber(-1), false);
    assert.deepEqual(isNaturalNumber(0), false);
  });
});

describe("isZero", function() {
  it("should return true if input is zero", function() {
    assert.deepEqual(isZero(0), true);
  });
  it("should return false if input is non zero", function() {
    assert.deepEqual(isZero("p"), false);
    assert.deepEqual(isZero(4), false);
    assert.deepEqual(isZero(-1), false);
  });
});

describe("isInteger", function() {
  it("should return true if element is positive number", function() {
    assert.deepEqual(isInteger(2), true);
  });

  it("should return true if element is negative number", function() {
    assert.deepEqual(isInteger(-2), true);
  });

  it("should return true if element is zero", function() {
    assert.deepEqual(isInteger(0), true);
  });

  it("should return false if element is not an integer", function() {
    assert.deepEqual(isInteger("p"), false);
  });
});
