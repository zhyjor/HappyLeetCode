function combine(n, k) {
  const result = [];
  const path = [];
  function dfs(startIndex) {
    if (path.length === k) {
      result.push(path.slice());
      return;
    }
    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  }
  dfs(1);
  return result;
}

function combine(k, n) {
  const result = [];
  const path = [];
  function dfs(startIndex) {
    if (path.length === k) {
      if (path.reduce((p, c) => p + c, 0) === n) {
        result.push(path.slice());
      }
      return;
    }
    for (let i = startIndex; i <= 9 - (k - path.length) + 1; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  }
  dfs(1);
  return result;
}

function combinationSum(candidates, target) {
  const result = [];
  const path = [];
  function dfs(sum, startIndex) {
    if (sum > target) {
      return;
    }
    if (sum === target) {
      result.push(path.slice());
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      sum += candidates[i];
      path.push(candidates[i]);
      dfs(sum, i);
      path.pop();
      sum -= candidates[i];
    }
  }
  dfs(0, 0);
  return result;
}

function combinationSum2(candidates, target) {
  candidates = candidates.sort((a, b) => a - b);
  const result = [];
  const path = [];
  function dfs(sum, startIndex) {
    if (sum > target) {
      return;
    }
    if (sum === target) {
      result.push(path.slice());
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue;
      }
      sum += candidates[i];
      path.push(candidates[i]);
      dfs(sum, i + 1);
      path.pop();
      sum -= candidates[i];
    }
  }
  dfs(0, 0);
  return result;
}

function partition(s) {
  const result = [];
  const path = [];
  function dfs(startIndex) {
    if (startIndex >= s.length) {
      result.push(path.slice());
    }
    for (let i = startIndex; i < s.length; i++) {
      if (isPalindrome(s, startIndex, i)) {
        path.push(s.slice(startIndex, i + 1));
        dfs(i + 1);
        path.pop();
      } else {
        continue;
      }
    }
  }
  dfs(0);
  return result;
  function isPalindrome(str, start, end) {
    for (let i = start, j = end; i < j; i++, j--) {
      if (s[i] !== s[j]) return false;
    }
    return true;
  }
}
