const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};

function preOrder(root) {
  if (!root) return;
  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

function inOrder(root) {
  if (!root) return;
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
}

function postOrder(root) {
  if (!root) return; d
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
}

function levelOrder(root) {
  const queue = [];
  queue.push(root);
  while (queue.length > 0) {
    const top = queue.shift();
    console.log(top.val); // 访问当前遍历的位置
    if (top.left) queue.push(top.left);
    if (top.right) queue.push(top.right);
  }
}

function preOrderTraversal(root) {
  const res = [];
  if (!root) return res;
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.push(cur.val);
    if (cur.right) stack.push(cur.right);
    if (cur.left) stack.push(cur.left);
  }
  return res;
}

function postOrderTraversal(root) {
  const res = [];
  if (!root) return res;
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.unshift(cur.val);
    if (cur.left) stack.push(cur.left);
    if (cur.right) stack.push(cur.right);
  }
  return res;
}

function inOrderTraversal(root) {
  const res = [];
  // 都是使用栈来记录路径
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      // 要学会cur = cur.left这个技巧
      cur = cur.left;
    }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}

function levelOrderGroup(root) {
  const res = [];
  if (!root) return res;
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const level = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const top = queue.shift();
      level.push(top.val);
      if (top.left) queue.push(top.left);
      if (top.right) queue.push(top.right);
    }
    res.push(level);
  }
  return res;
}

function invertTree(root) {
  if (!root) return;
  let right = invertTree(root.right);
  let left = invertTree(root.left);
  root.left = right;
  root.right = left;
  return root;
}

function search(root, n) {
  if (!root) return;
  if (root.val === n) {
    console.log('结束', root);
  } else if (root.val > n) {
    search(root.left, n);
  } else {
    search(root.right, n);
  }
}

function insertIntoBst(root, n) {
  if (!root) {
    root = new TreeNode(n);
    return root;
  } else if (root.val > n) {
    root.left = insertIntoBst(root.left, n);
  } else {
    root.right = insertIntoBst(root.right, n)
  }
  return root;
}

function deleteNode(root, n) {

  function findMax(root) {
    while (root.right) {
      root = root.right;
    }
    return root.val;
  }

  function findMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root.val;
  }

  if (!root) return root;
  if (root.val === n) {
    // 先判断是不是叶子节点
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      //左子树存在
      const maxLeft = findMax(root.left);
      root.val = maxLeft;
      root.left = deleteNode(root.left, maxLeft);
    } else {
      const minRight = findMin(root.right);
      root.val = minRight;
      root.right = deleteNode(root.right, minRight);
    }
  } else if (root.val > n) {
    root.left = deleteNode(root.left, n);
  } else {
    root.right = deleteNode(root.right, n);
  }
  return root;
}

function isValidBst(root) {
  function dfs(root, minValue, maxValue) {
    if (!root) return true;
    if (root.val >= maxValue || root.val <= minValue) return false;
    return dfs(root.left, minValue, root.val) && dfx(root.right, root.val, maxValue);
  }
  return dfs(root, -Infinity, Infinity)
}

function sortedArrayToBSR(numbers) {
  if (!numbers.length) return null;
  const root = buildBST(0, numbers.length - 1);
  function buildBST(low, high) {
    if (low > high) return null;
    const mid = Math.floor(low + (high - low) / 2);
    const cur = new TreeNode(numbers[mid]);
    cur.left = buildBST(low, mid - 1);
    cur.right = buildBST(mid + 1, high);
    return cur;
  }
  return root;
}

function isBalanced(r) {
  const flag = true;
  function dfs(root) {
    if (!root || !flag) return 0;
    const left = dfs(root.left);
    const right = dfs(root.right);
    if (Math.abs(left - right) > 1) {
      flag = false;
      return 0;
    }
    return Math.max(left, right) + 1;
  }
  dfs(r);
  return flag;
}

function balancedBST(root) {
  const numbers = [];
  function inOrder(root) {
    if (!root) return;
    inOrder(root.left);
    numbers.push(root.val);
    inOrder(root.right);
  }
  function buildAVL(numbers) {
    if (!numbers.length) return null;
    function dfs(low, high) {
      if(low > high) return null;
      const mid = Math.floor(low + (high - low) / 2);
      const cur = new TreeNode(numbers[mid]);
      cur.left = dfs(low, mid - 1);
      cur.right = dfs(mid + 1, high);
      return cur;
    }
    return dfs(0, numbers.length - 1);
  }
  inOrder(root)
  return buildAVL(numbers);
}

// heap



console.log(deleteNode(root, 'D'));

