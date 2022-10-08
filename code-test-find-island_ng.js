/*
Q. Given a boolean 2D matrix, find the number of islands.
A group of connected 1s forms an island.
For example, the below matrix contains 5 islands

{1, 1, 0, 0, 0},
{0, 1, 0, 0, 1},
{1, 0, 0, 1, 1},
{0, 0, 0, 0, 0},
{1, 0, 1, 1, 0} 
*/

const N = 5

const table = new Array(N)

for (let i = 0; i < N; i++) {
  table[i] = new Array(N)
}

table[0] = [0, 1, 1, 1, 0]
table[1] = [0, 1, 0, 1, 0]
table[2] = [0, 1, 1, 0, 0]
table[3] = [0, 0, 0, 0, 0]
table[4] = [0, 0, 0, 0, 0]

console.log(table);

let anser = 0

let start = false
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (table[i][j] === 1) {
      // 開始フラグ立てる
      start = true
      // // 上が1ならカウント済なのでcontinue
      // if (i > 0) {
      //   if (table[i-1][j] === 1) continue
      // }
      // 右または下に1があればcontinue
      if (j < (N - 1) && table[i][j+1] === 1) continue
      if (i < (N - 1) && table[i+1][j] === 1) continue
      // 上と右斜め上にあれば重複カウントなのでcontinue
      if (i > 0 && table[i-1][j] === 1 && j < (N - 1) && i > 0 && table[i-1][j+1] === 1) continue
      // なければ島認定
      anser += 1
      console.log(`1 table ${i+1}, ${j+1}: ${table[i][j]}`);
      start = false
    } else {
      // // 開始フラグが立っていたら島認定してフラグを下げる
      // if (start) {
      //   anser += 1
      //   console.log(`2 table ${i+1}, ${j+1}: ${table[i][j]}`);
      // }
      // start = false
      continue
    }
  }
}

console.log(`島の数は${anser}です`);