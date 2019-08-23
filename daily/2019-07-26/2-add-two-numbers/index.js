/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}


var addTwoNumbers = function (l1, l2) {
  let res = new ListNode(-1),
    dummy = res, // dummy的对应地址是res
    sum = 0, carry = 0;
    while(l1 || l2 || sum > 0){
      if(l1){
        sum += l1.val;
        l1 = l1.next;
      }
      if(l2){
        sum += l2.val;
        l2 = l2.next;
      }
      if(sum >= 10){
        sum -= 10;
        carry = 1;
      }
      dummy.next = new ListNode(sum); // dummy.next其实就是res.next
      dummy = dummy.next; // 这个时候dummy代表的就是res.next，这样继续进行循环
      sum = carry;
      carry = 0;
    }
    return res.next;

};
let l1 = { val: 2, next: { val: 4, next: { val: 3, next: null } } };
let l2 = { val: 7, next: { val: 0, next: { val: 8, next: null } } };
console.log(JSON.stringify(addTwoNumbers(l1, l2)));