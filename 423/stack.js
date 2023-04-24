const MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
}

MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
}

MyQueue.prototype.pop = function () {
  if (this.stack2.length === 0) {
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }
  }
  return this.stack2.pop();
}

MyQueue.prototype.peek = function () {
  if (this.stack2.length === 0) {
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }
  }
  const stack2Len = this.stack2.length;
  return stack2Len && this.stack2[stack2Len - 1];
}

MyQueue.prototype.empty = function () {
  return !this.stack1.length && !this.stack2.length;
}

function maxSlidingWindow(nums, k) {
  const len = nums.length;
  const res = [];
  const dequeue = [];
  for (let i = 0; i < len; i++) {
    while (dequeue.length && nums[dequeue[dequeue.length - 1]] < nums[i]) {
      dequeue.pop();
    }
    dequeue.push(i);
    while (dequeue.length && dequeue[0] <= i - k) {
      dequeue.shift();
    }
    if (i >= k - 1) {
      res.push(nums[dequeue[0]]);
    }
  }
  return res;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
