function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const r = {
  val: 1,
  left: {
    val: 2,
  },
  right: {
    val: 4,
    left: {
      val: 3
    }
  }
};


// 二叉搜索树
function search(root, n) {
  if (!root) return;
  if (root.val === n) {
    console.log(root.val);
  } else if (root.val < n) {
    search(root.left, n);
  } else {
    search(root.right, n);
  }
}



// 二叉搜索树插入节点
function insertIntoBST(root, n) {
  if (!root) {
    root = new TreeNode(n);
    return root;
  }
  // 假如对应的子树有问题，继续
  if (n > root.val) {
    root.left = insertIntoBST(root.left, n);
  } else {
    root.right = insertIntoBST(root.right, n)
  }
  return root;
}

console.log('insertIntoBST', JSON.stringify(insertIntoBST(r, 3)))

function deleteNode(root, n) {
  if (!root) return;
  if (root.val === n) {
    // 若是叶子节点，直接修改为空即可
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      // 寻找左子树里值最大的节点
      const maxLeft = findMax(root.left);
      // 用这个值覆盖掉当前需要删除的节点
      root.val = maxLeft;
      // 覆盖动作会影响到原来maxLeft所在位置的节点
      root.left = deleteNode(root.left, maxLeft);
    } else {
      // 寻找右子树里值最小的节点
      const minRight = finMin(root.right);
      // 用这个值替换掉当前需要删除的节点
      root.val = minRight;
      // 需要处理空出的节点
      root.right = deleteNode(root.right, minRight);
    }
  } else if (root.val > n) {
    root.left = deleteNode(root.left, n);
  } else {
    root.right = deleteNode(root.right, n);
  }

  function findMax(root) {
    while (root.right) {
      root = root.right;
    }
    return root.val;
  }
  function finMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root.val;
  }
}


// 验证BST
function isValidBst(r) {
  function dfs(root, min, max) {
    // 空树合法
    if (!root) return true;
    // 若右子树不大于根节点，或者左子树不小于根节点就有问题
    if (root.val <= min || root.val >= max) return false;
    return dfs(root.left, min, root.val) && dfs(root.right, root.val, max)
  }
  return dfs(r, -Infinity, Infinity);
}

function sortArrayToBst(numbers) {
  if (!numbers.length) return null;

  const root = buildBts(0, numbers.length - 1);

  function buildBts(low, high) {
    if (low > high) {
      return null;
    }
    const mid = Math.floor(low + (high - low) / 2);
    const cur = new TreeNode(numbers[mid]);
    cur.left = buildBts(low, mid);
    cur.right = buildBts(mid, high);
    return cur;
  }
  return root;
}
