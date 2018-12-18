const isNaturalNumber = function(element) {
  return element > 0;
};

const isInteger = function(element) {
  return !isNaN(element) && element % 1 == 0;
};

const isZero = function(element) {
  return element == 0;
};

module.exports = { isNaturalNumber, isZero, isInteger };
