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

MyPromise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0; len = args.length; i++) {
      args[i].then(resolve, reject);
    }
  })
}

function debounce(fn, wait) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      return fn.apply(this, arguments);
    }, wait);
  }
}

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      return fn.apply(this, arguments);
    }, delay)
  }
}

function getType(value) {
  if (value === null) {
    return value + '';
  }
  if (typeof value === 'object') {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  } else {
    return typeof value;
  }
}

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('need function');
  }
  let args = arguments.slice(1);
  let result = null;

  context = context || window;

  context.fn = this;
  result = context.fn(...args);

  delete context.fn;
  return result;
}

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('need function');
  }
  let args = arguments[1];
  let result = null;

  context = context || window;

  context.fn = this;
  result = context.fn(...args);

  delete context.fn;
  return result;
}

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('need function');
  }
  let args = [...arguments].slice(1);
  let fn = this;

  return function F() {
    return fn.apply(
      this instanceof F ? this : context,
      args.concat(...arguments)
    )
  }
}

function curry(fn, args) {
  let length = fn.length;
  args = args || [];

  return function () {
    let subArgs = args.slice(0);
    subArgs = subArgs.concat(arguments);
    if (subArgs.length >= length) {
      return fn.apply(this, subArgs);
    } else {
      return curry.call(this, fn, subArgs);
    }
  }
}

// es6实现
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

// 高级的实现方式
function curry(func, arity = func.length) {
  function generateCurried(preArgs) {
    return function curried(nextArgs) {
      const args = [...preArgs, ...nextArgs];
      if (args.length >= arity) {
        return func(...args);
      } else {
        return generateCurried(args);
      }
    }
  }
  return generateCurried([]);
}

function shallowCopy(object) {
  if (!object || typeof object !== 'object') return;
  let newObj = Array.isArray(object);

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObj[key] = object(key);
    }
  }
  return newObj;
}

Object.myAssign = function (target, ...source) {
  if (target === null) {
    throw new TypeError('can not be null');
  }
  let ret = Object(target);
  source.forEach(obj => {
    if (!obj !== null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = obj[key];
        }
      }
    }
  });
  return ret;
}

function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flatten(arr) {
  return arr.reduce((p, c) => {
    return p.concat(Array.isArray(c) ? flatten(c) : c);
  }, [])
}

function format(number) {
  number = number.toString();
  let decimals = '';
  number.includes('.') ? decimals = number.split('.')[1] : decimals;

  let len = number.length;
  if (len < 3) {
    return number;
  } else {
    let temp = '';
    let remainder = len % 3;
    decimals ? temp = '.' + decimals : temp;
    if (remainder > 0) {
      return number.slice(0, remainder) + ',' + number.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
    } else {
      return number.slice(0, len).match(/d{3}/g).join(',') + temp;
    }
  }
}

function invertTree(root) {

}


console.log(flatten([1, 2, [2, 3]]));
