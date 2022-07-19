// 楼梯问题
//
function dp_no_cache(i) {
  switch (i) {
    case 1:
      return 1;
    case 2:
      return 2;
    default:
      // 会重复计算好多遍，尤其是时间复杂度是o(2^n)，指数级的
      return dp_no_cache(i - 1) + dp_no_cache(i - 2);
  }
}

function dp(n) {

  const cache = [];

  function _dp(i) {
    switch (i) {
      case 1:
        cache[i] = 1;
        break;
      case 2:
        cache[i] = 2;
        break;
      default:
        // 由于每次都用了两位，空间浪费了，当前的空间复杂度是o(n)
        cache[i] = cache[i - 1] + cache[i - 2];
    }
  }

  // 既然用了缓存，最好子底向上递归，这样前面的缓存才能优先算出来
  for (let i = 1; i <= n; i++) {
    _dp(i);
  }

  return cache[n];

}

function dp_with_low_cache(n) {
  const cache = [];

  function _dp(i) {
    switch (i) {
      case 1:
        cache[i % 2] = 1;
        break;
      case 2:
        cache[i % 2] = 2;
        break;
      default:
        cache[i % 2] = cache[(i - 1) % 2] + cache[(i - 2) % 2];
    }

    return cache[i % 2];
  }

  for (let i = 1; i <= n; i++) {
    _dp(i);
  }

  return cache[n % 2];
}

// console.log(dp_no_cache(10));

// 最大子序列合
function maxChildArray(array) {
  let sum = array[0];
  let cache = array[0];
  for (let i = 0; i < array.length; i++) {
    if (cache <= 0) {
      cache = array[i];
    } else {
      cache += array[i];
    }
    if (cache >= sum) sum = cache;
  }
  return sum;
}

console.log(maxChildArray([0, 1, -1, 2, -1, 1, -1]))

// LIS
function lengthOfLIS(nums) {
  if (nums.length === 0) {
    return 0;
  }
  let dp = [];
  dp[0] = 1;
  let maxans = 1;
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxans = Math.max(maxans, dp[i]);
  }
  return maxans;
}

console.log()
