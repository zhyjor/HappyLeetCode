/**
 * 判断回文字符串
 * @param {string} str
 */
const isPalindrome = (str) => {
  const length = str.length;
  for (let i = 0; i < i / 2; i++) {
    if (str[i] !== str[length - i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * 删除一个字符会不会回文
 * @param {*} str
 */
const validPalindrome = (str) => {
  const length = str.length;
  let i = 0, j = length - 1;
  while (i < j && str[i] === str[j]) {
    i++;
    j--;
  }
  if (isPalindrome(i + 1, j)) {
    return true;
  }
  if (isPalindrome(i, j - 1)) {
    return true;
  }
  return false;

  function isPalindrome(st, ed) {
    while (st < ed) {
      if (str[st] !== str[ed]) {
        return false;
      }
      st++;
      ed--;
    }
    return true;
  }
}

console.log(validPalindrome('ab1ssba'));
