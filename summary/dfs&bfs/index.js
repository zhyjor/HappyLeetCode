const subsets = (nums) => {
  const res = [];
  const len = nums.length;
  const subset = [];
  dfs(0);

  function dfs(index) {
    console.log('0', subset)
    res.push(subset.slice());
    // console.log(res);
    for (let i = index; i < len; i++) {
      subset.push(nums[i]);
      console.log('1', subset)
      dfs(i + 1);
      subset.pop();
      console.log('2', subset)
    }
  }

}

subsets([1,2,3])
