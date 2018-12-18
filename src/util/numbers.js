const isNaturalNumber = function(element) {
  return element > 0;
};

const isNotInteger = function(element) {
  return !isNaN(element);
};

const isZero = function(element) {
  return element == 0;
};

module.exports = { isNaturalNumber, isZero, isNotInteger };
