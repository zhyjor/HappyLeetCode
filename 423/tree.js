function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
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
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
}

function levelOrder(root) {
  if (!root) return;
  const queue = [];
  queue.push(root);
  while (queue.length > 0) {
    const top = queue.shift();
    console.log(top.val);
    if (top.left) queue.push(top.left);
    if (top.right) queue.push(top.right);
  }
}

function preOrderTraversal(root) {
  const res = [];
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.push(cur.val);
    if (cur.left) stack.push(cur.left);
    if (cur.right) stack.push(cur.right);
  }
  return res;
}

function postOrderTraversal(root) {
  const res = [];
  const stack = [];
  stack.push(root);
  while(stack.length) {
    const cur = stack.pop();
    res.unshift(cur.val);
    if (cur.right) stack.push(cur.right);
    if (cur.left) stack.push(cur.left);
  }
  return res;
}

function inOrderTraversal(root) {
  const res = [];
  const stack = [];
  let cur = root;
  while(cur || stack.length > 0) {
    while(cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}

function invertTree(root) {
  if(!root) return root;
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}



console.log(invertTree(root));
