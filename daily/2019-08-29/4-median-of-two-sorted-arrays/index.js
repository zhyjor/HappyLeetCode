/**
 * // 先排序，再找中位数
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  var array1 = nums1.concat(nums2);
  var array = quickSort2(array1, 0, array1.length - 1);
  var len = array.length / 2;
  if (len === 0.5) {
    return array[0];
  }
  var middle = 0;
  if (len % 1 !== 0) {
    middle = array[Math.floor(len)]
  } else {
    middle = (array[len - 1] + array[len]) / 2;
  }
  return middle;

  function partition2(arr, low, high) {
    let pivot = arr[low]
    while (low < high) {
      while (low < high && arr[high] > pivot) {
        high--
      }
      arr[low] = arr[high]
      while (low < high && arr[low] <= pivot) {
        ++low
      }
      arr[high] = arr[low]
    }
    arr[low] = pivot
    return low
  }

  function quickSort2(arr, low, high) {
    if (low < high) {
      let pivot = partition2(arr, low, high)
      quickSort2(arr, low, pivot - 1)
      quickSort2(arr, pivot + 1, high)
    }
    return arr
  }
};

console.log(findMedianSortedArrays([1, 3], [2]))
