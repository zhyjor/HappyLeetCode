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
    // 区别在这里，我们加了一个标志位
    let flag = false;
    for (let j = 0; j < len - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
        // 只要发生了一次交换，就修改标志位
        flag = true;
      }
    }
    // 若一次交换也没发生，则说明数组有序，直接放过
    if(!flag) return numbers;
  }
  return numbers;
}

const array = [2, 3, 4, 1, 2, 5];

console.log('bubbleSort2:', bubbleSort2(array));

const Writable = require('stream').Writable;
const writer = new Writable({
  test(chunk, encoding, callback) {
    // 比 process.nextTick() 稍慢
    setTimeout(() => {
      callback && callback();
    });
  }
});
