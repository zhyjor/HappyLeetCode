function Person() {
  this.queue = [];
  this.lock = false;
}

Person.prototype.eat = function () {
  this.queue.push(() => new Promise(resolve => { console.log('eat'); resolve(); }));
  // this.run();
  return this;
}

Person.prototype.sleep = function(time, flag) {
  this.queue.push(() => new Promise(resolve => {
    setTimeout(() => {
      console.log('sleep', flag);
      resolve();
    }, time * 1000)
  }));
  // this.run();
  return this;
}

Person.prototype.run = async function() {
  if(this.queue.length > 0 && !this.lock) {
    this.lock = true;
    const task = this.queue.shift();
    await task();
    this.lock = false;
    this.run();
  }
}

// const person = new Person();
// person.eat().sleep(1, '1').eat().sleep(3, '2').eat().run();

function Person2() {
  this.queue = [];
}

Person2.prototype.eat = function() {
  this.queue.push(() => {
    console.log('eat');
    this.run();
  });
  return this;
}

Person2.prototype.sleep = function(time) {
  this.queue.push(() => {
    setTimeout(() => {
      console.log('sleep');
      this.run();
    }, time * 1000)
  })
  return this;
}

Person2.prototype.run = function() {
  const task = this.queue.shift();
  task && task();
}


const person2 = new Person2();
person2.eat().sleep(1).eat().sleep(3).eat().run();
