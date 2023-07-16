function combine(n, k) {
  const result = [];
  const path = [];
  function dfs(n, k, startIndex) {
    if (path.length === k) {
      result.push(path.slice());
      return;
    }
    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      dfs(n, k, i + 1);
      path.pop();
    }
  }
  dfs(n, k, 1);
  return result;
}
