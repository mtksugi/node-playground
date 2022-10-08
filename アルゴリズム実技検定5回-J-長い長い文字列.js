/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_i

//ex. 1
ab2c1
6

(abababcabababc)

//ex. 2
atcoder
6

//ex. 3
a999999999999999
1000000000000000

*/

const inputStr = `a2222cde2fg
4`

let inputArray = inputStr.split('\n')

let line1 = inputArray.shift()
const S = line1   //文字列

line1 = inputArray.shift()
const X = parseInt(line1)   //何番目


console.log('S', S);
console.log('X', X);

let ss = S.split('')
let x = X
let a = ''
let inc = 0

/*
// 先頭から調べるとO(Nlog(x))
while (true) {
  let n = 0
  for (let i = 0; i < ss.length; i++) {
    if (isNaN(ss[i])) {
      n++
      if (n === x) {
        a = ss[i]
        break
      }
    } else {
      inc = n * parseInt(ss[i])
      if (n + inc >= x) {
        x = x % n || n
        break
      }
      n += inc
    }
  }
  if (a) break
}
*/

// 先に回数だけ調べておくとO(N)

let cnt = new Array(ss.length)
let n = 0

for (let i = 0; i < ss.length; i++) {
  if (isNaN(ss[i])) {
    n++
  } else {
    inc = n * parseInt(ss[i])
    n += inc
  }
  cnt[i] = n
}
// console.log(cnt);

for (let i = cnt.length - 1; i >= 0; i--) {
  if (cnt[i] < x) {
    if (isNaN(ss[i + 1])) {
      a = ss[i + 1]
      break
    } else {
      x = (x - 1) % cnt[i] + 1  //ちょうどのときに0ではなくてcnt[i]としたいから割られる数を-1してあまりに1を足す
    }
  }
}
if (a === '') {
  a = ss[0]
}




console.log('答え', a);