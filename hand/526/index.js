// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) return;
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}

function deepClone(obj, map = new WeakMap()) {
  function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
  }
  function canTraverse(target) {
    return ['Map', 'Set', 'Array', 'Object', 'Argument'].includes(getType(target));
  }
  function isObject(target) {
    return (typeof target === 'object' || typeof target === 'function') && typeof target !== null;
  }
  // 循环
  if (map.get(target)) return target;
  if (!isObject(target)) return target;
  map.set(target, true);

  let cloneTarget;
  if (!canTraverse(target)) {
    // 处理function,String,Number对象等
    return;
  } else {
    let ctor = target.construct;
    cloneTarget = new ctor();
  }
  if (getType(target) === 'Map') {
    target.forEach((i, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(i, map));
    })
  }
  if (getType(target) === 'Set') {
    target.forEach(i => {
      cloneTarget.add(deepClone(i, map));
    })
  }
  // 处理数组
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }
  return cloneTarget;
}

const imgs = document.getElementsByTagName('img');
const viewHeight = window.innerHeight || document.documentElement.clientHeight;
function lazyLoad() {
  for (let i = 0; i < imgs.length; i++) {
    let distance = viewHeight - imgs[i].getBoundingClientRect().top;
    if (distance > 0) {
      imgs[i].src = imgs[i].getAttribute('data-src');
    }
  }
}

window.addEventListener('scroll', lazyLoad);

class Publish {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    })
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update(this);
    })
  }
}

class Observer {
  constructor() { }
  update() { }
}

class EventEmit {
  constructor() {
    this.handler = {};
  }
  on(name, cb) {
    if (!this.handler[name]) {
      this.handler[name] = [];
    }
    this.handler[name].push(cb);
  }
  emit(name, ...args) {
    if (this.handler[name]) {
      const handler = this.handler[name].splice();
      handler.forEach(callback => {
        callback(...args);
      });
    }
  }
  off(name, cb) {
    const callbacks = this.handler[name];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
  once(name, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(name, cb);
    }
    this.on(name, wrapper);
  }
}

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(i => i());
      }
    }
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => onFulfilled(this.value));
      this.onRejectedCallbacks.push(() => onRejected(this.value));
    }
  }
}

function MyNew() {
  let Constructor = Array.prototype.shift.call(arguments);
  let obj = {};
  obj.__proto__ = Constructor.prototype;
  var result = Constructor.apply(obj, arguments);
  return typeof result === 'object' ? result : obj;
}

Function.prototype.myCall = function(context) {
  context = context ? Object(context) : window;
  context.fn = this;
  let args = [...arguments].slice(1);
  let r = context.fn(...args);
  delete context.fn;
  return r;
}

Function.prototype.myApply = function(context) {

}

Function.prototype.myBind = function(context) {
  let me = this;
  return function() {
    return me.apply(context);
  }
}
