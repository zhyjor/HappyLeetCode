/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {

  const INT_MIN = -1 * Math.pow(2, 31)
  const INT_MAX = Math.pow(2, 31) - 1
  let [, sign, nonDigits, digits] = /^ *([\+|\-]?)(\D*)(\d*)/.exec(str)

  if (nonDigits || !digits) {
      return 0
  } else {
      if (sign == '-') digits = -1 * digits
      if (digits < INT_MIN) return INT_MIN
      if (digits > INT_MAX) return INT_MAX
      else return digits
  }

};
