function findContentChildren(g, s) {
  const sortG = g.sort((a, b) => a - b);
  const sortS = s.sort((a, b) => a - b);
  let sIndex = sortS.length - 1;
  let result = 0;
  for (let i = sortG.length - 1; i >= 0; i--) {
    if (sIndex >= 0 && sortG[i] <= sortS[sIndex]) {
      sIndex--;
      result++;
    }
  }
  return result;
}

function wiggleMaxLength(numbers) {
  let result = 1;
  let preDiffs = 0;
  let curDiffs = 0;
  for (let i = 0, len = numbers.length; i < len - 1; i++) {
    curDiffs = numbers[i + 1] - numbers[i];
    if ((preDiffs <= 0 && curDiffs > 0) || (preDiffs >= 0 && curDiffs < 0)) {
      result++;
      preDiffs = curDiffs;
    }
  }
  return result;
}

function maxSubArray(arr) {
  let result = -Infinity;
  let count = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    count += arr[i];
    result = Math.max(count, result);
    if (count < 0) count = 0;
  }
  return result;
}

function maxProfit2(numbers) {
  let result = 0;
  for (let i = 0, len = numbers.length; i < len - 1; i++) {
    result += Math.max(numbers[i + 1] - numbers[i], 0);
  }
  return result;
}

function canJump(number) {
  let cover = 0;
  for (let i = 0, len = number.length; i <= cover; i++) {
    cover = Math.max(cover, i + number[i]);
    if (cover >= len - 1) return true;
  }
  return false;
}

function jump(numbers) {
  if (numbers.length <= 1) return 0;
  let currentDistance = 0;
  let nextDistance = 0;
  let ans = 0;
  for (let i = 0, len = numbers.length; i < len; i++) {
    nextDistance = Math.max(nextDistance, i + numbers[i]);
    if (i === currentDistance) {
      ans++;
      currentDistance = nextDistance;
      if (nextDistance >= len - 1) break;
    }
  }
  return ans;
}

function canCompleteCircuit(gas, cost) {
  let curSum = 0;
  let totalSum = 0;
  let start = 0;
  for (let i = 0, len = gas.length; i < len; i++) {
    totalSum += gas[i] - cost[i];
    curSum += gas[i] - cost[i];
    if (curSum < 0) {
      start = i + 1;
      curSum = 0;
    }
  }
  if (totalSum < 0) return -1;
  return start;
}

function candy(rating) {
  const candy = new Array(rating.length).fill(1);
  for (let i = 1, len = rating.length; i < len; i++) {
    if (rating[i] > rating[i - 1]) {
      candy[i] = candy[i - 1] + 1;
    }
  }
  for (let len = rating.length, i = len - 2; i >= 0; i--) {
    if (rating[i] > rating[i + 1]) {
      candy[i] = Math.max(candy[i], candy[i + 1] + 1);
    }
  }
  return candy.reduce((p, c) => p + c, 0);
}

function reconstructQueue(people) {
  const sortPeople = people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });
  const queue = [];
  for (let i = 0, len = people.length; i < len; i++) {
    queue.splice(sortPeople[i][1], 0, sortPeople[i]);
  }
  return queue;
}

function findMinArrowShots(points) {
  if (points.length === 0) return 0;
  const sortPoints = points.sort((a, b) => a[0] - b[0]);
  let result = 1;
  for (let i = 1, len = sortPoints.length; i < len; i++) {
    if (sortPoints[i][0] > sortPoints[i - 1][1]) {
      result++;
    } else {
      sortPoints[i][1] = Math.min(sortPoints[i][1], sortPoints[i - 1][1]);
    }
  }
  return result;
}

function eraseOverlapIntervals(intervals) {
  let sortIntervals = intervals.sort((a, b) => a[0] - b[0]);
  let result = 0;
  for (let i = 1, len = sortIntervals.length; i < len; i++) {
    if (sortIntervals[i][0] < sortIntervals[i - 1][1]) {
      result++;
      sortIntervals[i][1] = Math.min(sortIntervals[i][1], sortIntervals[i - 1][1]);
    }
  }
  return result;
}

function partitionLabels(s) {
  const hash = {};
  for (let i = 0, len = s.length; i < len; i++) {
    hash[s[i]] = i;
  }
  const result = [];
  let left = 0;
  let right = 0;
  for (let i = 0, len = s.length; i < len; i++) {
    right = Math.max(right, hash[s[i]]);
    if (i === right) {
      result.push(right - left + 1);
      left = right + 1;
    }
  }
  return result;
}

function merge(intervals) {
  if (intervals.length === 0) return [];
  const sortIntervals = intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  result.push(sortIntervals[0]);
  for (let i = 1, len = sortIntervals.length; i < len; i++) {
    const current = result.pop();
    if (sortIntervals[i][0] > current[1]) {
      result.push(current);
      result.push(sortIntervals[i]);
    } else {
      current[1] = Math.max(current[1], sortIntervals[i][1]);
      result.push(current);
    }
  }
  return result;
}

function monotoneIncreasingDigits(n) {
  const arr = `${n}`.split('').map(i => +i);
  let flag = Infinity;
  for (let len = arr.length, i = len - 1; i > 0; i--) {
    if (arr[i - 1] > arr[i]) {
      flag = i;
      arr[i] = 9;
      arr[i - 1] -= 1;
    }
  }
  for (let i = flag; i < arr.length; i++) {
    arr[i] = 9;
  }
  return +arr.join('');
}


