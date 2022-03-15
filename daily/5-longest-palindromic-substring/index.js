/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  var max = '';
  for (var i = 0; i < s.length; i++) {
    // 判断两张类型的回文序列，奇数和偶数序列
    for (var j = 0; j < 2; j++) {
      var left = i;
      var right = i + j;
      // 回文判断
      while (s[left] && s[left] === s[right]) {
        left--;
        right++;
      }
      if ((right - left - 1) > max.length) {
        max = s.substring(left + 1, right);
      }
    }
    if (Math.ceil(max.length / 2) >= s.length - i) break;
  }
  return max;
};

console.log(longestPalindrome('abb'))