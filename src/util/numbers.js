const isNatural = function(element) {
  return element > 0 && !isNaN(element);
};

const isZero = function(element) {
  return element == 0;
};

module.exports = { isNatural, isZero };
