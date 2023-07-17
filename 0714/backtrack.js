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

function combinationSum3(k, n) {
  const result = [];
  const path = [];
  function dfs(n, k, startIndex) {
    if (path.length === k) {
      if (path.reduce((p, s) => p + s, 0) === n) {
        result.push(path.slice());
      }
      return;
    }
    for (let i = startIndex; i <= 9 - (k - path.length) + 1; i++) {
      path.push(i);
      dfs(n, k, i + 1);
      path.pop();
    }
  }
  dfs(n, k, 1);
  return result
}

function letterCombinations(digits) {
  digits = Array.from(digits);
  const letterMap = [
    "", // 0
    "", // 1
    "abc", // 2
    "def", // 3
    "ghi", // 4
    "jkl", // 5
    "mno", // 6
    "pqrs", // 7
    "tuv", // 8
    "wxyz", // 9
  ];
  const result = [];
  const path = [];
  if (digits.length === 0) {
    return result;
  }
  if (digits.length === 1) return letterMap[digits].split('');

  function dfs(k, index) {
    if (path.length === k) {
      result.push(path.join(''));
      return;
    }
    for (let i = 0; i < letterMap[digits[index]].length; i++) {
      path.push(letterMap[digits[index]][i]);
      dfs(k, index + 1);
      path.pop();
    }
  }
  dfs(digits.length, 0);
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
    // 不从零开始，表示不会重复，从零开始会有从后向前的重复
    for (let i = startIndex; i < candidates.length; i++) {
      sum += candidates[i];
      path.push(candidates[i]);
      // 不加一，决定了当前这个数字可以重复
      dfs(sum, i);
      path.pop();
      sum -= candidates[i];
    }
  }
  dfs(0, 0);
  return result;
}


function combinationSum2(candidates, target) {
  const result = [];
  const path = [];
  candidates = candidates.sort((a, b) => a - b);
  function dfs(sum, startIndex) {
    if (sum > target) {
      return;
    }
    if (sum === target) {
      result.push(path.slice());
      return;
    }
    // 不从零开始，表示不会重复，从零开始会有从后向前的重复
    for (let i = startIndex; i < candidates.length; i++) {
      // 这里过滤掉相同的值
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue;
      }
      sum += candidates[i];
      path.push(candidates[i]);
      // 加一，决定了当前这个数字不可以重复
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
        let str = s.slice(startIndex, i + 1);
        path.push(str);
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

function restoreIpAddresses(s) {
  const result = [];
  const path = [];
  function dfs(startIndex) {
    if(path.length === 4 && startIndex === s.length) {
      result.push(path.slice().join('.'));
      return;
    }
    for(let i = startIndex;i < s.length; i++) {
      const str = s.slice(startIndex, i+1);
      if((+str <=255 && !str.startsWith('0')) || str === '0') {
        path.push(str);
        dfs(i+1);
        path.pop();
      } else {
        break;
      }
    }
  }
  dfs(0);
  return result;
}
