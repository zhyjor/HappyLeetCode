/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param {string} s
 * @return {number}
 */

//
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) return 0;
  const hash = {};
  let left = 0;
  let result = 0;
  for (let i = 0, len = s.length; i < len; i++) {
    if (hash[s[i]] !== undefined) {
      // 更新边界，left站到下一个位置就好，下次计算的时候需要加一,，但是可能有没有清除的
      left = Math.max(hash[s[i]] + 1, left);
    }
    // 直接更新内容
    hash[s[i]] = i;
    result = Math.max(result, i - left + 1);
  }
  return result;
};

console.log(lengthOfLongestSubstring('tmmzuxt'))
