function flat(arr) {
  let result = [];
  for (let i = 0, len = arr.length; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

let format = n => {
  let num = n.toString();
  let decimal = ''; //  保留下小数部分
  // 判断是否有小数
  num.indexOf('.') > -1 ? decimal = num.split('.')[1] : decimal;
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = '';
    let remainder = len % 3;
    decimal ? temp = '.' + decimal : temp;
    if (remainder > 0) {
      return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
    } else {
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
    }
  }
}

let format1 = n => {
  let num = n.toString();
  let len = num.length;

  if(len <= 3) {
    return num;
  } else {
    let remainder = len % 3;
    if(remainder > 0) {
      return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',');
    } else {
      return num.slice(0, len).match(/\d{3}/g).join(',')
    }
  }
}

console.log(format1(0112323123))
