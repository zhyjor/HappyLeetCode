function isBalanced(root) {
  let flag = true; // 高度差
  function dfs(root) {
    if (!root || !flag) return 0;

    // 计算左边的高度
    const left = dfs(root.left);
    const right = dfs(root.right);

    if (Math.abs(left - right) > 1) {
      flag = false;
      return 0;
    }
    return Math.max(left, right) + 1;
  }
  dfs(root);
  return flag;
}

var balanceBST = function (root) {
  const numbers = [];
  function inOrder(r) {
      if (!r) return;
      inOrder(r.left);
      numbers.push(r.val);
      inOrder(r.right);
  }
  function buildAVL(low, high) {
      if (low > high) return null;
      const mid = Math.floor(low + (high - low) / 2);
      const cur = new TreeNode(numbers[mid]);
      cur.left = buildAVL(low, mid - 1);
      cur.right = buildAVL(mid + 1, high);
      return cur;
  }
  inOrder(root);
  return buildAVL(0, numbers.length - 1);
};
