function getMPowN(m, n) {
  // 分组
  return part(1, n);

  function part(left, right) {
      if (left === right) {
          return m;
      }
      const mid = Math.floor((left + right) / 2);
      const res1 = part(left, mid);
      const res2 = part(mid + 1, right);
      return res1 * res2;
  }
}

console.log(getMPowN(3,5))
