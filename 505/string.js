function str() {
  const next = [];
  const s = 'abababab';
  function getNext() {
    let j = -1;
    next[0] = j;
    for (let i = 0; i < s.length; i++) {
      while (j >= 0 && s[i] !== s[j + 1]) {
        j = next[j];
      }
      if (s[i] === s[j + 1]) {
        j++;
      }
      next[i] = j;
    }
  }
}

function getNext(next, s) {
  let j = -1;
  next[0] = j;
  for (let i = 1; i < s.length; i++) {
    while (j >= 0 && s[i] !== s[j + 1]) {
      j = next[j];
    }
    if (s[i] === s[j + 1]) {
      j++;
    }
    next[i] = j;
  }
}

function getNext1(next, s) {
  let j = 0;
  next[0] = 0;
  for(let i = 1; i<s.length; i++) {
    while(j>0 && s[i] !== s[j]) {
      j = next[j-1];
    }
    if(s[i] === s[j]) {
      j++;
    }
    next[i] = j;
  }
}
