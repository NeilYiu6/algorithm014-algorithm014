// Let's play the minesweeper game (Wikipedia, online game)!

// You are given a 2D char matrix representing the game board. 
// 'M' represents an unrevealed mine, 
// 'E' represents an unrevealed empty square, 
// 'B' represents a revealed blank square 
// that has no adjacent (above, below, left, right, and all 4 diagonals) mines, 
// digit ('1' to '8') represents how many mines are adjacent to this revealed square, 
// and finally 'X' represents a revealed mine.

// Now given the next click position (row and column indices) among 
// all the unrevealed squares ('M' or 'E'), return the board after 
// revealing this position according to the following rules:

// If a mine ('M') is revealed, then the game is over - change it to 'X'.
// If an empty square ('E') with no adjacent mines is revealed, 
// then change it to revealed blank ('B') and all of its adjacent 
// unrevealed squares should be revealed recursively.
// If an empty square ('E') with at least one adjacent mine is revealed, 
// then change it to a digit ('1' to '8') representing the number of adjacent mines.
// Return the board when no more squares will be revealed.
//  

// Example 1:

// Input: 

// [['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'M', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E']]

// Click : [3,0]

// Output: 

// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'M', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]

// Example 2:

// Input: 

// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'M', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]

// Click : [1,2]

// Output: 

// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'X', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]

// Note:

// The range of the input matrix's height and width is [1,50].
// The click position will only be an unrevealed square ('M' or 'E'), 
// which also means the input board contains at least one clickable square.
// The input board won't be a stage when game is over (some mines have been revealed).
// For simplicity, not mentioned rules should be ignored in this problem. 
// For example, you don't need to reveal all the unrevealed mines when the game is over, 
// consider any cases that you will win the game or flag any squares.

// 当遍历到周围8个格子有地雷的格子，填好数字，然后直接返回，不继续延申

// 执行用时：100 ms, 在所有 JavaScript 提交中击败了98.67%的用户
// 内存消耗：43.1 MB, 在所有 JavaScript 提交中击败了43.28%的用户
const updateBoard = (board, click) => {
  const m = board.length;
  const n = board[0].length;
  const dx = [1, 1, 1, -1, -1, -1, 0, 0];
  const dy = [1, 0, -1, 0, 1, -1, 1, -1];
  const inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n; // 辅助函数

  const update = (x, y) => {
    if (!inBound(x, y) || board[x][y] != 'E') return; // 不在界内或不是E，直接返回
    let count = 0;
    for (let i = 0; i < 8; i++) { // 统计周围雷的个数
      const nX = x + dx[i];
      const nY = y + dy[i];
      if (inBound(nX, nY) && board[nX][nY] == 'M') {
        count++;
      }
    }
    if (count == 0) { // 如果周围没有雷，标记B，递归周围的点
      board[x][y] = 'B';
      for (let i = 0; i < 8; i++) {
        update(x + dx[i], y + dy[i]);
      }
    } else {//周围8个格子有地雷,标记为雷数,不继续递归
      board[x][y] = count + '';
    }
  };

  const [cX, cY] = click;
  if (board[cX][cY] == 'M') { // 第一下就踩雷了
    board[cX][cY] = 'X';
  } else {
    update(cX, cY); // 开启dfs
  }
  return board;
};

// 执行用时：104 ms, 在所有 JavaScript 提交中击败了95.52%的用户
// 内存消耗：42.7 MB, 在所有 JavaScript 提交中击败了73.22%的用户
// const updateBoard = (board, click) => {
//     const m = board.length;
//     const n = board[0].length;
//     const dx = [1, 1, 1, -1, -1, -1, 0, 0];
//     const dy = [1, 0, -1, 0, 1, -1, 1, -1];
//     const inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n;

//     const bfs = (x, y) => {
//       const queue = [[x, y]];
//       while (queue.length) {
//         const [x, y] = queue.shift();
//         let count = 0;
//         for (let i = 0; i < 8; i++) {
//           const nX = x + dx[i];
//           const nY = y + dy[i];
//           if (inBound(nX, nY) && board[nX][nY] == 'M') {
//             count++;
//           }
//         }
//         if (count == 0) {
//           board[x][y] = 'B';
//           for (let i = 0; i < 8; i++) {
//             const nX = x + dx[i];
//             const nY = y + dy[i];
//             if (inBound(nX, nY) && board[nX][nY] == 'E') {
//               board[nX][nY] = 'B'; // 变成一个非E字符就行，标记该节点被访问过了
//               queue.push([nX, nY]);
//             }
//           }
//         } else {
//           board[x][y] = count + '';
//         }
//       }
//     };

//     const [cX, cY] = click;
//     if (board[cX][cY] == 'M') {
//       board[cX][cY] = 'X';
//     } else {
//       bfs(cX, cY);
//     }
//     return board;
//   };
