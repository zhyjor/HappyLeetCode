function bubbleSort(numbers) {
  const len = numbers.length;
  // 每次找到第一个最大的
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]]
      }
    }
  }
  return numbers;
}

function bubbleSort2(numbers) {
  const len = numbers.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]]
      }
    }
  }
  return numbers;
}

const array = [2, 3, 4, 1, 2, 5];

console.log('bubbleSort2:', bubbleSort2(array));
