function ListNode(val) {
  this.val = val;
  this.next = null;
}

let l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        }
      }
    }
  }
}

function reverseBetween(head, m, n) {
  let pre, cur, leftHead;
  const dummy = new ListNode();
  dummy.next = head;
  let p = dummy;
  for (let i = 0; i < m - 1; i++) {
    p = p.next;
  }
  // p在m的前驱节点记录一下
  leftHead = p;
  // 开始进行反转操作
  let start = leftHead.next;
  pre = start;
  cur = pre.next;
  for (let i = m; i < n; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  //
  leftHead.next = pre;
  start.next = cur;
  return dummy.next;
}

function hasCircle(head) {
  let cur = head;
  while (cur) {
    if (cur.flag) {
      return true;
    } else {
      cur.flag = true;
      cur = cur.next;
    }
  }
}

function detectCircle(head) {
  let slow = head, fast = head;
  while (fast !== null) {
    slow = slow.next;
    if (fast.next !== null) {
      fast = fast.next.next;
    } else {
      return null;
    }
    if (slow === fast) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
    return null;
  }
}

console.log(JSON.stringify(detectCircle(l1)))
