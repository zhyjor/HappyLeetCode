const twoSum = (numbers, target) => {
  const diffs = {};
  const len = numbers.length;
  for (let i = 0; i < len; i++) {
    if (diffs[target - numbers[i]] !== undefined) {
      return [diffs[target - numbers[i]], i];
    }
    diffs[numbers[i]] = i;
  }
}
console.log(twoSum([2, 7, 11, 15], 9))

const merge = (numbers1, m, numbers2, n) => {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (numbers1[i] >= numbers2[j]) {
      numbers1[k] = numbers1[i];
      k--;
      i--;
    } else {
      numbers1[k] = numbers2[j];
      k--;
      j--;
    }
  }
  while (j >= 0) {
    numbers1[k] = numbers2[j];
    k--;
    j--;
  }
  return numbers1;
}

console.log(merge([1, 2, 3], 3, [2, 4], 2))

const threeSum = (numbers) => {
  let res = [];
  // 排序
  numbers = numbers.sort((a, b) => a - b);
  const len = numbers.length;
  // 遍历到倒数第三个就可以
  for (let i = 0; i < len - 2; i++) {
    // 定义左右指针
    let j = i + 1, k = len - 1;
    if (i > 0 && numbers[i] === numbers[i - 1]) continue;
    while (j < k) {
      if (numbers[i] + numbers[j] + numbers[k] < 0) {
        j++;
        if (j < k && numbers[j] === numbers[j - 1]) {
          j++
        }
      } else if (numbers[i] + numbers[j] + numbers[k] > 0) {
        k--;
        if (k > j && numbers[k] === numbers[k + 1]) {
          k--;
        }
      } else {
        res.push([numbers[i], numbers[j], numbers[k]]);
        j++;
        k--;
        while (j < k && numbers[j] === numbers[j - 1]) {
          j++;
        }
        while (k > j && numbers[k] === numbers[k + 1]) {
          k--;
        }
      }
    }
  }
  return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
