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

function subset(nums) {
  const result = [];
  const path = [];
  function dfs(startIndex) {
    result.push(path.slice());
    for (let i = startIndex, len = nums.length; i < len; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  }
  dfs(0);
  return result;
}

function subsetsWithDup(numbers) {
  numbers = numbers.sort((a, b) => a - b);
  const result = [];
  const path = [];
  function dfs(startIndex) {
    result.push(path.slice());
    for (let i = startIndex, len = numbers.length; i < len; i++) {
      if (i > startIndex && numbers[i] === numbers[i - 1]) {
        continue;
      } else {
        path.push(numbers[i]);
        dfs(i + 1);
        path.pop();
      }
    }
  }
  dfs(0);
  return result;
}

function findSubsequences(numbers) {
  const result = [];
  const path = [];
  function dfs(startIndex) {
    const used = new Set();
    if (path.length > 1) {
      result.push(path.slice());
    }
    for (let i = startIndex, len = numbers.length; i < len; i++) {
      if (path.length > 0 && numbers[i] < path[path.length - 1]) {
        continue;
      }
      if (used.has(numbers[i])) {
        continue;
      }
      used.add(numbers[i]);
      path.push(numbers[i]);
      dfs(i + 1);
      path.pop();
      // used.delete(numbers[i]);
    }
  }
  dfs(0);
  return result;
}

function permute(numbers) {
  const result = [];
  const path = [];
  const used = new Array(numbers.length).fill(false);
  function dfs() {
    if (path.length === numbers.length) {
      result.push(path.slice());
    }
    for (let i = 0, len = numbers.length; i < len; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(numbers[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return result;
}

function permuteUnique(numbers) {
  numbers = numbers.sort((a, b) => a - b);
  const used = new Array(numbers.length).fill(false);
  const result = [];
  const path = [];
  function dfs() {
    if (path.length === numbers.length) {
      result.push(path.slice());
    }
    for (let i = 0, len = numbers.length; i < len; i++) {
      if (i > 0 && numbers[i] === numbers[i - 1] && !used[i - 1]) {
        continue;
      }
      if (used[i] === false) {
        path.push(numbers[i]);
        used[i] = true;
        dfs();
        used[i] = false;
        path.pop();
      }
    }
  }
  dfs();
  return result;
}

function solveNQueens(n) {
  const result = [];
  const chessBoard = new Array(n).fill(0).map(i => new Array(n).fill('.'));
  dfs(0, chessBoard);
  function dfs(row, chessBoard) {
    if (row === n) {
      const rows = chessBoard.map(i => i.join(''));
      result.push(rows);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, chessBoard)) {
        chessBoard[row][col] = 'Q';
        dfs(row + 1, chessBoard);
        chessBoard[row][col] = '.';
      }
    }
  }
  function isValid(row, col, chessBoard) {
    // 检查列
    for (let i = 0; i < row; i++) {
      if (chessBoard[i][col] === 'Q') return false;
    }
    // 检查 45度方向
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (chessBoard[i][j] === 'Q') return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (chessBoard[i][j] === 'Q') return false;
    }
    return true;
  }

}
