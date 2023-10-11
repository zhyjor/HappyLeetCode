function kmp(haystack, needle) {
  if (needle.length === 0) return -1;
  function getNext() {
    let j = 0;
    let next = [];
    next.push(j);
    for (let i = 1; i < needle.length; i++) {
      while (j > 0 && needle[i] !== needle[j]) {
        j = next[j - 1];
      }
      if (needle[i] === needle[j]) {
        j++;
      }
      next.push(j);
    }
    return next;
  }
  const next = getNext();
  let j = 0;
  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1];
    }
    if (haystack[i] === needle[j]) {
      j++;
    }
    if (j === needle.length) {
      return i - j + 1;
    }
  }
  return -1;
}

function preOrderT(root) {
  const result = [];
  if (!root) return result;
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const top = stack.pop();
    result.push(top.val);
    if (top.right) stack.push(top.right);
    if (top.left) stack.push(top.left);
  }
  return result;
}

function inOrderT(root) {
  const result = [];
  if (!root) return root;
  const stack = [];
  let cur = root;
  while (cur || stack.length > 0) {
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      cur = stack.pop();
      result.push(cur.val);
      cur = cur.right;
    }
  }
  return result;
}

function flatten(root) {
  let pre = null;
  function dfs(root) {
    if (!root) return root;
    dfs(root.right);
    dfs(root.left);
    root.left = null;
    root.right = pre;
    pre = root;
  }
  dfs(root);
  return root;
}

function lowestCommonAncestor(root, p, q) {
  function dfs(root) {
    if (root === null || root === p || root === q) return root;
    const left = dfs(root.left);
    const right = dfs(root.right);
    if (left && right) return root;
    if (right) return right;
    if (left) return left;
  }
  return dfs(root);
}

function convert(root) {
  let pre = 0;
  function dfs(root) {
    if (root) {
      dfs(root.right);
      root.val += pre;
      pre = root.val;
      dfs(root.left);
    }
  }
  dfs(root);
  return root;
}

function subarraySum(nums,k) {
  let sum = 0, result = 0, map = {};
  map[0] = 1;
  for(let item of nums) {
    if(map[sum-k]) {
      result += map[sum-k];
    }
    if(map[sum] !== undefined) {
      map[sum] = map[sum] + 1;
    } else {
      map[sum] = 1;
    }
  }
  return result;
}

function findMinArrowShots(points) {
  if(points.length === 0) return 0;
  const sortPoints = points.sort((a,b) => {
    return a[0] - b[0];
  });
  let result = 1;
  for(let i = 1; i<= sortPoints.length-1;i++) {
    if(sortPoints[i][0] > sortPoints[i-1][1]) {
      result++;
    } else {
      sortPoints[i][1] = Math.min(sortPoints[i-1][1], sortPoints[i][1]);
    }
  }
  return result;
}
