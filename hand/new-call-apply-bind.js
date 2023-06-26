function MyNew() {
  let Constructor = Array.prototype.shift.call(arguments);
  let obj = {};
  obj.__proto__ = Constructor.prototype;
  var result = Constructor.apply(obj.arguments);
  return typeof result === 'object' ? result : obj;
}

Function.prototype.myCall = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;
  let args = [...arguments].slice(1);
  let r = context.fn(...args);
  delete context.fn;
  return r;
}

Function.prototype.myApply = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;
  let args = [...arguments][1];
  if (!args) {
    return context.fn();
  }
  let r = context.fn(...args);
  delete context.fn;
  return r;
}

Function.prototype.myBind = function (context) {
  let _me = this;
  return function () {
    return _me.apply(context);
  }
}

function getType(value) {
  if (value === null) {
    return value + '';
  }
  if (typeof value === 'object') {
    let valueClass = Object.prototype.toString.call(value);
    let type = valueClass.split(' ')[1].split('');
    type.pop();
    return type.join('').toLowerCase();
  } else {
    return typeof value;
  }
}

// 找到函数，找到上下文this，获取执行结果，返回即可
Function.prototype.MyCall = function(context) {
  if(typeof this !== 'function') {
    console.log('Type Error')
  }
  let args = [...arguments].slice(1);
  let result = null;
  context = context || window;
  context.fn = this;
  result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.MyApply = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error');
  }
  let result = null;
  context = context || window;
  context.fn = this;
  if(arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}

Function.prototype.MyBind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error');
  }
  var args = [...arguments].slice(1);
  let fn = this;
  return function Fn () {
    // 判断一下是否是构造函数的调用
    this instanceof Fn ? this : context,
    args.concat(...arguments);
  }
}
