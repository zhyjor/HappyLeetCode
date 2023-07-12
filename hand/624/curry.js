// 函数柯里化就是通过闭包的方式记录已经传入的参数
// 假如长度不满足，就存下来，继续返回函数，

function curry(fn, args) {
  let length = fn.length;
  args = args || [];
  return function () {
    let subArgs = args.slice(0);
    for (let i = 0; i < args.length; i++) {
      subArgs.push(arguments[i]);
    }
    if (subArgs.length >= length) {
      return fn.apply(this, subArgs);
    } else {
      return curry.call(this, fn, subArgs);
    }
  }
}

function curry(fn, ...args) {
  return fn.length <= args ? fn(...args) : curry.bind(null, fn, ...args);
}


function curry(func, arity = func.length) {
  function generateCurried(preArgs) {
    return function curried(nextArgs) {
      const args = [...preArgs, nextArgs];
      if (args.length >= arity) {
        return func(...args);
      } else {
        return generateCurried(args);
      }
    }
  }
  return generateCurried([]);
}

function pipe(...func) {
  function callback(input, func) {
    return func(input);
  }
  return function (params) {
    return func.reduce(callback, params);
  }
}
