function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    const _this = this;
    const args = arguments;

    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  }
}

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) return;
    const _this = this;
    const args = arguments;
    timer = setTimeout(function () {
      fn.apply(_this, args);
      timer = null;
    }, delay)
  }
}
