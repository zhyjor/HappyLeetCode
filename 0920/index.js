function curry(fn, args) {
  let length = fn.length;
  args = args || [];
  return function () {
    let subArgs = args.slice();
    subArgs = subArgs.concat(arguments);
    if (subArgs.length >= length) {
      return fn.apply(this, subArgs);
    } else {
      return curry.call(this, fn, subArgs);
    }
  }
}

class Lazy {
  #cbs = [];
  constructor(num) {
    this.res = num;
  }
  #add(num) {
    this.res += num;
  }
}

function compose(middle) {
  return function (context, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      let fn = middle[i];
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    }
  }
}

class EventEmitter {
  constructor() {
    this.handlers = {};
  }
  on(eventname, cb) {
    if (!this.handlers[eventname]) {
      this.handlers[eventname] = [];
    }
    this.handlers[eventname].push(cb);
  }
  emit(eventname, ...args) {
    if (this.handlers[eventname]) {
      const handler = this.handlers[eventname].slice();
      handler.forEach(cb => cb(...args));
    }
  }
  off(eventname, cb) {
    const callback = this.handlers[eventname];
    const index = callback.indexOf(cb);
    if (index !== -1) {
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

const queueObservers = new Set();
const observe = fn => queueObservers.add(fn);
const observeAble = obj => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queueObservers.forEach(observe => observe())
  return result;
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

function parseTemplate(str) {
  const regex = /\${(.*?)}/g;
}

function name(url) {
  const _url = url || window.location.href;
  const _urlParams = _url.match(/[?&](.+?=[^&]+)/igm);
  return _urlParams ? _urlParams.reduce((p, c) => {
    const value = b.slice(1).split('=');
    p[value[0]] = value[1];
    return p;
  }, {}) : {}
}

let cache = new Map();
function swr(cacheKey, fetcher, cacheTime) {
  let data = cache.get(cacheKey) || { value: null, time: 0, promise: null };
  cache.set(cacheKey, data);
  const isStaled = Date.now() - data.time > cacheTime;

}


function TaskPool() {
  this.tasks = [];
  this.pool = [];
  this.max = 2;
}

TaskPool.prototype.add = function (task) {
  this.tasks.push(task);
  this.run();
}

TaskPool.prototype.run = function () {
  if (this.tasks.length === 0) return;
  let min = Math.min(this.tasks.length, this.max - this.pool.length);
  for (let i = 0; i < min; i++) {
    const currTask = this.tasks.shift();
    this.pool.push(currTask);
    currTask().finally(() => {
      this.pool.splice(this.pool.indexOf(currTask), 1);
      this.run();
    })
  }
}


const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

function MyPromise(fn) {
  const self = this;
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.rejectedCallbacks = [];
  this.resolvedCallbacks = [];
  function resolve(value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED;
        self.value = value;
        self.resolvedCallbacks.forEach(cb => cb(value));
      }
    }, 0);
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

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this;
}
