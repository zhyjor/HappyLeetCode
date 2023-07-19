function minCostClimbingStairs(cost) {
  const dp = [];
  dp[0] = 0;
  dp[1] = 0;
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[cost.length];
}

function uniquePaths(m, n) {
  const dp = new Array(m).fill(0).map(i => new Array(n).fill(1));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}


function uniquePaths2(obstacleGrid) {
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
      dp[i] = Math.max(dp[i], Math.max((i - j) * j, dp[i - j] * j));
    }
  }
  return dp[n];
}

function canPartition(numbers) {
  const sum = numbers.reduce((p, c) => p + c, 0);
  if (sum % 2 === 1) return false;
  const dp = new Array(sum / 2).fill(0);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = sum / 2; j >= numbers[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - numbers[i]] + numbers[i]);
      if (dp[j] === sum / 2) return true;
    }
  }

  return dp[sum / 2] === sum / 2;

}


function lastStoneWeightII(stones) {
  const sum = stones.reduce((a, b) => a + b, 0);
  const dpLen = Math.floor(sum / 2);
  const dp = new Array(dpLen + 1).fill(0);

  for (let i = 0; i < stones.length; i++) {
    for (let j = dpLen; j >= stones[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
    }
  }
  return sum - 2 * dp[dpLen];
}

function findTargetSumWays(numbers, target) {
  const sum = numbers.reduce((p, c) => p + c, 0);
  const dpLen = (sum + target) / 2; // left - right = target; left + right = sum; left = (target + sum) / 2
  const dp = new Array(dpLen + 1).fill(0);
  for (let i = 0; i < numbers.length; i++) {
    for (let j = dpLen; j >= numbers[i]; j--) {
      dp[j] += d[j - numbers[i]];
    }
  }
  return dp[dpLen] ?? 0;
}

function findMaxForm(strs, m, n) {
  const dp = new Array(m + 1).fill(0).map(i => new Array(n + 1).fill(0));

  for (let i = 0; i < strs.length; i++) {
    const [zero, one] = getZeroOne(strs[i]);
    for (let p = m; p >= zero; p--) {
      for (let q = n; q >= one; q--) {
        dp[p][q] = Math.max(dp[p][q], dp[p - zero][q - one] + 1);
      }
    }
  }

  return dp[m][n];

  function getZeroOne(str) {
    const strArray = str.split('');
    const zero = strArray.filter(i => i === '0');
    const length = strArray.length;
    const zeroLength = zero.length;
    const oneLength = length - zero.length;
    return [zeroLength, oneLength];
  }
}

function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }
  return dp[amount];
}

function combinationSum4(numbers, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i <= target; i++) {
    for (let j = 0; j <= numbers.length; j++) {
      if (i - numbers[j] >= 0) {
        dp[i] += dp[i - numbers[j]];
      }
    }
  }
  return dp[target];
}

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const dp = new Array(prices.length).fill(0).map(i => new Array(2 * k + 1).fill(0));
  for (let j = 1; j < 2 * k; j += 2) {
    dp[0][j] = -prices[0];
  }
  for (let i = 1; i < prices.length; i++) {
    for (let j = 0; j < 2 * k - 1; j += 2) {
      dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] - prices[i]);
      dp[i][j + 2] = Math.max(dp[i - 1][j + 2], dp[i - 1][j + 1] + prices[i]);
    }
  }
  return dp[prices.length - 1][2 * k];
};

function maxProfit(prices) {
  const dp = new Array(prices.length).fill(0).map(i => new Array(4).fill(0));
  dp[0][0] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][3] - prices[i], dp[i - 1][1] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);
    dp[i][2] = dp[i - 1][0] + prices[i];
    dp[i][3] = dp[i - 1][2];
  }
  return Math.max(dp[prices.length - 1][2], dp[prices.length - 1][1], dp[prices.length - 1][3]);
}

function maxProfit(prices, fee) {
  const dp = new Array(prices.length).fill(0).map(i => new Array(2).fill(0));
  dp[0][0] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i] - fee);
  }
  return Math.max(dp[prices.length - 1][0], dp[prices.length - 1][1]);
}
