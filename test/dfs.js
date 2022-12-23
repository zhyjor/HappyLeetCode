function permute(numbers) {
  // 记录边界
  const len = numbers.length;
  const curr = []; // 记录当前的排列
  const res = []; // 记录结果
  const visited = []; // 记录当前一次循环中是否被使用
  function dfs(nth) {
    if (nth === len) {
      // 单次处理已经到达了边界,
      res.push(curr.slice());
      return;
    }
    for (let i = 0; i < len; i++) {
      // 先判断当前数字是否被用过
      if (!visited[numbers[i]]) {
        // 标记被用过
        visited[numbers[i]] = 1;
        // 这个数字被用了，继续进入下一个
        curr.push(numbers[i]);
        // 基于这个排列继续
        dfs(nth + 1);
        // 清除curr一位
        curr.pop();
        // 标记这个数字不用了
        visited[numbers[i]] = 0;
      }
    }
  }
  dfs(0);
  return res;
}

console.log(permute([1, 2, 3]));
