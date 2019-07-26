/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */


var addTwoNumbers = function (l1, l2) {
  var getVal = (ln, val, f) => {
    if (!ln.next) {
      return val + (ln.val) * (Math.pow(10, f));
    }
    let _val = (ln.val) * (Math.pow(10, f)) + val;
    return getVal(ln.next, _val, f + 1);
  }
  var getListNode = (listNode, arr) => {
    let _arr = arr.splice(0, 1);
    if (arr.length > 0) {
      let _listNode = {
        val: _arr[0],
        next: listNode
      }
      return getListNode(_listNode, arr);
    } else {
      return {
        val: _arr[0],
        next: listNode,
      }
    }
  }
  let _sum = (Array.from('' + (getVal(l1, 0, 0) + getVal(l2, 0, 0))));
  return getListNode(null, _sum);
};
let l1 = { val: 2, next: { val: 4, next: { val: 3, next: null } } };
let l2 = { val: 7, next: { val: 0, next: { val: 8, next: null } } };
console.log(JSON.stringify(addTwoNumbers(l1, l2)));