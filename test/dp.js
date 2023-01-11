function climbStairs(n) {
  const f = [];
  f[1] = 1;
  f[2] = 2;
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n];
}

function coinChange(coins, amount) {
  // 每个目标的最少数量
  const f = [];
  f[0] = 0;
  for (let i = 1; i <= amount; i++) {
    f[i] = Infinity;
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        f[i] = Math.min(f[i], f[i - coins[j]] + 1);
      }
    }
  }
  if (f[amount] === Infinity) return -1;
  return f[amount];
}

function knapsack(n, c, w, value) {
  const dp = (new Array(c + 1)).fill(0);
  let res = -Infinity;
  for (let i = 1; i < n; i++) {
    for (let v = c; v >= w[i]; v--) {
      dp[v] = Math.max(dp[v], dp[v - w[i]] + value[i]);
      if (dp[v] > res) res = dp[v];
    }
  }
  return res;
}

function lengthOfLIS(numbers) {
  const len = numbers.length;
  if (!len) return 0;
  const dp = (new Array(len)).fill(1);
  let maxLen = 1;
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[j] < numbers[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    if (dp[i] > maxLen) maxLen = dp[i];
  }
  return maxLen;
}


console.log(lengthOfLIS([3, 5, 7, 1, 2, 8]));

