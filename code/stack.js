const left2Right = {
  '{': '}',
  '[': ']',
  '(': ')',
};


const isValid = function (s) {
  if (!s) return true;
  const stack = [];
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(left2Right[ch]);
    } else {
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  // 空
  return !stack.length;
}

const dailyTemperatures = function (T) {
  const len = T.length;
  const stack = [];
  const result = new Array(len).fill(0);

  for (let i = 0; i < len; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      const top = stack.pop();
      result[top] = i - top;
    }
    stack.push(i);
  }
  return result;
}

const MinStack = function () {
  this.stack = [];
  this.stack2 = [];
}

MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x);
  }
}

MinStack.prototype.pop = function () {
  if (this.stack.pop() === this.stack2[this.stack2.length - 1]) {
    this.stack2.pop();
  }
}

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
}

MinStack.prototype.getMin = function () {
  return this.stack2[this.stack2.length - 1];
}

const MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
}

MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
}

MyQueue.prototype.pop = function () {
  if (this.stack2.length <= 0) {
    while (this.stack1.length !== 0) {
      this.stack2.push(this.stack1.pop());
    }
  }
  return this.stack2.pop();
}

MyQueue.prototype.peek = function () {
  if (this.stack2.length <= 0) {
    while (this.stack1.length !== 0) {
      this.stack2.push(this.stack1.pop());
    }
  }
  const stack2Len = this.stack2.length;
  return stack2Len && this.stack2[stack2Len - 1];
}

MyQueue.prototype.empty = function () {
  return !this.stack1.length && !this.stack2.length;
}

const maxSlidingWindow = function (numbers, k) {
  const len = numbers.length;
  const res = [];
  const deque = [];
  for (let i = 0; i < len; i++) {
    while (deque.length && numbers[deque[deque.length - 1]] < numbers[i]) {
      deque.pop();
    }
    deque.push(i);
    while (deque.length && deque[0] <= i - k) {
      deque.shift()
    }
    if (i >= k - 1) {
      res.push(numbers[deque[0]]);
    }
  }
  return res;
}



console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
