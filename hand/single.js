class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    return localStorage.setItem(key, value);
  }
}

function StorageBase() { };
StorageBase.prototype.getItem = function (key) { return localStorage.getItem(key); }
StorageBase.prototype.setItem = function (key, value) { return localStorage.setItem(key, value); }
const StorageCloseure = (function () {
  let instance = null;
  return function () {
    if (!instance) {
      instance = new StorageBase();
    }
    return instance;
  }
})
