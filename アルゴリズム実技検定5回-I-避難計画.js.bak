/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_i

//ex. 1
5 5 2
1 2 3 4 5
1 2
1 2
1 3
4 2
4 3
3 5

//ex. 2
5 6 2
6 5 9 15 3
4 2
1 5
2 5
2 4
1 3
4 3
2 1

//ex. 3
5 4 2
3 10 5 8 2
3 5
3 2
3 1
4 5
2 1

*/

const inputStr = `5 5 2
1 2 3 4 5
1 2
1 2
1 3
4 2
4 3
3 5`

let inputArray = inputStr.split('\n')

let line1 = inputArray.shift()
const N = parseInt(line1.split(' ')[0])   //ムラの数
const M = parseInt(line1.split(' ')[1])   //水路の数
const K = parseInt(line1.split(' ')[2])   //避難所の数

line1 = inputArray.shift()
const Hs = line1.split(' ').map(x => parseInt(x))   //標高
line1 = inputArray.shift()
const Cs = line1.split(' ').map(x => parseInt(x))   //避難先

const roads = inputArray.map(x => x.split(' ').map( xx => parseInt(xx.split(' '))))   //ムラを結ぶ水路

console.log(N, M, K, Hs, Cs, roads)
// console.log(inputArray)

// 水路で標高の低い方のインデックスを返す
const lowHs = (r) => {
  r0h = Hs[r[0] - 1]
  r1h = Hs[r[1] - 1]
  if (r1h < r0h) {
    return 1
  } else {
    return 0
  }
}

let reachable = new Array(N)
for (let i = 0; i < N; i++) {
  reachable[i] = new Array()
}
for (let i = 0; i < N; i++) {
  for (let j = 0; j < roads.length; j++) {
    let num = roads[j].indexOf(i + 1)
    
    if (num >= 0 && num === lowHs(roads[j]) ) {
      reachable[i].push( (num === 0)? roads[j][1]: roads[j][0])
    }
  }
}
console.log(reachable);

const countRoads = (n) => {
  if (!reachable.flat().includes(n)) {
    return -1
  }
  let branch = []
  for (let i = 0; i < reachable.length; i++) {
    if (reachable[i].includes(n)) {
      branch.push(i + 1)
    }
  }
  let counts = []
  for (let b of branch) {
    let nn = n
    let exit = false
    let count = 1
    while (!exit) {
      let i = b - 1
      for (i; i < reachable.length; i++) {
        if (reachable[i].length === 0) continue
        if (reachable[i].includes(nn)) {
          if (Cs.includes(i + 1)) {
            exit = true
            break
          }
          nn = i + 1
          count += 1
          break
        }
      }
      if (exit) {
        counts.push(count)
      } else if (i === reachable.length) {
        exit = true
      }
    }
  }
  if (counts.length === 0) {
    return -1
  } else {
    return counts.reduce((pre, cur) => Math.min(pre, cur), Infinity)
  }
}


for (let i = 0; i < Hs.length; i++) {
  if (Cs.includes(i + 1)) {
    console.log(`${Hs[i]}: 0`);
  } else {
    console.log(`${Hs[i]}: ${countRoads(i + 1)}`);
  }
}


