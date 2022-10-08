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

const inputStr = `5 4 2
3 10 5 8 2
3 5
3 2
3 1
4 5
2 1`

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

// これは各村が到達できる村を表す
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
console.log('reachable', reachable);

// ダイクストラ
//  各村から避難所への経路を格納→配列長が距離になる
let p = new Array(N)
for (let i = 0; i < N; i++) {
  p[i] = new Array()
}
//  S: Csを追加
let s = new Array()
s = [...Cs]
console.log('s', s);

//  Csの距離は[0]とする
for (let i = 0; i < N; i++) {
  if (Cs.includes(i + 1)) {
    p[i].push(0)
  }
}

// Q: S以外
let q = new Array()
for (let i = 0; i < N; i++) {
  if (!s.includes(i + 1)) {
    q.push(i + 1)
  }
}

while(true) {
  if (q.length === 0) break
  
  // Qの中からSに到達できるものを抽出
  let nearest_p = {}
  for (const qq of q) {
    for (let i = 0; i < reachable.length; i++) {
      if (s.includes(i + 1) && reachable[i].includes(qq)) {
        nearest_p = {...nearest_p, [qq]: i + 1}
      }
    }
  }
  // 最小のpについてSへの道をセット
  for (const np in nearest_p) {
    if (!p[parseInt(np) - 1].includes(nearest_p[np])){
      p[parseInt(np) - 1].push(nearest_p[np])
    }
  }
  // 隣接点の距離を更新
  for (const np in nearest_p) {
    for (let x of reachable[parseInt(np) - 1]) {
      if (!(x.toString() in nearest_p)) {
        p[x - 1].push(parseInt(np))
        p[x - 1].push(...p[parseInt(np) - 1])
      }
    }
  }
  // 最小pをQから抜いてSに移す
  for (const np in nearest_p) {
    q = q.filter(x => x !== parseInt(np) )
    s.push(parseInt(np))
  }
  if (Object.keys(nearest_p).length === 0) {
    q = new Array()
  }
}
console.log('p', p);


for (let i = 0; i < p.length; i++) {
  if (p[i][0] === 0) {
    console.log(`${Hs[i]}: 0`);
  } else if (p[i].length === 0){
    console.log(`${Hs[i]}: -1`);
  } else {
    console.log(`${Hs[i]}: ${p[i].length}`);
  }
}


