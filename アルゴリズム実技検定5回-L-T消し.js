/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_l

ex. 1
7
adbabcd
abc

ex. 2
6
ababaa
aba

ex. 3
6
zzzzzz
abc

ex. 4
9
aaabababa
aba

Tの前1文字、後ろ2文字 or
Tの前2文字、後ろ1文字がTになるのを優先で消す

解説は区間dpで解くとのことだが、このロジックでダメな例が見つからないので一旦保留
*/

const inputStr = `9
aaabababa
aba`

let inputArray = inputStr.split('\n')

const N = parseInt(inputArray.shift())
const S = inputArray.shift()
const T = inputArray.shift()


console.log('N', N);
console.log('S', S);
console.log('T', T);

let a = 0

let ss = S
while (true) {
  let from = 0
  let i = -1
  while (ss.indexOf(T, from) !== -1) {
    i = ss.indexOf(T, from)
    if ((i > 0 && i + 2 < ss.length && ss.substring(i - 1, i) + ss.substring(i + 1, i + 3) === T)
    || (i > 1 && i + 1 < ss.length && ss.substring(i - 2, i) + ss.substring(i + 1, i + 2) === T)) {
      break
    }
    from = i + 1
  }
  if (ss.indexOf(T, from) !== -1 || i > -1) {
    ss = ss.substring(0, i) + ss.substring(i + 3)
    a++
  } else {
    break
  }
}



console.log('答え', a); 
