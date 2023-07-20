function ListNode(val) {
  this.val = val;
  this.next = null;
}

function removeElements(head, val) {
  const dummy = new ListNode();
  dummy.next = head;
  let pre = dummy;
  let cur = pre.next;
  while(cur) {
    if(cur.val !== val) {
      pre = cur;
      cur = cur.next;
    } else {
      cur = cur.next;
      pre.next = cur;
    }
  }
  return dummy.next;
}
