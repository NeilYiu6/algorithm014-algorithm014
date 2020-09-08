// 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。
// 一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。
// 你可以假设网格的四个边均被水包围。

// 示例 1:

// 输入:
// 11110
// 11010
// 11000
// 00000

// 输出: 1
// 示例 2:

// 输入:
// 11000
// 11000
// 00100
// 00011

// 输出: 3

// 直觉
// 将二维网格看成一个无向图，竖直或水平相邻的 1 之间有边。
// 算法
// 线性扫描整个二维网格，如果一个结点包含 1，则以其为根结点启动深度优先搜索。
// 在深度优先搜索过程中，每个访问过的结点被标记为 0。
// 计数启动深度优先搜索的根结点的数量，即为岛屿的数量。

// 符合直觉的做法是用DFS来解：

// 对于一个为 1 的位置，我们递归进入其上下左右位置上为 1 的数，将其置为0。
// 重复上述过程
// 找完相邻区域后，我们将结果 res + 1，然后我们在继续找下一个为 1 ，直至遍历完.
// 注意到上面的过程，我们对于数字为0的其实不会进行操作的，
// 也就是对我们“没用”。 因此对于已经访问的元素，
// 我们可以将其置为0即可。

// 关键点解析
// 将已经访问的元素置为0，省去visited的空间开销

// 执行用时 :64 ms, 在所有 JavaScript 提交中击败了98.82%的用户
// 内存消耗 :38.1 MB, 在所有 JavaScript 提交中击败了53.68%的用户
// DFS
var numIslands = function (grid) {
    if (!grid || grid.length == 0) return 0;
    var len = grid.length, island = 0,
        dx = [-1, 1, 0, 0],    // 方向向量
        dy = [0, 0, -1, 1]
    function dfs(i, j) {
        // terminator
        if (grid[i][j] == '0') return 0;
        // process
        grid[i][j] = '0';
        // drill down
        for (var k = 0; k < dx.length; k++) {
            var x = i + dx[k];
            var y = j + dy[k];
            //对于一个为 1 的位置，我们递归进入其上下左右位置上为 1 的数，将其置为0。
            if (x >= 0 && x < grid.length && y >= 0 && y < grid[i].length && grid[x][y] == '1') dfs(x, y)
        }
        return 1;
    }
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 1) island += dfs(i, j);//找完相邻区域后，我们将结果 res 自增1，然后继续找下一个为 1，直至遍历完
        }
    }
    return island;
};

var numIslands = function (grid) {
    if (!grid || grid.length == 0) return 0;
    let len = grid.length, island = 0,
        dx = [-1, 1, 0, 0], dy = [0, 0, -1, 1]
    function dfs(i, j) {
        if (grid[i][j] === '0') {
            return 0
        }
        grid
    }
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const node = grid[i][j];
            if (node === 1) {
                island += dfs(i, j)
            }
        }
    }
}

console.log(numIslands([
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1]
]));

// bfs
// var numIslands = function (grid) {
//     if (!grid || grid.length == 0) {
//         return 0;
//     }
//     var len = grid.length;
//     var size = grid[0].length;
//     var island = 0;
//     // 从右到左 队列
//     var queue = [];
//     // 方向向量
//     var dx = [-1, 1, 0, 0];
//     var dy = [0, 0, -1, 1];
//     // dfs 推平
//     function sink(i, j) {
//         // terminator
//         if (grid[i][j] == '0') {
//             return 0;
//         }
//         // process
//         grid[i][j] = '0';
//         // drill down
//         for (var k = 0; k < dx.length; k++) {
//             var x = i + dx[k];
//             var y = j + dy[k];
//             if (x >= 0 && x < grid.length && y >= 0 && y < grid[i].length) {
//                 if (grid[x][y] == '1') {
//                     queue.push([x, y]);
//                 }
//             }
//         }
//         return 1;
//     }
//     for (var i = 0; i < len; i++) {
//         for (var r = 0; r < grid[i].length; r++) {
//             if (grid[i][r] == 1) {
//                 island++;
//                 queue.push([i, r])
//                 while (queue.length > 0) {
//                     var tmpIsland = queue.shift();
//                     sink(tmpIsland[0], tmpIsland[1]);
//                 }
//             }
//         }
//     }
//     return island;
// };


