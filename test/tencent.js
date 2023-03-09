function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}


function publicParent(root, p, q) {
  function dfs(root) {
    // 注意退出递归的条件
    if(!root || root === p || root === q) {
      // 空，或者找到了一个
      return root;
    }
    const leftNode = dfs(root.left);
    const rightNode = dfs(root.right);

    if(leftNode && rightNode) {
      return root;
    }
    return leftNode || rightNode;
  }
  return dfs[root];
}
