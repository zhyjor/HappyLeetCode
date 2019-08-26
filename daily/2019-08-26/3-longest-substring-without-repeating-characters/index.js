/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let strList = [];
  let maxLength = 0;
  for (let i = 0; i < s.length; i++) {
    if (strList.includes(s[i])) {
      // 出现重复的一般都是第一个和最后一个重复，去掉第一个就行了，后面还可以继续添加
      const charToRemove = strList.indexOf(s[i]) + 1; 
      strList = strList.splice(charToRemove);
    }
    strList.push(s[i]);
    maxLength = Math.max(maxLength, strList.length);
  }
  return maxLength;
};
console.log(lengthOfLongestSubstring('abcabcbb'));
