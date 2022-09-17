function ListNode(val) {
  this.val = val;
  this.next = null;
}

function mergeTwoList(l1, l2) {
  // 定义开头节点
  let header = new ListNode();
  let cur = header;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    // 当前进一
    cur = cur.next;
  }
  cur.next = l1 !== null ? l1 : l2;
  return header.next;
}

let l11 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: {
        val: 5,
        next: null
      }
    }
  }
}


let l12 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
      next: null
    }
  }
}

// console.log(JSON.stringify(mergeTwoList(l11, l12)));

function deleteDuplicates(header) {
  // 一定要有一个指针，指向当前处理的位置
  let cur = header;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return header;
}
// console.log(JSON.stringify(deleteDuplicates(l11)));

// dummy节点问题，要将当前节点排除在外，一直在next上进行比较
function deleteAllDuplicates(header) {
  // 先判断一下边界条件，0/1个节点可直接失败
  if (!header || !header.next) return;

  let dummy = new ListNode();
  dummy.next = header;

  let cur = dummy;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val;
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      // 若不重复，则正常遍历
      cur = cur.next;
    }
  }
  return dummy.next;
}
// console.log(JSON.stringify(deleteAllDuplicates(l11)));

function removeNthFromEnd(header, n) {
  const dummy = new ListNode();
  dummy.next = header;

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


function reverseList(header) {
  let pre = null;
  let cur = header;

  while (cur !== null) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}


function reverseBetween(header, m, n) {
  let pre, cur, leftHeader;

  const dummy = new ListNode();
  dummy.next = header;

  let p = dummy


  for (let i = 0; i < m - 1; i++) {
    p = p.next;
  }
  // 当前游标指向m的前驱节点
  // 缓存当前节点
  leftHeader = p;
  // 记录下反转区间的第一个节点
  let start = leftHeader.next;
  pre = start;
  cur = pre.next;
  for (let i = m; i < n; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  // 区间反转完成，修改边界，cur已经指向修改边界的外面
  start.next = cur;
  // pre是边界外的
  leftHeader.next = pre;
  return dummy.next;
}
console.log(JSON.stringify(reverseBetween(l11, 2, 3)));


function detectCircle(header) {
  while (header) {
    if (header.flag) {
      return header;
    } else {
      header.flag = true;
      header = header.next;
    }
  }
}

/**
 * 双指针法最合理，不需要修改原始的链表结构，主要还是需要让相遇的点可控
 *
 * a+(n+1)b+nc=2(a+b)⟹a=c+(n−1)(b+c)
 */

function detectCircle2(header) {
  let fast = header;
  let slow = header;


  while (fast !== null) {
    slow = slow.next;
    if (fast.next !== null) {
      fast = fast.next.next;
    } else {
      return null;
    }
    if (fast === slow) {
      let ptr = header;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
  return null;
}
