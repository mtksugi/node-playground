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

G:グリッド全体
E(G):求める期待値
G':Gから的が一つ少ないグリッド（1回投げて一つ的にあたったグリッド）
→GはG'から1回投げた期待値
的なしのE(G)=0

上下左右中央の1つの的にあてられる場合: E(G) = E(G') + 5
上下左右中央の2つの的にあてられる場合: E(G) = E(G') + 5/2
上下左右中央の3つの的にあてられる場合: E(G) = E(G') + 5/3
上下左右中央の4つの的にあてられる場合: E(G) = E(G') + 5/4
上下左右中央のすべてに的にあてられる場合: E(G) = E(G') + 1

E(G'): 
(
  E(Gのある1点の上がない)+
  E(Gのある1点の下がない)+
  E(Gのある1点の右がない)+
  E(Gのある1点の左がない)+
  E(Gのある1点がない) 
) / 上で足した数

E(G)のメモ化再帰で解く

E(G)=2^16だから
16桁の0/1文字列として、1行目を1〜4桁、2行目を5〜8桁...で表現し、2進→10進変換して添字とする
*/

const inputStr = `###.
##..
.###
.###`

let inputArray = inputStr.split('\n')

let G = new Array()
while (inputArray.length > 0) {
  let line1 = inputArray.shift()
  G.push(line1.split(''))
}

console.log('G', G);

const H = G.length
const W = G[0].length

console.log('H, W', H, W);

// グリッドを表す文字列
let gs = ''

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (G[i][j] === '#') {
      gs += '1'
    } else {
      gs += '0'
    }
  }
}
console.log(gs);

let e = new Array(2**16)
e.fill(-1)

e[0] = 0

const calc = (gs) => {
  if (e[parseInt(gs, 2)] !== -1) return e[parseInt(gs, 2)]

   // 全フラグを繰り返す
   for (let i = 0; i <= gs.length; i++) {
    let n = 0
    let ee = 0
    let tempGs = ''
    let x = new Array(5)
    x.fill(0)
    //中央
    if (gs.substring(i, i + 1) === '1') {
      tempGs = gs.substring(0, i) + '0' + gs.substring(i + 1)
      x[0] = calc(tempGs)
      n += 1
    }
    //上
    if (i - W >= 0 && gs.substring(i - W, i - W + 1) === '1') {
      tempGs = gs.substring(0, i - W) + '0' + gs.substring(i - W + 1)
      x[1] = calc(tempGs)
      n += 1
    }
    //右
    if (i % W !== 3 && gs.substring(i + 1, i + 1 + 1) === '1') {
      tempGs = gs.substring(0, i + 1) + '0' + gs.substring(i + 1 + 1)
      x[2] = calc(tempGs)
      n += 1
    }
    //下
    if (i + W < gs.length && gs.substring(i + W, i + W + 1) === '1') {
      tempGs = gs.substring(0, i + W) + '0' + gs.substring(i + W + 1)
      x[3] = calc(tempGs)
      n += 1
    }
    //左
    if (i % W !== 0 && gs.substring(i - 1, i - 1 + 1) === '1') {
      tempGs = gs.substring(0, i - 1) + '0' + gs.substring(i - 1 + 1)
      x[4] = calc(tempGs)
      n += 1
    }

    if (n !== 0) {
      ee = x.reduce((pre, cur) => pre + cur) / n + 5 / n

      if (e[parseInt(gs, 2)] === -1 || ee < e[parseInt(gs, 2)]) {
        e[parseInt(gs, 2)] = ee
      }
    }
   }

  return e[parseInt(gs, 2)]
}



let expect = calc(gs)

console.log('答え', expect); 