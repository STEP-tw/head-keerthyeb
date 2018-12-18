const deepEqual = require("assert").deepEqual;
const { isNaturalNumber, isZero } = require("../../src/util/numbers.js");

describe("isNatural", function() {
  it("should return true if option is valid", function() {
    deepEqual(isNaturalNumber(4), true);
  });

  it("should return return false if option is not a natural", function() {
    deepEqual(isNaturalNumber("p"), false);
    deepEqual(isNaturalNumber(-1), false);
    deepEqual(isNaturalNumber(0), false);
  });
});

describe("isZero", function() {
  it("should return true if input is zero", function() {
    deepEqual(isZero(0), true);
  });
  it("should return false if input is non zero", function() {
    deepEqual(isZero("p"), false);
    deepEqual(isZero(4), false);
    deepEqual(isZero(-1), false);
  });
});
