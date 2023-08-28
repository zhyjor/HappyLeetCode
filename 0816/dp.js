function fib(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

function minCostClimbingStairs(cost) {
  const dp = [0, 0];
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 1]);
  }
  return dp[cost.length];
}

function uniquePaths(m, n) {
  const dp = new Array(m).fill(0).map(i => new Array(n).fill(1));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
    }
  }
  return dp[m - 1][n - 1]
}

function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = new Array(m).fill(0).map(i => new Array(n).fill(0));
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1;
  }
  for (let i = 0; i < n && obstacleGrid[0][i] === 0; i++) {
    dp[0][i] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) continue;
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

function integerBreak(n) {
  const dp = new Array(n + 1).fill(0);
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j);
    }
  }
  return dp[n];
}

function longestCommonSubsequence(text1, text2) {
  const dp = new Array(text1.length + 1).fill(0).map(i => new Array(text2.length + 1).fill(0));
  for (let i = 1; i < text1.length; i++) {
    for (let j = 1; j < text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[text1.length][text2.length];
}

function isSubsequence(s, t) {
  const dp = new Array(s.length + 1).fill(0).map(i => new Array(t.length + 1).fill(0));
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  return dp[s.length][j.length] === s.length;
}

function numDistinct(s, t) {
  const dp = new Array(s.length + 1).fill(0).map(i => new Array(t.length).fill(0));
  for (let i = 0; i <= s.length; i++) dp[i][0] = 1;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; t++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[s.length][t.length];
}

function minDistance(word1, word2) {
  const dp = new Array(word1.length + 1).fill(0).map(i => new Array(word2.length + 1).fill(0));
  for (let i = 0; i <= word1.length; i++) dp[i][0] = i;
  for (let j = 0; j <= word2.length; j++) dp[0][j] = j;

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1);
      }
    }
  }

  return dp[word1.length][word2.length];
}

function countSubstrings(s) {
  const dp = new Array(s.length).fill(0).map(i => new Array(s.length).fill(false));
  const result = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j <= s.length; j++) {
      if (s[i] === s[j]) {
        if (j - i <= 1) {
          result++;
          dp[i][j] = true;
        } else if (dp[i + 1][j - 1]) {
          result++;
          dp[i][j] = true;
        }
      }
    }
  }
  return result;
}

function longestPalindromeSubseq(s) {
  const dp = new Array(s.length).fill(0).map(i => new Array(s.length).fill(0));
  for (let i = 0; i < s.length; i++) dp[i][i] = 1;
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i + 1; j <= s.length; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j + 1]);
      }
    }
  }
  return dp[0][s.length-1];
}
