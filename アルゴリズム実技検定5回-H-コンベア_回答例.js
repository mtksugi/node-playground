/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_h


//ex. 1
const H = 3
const W = 3
const dest = [1, 1]

..#
^^.
><.

//ex. 2
const H = 10
const W = 12
const dest = [9, 1]

#.^<..><<...
#<>.#<^.<<.^
^.<>.^.^.^>.
^.>#^><#....
.>.^>#...<<>
....^^.#<.<.
.>^..^#><#.^
......#>....
..<#<...^>^.
<..^>^^...^<

//ex. 3
const H = 15
const W = 20
const dest = [13, 9]

####..<#^>#>.<<><^..
#.>#>.^#^.>><>...^..
>..<>.#.>.>.>...#..<
<^>.#..<>^#<#.>.<.^.
>#<^>.>#^>#^.^.#^><^
<^.^.#<...<.><#>...#
.<>....^..#>>#..>>><
.<#<^#.>#>^^.>.##.^<
.#.^.....<<#^#><^<<<
^.#>.#^.>.^.^<<>..><
.^#^<^^^<......^>.#^
.<..#>...^>^.^<..<.^
#.^.#..#.....>#.^^.>
.#^..>>><>>>^..#^.^^
.>#..<..<>.#>..^.#.^

*/

// 1. 各マスでそこに到達できる場所を記録する→Nの配列の中身も配列
// 2. r,cに来れるマスを展開すればおしまい→Nの配列


const H = 15
const W = 20
const dest = [13, 9]

const inputStr = `####..<#^>#>.<<><^..
#.>#>.^#^.>><>...^..
>..<>.#.>.>.>...#..<
<^>.#..<>^#<#.>.<.^.
>#<^>.>#^>#^.^.#^><^
<^.^.#<...<.><#>...#
.<>....^..#>>#..>>><
.<#<^#.>#>^^.>.##.^<
.#.^.....<<#^#><^<<<
^.#>.#^.>.^.^<<>..><
.^#^<^^^<......^>.#^
.<..#>...^>^.^<..<.^
#.^.#..#.....>#.^^.>
.#^..>>><>>>^..#^.^^
.>#..<..<>.#>..^.#.^`

console.log(inputStr);

dest[0] -= 1
dest[1] -= 1

const input = new Array()
inputStr.split('\n').forEach(elm => input.push(elm.split('')))

let arrivable = new Array(H)

for (let i = 0; i < H; i++) {
  arrivable[i] = new Array(W)
  for (let j = 0; j < W; j++) {
    arrivable[i][j] = new Array()
  }
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (i > 0 && '.^'.includes(input[i][j])) {
      arrivable[i - 1][j].push([i, j])
    }
    if (j < W - 1 && '.>'.includes(input[i][j])) {
      arrivable[i][j + 1].push([i, j])
    }
    if (i < H - 1 && '.v'.includes(input[i][j])) {
      arrivable[i + 1][j].push([i, j])
    }
    if (j > 0 && '.<'.includes(input[i][j])) {
      arrivable[i][j - 1].push([i, j])
    }
  }
}

let reachable = new Array(H)
for (let i = 0; i < H; i++) {
  reachable[i] = new Array(W)
  reachable[i].fill(false)
}

reachable[dest[0]][dest[1]] = true

let q = []
q.push(dest)

let at = []
while (true) {
  at = q.shift()
  if (!at) break
  for (const ps of arrivable[at[0]][at[1]]) {
    if (!reachable[ps[0]][ps[1]]) {
      reachable[ps[0]][ps[1]] = true
      q.push(ps)
    }
  }
}

// console.log(reachable);

console.log('---');
let outputLine = ''
let output = ''

for (let i = 0; i < H; i++) {
  outputLine = ''
  for (let j = 0; j < W; j++) {
    if (input[i][j] === '#') {
      outputLine += '#'
    } else if (reachable[i][j]) {
      outputLine += 'o'
    } else {
      outputLine += 'x'
    }
  }
  output += outputLine + '\n'
}

console.log(output);
