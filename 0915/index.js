Array.prototype.myMap = (fn, context) => {
  var arr = Array.prototype.slice.call(this);
  var mapArray = [];
  for (let i = 0; i < arr.length; i++) {
    mapArray.push(fn.call(context, arr[i], i, this));
  }
  return mapArray;
}

Array.prototype.myReduce = (fn, initialValue) => {
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;
  res = initialValue ? initialValue : arr[0];
  startIndex = initialValue ? 0 : 1;
  for (let i = startIndex; i < arr.length; i++) {
    res = fn.call(null, res, arr[i], i, this);
  }
  return res;
}

function getSingleInstance(func) {
  let instance;
  let handler = {
    construct(target, args) {
      if (!instance) instance = Reflect.construct(func, args);
      return instance;
    }
  }
  return new Proxy(func, handler);
}

const cache = new Map();

// 新增 cacheTime 参数
async function swr(cacheKey, fetcher, cacheTime) {
  let data = cache.get(cacheKey) || { value: null, time: 0, promise: null };
  cache.set(cacheKey, data);

  // 是否过期
  const isStaled = Date.now() - data.time > cacheTime;
  // 已经过期了，且也没有在请求中，需要发送请求
  if (isStaled && !data.promise) {
    data.promise = fetcher()
      .then((val) => {
        data.value = val;
        data.time = Date.now(); // 保存获取到数据的时间
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        data.promise = null;
      });
  }

  if (data.promise && !data.value) await data.promise;
  return data.value;
}

// const cache = new Map();
async function swr(cacheKey, fetcher, cacheTime) {
  let data = cache.get(cacheKey) || { value: null, time: 0, promise: null };
  cache.set(cacheKey, data);

  const isStaled = Date.now() - data.time > cacheTime;
  if (isStaled) {
    data.promise = fetcher()
      .then(value => {
        data.value = value;
        data.time = Date.now();
      })
      .catch(e => console.log(e))
      .finally(() => data.promise = null);
  }
  if (data.promise && !data.value) await data.promise;
  return data.value
}


function curry(fn, args) {
  let len = fn.length;
  args = args || [];
  return function () {
    let subArgs = args.slice();
    subArgs = subArgs.concat(arguments);
    if (subArgs.length) {
      return fn.apply(this, subArgs);
    } else {
      return fn.call(this, fn, subArgs);
    }
  }
}

function compose(middle) {
  return function (context, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next called'));
      index = i;
      let fn = middle[i];
      if (i === middle.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
}

class EventEmitter {
  constructor() {
    this.handler = {};
  }
  on(eventname, cb) {
    if (!this.handler[eventname]) this.handler[eventname] = [];
    this.handler[eventname].push(cb);
  }
  once(eventname, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventname, wrapper);
    }
    this.on(eventname, wrapper);
  }
}

function getSingleInstance(func) {
  let instance;
  let handler = {
    construct(target, args) {
      if (!instance) instance = Reflect.construct(func, args);
      return instance;
    }
  }
  return new Proxy(func, handler);
}

function name(url) {
  return url.match(/[?&](.+?=[^&]+)/igm);
}

function myInstance(obj, ctor) {
  let proto = Object.getPrototypeOf(obj);
  let prototype = ctor.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function objFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  if (typeof constructor !== 'function') {
    throw new Error('need func');
  }
  newObject = Object.create(constructor.prototype);
  result = constructor.apply(newObject, arguments);
  let flag = result && (typeof result === 'function' || typeof result === 'object')
  return flag ? result : newObject;
}

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('')
  }
  let args = [...arguments].slice(1);
  let fn = this;
  return function F() {
    return fn.apply(
      this instanceof F ? this : context,
      args.concat(...arguments),
    )
  }
}

function deepClone(target, cache = new WeakMap()) {
  if (target === null || typeof target !== 'object') {
    return target;
  }
  if (cache.get(target)) return target;
  const copy = Array.isArray(target) ? [] : {};
  cache.set(target, copy);
  Object.keys(target).forEach(key => copy[key] = deepClone(target[key], cache));
}

function asyncFun(func) {
  let gen = func();
  function next(data) {
    let result = gen.next(data);
    if (result.done) return result.value;
    result.value.then((data) => { next(value) });
  }
  next();
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
  function partition(arr, left, right) {
    const pivot = arr[left];
    while(left < right) {
      while(left < right && arr[right] >= arr[left]) {
        right--;
      }
      arr[left] = arr[right];
      while(left < right && arr[left] <= pivot) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
  }
}
