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

Function.prototype.myApply = function(context) {
  context = context ? Object(context) : window;
  context.fn = this;
  let args = [...arguments][1];
  if(!args) {
    return context.fn();
  }
  let r = context.fn(...args);
  delete context.fn;
  return r;
}

Function.prototype.myBind = function(context) {
  let _me = this;
  return function() {
    return _me.apply(context);
  }
}
