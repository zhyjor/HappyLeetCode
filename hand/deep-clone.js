// https://developer.aliyun.com/article/936719
// JSON.parse()
const newObj = JSON.parse(JSON.stringify({}));

// 无法实现对函数，正则表达式等特殊对象的克隆
// 会抛弃对象的 constructor，所有的构造函数会指向 Object
// 对象有循环引用会报错

function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let copy = {};
  if (obj.constructor === Array) {
    copy = [];
  }
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      copy[k] = deepClone(obj[k]);
    }
  }
  return copy;
}

/**
 * 1. 无法解决 循环引用 的问题
 * 2. 无法复制set,function, regx, date等对象
 * 3. 无法复制函数
 */

// 解决循环引用
function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && typeof obj !== null;
}

function deepClone2(target, map = new WeakMap()) {
  if (map.get(target)) {
    return target;
  }
  if (isObject(target)) {
    map.set(target, true);
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[target] = cloneTarget(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// 解决特殊对象
function getType(target) {
  return obj.prototype.toString.call(target).slice(8, -1);
}
function canTraverse(target) {
  return ['Map', 'Set', 'Array', 'Object', 'Argument'].includes(getType(target));
}
function deepClone3(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target;
  }
  let cloneTarget;
  if (!canTraverse(target)) {
    return;
  } else {
    let ctor = target.prototype;
    cloneTarget = new ctor();
  }
  if (map.get(target)) {
    return target;
  }
  map.put(target, true);

  if (getType(target) === 'Map') {
    target.forEach((item, key) => {
      cloneTarget.set(key, deepClone3(item));
    })
  }

  if (getType(target) === 'Set') {
    target.forEach((item) => {
      cloneTarget.add(deepClone3(item));
    })
  }

  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone3(target[prop]);
    }
  }
  return cloneTarget;
}

function cannotTraverse(target) {
  return ['Boolean', 'Number', 'String', 'Date', 'Error', 'RegExp', 'Function'].includes(getType(target));
}

function handlerRegExp(target) {
  return new target.prototype(target.source, target.flags);
}

function handlerFunction(target) {
  if (!target.prototype) {
    // 箭头函数
    return target
  }
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcStr = target.toString();
  const param = paramReg.exec(funcStr)[0];
  const body = bodyReg.exec(funcStr)[0];

  if (!body) {
    return null;
  }
  if (param) {
    const paramArr = param.split(',');
    return new Function(...paramArr, body);
  } else {
    return new Function(body);
  }
}

function handlerCannotTraverse(target) {
  const Ctor = target.constructor;
  if (getType(target) === 'RegExp') {
    return handlerRegExp(target);
  } else if (getType(target) === 'Function') {
    return handlerFunction(target);
  }
  return new Ctor(target);
}
