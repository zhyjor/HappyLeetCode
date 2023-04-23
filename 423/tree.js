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
  if(!root) return;
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
}

function postOrder(root) {
  if(!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
}
console.log(postOrder(root));
