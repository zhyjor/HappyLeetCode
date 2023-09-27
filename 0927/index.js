function Person() {
  this.queue = [];
  this.lock = false;
}

Person.prototype.eat = function () {
  this.queue.push(() => new Promise(resolve => {
    console.log('eat');
    resolve();
  }));
  this.run();
  return this;
}

Person.prototype.sleep = function (time, flag) {
  this.queue.push(() => new Promise(resolve => {
    setTimeout(() => {
      console.log('sleep', flag);
      resolve();
    }, time);
  }));
  this.run();
  return this;
}

Person.prototype.run = async function () {
  if (this.queue.length > 0 && !this.lock) {
    this.lock = true;
    const task = this.queue.shift();
    await task();
    this.lock = false;
    this.run();
  }
}

// const person = new Person();
// person.eat().sleep(1000, '1').eat().sleep(2000, '2').eat();

class Lazy {
  #cbs = [];
  constructor(num) {
    this.res = num;
  }
  _add(num) {
    this.res += num;
    console.log(this.res);
  }
  _multi(num) {
    this.res *= num;
    console.log(this.res);
  }
  add(num) {
    this.#cbs.push({
      type: 'function',
      params: num,
      fn: this._add,
    });
    return this;
  }
  multi(num) {
    this.#cbs.push({
      type: 'function',
      params: num,
      fn: this._multi,
    });
    return this;
  }
  top(fn) {
    this.#cbs.push({
      type: 'callback',
      fn,
    })
    return this;
  }
  delay(time) {
    this.#cbs.push({
      type: 'delay',
      fn: () => {
        new Promise(resolve => {
          console.log(`等待${time}ms`);
          setTimeout(() => {
            resolve
          }, time);
        })
      }
    });
    return this;
  }
  async output() {
    let cbs = this.#cbs;
    for (let i = 0, l = cbs.length; i < l; i++) {
      const cb = cbs[i];
      let type = cb.type;
      if (type === 'function') {
        cb.fn.call(this, cb.params);
      } else if (type === 'callback') {
        cb.fn.call(this, this.res);
      } else {
        await cb.fn();
      }
    }
    this.#cbs = [];
  }
}

function lazy(num) {
  return new Lazy(num);
}

// const lazyFun = lazy(2).add(2).top(console.log).delay(1000).multi(3);
// console.log('start');
// console.log('等待1000ms');
// setTimeout(() => {
//   lazyFun.output();
// }, 1000);

function TaskPool() {
  this.tasks = [];
  // 任务池
  this.pool = [];
  this.max = 2;
}

TaskPool.prototype.addTask = function (task) {
  this.tasks.push(task);
  this.run();
}

TaskPool.prototype.run = function () {
  if (this.tasks.length === 0) {
    return;
  }
  let min = Math.min(this.tasks.length, this.max = this.pool.length);
  for (let i = 0; i < min; i++) {
    const currTask = this.tasks.shift();
    this.pool.push(currTask);
    currTask().finally(() => {
      this.pool.splice(this.pool.indexOf(currTask), 1);
      this.run();
    })
  }
}

const cache = new Map();
async function swr(cacheKey, fetcher, cacheTime) {
  let data = cache.get(cacheKey) || { value: null, time: 0, promise: null };
  cache.set(cacheKey, data);
  const isStaled = Date.now() - data.time > cacheTime;
  if (isStaled && !data.promise) {
    data.promise = fetcher().then((val) => {
      data.value = val;
      data.time = Date.now();
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      data.promise = null;
    });
  }
  if (data.promise && !data.value) await data.promise;
  return data.value;
}

class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }
  get(key) {
    if (this.cache.has(key)) {
      const temp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
    }
    return undefined;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.set(key, value);
  }
}

// const viewHeight = window.innerHeight || document.documentElement.clientHeight;
// let v = new Image();
// v.gerBoundingClientClientRect().top;

function create(obj) {
  function Func() { }
  Func.prototype = obj;
  Func.prototype.construct = Func;
  return new Func();
}

