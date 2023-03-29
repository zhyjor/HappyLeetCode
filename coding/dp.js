const f = [];

function climbStairs(n) {
  if (n === 1) f[n] = 1;
  if (n === 2) f[n] = 2;

  if (f[n] === undefined) f[n] = climbStairs(n - 1) + climbStairs(n - 2);
  return f[n];
}

function realClimbStairs(n) {
  const f = [];
  f[1] = 1;
  f[2] = 2;
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 2] + f[i - 1];
  }
  return f[n];
}

function coinsChange(coins, amount) {
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

console.log(realClimbStairs(10))
