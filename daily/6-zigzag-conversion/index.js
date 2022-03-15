/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, r) {
  if (r < 2) return s
  var area = 2 * r - 2
  var blocks = Math.ceil(s.length / area)
  var str = ''
  var step = 2 * r - 2
  for (var i = 0; i < r; i++) {

    for (var n = 0; n < blocks; n++) {
      if (i === 0) {
        str += s[n * step] || ''
      }
      else {
        str += (s[n * step + i] || '')
          + ((i === r - 1) ? '' : (s[n * step + step - i] || ''))
      }      
    }
  }
  return str
};
console.log(convert('abbfadfadfadsfasdf', 4))