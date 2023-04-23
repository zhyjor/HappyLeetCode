function twoSum(nums, target) {
  let len = nums.length;
  let diffs = {};
  for (let i = 0; i < len; i++) {
    if (diffs[target - nums[i]] !== undefined) {
      return [diffs[target - nums[i]], i]
    }
    diffs[nums[i]] = i;
  }
}

function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i--;
      k--;
    } else {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }
  while (j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }
  return nums1;
}



console.log(merge([2, 7, 11, 15], 4, [1, 3, 5], 3))
