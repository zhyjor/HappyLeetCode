function bubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function bubbleSort2(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function betterBubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    let flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    if (flag === false) return arr;
  }
  return arr;
}

function selectSort(arr) {
  const len = arr.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

function insertSort(arr) {
  const len = arr.length;
  let temp;
  for (let i = 0; i < len; i++) {
    let j = i;
    temp = arr[i];
    // 只比较前面的数据
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

function mergeSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  const mid = Math.floor(len / 2);
  const leftArr = mergeSort(arr.slice(0, mid));
  const rightArr = mergeSort(arr.slice(mid, len));
  arr = mergeArr(leftArr, rightArr);
  return arr;
  function mergeArr(arr1, arr2) {
    let i = 0, j = 0;
    const res = [];
    const len1 = arr1.length;
    const len2 = arr2.length;
    while (i < len1 && j < len2) {
      if (arr1[i] < arr2[j]) {
        res.push(arr1[i]);
        i++;
      } else {
        res.push(arr2[j]);
        j++;
      }
    }
    if (i < len1) {
      return res.concat(arr1.slice(i));
    } else {
      return res.concat(arr2.slice(j));
    }
  }
}

function quickSort11(arr, left = 0, right = arr.length - 1) {
  if (arr.length > 1) {
    const lineIndex = partition(arr, left, right);
    if (left < lineIndex - 1) {
      quickSort(arr, left, lineIndex - 1);
    }
    if (right > lineIndex) {
      quickSort(arr, lineIndex, right);
    }
  }
  return arr;
  function partition(arr, left, right) {
    let pivotValue = arr[Math.floor(left + (right - left) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
      while (arr[i] < pivotValue) {
        i++;
      }
      while (arr[j] > pivotValue) {
        j--;
      }
      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }
    return i;
  }
  function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
  }
}

function quickSort22(arr, left = 0, right = arr.length - 1) {

  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort2(arr, left, pivotIndex - 1);
    quickSort2(arr, pivotIndex + 1, right);
  }
  return arr;
  function partition(arr, left, right) {
    const pivot = arr[left]; // 分界
    while (left < right) {
      while (left < right && arr[right] >= pivot) {
        right--;
      }
      arr[left] = arr[right];
      while (left < right && arr[left] <= pivot) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
  }
}

/**
 * 这个方法是先将pivot拿出来，将拿出pivot的位置作为一个中转点
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @returns
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
  function partition(arr, left, right) {
    // 因为快排不会新建一个数组，因此需要判断预留位置用来做第一次交换，所以需要先移动右边的数据
    const pivot = arr[left];
    while (left < right) {
      while (left < right && arr[right] >= pivot) {
        right--;
      }
      arr[left] = arr[right];
      while (left < right && arr[left] <= pivot) {
        left++;
      }
      arr[right] = arr[left];
    }
    // left === right，一轮已经结束
    arr[left] = pivot;
    return arr;
  }
}

// 基准点选谁并不重要，两个指针碰面的时候，一定满足已经将基准点送到了指定的位置，
function quickSort2(arr, left = 0, right = arr.length - 1) {
  // 用中间点作为基准分割，最终的目标是基准点左边不能有大于基准的，右边不能有小于的
  if (left < right) {
    const midIndex = partition(arr, left, right);
    quickSort2(arr, left, midIndex - 1);
    quickSort2(arr, midIndex + 1, right);
  }
  return arr;
  function partition(arr, left, right) {
    let pivot = arr[Math.floor(left + (right - left) / 2)];
    while (left < right) {
      while (arr[left] < pivot) {
        left++;
      }
      while (arr[right] > pivot) {
        right--;
      }
      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }
    return left;
  }
}

// 快速排序入口
function quickSort111(arr, left = 0, right = arr.length - 1) {
  // 定义递归边界，若数组只有一个元素，则没有排序必要
  if(arr.length > 1) {
      // lineIndex表示下一次划分左右子数组的索引位
      const lineIndex = partition(arr, left, right)
      // 如果左边子数组的长度不小于1，则递归快排这个子数组
      if(left < lineIndex-1) {
        // 左子数组以 lineIndex-1 为右边界
        quickSort(arr, left, lineIndex-1)
      }
      // 如果右边子数组的长度不小于1，则递归快排这个子数组
      if(lineIndex<right) {
        // 右子数组以 lineIndex 为左边界
        quickSort(arr, lineIndex, right)
      }
  }
  return arr
}
// 以基准值为轴心，划分左右子数组的过程
function partition(arr, left, right) {
  // 基准值默认取中间位置的元素
  let pivotValue = arr[Math.floor(left + (right-left)/2)]
  // 初始化左右指针
  let i = left
  let j = right
  // 当左右指针不越界时，循环执行以下逻辑
  while(i<=j) {
      // 左指针所指元素若小于基准值，则右移左指针
      while(arr[i] < pivotValue) {
          i++
      }
      // 右指针所指元素大于基准值，则左移右指针
      while(arr[j] > pivotValue) {
          j--
      }

      // 若i<=j，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
      if(i<=j) {
          swap(arr, i, j)
          i++
          j--
      }

  }
  // 返回左指针索引作为下一次划分左右子数组的依据
  return i
}

// 快速排序中使用 swap 的地方比较多，我们提取成一个独立的函数
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

console.log(quickSort111([5, 1, 2, 3, 4, 2, 1, 1,3]));
