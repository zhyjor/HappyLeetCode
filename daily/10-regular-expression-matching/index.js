/**
 * @param {string} s // 输入
 * @param {string} p // 匹配
 * @return {boolean}
 */
var isMatch = function(s, p) {
  if(p.length === 0) { return s.length === 0 }
    let first_match = (s.length !==0 && (s[0] === p[0] || p[0] === '.'))
    if(p.length >= 2 && p[1] === '*') {
        return isMatch(s, p.substring(2)) || (first_match && isMatch(s.substring(1), p))
    } else {
        return first_match && isMatch(s.substring(1), p.substring(1))
    }
};
