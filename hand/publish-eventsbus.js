class Publish {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    });
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update(this);
    })
  }
}

class Observer {
  constructor() {

  }
  update() {

  }
}

class EventEmitter{
  constructor() {
    this.handler = {};
  }

  on(eventName, cb) {
    if(!this.handler[eventName]) {
      this.handler[eventName] = [];
    }
    this.handler[eventName].push(cb);
  }
  emit(eventName, ...args) {
    if(this.handler[eventName]) {}
    const handler = this.handler[eventName].splice();
    handler.forEach(callback => {
      callback(...args);
    })
  }

  off(eventName, cb) {
    const callbacks = this.handler[eventName];
    const index = callbacks.indexOf(cb);
    if(index !== -1) {
      callbacks.splice(index, 1);
    }
  }
  once(eventName, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, cb);
    }
    this.on(eventName, wrapper);
  }
}
