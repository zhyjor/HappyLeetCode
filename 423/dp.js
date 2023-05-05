/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((p, c) => p + c, 0);
  if (sum % 2 === 1) return false;

  const dp = new Array(sum / 2 + 1).fill(0);
  // dp[i][j] = Max{dp[i-1][j], dp[i-1][j-w[i]] + v[i]}
  // dp[j] = max{dp[i-1][j], dp[j-w[i]] + v[i]}
  for (let i = 0; i < nums.length; i++) {
    for (let j = sum / 2; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
      if (dp[j] === sum / 2) return true;
    }
  }
  return dp[sum / 2] === sum / 2;
};
