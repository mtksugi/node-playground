/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_g

//-- ex. 1
const H = 3
const W = 3

const input = new Array(H)

input[0] = ['#', '#', '.']
input[1] = ['.', '#', '#']
input[2] = ['#', '#', '#']

//-- ex. 2
const H = 3
const W = 4

const input = new Array(H)

input[0] = ['#', '#', '#', '#']
input[1] = ['#', '#', '#', '#']
input[2] = ['.', '#', '.', '.']

//-- ex. 3
const H = 3
const W = 3

const input = new Array(H)

input[0] = ['.', '#', '#']
input[1] = ['#', '#', '#']
input[2] = ['#', '#', '#']
*/

const H = 3
const W = 3

const input = new Array(H)

input[0] = ['.', '#', '#']
input[1] = ['#', '#', '#']
input[2] = ['#', '#', '#']

let sharpCount = 0
input.forEach((line) => {
  console.log(line);
  sharpCount += line.filter(elm => elm === '#').length
});

console.log(`#: ${sharpCount}`);

let save = new Array()
let saveLength = 0
const search = (i, j) => {
  
  if (save.some((elm) => elm[0] === i && elm[1] === j)) return

  save.push([i, j])
  saveLength = save.length

  if (j < W - 1 && input[i][j + 1] === '#') {
    search(i, j + 1)
  }
  if (i < H - 1 && input[i + 1][j] === '#') {
    search(i + 1, j)
  }
  if (j > 0 && input[i][j - 1] === '#') {
    search(i, j - 1)
  }
  if (i > 0 && input[i - 1][j] === '#') {
    search(i - 1, j)
  }

  if (save.length !== sharpCount && save.length === saveLength){
    save.pop()
  }
}


let exit = false
for (let i = 0; i < H && !exit; i++) {
  for (let j = 0; j < W && !exit; j++) {
    if (input[i][j] === '#') {
      save = new Array()
      search(i, j)
      if (save.length === sharpCount) exit = true
    }
  }
}

if (exit) {
  console.log(('解けました'));
  save.forEach((line) => {
    line[0] += 1
    line[1] += 1
    console.log(line)
  })
} else {
  console.log('解けませんでした');
}

