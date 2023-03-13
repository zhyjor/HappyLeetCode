function isPalindrome(str) {
  let len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
}

function isPalindrome2(str) {
  return str.split('').reverse().join('') === str;
}

function validPalindrome(str) {
  const len = str.length;
  let i = 0, j = len - 1;
  while (i < j && str[i] === str[j]) {
    i++;
    j--;
  }
  if (isPalindrome(i + 1, j)) {
    return true;
  }
  if (isPalindrome(i, j + 1)) {
    return true;
  }
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
  return false;
}

console.log(validPalindrome('abca'))
