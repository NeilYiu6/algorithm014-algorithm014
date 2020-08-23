// Write a program to find the n-th ugly number.

// Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

// Example:

// Input: n = 10
// Output: 12
// Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 
// is the sequence of the first 10 ugly numbers.
// Note:  

// 1 is typically treated as an ugly number.
// n does not exceed 1690.

// DP
// 我们知道丑数序列是 1, 2, 3, 4, 5, 6, 8, 9...。

// 我们所有的丑数都是通过之前的丑数乘以 2, 3, 5 生成的，
// 所以丑数序列可以看成下边的样子。

// 1, 1×2, 1×3, 2×2, 1×5, 2×3, 2×4, 3×3...。

// 我们可以把丑数分成三组，用丑数序列分别乘 2, 3, 5 。
// 乘 2: 1×2, 2×2, 3×2, 4×2, 5×2, 6×2, 8×2, 9×2,…
// 乘 3: 1×3, 2×3, 3×3, 4×3, 5×3, 6×3, 8×3, 9×3,…
// 乘 5: 1×5, 2×5, 3×5, 4×5, 5×5, 6×5, 8×5, 9×5,…
// 我们需要做的就是把上边三组按照顺序合并起来。

// 合并有序数组的话，可以通过归并排序的思想，利用三个指针，
// 每次找到三组中最小的元素，然后指针后移。

// 当然，最初我们我们并不知道丑数序列，我们可以一边更新丑数序列，一边使用丑数序列。
// 这里需要注意的是，归并排序中我们每次从两个数组中选一个较小的，
// 所以用的是 if...else...。

// 这里的话，用的是并列的 if , 这样如果有多组的当前值都是 min，指针都需要后移，
// 从而保证 ugly 数组中不会加入重复元素。

// 执行用时：88 ms, 在所有 JavaScript 提交中击败了74.71%的用户
// 内存消耗：38.2 MB, 在所有 JavaScript 提交中击败了100.00%的用户

var nthUglyNumber = function (n) {
    if (n <= 0) return false;
    if (n == 1) return true;
    let p2 = p3 = p5 = 0
    let dp = [1]
    for (let i = 1; i < n; i++) {
        let nextP2 = dp[p2] * 2
        let nextP3 = dp[p3] * 3
        let nextP5 = dp[p5] * 5
        let nextNum = Math.min(nextP2, nextP3, nextP5)
        dp[i] = nextNum
        if (nextNum === nextP2) p2++
        if (nextNum === nextP3) p3++
        if (nextNum === nextP5) p5++
    }
    return dp[n - 1]
};

//     // 尝试预存
console.log(nthUglyNumber(5));
// var dp = (function () {
//     let maxNth = 1690
//     let p2 = p3 = p5 = 0
//     let dp = new Array(maxNth)
//     dp[0] = 1
//     for (let i = 1; i < maxNth; i++) {
//         let nextP2 = dp[p2] * 2
//         let nextP3 = dp[p3] * 3
//         let nextP5 = dp[p5] * 5
//         let nextNum = Math.min(nextP2, nextP3, nextP5)
//         if (nextNum === nextP2) p2++
//         if (nextNum === nextP3) p3++
//         if (nextNum === nextP5) p5++
//         dp[i] = nextNum
//     }
//     return dp
// })()
// var nthUglyNumber = function (n) {
//     return dp[n - 1]
// };

// 利用优先队列有自动排序的功能
// 每次取出队头元素，存入队头元素*2、队头元素*3、队头元素*5
// 但注意，像12这个元素，可由4乘3得到，也可由6乘2得到，所以要注意去重
// 优先队列(小顶堆)
// 执行用时：544 ms, 在所有 JavaScript 提交中击败了5.06%的用户
// 内存消耗：44.9 MB, 在所有 JavaScript 提交中击败了7.14%的用户
// class MinHeap {
//     constructor() {
//         this.arr = []
//         this.hash = new Set()
//     }
//     makeHeap() {//用arr构造小顶堆
//         let last = this.arr.length - 1
//         for (let i = Math.floor((last - 1) / 2); i >= 0; i--) {
//             this.sink(i)        //从最后一个非叶子节点下沉
//         }
//     }
//     sink(i) {    //把i向下沉以保持小顶堆结构
//         let left = 2 * i + 1
//         let right = 2 * i + 2
//         let minChild = this.arr[right] < this.arr[left] ? right : left
//         if (this.arr[minChild] <= this.arr[i]) {//最小的儿子比自己小，下沉
//             [this.arr[i], this.arr[minChild]] = [this.arr[minChild], this.arr[i]]
//             this.sink(minChild) //交换后要看看交换后的根还要不要下沉
//         }
//     }
//     push(ele) {//插入元素
//         if (!this.hash.has(ele)) {//去重
//             this.arr.unshift(ele);
//             this.hash.add(ele)
//             this.sink(0)
//         }
//     }
//     pop() {//弹出队头元素
//         let ele = this.arr.shift();
//         this.hash.delete(ele)
//         this.makeHeap()
//         return ele
//     }
// }
// var nthUglyNumber = function (n) {
//     let q = new MinHeap(), answer = 1;
//     for (let i = 1; i < n; ++i) {
//         q.push(answer * 2)
//         q.push(answer * 3)
//         q.push(answer * 5)
//         answer = q.pop();
//         // while (q.arr.length !== 0 && answer == q.arr[0]) q.pop();//若MinHeap没有Set去重,则要依靠循环去重
//     }
//     return answer;
// }
