/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  x = x > 0 ? Number(x.toString().split('').reverse().join('')) : Number('-' + Math.abs(x).toString().split("").reverse().join(""));
  return -(2 ** 31) < x && x < 2 ** 31 ? x : 0;
};
