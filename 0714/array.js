/**
 * @param {number} n
 * @return {number[][]}
 */

function generateMatrix(n) {
  const result = new Array(n).fill(0).map(i => new Array(n).fill(0));
  // 设置4个边界
  let l = 0, t = 0, r = n - 1, b = n - 1;
  let cur = 1;
  let max = n * n;
  while (cur <= max) {
    for (let i = l; i <= r; i++) result[t][i] = cur++;
    t++;
    for (let i = t; i <= b; i++) result[i][r] = cur++;
    r--;
    for (let i = r; i >= l; i--) result[b][i] = cur++;
    b--;
    for (let i = b; i >= t; i--) result[i][l] = cur++;
    l++;
  }
  return result;
}

console.log(generateMatrix(3))
