// isArray用来标记当前的obj是否是数组来确定遍历到的path是否需要放进[]内
function flat(obj, path = '', res = {}, isArray) {
  for (let [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      let _k = isArray ? `${path}[${k}]` : `${path}${k}`;
      flat(v, _k, res, true);
    } else if (typeof v === 'object') {
      let _k = isArray ? `${path}[${k}].` : `${path}${k}.`;
      flat(v, _k, res, false);
    } else {
      let _k = isArray ? `${path}[${k}]` : `${path}${k}`;
      res[_k] = v;
    }
  }
  return res;
}

function parseTemplateString (templateString, data) {
  // 使用正则表达式在模板字符串中查找所有 ${...} 的实例
  const regex = /\${(.*?)}/g;
  // 使用 replace() 方法将每个 ${...} 的实例替换为数据对象中相应的值
  const parsedString = templateString.replace(regex, (match, key) => {
    // 使用 eval() 函数来评估 ${...} 中的表达式，并从数据对象中返回相应的值
    return eval(`data.${key}`);
  });
  return parsedString;
}
// 测试:
const name = 'John';
const age = 30;
const job = 'Web Developer';
const templateString = '我的名字是 ${name}，我今年 ${age} 岁，我从事 ${job} 的工作。';
const data = { name, age, job };
const parsedString = parseTemplateString(templateString, data);
console.log(parsedString); // 输出: 我的名字是 John，我今年

// console.log(flat({ a: { aa: [{ aa1: 1 }] } }))
