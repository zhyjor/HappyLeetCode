//
function create(obj) {
  function F() { }
  F.prototype = obj;
  return new F();
}

function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;
  // 判断构造函数的prototype是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

// new
function objectFactory() {
  // 先创建一个空对象
  let newObject = null;
  // 获取到构造函数
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断构造函数是不是函数
  if (typeof constructor !== 'function') {
    console.log('type error');
    return;
  }
  // 设置对象的原型,设置__proto__属性
  newObject = Object.create(constructor.prototype);
  // 让函数的this指向这个对象
  result = constructor.apply(newObject, arguments);

  // 判断这个值的返回类型，如果是引用类型就返回这个引用类型，否则就返回创建的对象
  let flag = result && (typeof result === 'object' || typeof result === 'function');
  return flag ? result : newObject;
}

const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function MyPromise(fn) {
  var self = this;
  this.state = PENDING;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];
  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED;
        self.value = value;
        self.resolvedCallbacks.forEach(cb => cb(value));
      }
    }, 0);
  }
  function reject(value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECTED;
        self.value = value;
        self.rejectedCallbacks.forEach(cb => cb(value));
      }
    }, 0)
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value };
  onRejected = typeof onRejected === 'function' ? onRejected : function (error) { throw error };
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  if (this.state === RESOLVED) {
    onResolved(this.value);
  }
  if (this.state === REJECTED) {
    onRejected(this.value);
  }
}

MyPromise.prototype.then2 = function (onFulfilled, onRejected) {
  const self = this;
  return new Promise((resolve, reject) => {
    let fulfilled = () => {
      try {
        const result = onFulfilled(self.value);
        return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
      } catch (e) {
        reject(e);
      }
    }
    let rejected = () => {
      try {
        const result = onRejected(self.reason);
        return result instanceof MyPromise ? result.then(resolve, reject) : reject(result);
      } catch (e) {
        reject(e);
      }
    }
    switch (self.status) {
      case PENDING:
        self.onFulfilledCallbacks.push(fulfilled);
        self.onRejectedCallbacks.push(rejected);
        break;
      case RESOLVED:
        fulfilled();
        break;
      case REJECTED:
        reject();
        break;
    }

  })
}



