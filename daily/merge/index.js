function merge(numbers1, m, numbers2, n) {
  // 定义三个指针,都指向数组的尾巴
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (numbers1[i] > numbers2[j]) {
      // 取最大的值往后补
      numbers1[k] = numbers1[i];
      i--;
      k--;
    } else {
      numbers1[k] = numbers2[j];
      j--;
      k--;
    }
  }
  // 只有j未返回终点的时候需要继续put数据，若j已经返回终点直接返回即可
  while (j >= 0) {
    numbers1[k] = numbers2[j];
    j--;
    k--;
  }
}
