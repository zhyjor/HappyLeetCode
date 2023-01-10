/**
 * 使用堆解决「优先队列」问题
 *
 * 1: 队列的头部元素，也就是索引为0的元素是整个数组种的最值
 * 2: 对于索引为i的元素，父节点是（i-1）/2
 * 3: 对于索引为i的元素，左子节点是2i+1, 右子为2i+2
 *
 * 当题目中出现“第k大”或者“第k高“这样的关键字时，就是在暗示你用优先队列/堆结构来做题
 */

/**
 * https://www.jianshu.com/p/6b526aa481b1
 * 1: 堆操作的基本方法
 */

/**
 *
 * @param {*} low
 * @param {*} high
 */

function downHeap(low, high) {
  // i为当前节点，j为左子
  let i = low, j = i * 2 + 1;
  while (j <= high) {
    // 子还未越界
    // 先找最大的子
    if (j + 1 <= high && heap[j + 1] > heap[i]) {
      j = i + 1;
    }
    if (heap[i] < heap[j]) {
      // 交换位置
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;

      // 更换
      i = j;
      j = j * 2 + 1;
    } else {
      break;
    }
  }
}

function upHeap(low, high) {
  let i = high;
  let j = Math.floor((i - 1) / 2);
  while (j > low) {
    if (heap[j] < heap[i]) {
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
      i = j;
      j = Math.floor((j - 1) / 2);
    } else {
      break;
    }
  }
}

function findKthLargest(numbers, k) {
  const heap = []; //  长度为k
  let n = 0;
  const len = numbers.length;
  function createHeap() {
    for (let i = 0; i < k; i++) {
      insert(numbers[i]);
    }
  }
  function updateHeap() {
    for (let i = k; i < len; i++) {
      if (numbers[i] > heap[0]) {
        heap[0] = numbers[i];
        downHeap(0, k);
      }
    }
  }
  function insert(x) {
    heap[n] = x;
    upHeap(0, n);
    n++;
  }
  createHeap();
  updateHeap();
  return heap[0];
}
