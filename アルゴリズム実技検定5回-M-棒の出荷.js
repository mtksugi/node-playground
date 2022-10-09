/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_m

ex. 1
5 10
3 4 1 2 4

ex. 2
8 10
7 2 1 5 3 2 5 2

ex. 3
13 10000000000
1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000

先頭の長さから区切っていく
先頭の長さを超えるかLを超えたら次
1つでLを超えたらNG
最後までいったら最小を得る
先頭に次を足した数で繰り返す
*/

const inputStr = `7 12
4 5 1 1 1 6 12`

let inputArray = inputStr.split('\n')

let line1 = inputArray.shift()
const N = parseInt(line1.split(' ')[0])
const L = parseInt(line1.split(' ')[1])
line1 = inputArray.shift()

const A = line1.split(' ').map(n => parseInt(n))

console.log('N', N);
console.log('L', L);
console.log('A', A);

let ll = 0
let i = 0
let min = -1
let cMin = 0
while (true) {
  ll += A[i]
  cMin = ll
  let llj = A[i + 1]
  for (let j = i + 2; j < A.length; j++) {
    if (llj + A[j] > L || llj + A[j] > ll) {
      if (cMin > llj) cMin = llj
      llj = 0
    }
    llj += A[j]
  }
  if (cMin > llj) cMin = llj

  if (cMin > min) min = cMin
  
  if (i > A.length - 1) break
  if (ll + A[i + 1] > L) break
  i += 1
}

console.log('答え:', min);
