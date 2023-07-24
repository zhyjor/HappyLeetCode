function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  if (typeof constructor !== 'function') {
    console.error('type error');
    return
  }
  newObject = Object.create(constructor.prototype);
  result = constructor.apply(newObject, arguments);
  let flag = result && (typeof result === 'function' || typeof result === 'object');
  return flag ? result : newObject;
}

const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const self = this;
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      value.then(resolve, reject)
    }
    // 保证代码执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED;
        self.value = value;
        self.resolvedCallbacks.forEach(cb => cb(value));
      }
    }, 0)
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECTED;
        self.reason = reason;
        self.rejectedCallbacks.forEach(cb => cb(reason));
      }
    }, 0)
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onReject) {
  const self = this;
  return new MyPromise((resolve, reject) => {
    let fulfilled = () => {
      try {
        const result = onFulfilled(self.value);
        return result instanceof MyPromise ? result.then(result) : resolve(result);
      } catch (e) {
        reject(e);
      }
    };
    let rejected = () => {
      try {
        const result = onReject(self.reason);
        return result instanceof MyPromise ? result.then(resolve, reject) : reject(result);
      } catch (e) {
        reject(e);
      }
    }
    switch (self.state) {
      case PENDING:
      case RESOLVED:
      case RESOLVED:

    }
  })
}

MyPromise.all = (promises) => {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError('arguments must be array');
    }
    let resolvedCounter = 0;
    let promiseNum = promises.length;
    let resolvedResult = [];

    for (let i = 0; i < promises.length; i++) {
      MyPromise.resolve(promises[i]).then(value => {
        resolvedCounter++;
        resolvedResult[i] = value;
        if (resolvedCounter === promiseNum) {
          return resolve(resolvedResult);
        }
      }, error => {
        return reject(error);
      })
    }
  })
}



const obj = objectFactory(function (x, y) { this.m = x; this.n = y; }, 1, 2);
console.log(obj);
