function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
  return arr;
  function partition(arr, left, right) {
    let pivotValue = arr[left];
    while (left < right) {
      while (left < right && arr[right] >= pivotValue) {
        right--;
      }
      arr[left] = arr[right];
      while (left < right && arr[left] <= pivotValue) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = pivotValue;
    return left;
  }
}

function quickSort2(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const stack = [];
    stack.push({ left, right });
    while (stack.length > 0) {
      const { left, right } = stack.pop();

      const pivot = partition(arr, left, right);
      if (left < pivot - 1) {
        stack.push({ left, right: pivot - 1 });
      }
      if (right > pivot + 1) {
        stack.push({ left: pivot + 1, right });
      }
    }
  }
  return arr;
  function partition(arr, left, right) {
    const pivotValue = arr[left];
    while (left < right) {
      while (left < right && arr[right] >= arr[left]) {
        right--;
      }
      arr[left] = arr[right];
      while (left < right && arr[left] <= arr[right]) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = pivotValue;
    return left;
  }
}

console.log(quickSort2([3, 2, 2, 2, 1, 2, 3, 4]))
