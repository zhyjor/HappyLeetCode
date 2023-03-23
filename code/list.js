function ListNode(val) {
  this.val = val;
  this.next = null;
}

let list1 = {
  val: 1,
  next: {
    val: 1,
    next: {
      val: 4,
      next: null,
    }
  }
}
let list2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
      next: null,
    }
  }
}

function mergeTwoList(l1, l2) {
  let head = new ListNode();
  let cur = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    // 前进一步
    cur = cur.next;
  }
  cur.next = l1 !== null ? l1 : l2;
  return head.next;
}

// console.log(JSON.stringify(mergeTwoList(list1, list2)))

// 指针需要指向操作的位置
function deleteDuplicates(head) {
  let cur = head;
  while (cur !== null && cur.next !== null) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      // 继续遍历
      cur = cur.next;
    }
    return head;
  }
}

function deleteDuplicates2(head) {
  if (!head || !head.next) {
    return head;
  }
  let dummy = new ListNode();
  dummy.next = head;
  let cur = dummy;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val;
      // 继续往下找
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
}

function removeNthFromEnd(head, n) {
  const dummy = new ListNode();
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  while (n !== 0) {
    fast = fast.next;
    n--;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}

function revererList(head) {
  let pre = null;
  let cur = head;
  while(cur !== null) {
    let next = cur.next;
    // 反转
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

function reverseBetween(head, m, n) {
  let pre, cur, leftHead;
  const dummy = new ListNode();
  dummy.next = head;
}

console.log(JSON.stringify(revererList(list1)))
