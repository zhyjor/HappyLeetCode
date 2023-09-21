function addString(num1, num2) {
  let result = '';
  let i = num1.length - 1, j = num2.length - 1;
  let carry = 0;
  while (i >= 0 || j >= 0) {
    let n1 = i >= 0 ? +num1[i] : 0;
    let n2 = j >= 0 ? +num2[j] : 0;
    const temp = n1 + n2 + carry;
    carry = temp / 10 | 0;
    result = `${temp % 10}${result}`;
    i--; j--;
  }
  if (carry === 1) result = `1${result}`;
  return result;
}

function multiply(num1, num2) {
  let result = '0';
  let i = num1.length - 1;
  while (i >= 0) {
    let suffixZero = new Array(num1.length - 1 - i).fill('0').join('');
    let sumCount = +num1[i];
    let tempSum = '0';
    while (sumCount > 0) {
      tempSum = addString(tempSum, num2);
      sumCount--;
    }
    tempSum = `${tempSum}${suffixZero}`;
    result = addString(result, tempSum);
    i--;
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== '0') {
      return result.slice(i);
    }
  }
  return '0';
}

// const randomIndex = Math.round(Math.random()*(arr.length-1) + 1);

function flattenArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
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
// console.log(flatten([0, [1,2, [3,4]]]))

// console.log(flattenArray([0, [1,2, [3,4]]]))

/* 题目*/
var entryObj = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

function flatObj(obj, path = '', res = {}, isArray) {
  // Object.entries拿到的内容不知道怎么放k，不知道是否是数组
  for (let [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      let _k = isArray ? `${path}[${k}]` : `${path}${k}`;
      flatObj(v, _k, res, true);
    } else if (typeof v === 'object') {
      let _k = isArray ? `${path}[${k}].` : `${path}${k}.`;
      flatObj(v, _k, res, false);
    } else {
      let _k = isArray ? `${path}[${k}]` : `${path}${k}.`;
      res[_k] = v;
    }
  }
  return res;
}
// console.log(flatObj(entryObj));

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

function camelCase(str) {
  return str.replace(/_([a-z])/g, function (match, group1) {
    return group1.toUpperCase();
  })
}

function camelCase2(str) {
  return str.replace(/([-_])([a-z])/g, function (match, group1, group2) {
    console.log(group1, group2);
    return group2.toUpperCase();
  })
}

// console.log(camelCase2('abc-time_test'));

function getRandomColor() {
  let str = '#';
  var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  for (let i = 0; i < 6; i++) {
    let num = parseInt(Math.random() * 16);
    str += arr[num];
  }
  return str;
}

function hexToRgb(val) {
  var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  let color = val.toLowerCase();
  let result = '';
  if (reg.test(color)) {
    if (color.length = 4) {
      let colorNew = '#';
      for (let i = 1; i < 4; i++) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    let colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
    }
    result = `rgb(${colorChange.join(',')})`;
    return { rgb: result }
  } else {
    result = '无效';
    return { rgb: result };
  }
}


// console.log(hexToRgb('#fff'))

function parseTemplateString(str, data) {
  const reg = /\${(.*?)}/g;
  const parsedStr = str.replace(reg, (match, group) => {
    return data[group];
  })
  return parsedStr;
}

// 测试:
const name = 'John';
const age = 30;
const job = 'Web Developer';
const templateString = '我的名字是 ${name}，我今年 ${age} 岁，我从事 ${job} 的工作。';
const data = { name, age, job };
// const parsedString = parseTemplateString(templateString, data);
// console.log(parsedString); //


let list = {
  "city": [
    { "id": 12, "parent_id": 1, "name": "朝阳区" },
    { "id": 241, "parent_id": 24, "name": "田林街道" },
    { "id": 31, "parent_id": 3, "name": "广州市" },
    { "id": 13, "parent_id": 1, "name": "昌平区" },
    { "id": 2421, "parent_id": 242, "name": "上海科技绿洲" },
    { "id": 21, "parent_id": 2, "name": "静安区" },
    { "id": 242, "parent_id": 24, "name": "漕河泾街道" },
    { "id": 22, "parent_id": 2, "name": "黄浦区" },
    { "id": 11, "parent_id": 1, "name": "顺义区" },
    { "id": 2, "parent_id": 0, "name": "上海市" },
    { "id": 24, "parent_id": 2, "name": "徐汇区" },
    { "id": 1, "parent_id": 0, "name": "北京市" },
    { "id": 2422, "parent_id": 242, "name": "漕河泾开发区" },
    { "id": 32, "parent_id": 3, "name": "深圳市" },
    { "id": 33, "parent_id": 3, "name": "东莞市" },
    { "id": 3, "parent_id": 0, "name": "广东省" }
  ]
}
function array2Tree(list, root) {
  const result = [];
  const map = {};
  for (const item of list) {
    map[item.id] = { ...item };
  }
  for (const item of list) {
    const { id, parent_id } = item;
    if (item.parent_id === root) {
      result.push(map[id]);
    } else {
      map[parent_id].children
        ? map[parent_id].children.push(map[id])
        : map[parent_id].children = [map[id]];

    }
  }
  return result;
}

function array2TreeV2(list, root) {
  return list
    .filter(item => item.parent_id === root)
    .map(i => ({
      ...i,
      children: array2TreeV2(list, i.id)
    }))
}

console.log(array2TreeV2(list.city, 0));


