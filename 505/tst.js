setTimeout(() => {
  console.log(4);
}, 0);
new Promise((resolve) => {
  console.log(1);
  for (let i = 0; i <= 9999; i++) {
    if(i === 9500){
       resolve();
    }
  }
  console.log(2);
}).then(i => {
  console.log(3);
});
console.log(5)
