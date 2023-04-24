function permute(nums) {
  const len = nums.length;
  const current = [];
  const res = [];
  const visited = {};
  function dfs(nth) {
    // 递归结束
    if (len === nth) {
      res.push(current.slice());
      return;
    };
    for (let i = 0; i < len; i++) {
      if (!visited[i]) {
        visited[i] = true;
        current.push(nums[i]);
        dfs(nth + 1);
        current.pop();
        visited[i] = false;
      }
    }
  }
  dfs(0);
  return res;
}

function subset(nums) {
  const len = nums.length;
  const res = [];
  let subset = [];
  function dfs(nth) {
    res.push(subset.slice());
    for (let i = nth; i < len; i++) {
      subset.push(nums[i]);
      dfs(i + 1);
      subset.pop();
    }

  }
  dfs(0);
  return res;
}


function combine(n, k) {
  const res = [];
  const subset = [];
  dfs(1);
  return res;
  function dfs(nth) {
    if (subset.length === k) {
      res.push(subset.slice());
      return;
    }
    for (let i = nth; i <= n; i++) {
      subset.push(i);
      dfs(i + 1);
      subset.pop();
    }
  }
}


function gen(n) {
  const res = [];
  function dfs(nth, str) {
    if (nth === 2 * n) {
      res.push(str);
      return;
    }
    let str1 = `${str}(`
    dfs(nth + 1, str1);
    let str2 = `${str})`
    dfs(nth + 1, str2);
  }
  dfs(0, '');
  return res;
}

console.log(gen(2))
