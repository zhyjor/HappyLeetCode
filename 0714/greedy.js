/**
 *
 * @param {*} g 饼干
 * @param {*} s 胃口
 */
function findContentChildren(g, s) {
  const sortChildren = s.sort((a, b) => a - b);
  const sortCookie = g.sort((a, b) => a - b);
  let result = 0;
  let j = sortCookie.length - 1;
  for (let i = sortChildren.length - 1; i >= 0; i--) {
    if (sortCookie[j] >= sortChildren[i]) {
      j--;
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

function maxProfit2(numbers) {
  let result = 0;
  for (let i = 0, len = numbers.length; i < len - 1; i++) {
    result += Math.max(numbers[i + 1] - numbers[i], 0);
  }
  return result;
}

function canJump(numbers) {
  let cover = 0;
  for (let i = 0, len = numbers.length; i < len; i++) {
    cover = Math.max(cover, numbers[i]);
    if (cover >= len) return true;
  }
  return false;
}

function canJump2(numbers) {
  if (numbers.length <= 1) return 0;
  let currentDistance = 0;
  let nextDistance = 0;
  let ans = 0;
  for (let i = 0, len = numbers.length; i < len - 1; i++) {
    nextDistance = Math.max(nextDistance, numbers[i] + i);
    // 每次都完整的计算这一步可产生的最远距离
    if (i === currentDistance) {
      ans++;
      currentDistance = nextDistance;
    }
  }
  return ans;
}

function largestSumAfterKNegations(s, key) {
  const numbers = s.sort((a, b) => Math.abs(a) - Math.abs(b));
  for (let i = 0, len = numbers.length; i < len; i++) {
    if (numbers[i] < 0 && key > 0) {
      numbers[i] = Math.abs(numbers[i]);
      key--;
    }
  }
  while (key > 0) {
    numbers[0] = -numbers[0];
  }
  return numbers.reduce((pre, current) => pre + current, 0);
}

function canCompleteCircuit(gas, cost) {
  let curSum = 0;
  let min = Infinity;
  for (let i = 0, len = gas.length; i < len; i++) {
    let ret = gas[i] = cost[i];
    curSum += ret;
    min = Math.min(min, curSum);
  }
  if (curSum < 0) return -1;
  if (min >= 0) return 0;
  for (let i = gas.length - 1; i >= 0; i--) {
    let ret = gas[i] - cost[i];
    min += ret;
    if (min >= 0) return i;
  }
  return -1;
}

function canCompleteCircuit(gas, cost) {
  let curSum = 0;
  let totalSum = 0;
  let start = 0;
  for (let i = 0, len = gas.length; i < len; i++) {
    curSum += gas[i] - cost[i];
    totalSum += gas[i] - cost[i];
    if (curSum < 0) {
      start = i + 1;
      curSum = 0;
    }
  }
  if (totalSum < 0) return -1;
  return start;
}

function candy(rating) {
  const candyArray = new Array(rating.length).fill(1);
  for (let i = 1, len = rating.length; i < len; i++) {
    if (rating[i] > rating[i - 1]) {
      candyArray[i] = candyArray[i - 1] + 1;
    }
  }
  for (let len = rating.length, i = len - 2; i >= 0; i--) {
    if (rating[i] >= rating[i + 1]) {
      candyArray[i] = Math.max(candyArray[i], candyArray[i + 1] + 1);
    }
  }
  return candyArray.reduce((sum, b) => sum + b, 0);
}

var lemonadeChange = function (bills) {
  let fiveCount = 0;
  let tenCount = 0;
  for (i = 0; i < bills.length; i++) {
    let bill = bills[i];
    if (bill === 5) {
      fiveCount++;
    } else if (bill === 10) {
      if (fiveCount > 0) {
        fiveCount--;
        tenCount++;
      } else {
        return false;
      }
    } else {
      if (tenCount > 0 && fiveCount > 0) {
        tenCount--;
        fiveCount--;
      } else if (fiveCount >= 3) {
        fiveCount -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
};

function reconstructQueue(people) {
  const sp = people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return b[0] - a[0];
    }
  });
  for (let i = 0, len = people.length; i < len; i++) {
    sp.splice(sp[i][1], 0, sp[i]);
  }
  return sp;
}

function findMinArrowShots(points) {
  if (points.length === 0) return 0;
  let sortPoints = points.sort((a, b) => a[0] - b[0]);
  let result = 1;
  for (let i = 1, len = points.length; i < len; i++) {
    if (sortPoints[i][0] > sortPoints[i - 1][1]) {
      result++;
    } else {
      sortPoints[i][1] = Math.min(sortPoints[i - 1][1], sortPoints[i][1]);
    }
  }
  return result;
}

function eraseOverlapIntervals(intervals) {
  let sortIntervals = intervals.sort((a, b) => a[1] - b[1]);
  let result = 0;
  for (let len = intervals.length, i = len - 2; i >= 0; i--) {
    if (sortIntervals[i][1] > sortIntervals[i + 1][0]) {
      sortIntervals[i][0] = Math.max(sortIntervals[i][0], sortIntervals[i + 1][0]);
      result++;
    }
  }
  return result;
}

function partitionLabels(s) {
  let hash = {};
  for (let i = 0, len = s.length; i < len; i++) {
    hash[s[i]] = i;
  }
  let result = [];
  let left = 0;
  let right = 0;
  for (let i = 0, len = s.length; i < len; i++) {
    right = Math.max(right, hash[s[i]]);
    if (right === i) {
      result.push(right - left + 1);
      left = i + 1;
    }
  }
  return result;
}

function merge(intervals) {
  if (intervals.length === 0) return [];
  // 左边界排序
  const sortIntervals = intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  result.push(sortIntervals[0]);
  for (let i = 1, len = sortIntervals.length; i < len; i++) {
    const current = result.pop();
    if (current[1] >= sortIntervals[i][0]) {
      current[1] = Math.max(current[1], sortIntervals[i][1]);
      result.push(current);
    } else {
      result.push(current);
      result.push(sortIntervals[i]);
    }
  }
  return result;
}

function monotoneIncreasingDigits(n) {
  const s = `${n}`.split('').map(i => +i);
  let flag = Infinity;
  for (let len = s.length, i = len - 1; i > 0; i--) {
    if (s[i - 1] > s[i]) {
      flag = i;
      s[i - 1] -= 1;
      s[i] = 9;
    }
  }
  for (let i = flag; i < s.length; i++) {
    s[i] = 9;
  }
  return !s.join('');
}
