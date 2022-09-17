/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  return Number(x).toString().split("").reverse().join('') === Number(x).toString();
};

//
// 回文序列基本都是使用双指针法
function isPalindrome2(str) {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) return false;
  }
  return true;
}

console.log(isPalindrome2('112211'))

function validIsPalindrome(s) {
  const len = s.length;
  let i = 0, j = len - 1;
  while (i < j && s[i] === s[j]) {
    i++;
    j--;
  }
  if (isPalindrome(i + 1, j) || isPalindrome(i, j - 1)) {
    return true;
  }

  function isPalindrome(st, ed) {
    while (st < ed) {
      // 继续遍历即可
      if (s[st] !== s[ed]) {
        return false;
      }
      st++;
      ed--;
    }
    return true;
  }
  return false;
}
console.log(validIsPalindrome('a112211abc'))
