const data = {
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

function arrayToTree(list, root) {
  const result = [];
  const map = {};

  for (const item of list) {
    map[item.id] = { ...item }
  }

  for (const item of list) {
    const { id, parent_id } = item;
    if (item.parent_id === root) {
      result.push(map[id]);
    } else {
      map[parent_id].children
        ? map[parent_id].children.push(map[id])
        : (map[parent_id].children = [map[id]]);
    }
  }
  return result;
}

function arrayToTreeV2(list, root) {
  const result = [];
  const map = {};
  for (const item of list) {
    const { id, parent_id } = item;
    if (!map[id]) map[id] = {};
    map[id] = map[id].children
      ? { ...item, children: map[id].children }
      : { ...item };

    if(parent_id === root) {
      result.push(map[id]);
    } else {
      if(!map[parent_id]) map[parent_id] = {};
      if(!map[parent_id].children) map[parent_id].children = [];
      map[parent_id].children.push(map[id]);
    }
  }
  return result;
}

function arrayToTreeV3(list, root) {
  return list
    .filter(item => item.parent_id === root)
    .map(item => ({...item, children: arrayToTreeV3(list, item.id)}))
}


console.log(arrayToTreeV3(data.city, 0))

function Scheduler() {
  this.list = [];
  this.add = function(promiseCreate) {
    this.list.push(promiseCreate);
  }
  this.maxCount = 2;
  var tempRunIndex = 0;
  function request() {
    if(!this.list || !this.list.length) {
      return;
    }
    tempRunIndex++;
    this.list.shift()().then(() => {
      tempRunIndex--;
      request.bind(this)();
    })
  }
}

function taskPool() {
  this.tasks = [];
  this.pool = [];
  this.max = 2;
}

taskPool.prototype.addTask = function(task) {
  this.tasks.push(task);
  this.run();
}

taskPool.prototype.run = function() {
  if(this.tasks.length === 0) {
    return;
  }
  let min = Math.min(this.tasks.length, this.max - this.pool.length);
  for(let i = 0; i<min;i++) {
    const currTask = this.tasks.shift();
    this.pool.push(currTask);
    currTask().finally(() => {
      this.pool.splice(this.pool.indexOf(currTask), 1);
      this.run();
    })
  }
}
