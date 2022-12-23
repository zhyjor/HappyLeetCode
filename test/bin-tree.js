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
  if(!root) return;
  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

function inOrder(root) {
  if(!root) return;
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
}

function postOrder(root) {
  if(!root) return;d
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
}

function levelOrder(root) {
  const queue = [];
  queue.push(root);
  while(queue.length > 0) {
    const top = queue.shift();
    console.log(top.val); // 访问当前遍历的位置
    if(top.left) queue.push(top.left);
    if(top.right) queue.push(top.right);
  }

}

levelOrder(root);
