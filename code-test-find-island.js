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

const N = 10

const table = new Array(N)

for (let i = 0; i < N; i++) {
  table[i] = new Array(N)
}

table[0] = [1, 1, 0, 0, 0, 1, 1, 0, 0, 0]
table[1] = [1, 1, 0, 0, 1, 1, 1, 0, 0, 1]
table[2] = [1, 0, 0, 1, 1, 1, 0, 0, 1, 1]
table[3] = [0, 0, 0, 1, 0, 0, 0, 0, 1, 0]
table[4] = [1, 1, 1, 1, 0, 1, 0, 1, 1, 0]
table[5] = [1, 0, 1, 1, 0, 0, 0, 1, 1, 0]
table[6] = [1, 1, 0, 0, 0, 1, 1, 0, 1, 0]
table[7] = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
table[8] = [1, 0, 0, 1, 1, 1, 0, 0, 1, 1]
table[9] = [0, 0, 0, 1, 0, 0, 0, 0, 1, 0]

// console.log(table);

let anser = 0
let save = new Array()

let countCalc = 0

const crossSearch = (i, j, direction) => {
  countCalc += 1

  if (save.some((elm) => elm[0] === i && elm[1] === j)) return

  if (!save.some((elm) => elm[0] === i && elm[1] === j)) {
    save.push([i, j])
  }

  if (direction !== 'left' && j < (N - 1) && table[i][j+1] === 1) {
    crossSearch(i, j + 1, 'right')
  } 
  if (direction !== 'up' && i < (N - 1) && table[i+1][j] === 1) {
    crossSearch(i + 1, j, 'down')
  } 
  if (direction !== 'right' && j > 0 && table[i][j-1] === 1) {
    crossSearch(i, j - 1, 'left')
  } 
  if (direction !== 'down' && i > 0 && table[i-1][j] === 1) {
    crossSearch(i - 1, j, 'up')
  } 
}

// const crossSearch = (i, j) => {
//   countCalc += 1

//   if (save.some((elm) => elm[0] === i && elm[1] === j)) return

//   if (!save.some((elm) => elm[0] === i && elm[1] === j)) {
//     save.push([i, j])
//   }

//   if (j < (N - 1) && table[i][j+1] === 1) {
//     crossSearch(i, j + 1)
//   } 
//   if (i < (N - 1) && table[i+1][j] === 1) {
//     crossSearch(i + 1, j)
//   } 
//   if (j > 0 && table[i][j-1] === 1) {
//     crossSearch(i, j - 1)
//   } 
//   if (i > 0 && table[i-1][j] === 1) {
//     crossSearch(i - 1, j)
//   } 
// }

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!save.some((elm) => elm[0] === i && elm[1] === j)) {
      if (table[i][j] === 1) {
        crossSearch(i, j)
        anser += 1
      }
    }
  }
}

console.log(`島の数は${anser}です`);
console.log(`計算量は${countCalc}です`);