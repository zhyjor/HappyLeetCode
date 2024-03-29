/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let x = 0; x < nums.length; x++) {
    for (let y = x + 1; y < nums.length; y++) {
      if (nums[x] + nums[y] === target) {
        return [x, y];
      }
    }
  }
  return null;
};

const nums = [2, 7, 11, 15], target = 17;
console.log(twoSum(nums, target));

function twoSum2(numbers, target) {
  // 用一个对象缓存已经计算的结果
  const diffs = {};
  // 缓存数组长度
  const len = numbers.length;
  for (let i = 0; i < len; i++) {
    if (diffs[numbers[i]] !== undefined) {
      return [diffs[numbers[i]], i];
    } else {
      diffs[target - numbers[i]] = i;
    }
  }
}
console.log(twoSum2(nums, target));

function twoSum3(numbers, target) {
  const diffs = new Map();
  const len = numbers.length;
  for (let i = 0; i < len; i++) {
    if (diffs.get(target - numbers[i]) !== undefined) {
      return [diffs.get(target - numbers[i]), i];
    }
    diffs.set(numbers[i], i);
  }
}
console.log(twoSum3(nums, target));
