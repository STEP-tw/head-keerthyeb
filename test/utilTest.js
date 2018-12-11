const deepEqual = require('assert').deepEqual;
const { isNatural } = require('../src/util.js');

describe('Test for isNatural', function() {
  it('should return true if option is valid', function() {
    deepEqual(isNatural(0), false);
    deepEqual(isNatural('p'), false);
    deepEqual(isNatural(4), true);
    deepEqual(isNatural(-1), false);
  });
});


