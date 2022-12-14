/*
https://atcoder.jp/contests/past202012-open/tasks/past202012_m

ex. 1
5 10
3 4 1 2 4

ex. 2
8 10
7 2 1 5 3 2 5 2

ex. 3
13 10000000000
1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000

ex. 3
13 100
10 10 10 10 10 10 10 10 10 10 10 10 10

bak2からの更新
中身を尺取り方で解く

答えを2分探索する.  

下限であるaを外側で2分探索しつつ、
...ex. 1なら
1回目: 5～L→ok
2回目: 8～L→NG
3回目: 6～7→ok
4回目: 7→ok

dp[i: 0~N（切り込み場所を表す）]: 長さがa以上b以下となる切り込みを入れられる場所をtrue
左から順に見ていくときに、i=0を見て、i=3のところで合計が5、i=4のところで合計が10だとすると、dp[i: 0, 3, 4]をtrueとする
長さを算出は尺取り方を使う

2分探索で5~Lとするとき、上限Lで尺取り方をする
dp[i: 0]を埋めたら次の探索は次にdp[i]=trueとなる場所から始める

dp[N: (最後)]がtrueなら判定を満たすとする

こうすれば少なくともO(log(N)*N)になるはず
*/

const inputStr = `13 10000000000
1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000 1000000000`

let inputArray = inputStr.split('\n')

let line1 = inputArray.shift()
const N = parseInt(line1.split(' ')[0])
const L = parseInt(line1.split(' ')[1])
line1 = inputArray.shift()

const A = line1.split(' ').map(n => parseInt(n))

console.log('N', N);
console.log('L', L);
console.log('A', A);


const check = (min) => {
  let dp = new Array(N + 1)
  dp.fill(false)

  let l = 0
  let r = 0
  let ll = 0
  while(l < N) {

    while (r < N) {
      if (ll + A[r] > L) break
      ll += A[r]
      if (ll >= min) {
        dp[r + 1] = true
      }
      r++
    }
    if (dp[N]) return true
    for (let i = l + 1; i <= r; i++) {
      ll -= A[i - 1]
      if (dp[i]) {
        l = i
        break
      }
    }
    if (ll === 0 && r === N) break
  }

  return false
}

let s = 0
let e = L + 1
let a = 0
while (true) {
  let mid = Math.floor((s + e) / 2)
  if (check(mid)) {
    s = mid
  } else {
    e = mid
  }
  if (s + 1 === e) {
    a = s
    break
  }
}




console.log('答え:', a);
