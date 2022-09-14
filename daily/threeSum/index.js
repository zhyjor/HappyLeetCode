function threeSum(numbers) {
  let result = [];
  numbers = numbers.sort((a, b) => a - b);

  const len = numbers.length;
  for (let i = 0; i < len - 2; i++) {
    // 每次需要重新设置指针
    let j = i + 1;
    let k = len - 1;
    if (i > 0 && numbers[i] === numbers[i - 1]) {
      continue;
    }

    while (j < k) {
      if (numbers[i] + numbers[j] + numbers[k] < 0) {
        j++;
        while (j < k && numbers[j] === numbers[j - 1]) {
          j++;
        }
      } else if (numbers[i] + numbers[j] + numbers[k] > 0) {
        k--;
        while (j < k && numbers[k] === numbers[k + 1]) {
          k--;
        }
      } else {
        result.push([numbers[i], numbers[j], numbers[k]]);
        j++;
        while (j < k && numbers[j] === numbers[j - 1]) {
          j++;
        }
        k--;
        while (j < k && numbers[k] === numbers[k + 1]) {
          k--;
        }
      }
    }
  }
  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
