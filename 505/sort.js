const test = [6, 5, 1, 3, 6, 2, 0, 7, 6];

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let flag = false;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j + 1] < arr[j]) {
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
  for (let i = 0; i < len; i++) {
    let minIndex = i;
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
  for (let i = 1; i < len; i++) {
    const temp = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

function mergeSort(arr) {
  const len = arr.length;
  if (len === 1) return arr;

  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid, len));
  const res = mergeArray(left, right);
  return res;

  function mergeArray(arr1, arr2) {
    const len1 = arr1.length;
    const len2 = arr2.length;
    let i = 0, j = 0;
    let result = [];
    while (i < len1 && j < len2) {
      if (arr1[i] < arr2[j]) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }
    if (i < len1) {
      result = result.concat(arr1.slice(i))
    } else {
      result = result.concat(arr2.slice(j));
    }
    return result;
  }
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
  function partition(arr, left, right) {
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
    arr[left] = pivot;
    return left;
  }
}

console.log(quickSort(test));
