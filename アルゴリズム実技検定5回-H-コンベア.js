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
15 20
13 9
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

let exit = false
let save = new Array()

const search = (i, j) => {
  // console.log(i, j);
  if (exit || (i === dest[0] && j === dest[1])) {
    exit = true
    return true
  }
  if (save.some((elm => elm[0] === i && elm[1] === j))) return false

  save.push([i, j])

  if (input[i][j] === '#') {
    return false
  } else if (j > 0 && input[i][j] === '<') {
    search(i, j - 1)
  } else if (i > 0 && input[i][j] === '^') {
    search(i - 1, j)
  } else if (j < W - 1 && input[i][j] === '>') {
    search(i, j + 1)
  } else if (i < H -1 && input[i][j] === 'v') {
    search(i + 1, j)
  } else if (input[i][j] === '.') {
    if (j > 0) {
      search(i, j - 1)
    }
    if (!exit && i > 0) {
      search(i - 1, j)
    }
    if (!exit && j < W - 1) {
      search(i, j + 1)
    }
    if (!exit && i < H -1) {
      search(i + 1, j)
    }
  }
  if (exit) return true
  return false
}


let outputLine = ''
let output = ''
for (let i = 0; i < H; i++) {
  outputLine = ''
  for (let j = 0; j < W; j++) {
    // console.log('call', i, j);
    exit = false
    save = new Array()
    if (input[i][j] === '#') {
      outputLine += '#'
    } else {
      if (search(i, j)) {
        outputLine += 'o'
      } else {
        outputLine += 'x'
      }
    }
  }
  output += outputLine + '\n'
}

console.log('---');
console.log(output);
