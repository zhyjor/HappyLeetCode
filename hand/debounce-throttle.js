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

function debounce1(fn, wait) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
}

// 单位时间内一次
function throttle2(fn, delay) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  }
}
