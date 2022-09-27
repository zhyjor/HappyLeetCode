const r = {
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

function BinaryTree(val) {
  this.val = val;
  this.left = this.right = null;
}

// 递归方式
// 前序
function preOrder(root) {
  if (!root) return;
  console.log('当前遍历的节点是：', root.val);
  // 遍历左子树
  preOrder(root.left);
  // 遍历右侧子树
  preOrder(root.right);
}

function preOrderTraversal(root) {
  const result = [];
  if (!root) return;

  // 初始化栈结构
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const cur = stack.pop();
    result.push(cur.val);

    if (cur.right) stack.push(cur.right);
    if (cur.left) stack.push(cur.left);
  }
  return result;
}


// 中序遍历
function inOrder(root) {
  if (!root) return;
  // 先遍历左子树，只要有左子树就递归进去
  inOrder(root.left);
  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val);
  inOrder(root.right);
}

function inOrderTraversal(root) {
  const result = [];
  if (!root) return;

  const stack = [];
  let cur = root;
  while (cur || stack.length > 0) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    result.push(cur.val);
    // 尝试读取右节点的孩子
    cur = cur.right;
  }
  return result;
}
console.log('inOrderTraversal', inOrderTraversal(r));

// 后续遍历
function postOrder(root) {
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val);
}

function postOrderTraversal(root) {
  const result = [];
  if (!root) {
    return;
  }

  const stack = [];
  stack.push(root);

  while (stack.length > 0) {
    const cur = stack.pop();
    result.unshift(cur.val);
    if (cur.left) stack.push(cur.left);
    if (cur.right) stack.push(cur.right);
  }
  return result;
}
console.log('postOrderTraversal', postOrderTraversal(r));

// 分层遍历，上一层记住下一层的
function levelOrder(root) {
  const result = [];
  if (!root) return result;
  // 记住第一层
  const queue = [];
  queue.push(root);
  while (queue.length > 0) {
    // 储存节点
    const level = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      // 取出队首元素
      const top = queue.shift();
      level.push(top.val);
      if (top.left) queue.push(top.left);
      if (top.right) queue.push(top.right);
    }
    result.push(level)
  }
  return result;
}
console.log('levelOrder', levelOrder(r));

// 有重复的最小问题，有子问题的时候就继续执行知道，最终的子问题
function invertTree(root) {
  if(!root) return;
  let right = invertTree(root.right);
  let left = invertTree(root.left);
  root.right = left;
  root.left = right;
  return root;
}
console.log('invertTree', invertTree(r));
