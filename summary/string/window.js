/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
  if (!s) return 0;
  let left = 0;
  let nextLeft = 0;
  let map = {};
  // 记录当前有几个
  let currentChat = 0;
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    // 先判断是否存在
    if (map[s[i]] === undefined) {
      if (currentChat < 2) {
        currentChat++;
      } else {
        // 删除左边的节点
        let temp = map[s[left]] + 1;
        map[s[left]] = undefined;
        left = temp;
      }
    }
    console.log(map, result, left, s[left], i, s[i]);
    result = Math.max(result, i - left + 1);
    map[s[i]] = i;
    // 更新下次可调整的位置

  }
  return result;
};
console.log(lengthOfLongestSubstringTwoDistinct("abaccc"));



