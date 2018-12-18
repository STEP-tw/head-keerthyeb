const deepEqual = require("assert").deepEqual;
const { isNatural, isZero } = require("../../src/util/numbers.js");

describe("Test for isNatural", function() {
  it("should return true if option is valid", function() {
    deepEqual(isNatural(4), true);
  });

  it("should return return false if option is not a natural", function() {
    deepEqual(isNatural("p"), false);
    deepEqual(isNatural(-1), false);
    deepEqual(isNatural(0), false);
  });
});

describe("Test for isZero", function() {
  it("should return true if input is zero", function() {
    deepEqual(isZero(0), true);
  });
  it("should return false if input is non zero", function() {
    deepEqual(isZero("p"), false);
    deepEqual(isZero(4), false);
    deepEqual(isZero(-1), false);
  });
});
