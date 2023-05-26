const imgs = document.getElementsByTagName('img');
const viewHeight = window.innerHeight || document.documentElement.clientHeight;

let num = 0;

function lazyLoad() {
  for (let i = 0; i < imgs.length; i++) {
    let distance = viewHeight - imgs[i].getBoundingClientRect().top;
    if(distance >= 0) {
      imgs[i].src = imgs[i].getAttribute('data-src');
      num = i+1;
    }
  }
}
window.addEventListener('scroll', lazyLoad, false);

function throttle(fn, interval) {
  let last = 0;
  return function () {
    let context = this;
    let args = arguments;
    let now = +new Date();
    if(now - last >= interval) {
      last = now;
      fn.apply(context, args);
    }
  }
}

function debounce(fn, delay) {
  let timer = null;
  return function() {
    let context = null;
    let args = arguments;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}
