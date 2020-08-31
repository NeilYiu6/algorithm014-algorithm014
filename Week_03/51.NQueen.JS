// 33. N-Queens
// The n-queens puzzle is the problem of placing n queens on an n×n chessboard 
// such that no two queens attack each other(Any two queens can't be in the same row, column, diagonal line).

// Given an integer n, return all distinct solutions to the n-queens puzzle.

// Each solution contains a distinct board configuration of the n-queens' placement, 
// where 'Q' and '.' each indicate a queen and an empty space respectively.

// Example
// Example 1:

// Input:1
// Output:
//    [["Q"]]


// Example 2:

// Input:4
// Output:
// [
//   // Solution 1
//   [".Q..",
//    "...Q",
//    "Q...",
//    "..Q."
//   ],
//   // Solution 2
//   ["..Q.",
//    "Q...",
//    "...Q",
//    ".Q.."
//   ]
// ]

// 在一个 nxn 大小的棋盘上如果才能放n个皇后，使得两两之间不能相遇，
// 对于这类问题，没有太简便的方法，只能使用穷举法，就是尝试所有的组合，
// 每放置一个新的皇后的时候，必须要保证跟之前的所有皇后不能冲突，
// 若发生了冲突，说明当前位置不能放，要重新找地方，
// 这个逻辑非常适合用递归来做。我们先建立一个长度为 nxn 的全是点的数组
// tmp，然后从第0行开始调用递归。在递归函数中，
// 我们首先判断当前行数是否已经为n，是的话，
// 说明所有的皇后都已经成功放置好了，
// 所以我们只要将 tmp 数组加入结果 res 中即可。
// 否则的话，我们遍历该行的所有列的位置，行跟列的位置都确定后，
// 我们要验证当前位置是否会产生冲突，那么就需要使用一个子函数来判断了，
// 首先验证该列是否有冲突，就遍历之前的所有行，若某一行相同列也有皇后，
// 则冲突返回false；再验证两个对角线是否冲突，就是一些坐标转换，
// 主要不要写错了，若都没有冲突，则说明该位置可以放皇后，放了新皇后之后，
// 再对下一行调用递归即可，注意递归结束之后要返回状态
var solveNQueens = function (n) {
    let res = [], tmp = []
    function isValid(y) {//将要放置的y坐标
        let x = tmp.length//将要放置的x坐标
        for (let x2 = 0; x2 < x; x2++) {//x2为已放置的皇后的x坐标,范围:[0,x-1]
            let y2 = tmp[x2]//y2为已放置的皇后的y坐标,范围:[tmp[0],tmp[x-1]]
            if (y2 === y || //和已放置的皇后在同一列
                x2 - y2 === x - y || // 在已放置的皇后的主对角线上
                x2 + y2 === x + y) // 在已放置的皇后的副对角线上
                return false
        }
        return true
    }
    function dfs() {
        if (tmp.length === n) {// 如果 tmp 长度为 n，代表所有皇后放置完毕
            res.push(// 把这种解记录下来
                tmp.map(y => {
                    let row = Array(n).fill('.')
                    row.splice(y, 1, 'Q')
                    return row.join('')
                })
            )
            return
        }
        for (let y = 0; y < n; y++) {// 针对每一列，尝试是否可以放置
            if (isValid(y)) {// 如果当前列满足条件
                tmp.push(y)// 记录当前选择
                dfs()// 继续下一次的递归
                tmp.pop()// 撤销当前选择
            }
        }
    }
    dfs()
    return res
}

console.log(solveNQueens(4));


