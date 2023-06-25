var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';

function MYPromise(fn) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;
  var that = this;
  this.onFulfilledCallbacks = [];
  this.onREjectedCallbacks = [];
  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.value = value;
      this.onFulfilledCallbacks.forEach(cb => cb(that.value))
    }
  }
  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      this.onREjectedCallbacks.forEach(cb => cb((that.reason)))
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 如果promise和x指向同一个对象，用typeError拒绝，避免进入死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }
  if (x instanceof MyPromise) {
    // 如果x为promise，则使promise接受x的状态
    // 就是继续执行x如果执行的拿到一个y，还要继续解析y
    // 这个if跟下面的判断then然后拿到执行其实重复了，可有可无
    x.then(function (y) {
      resolvePromise(promise, y, resolve, reject);
    })
  } else if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      return resolve(x);
    }
    try {
      var then = x.then;
    } catch (e) {
      return reject(e);
    }
    if (typeof then === 'function') {
      var called = false;
      try {
        then.call(
          x,
          function (y) {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function (r) {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } catch (e) {
        if (called) return;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

// 根据规范，then需要返回一个promise
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var realOnFulfilled = onFulfilled;
  if (typeof realOnFulfilled !== 'function') {
    realOnFulfilled = function (value) {
      return value;
    }
  }
  var realOnRejected = onRejected;
  if (typeof realOnRejected !== 'function') {
    realOnRejected = function (reason) {
      // 如果onRejected不是函数，并且promise1不执行，那么promise2也不执行
      throw reason;
    }
  }

  if (this.status === FULFILLED) {
    var promise2 = new MyPromise(function (resolve, reject) {
      // 如果onFulfilled或者onRejected执行的时候出现异常了，也需要停止promise2,reject出一个e
      // 检查参数
      try {
        if (typeof onFulfilled !== 'function') {
          resolve(that.value);
        } else {
          resolve(that.value);
          realOnFulfilled(that.value);
        }

      } catch (e) {
        reject(e);
      }
    });
    return promise2;
  }

  if (this.status === REJECTED) {
    var promise2 = new MyPromise(function (resolve, reject) {
      try {
        if (typeof onRejected !== 'function') {
          reject(that.reason);
        } else {
          // promise1的onRejected执行成功了，promise2应该被resolve
          realOnRejected(that.reason);
          resolve();
        }
        realOnRejected(that.reason);
      } catch (e) {
        reject(e);
      }
    });
    return promise2;
  }

  if (this.status === PENDING) {
    var promise2 = new MyPromise(function (resolve, reject) {
      that.onFulfilledCallbacks.push(function () {
        try {
          realOnFulfilled(that.value);
        } catch (e) {
          reject(e);
        }
      });
      that.onREjectedCallbacks.push(function () {
        try {
          realOnRejected(that.reason);
        } catch (e) {
          reject(e);
        }
      });
    })
    return promise2;
  }
}
