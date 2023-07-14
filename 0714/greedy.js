/**
 *
 * @param {*} g 饼干
 * @param {*} s 胃口
 */
function findContentChildren(g, s) {
  const sortChildren = s.sort((a, b) => a - b);
  const sortCookie = g.sort((a, b) => a - b);
  let result = 0;
  let j = sortCookie.length - 1;
  for (let i = sortChildren.length - 1; i >= 0; i--) {
    if (sortCookie[j] >= sortChildren[i]) {
      j--;
      result++;
    }
  }
  return result;
}

console.log(findContentChildren([1, 2, 3,4], [2, 3, 4,3,3]))
