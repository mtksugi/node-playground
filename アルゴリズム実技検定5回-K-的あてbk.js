/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_k

ex. 1
#...
....
....
....

ex. 2
#...
#...
....
....

ex. 3
.#..
#.#.
.#..
....

ex. 4
###.
####
####
####

*/

const inputStr = `###.
####
####
####`

let inputArray = inputStr.split('\n')

let S = new Array()
while (inputArray.length > 0) {
  let line1 = inputArray.shift()
  S.push(line1.split(''))
}

console.log('S', S);


// 狙うマスを探す
//  中心+4方向で的の多いマス
const findTarget = () => {
  let target = []
  let targetCnt = 0
  for (let i = 0; i < S.length; i++) {
    for (let j = 0; j < S[i].length; j++) {
      let cnt = 0
      if (S[i][j] === '#') cnt++
      if (i > 0 && S[i - 1][j] === '#') cnt++
      if (i < S.length - 1 && S[i + 1][j] === '#') cnt++
      if (j > 0 && S[i][j - 1] === '#') cnt++
      if (j < S[i].length - 1 && S[i][j + 1] === '#') cnt++

      if (targetCnt < cnt) {
        targetCnt = cnt
        target = [i, j]
      }
      if (targetCnt === 5) {
        break
      }
    }
    if (targetCnt === 5) break
  }
  return {'target': target, 'cnt': targetCnt}
  // return target
}
// let target = findTarget()
// console.log(target);

// 隣接点が多い的にあたったことにする→期待値最小という条件
const neighborTargetCnt = (i, j) => {
  let cnt = 0
  if (i > 0 && S[i - 1][j] === '#') cnt++
  if (i < S.length - 1 && S[i + 1][j] === '#') cnt++
  if (j > 0 && S[i][j - 1] === '#') cnt++
  if (j < S[i].length - 1 && S[i][j + 1] === '#') cnt++
  if (S[i][j] === '#') cnt++
  return cnt
}

const hitTargetProc = (i, j) => {
  let maxTargetCnt = 0
  let cnt = 0
  let hitTarget = []
  if (S[i][j] === '#') {
    cnt = neighborTargetCnt(i, j)
    if (cnt > maxTargetCnt) {
      maxTargetCnt = cnt
      hitTarget = [i, j]
    }
  }
  if (i > 0 && S[i - 1][j] === '#') {
    cnt = neighborTargetCnt(i - 1, j)
    if (cnt > maxTargetCnt) {
      maxTargetCnt = cnt
      hitTarget = [i - 1, j]
    }
  }
  if (i < S.length - 1 && S[i + 1][j] === '#') {
    cnt = neighborTargetCnt(i + 1, j)
    if (cnt > maxTargetCnt) {
      maxTargetCnt = cnt
      hitTarget = [i + 1, j]
    }
  }
  if (j > 0 && S[i][j - 1] === '#') {
    cnt = neighborTargetCnt(i, j - 1)
    if (cnt > maxTargetCnt) {
      maxTargetCnt = cnt
      hitTarget = [i, j - 1]
    }
  }
  if (j < S[i].length - 1 && S[i][j + 1] === '#') {
    cnt = neighborTargetCnt(i, j + 1)
    if (cnt > maxTargetCnt) {
      maxTargetCnt = cnt
      hitTarget = [i, j + 1]
    }
  }
  // console.log(hitTarget);
  if (S[hitTarget[0]][hitTarget[1]] !== '#') {
    console.log('hitTargetProc: 想定外');
  }
  S[hitTarget[0]][hitTarget[1]] = '.'
}

// hitTargetProc(1, 0)

let expect = 0
while (true) {
  if (S.every(s => s.every(ss => ss === '.'))) {
    break
  }
  let target = findTarget()
  expect += 5 / target.cnt
  hitTargetProc(target.target[0], target.target[1])
}

console.log('答え', expect);
