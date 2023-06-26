var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';

function MyPromise(fn) {
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
      that.onFulfilledCallbacks.forEach(cb => cb(that.value))
    }
  }
  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      that.onREjectedCallbacks.forEach(cb => cb((that.reason)))
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
      // 执行时机
      setTimeout(function () {
        try {
          if (typeof onFulfilled !== 'function') {
            resolve(that.value);
          } else {
            var x = realOnFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          }

        } catch (e) {
          reject(e);
        }
      }, 0)

    });
    return promise2;
  }

  if (this.status === REJECTED) {
    var promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
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
      }, 0)

    });
    return promise2;
  }

  if (this.status === PENDING) {
    var promise2 = new MyPromise(function (resolve, reject) {
      that.onFulfilledCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(that.value);
            } else {
              var x = realOnFulfilled(that.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0)
      });
      that.onREjectedCallbacks.push(function () {
        // 这里加setTimeout
        setTimeout(function () {
          try {
            if (typeof onRejected !== 'function') {
              reject(that.reason);
            } else {
              var x = realOnRejected(that.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0)
      });
    })
    return promise2;
  }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

MyPromise.resolve = function (parameter) {
  if (parameter instanceof MyPromise) {
    return parameter;
  }
  return new MyPromise(function (resolve) {
    resolve(parameter);
  })
}

MyPromise.reject = function (reason) {
  return new MyPromise(function (_, reject) {
    reject(reason);
  })
}

MyPromise.all = function (promiseList) {
  var resPromise = new MyPromise(function (resolve, reject) {
    var count = 0;
    var result = [];
    var length = promiseList.length;
    if (length === 0) return resolve(result);
    promiseList.forEach(function (promise, index) {
      MyPromise.resolve(promise).then(function (value) {
        count++;
        result[index] = value;
        if (count === length) {
          resolve(result);
        }
      }, function (reason) {
        reject(reason);
      })
    });
  })
  return resPromise;
}

MyPromise.race = function (promiseList) {
  var resPromise = new MyPromise(function (resolve, reject) {
    var length = promiseList.length;
    if (length === 0) {
      return resolve();
    } else {
      for (var i = 0; i < length; i++) {
        MyPromise.resolve(promiseList[i]).then(function (value) {
          return resolve(value);
        }, function (reason) {
          return reject(reason);
        })
      }
    }
  });
  return resPromise;
}

MyPromise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
}

MyPromise.prototype.finally = function (fn) {
  return this.then(function (value) {
    return MyPromise.resolve(fn()).then(function () {
      return value;
    })
  }, function (error) {
    return MyPromise.resolve(fn()).then(function () {
      throw error;
    })
  })
}

MyPromise.allSettled = function (promiseList) {
  return new MyPromise(function (resolve) {
    var length = promiseList.length;
    var result = [];
    var count = 0;
    if (length === 0) {
      return resolve(result);
    } else {
      for (var i = 0; i < length; i++) {
        (function (i) {
          var currentPromise = MyPromise.resolve(promiseList[i]);
          currentPromise.then(function (value) {
            count++;
            result[i] = { status: 'fulfilled', value: value };
            if (count === length) {
              return resolve(result);
            }
          },
            function (reason) {
              count++;
              result[i] = { status: 'rejected', reason: reason };
              if (count === length) {
                return resolve(result);
              }
            })
        })(i);

      }
    }
  })
}

module.exports = MyPromise;
