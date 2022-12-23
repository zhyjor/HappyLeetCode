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

    // 有剩余的数字的时候才会往数组内丢
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

function subsets(numbers) {
  const res = [];
  const len = numbers.length;
  const subset = [];
  dfs(0);
  function dfs(index) {
    // 所有的记录入口
    res.push(subset.slice());
    for (let i = index; i < len; i++) {
      subset.push(numbers[i]);
      dfs(i + 1);
      // 这是当前数字不存在与组合中的情况
      subset.pop();
    }
    console.log(index, subset);
  }
  return res;
}

function combine(n, k) {
  const res = [];
  const subset = [];
  dfs(1);
  function dfs(index) {
    // 所有的记录入口
    if (subset.length === k) {
      res.push(subset.slice());
      return;
    }
    for (let i = index; i <= n; i++) {
      subset.push(i);
      dfs(i + 1);
      // 这是当前数字不存在与组合中的情况
      subset.pop();
    }
  }
  return res;
}

console.log(combine(4, 2));
