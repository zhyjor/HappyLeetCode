function twoSum(array, target) {
  const map = {};
  for (let i = 0, len = array.length; i < len; i++) {
    if (map[array[i]] !== undefined) {
      return [map[array[i]], i];
    } else {
      map[target - array[i]] = i;
    }
  }

}

console.log(twoSum([1, 2, 3], 4))