function myInstanceof(obj, ctor) {
  let proto = Object.getPrototypeOf(obj);
  let prototype = ctor.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function objectFactory() {
  let newObject = {};
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  if (typeof constructor !== 'function') {
    throw new TypeError('need function');
  }
  newObject = Object.create(constructor.prototype);
  result = constructor.apply(newObject, arguments);
  let flag = result && (typeof result === 'function' || typeof result === 'object');
  return flag ? result : newObject;
}

function P(name) {
  if (this instanceof P) {
    // if(new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('需要使用new')
  }
}

// console.log(P('12'))

function Father(name, age) {

}

function Children(name, age) {
  Father.call(this, name, age);
}
Children.prototype = Object.create(Father.prototype);
Children.prototype.constructor = Children;

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
      value.then(resolve, reject);
    }
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
        self.state === REJECTED;
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

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;
  return new MyPromise((resolve, reject) => {
    let fulfilled = () => {
      try {
        const result = onFulfilled(self.value);
        return result instanceof MyPromise ? result.then(result) : resolve(result);
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
    switch (self.state) {
      case PENDING:
        self.resolvedCallbacks.push(fulfilled);
        self.rejectedCallbacks.push(rejected);
      case REJECTED:
        reject();
      case RESOLVED:
        fulfilled();
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
      fn.apply(this, arguments);
      timer = null;
    }, wait);
  }
}

function throttle(fn, wait) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      return fn.apply(this, arguments);
    }, wait)
  }
}

function getType(value) {
  if (value === null) return value + '';
  if (typeof value === 'object') {
    return Object.prototype.toString.call(value).splice(8, -1).toLowerCase();
  }
}

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError(' need function');
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
    );
  }
}

function deepClone(target, cache = new WeakMap()) {
  if (target === null || typeof target !== 'object') {
    return target;
  }
  if (cache.get(target)) return target;
  const copy = Array.isArray(target) ? [] : {};
  cache.set(target, copy);
  Object.keys(target).forEach(key => copy[key] = deepClone(obj[key], cache));
  return copy;
}

function asyncFun(func) {
  var gen = func();
  function next(data) {
    var result = gen.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }
  next();
}

function accAdd(arg1, arg2) {

}

function flat(obj, path = '', res = {}, isArray) {
  for (let [k, v] of obj) {
    if (Array.isArray(v)) {
      let _k = isArray ? `${path}[${k}]` : `${path}${k}`;
      flat(v, _k, res, true);
    } else if (typeof v === 'object') {
      let _k = isArray ? `${path}[${k}].` : `${path}${k}.`;
    } else {
      let _k = isArray ? `${path}[${k}]` : `${path}${k}`;
    }
  }
  return res;
}

function camelCase(str) {
  return str.replace(/_([a-z])/g, function (match, ground1) {
    return ground1.toUpperCase();
  })
}


function name(url) {
  const _url = url || window.location.href;
  const _urlParams = _url.match(/[?&](.+?=[^&]+)/igm);
  return _urlParams ? _urlParams.reduce((a, b) => {
    const value = b.slice(1).split('=');
    a[value[0]] = value[1];
  }) : {}
}


class EventEmitter{
  constructor() {
    this.handler = {};
  }
  on(eventname, cb) {
    if(!this.handler[eventname]) {
      this.handler[eventname] = [];
    }
    this.handler[eventname].push(cb);
  }
  emit(eventname, ...args) {
    if(this.handler[eventname]) {
      const handler = this.handler[eventname].slice();
      handler.forEach(cb => cb(...args));
    }
  }
  off(eventname, cb) {
    const callback = this.handler[eventname];
    const index = callback.indexOf(cb);
    if(index !== -1) {
      callback.splice(index, 1);
    }
  }
  once(eventname, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventname, wrapper);
    }
    this.on(eventname, wrapper);
  }
}


function observer() {
  const queueObservers = new Set();
  const observe = fn => queueObservers.add(fn);
  const observerAble = obj => new Proxy(obj, {set});
  function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queueObservers.forEach(observer => observe());
    return result;
  }
}

function getSingleInstance(func) {
  let instance;
  let handler = {
    constructor(target, args) {
      if(!instance) instance = Reflect.construct(func, args);
      return instance;
    }
  }
  return new Proxy(func, handler);
}

function curry(fn, args) {
  let length = fn.length;
  args = args || [];
  return function () {
    let subArgs = args.slice();
    subArgs = subArgs.concat(arguments);
    if(subArgs.length >= length) {
      return fn.apply(this, subArgs);
    } else {
      return curry.call(this, fn, subArgs);
    }
  }
}

function compose(middle) {
  return function(context, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if(i<=index) return Promise.reject(new Error('next'));
      let fn = middle[i];
      if(i === middle.length) fn = next;
      if(!fn) return Promise.resolve();
      try{
        return Promise.resolve(fn(context, dispatch.bind(null, i+1)))
      } catch(e) {
        return Promise.reject(e);
      }
    }
  }
}

Array.prototype.myMap = (fn, thisArgs = []) => {
  if(typeof fn !== 'function') {
    throw new Error('need function');
  }
  return this.reduce((pre, cur, index, arr) => {
    return pre.concat(fn.call(thisArgs, cur, index, arr))
  }, []);
}
