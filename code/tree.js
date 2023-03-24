const root = {
  val: 3,
  left: {
    val: 20,
    left: {
      val: 1
    }
  },
  right: {
    val: 5,
    right: {
      val: 6
    }
  }
};

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

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

function BFS(root) {
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const top = queue[0];
    console.log(top.val);
    if (top.left) queue.push(top.left);
    if (top.right) queue.push(top.right);
    queue.shift();
  }
}

const permute = function (numbers) {
  const len = numbers.length;
  const curr = [];
  const res = [];
  const visited = {};
  function dfs(nth) {
    if (nth === len) {
      res.push(curr.slice());
    }
    for (let i = 0; i < len; i++) {
      if (!visited[numbers[i]]) {
        visited[numbers[i]] = 1;
        curr.push(numbers[i]);
        dfs(nth + 1);
        curr.pop();
        visited[numbers[i]] = 0;
      }
    }
  }
  // 从索引为 0 的坑位（也就是第一个坑位）开始 dfs
  dfs(0)
  return res
}

const sunsets = function (numbers) {
  const res = [];
  const len = numbers.length;
  const subset = [];

  dfs(0);

  function dfs(index) {
    res.push(subset.slice());
    for (let i = index; i < len; i++) {
      subset.push(numbers[i]);
      dfs(i + 1);
      subset.pop();
    }
  }
  return res;
}

const combine = function (n, k) {
  const res = [];
  const subset = [];

  dfs(1);

  function dfs(index) {
    if (subset.length === k) {
      res.push(subset.slice());
      return;
    }
    for (let i = index; i <= n; i++) {
      subset.push(i);
      dfs(i + 1);
      subset.pop();
    }
  }
  return res;
}

const preOrderTraversal = function (root) {
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

const postOrderTraversal = function (root) {
  const res = [];
  if (!root) return res;
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.unshift(cur.val);
    if (cur.left) stack.push(cur.left);
    if (cur.right) stack.push(stack.right);
  }
  return res;
}

const inOrderTraversal = function (root) {
  const res = [];
  const stack = [];
  const cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}

const levelOrder = function (root) {
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

const invertTree = function (root) {
  if (!root) return root;
  let right = invertTree(root.right);
  let left = invertTree(root.left);
  root.left = right;
  root.right = left;
  return root;
}

function search(root, n) {
  if (!root) return;
  if (root.val === n) {
    //
    console.log('目标结点是：', root)
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
  }
  if (root.val > n) {
    root.left = insertIntoBst(root.left, n);
  } else {
    root.right = insertIntoBst(root.right, n);
  }
  return root;
}

function deleteNode(root, n) {
  if (!root) return root;
  if (root.val === n) {
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      // 左边有东西
      const maxLeft = findMax(root.left);
      root.val = maxLeft.val;
      root.left = deleteNode(root.left, maxLeft.val);
    } else {
      // 右边有东西
      const minRight = findMin(root.right);
      root.val = minRight.val;
      root.right = deleteNode(root.right, minRight.val);
    }

  } else if (root.val > n) {
    root.left = deleteNode(root.left, n);
  } else {
    root.right = deleteNode(root.right, n);
  }
  return root;

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
}

const isValidBst = function (root) {
  function dfs(root, min, max) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return dfs(root.left, min, root.val) && dfs(root.right, root.val, max);
  }
  return dfs(root, -Infinity, Infinity);
}

const sortArrayToBst = function (numbers) {
  if (numbers.left === 0) return null;
  const root = build(0, numbers.length - 1);
  function build(left, right) {
    if (left > right) return null;
    const mid = Math.floor(left + (right - left) / 2);
    const cur = new TreeNode(numbers[mid]);
    cur.left = build(left, mid - 1);
    cur.right = build(mid + 1, right);
    return cur;
  }
  return root;
}

const findKthLargest = function (numbers, k) {
  const heap = [];
  let n = 0;
  const len = numbers.length;

  createHeap();
  updateHeap();
  return heap[0];

  function createHeap() {
    for (let i = 0; i < k; i++) {
      insert(numbers[i]);
    }
  }

  function updateHeap() {
    for (let i = k; i < len; i++) {
      if (numbers[i] > heap[0]) {
        heap[0] = numbers[i];
        downHeap(0, k);
      }
    }
  }

  function upHeap(low, high) {
    let i = high;
    let j = Math.floor((i - 1) / 2);
    while (j >= low) {
      if (heap[i] > heap[j]) {
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;

        i = j;
        j = Math.floor((i - 1) / 2);
      } else {
        break;
      }
    }
  }

  function downHeap(low, high) {
    let i = low, j = 2 * i + 1;
    while (j <= high) {
      if (j + 1 <= high && heap[j + 1] < heap[j]) {
        j = j + 1;
      }
      if (heap[i] > heap[j]) {
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;

        i = j;
        j = 2 * i + 1;
      } else {
        break;
      }
    }
  }

  function insert(x) {
    heap[n] = x;
    upHeap(0, n);
    n++;
  }
}


console.log(JSON.stringify(findKthLargest([3,2,1,5,6,4], 2)));
