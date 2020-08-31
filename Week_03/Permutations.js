// Given a collection of distinct integers, return all possible permutations.

// Example:

// Input: [1,2,3]
// Output:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]


// 尝试在纸上写 3 个数字、4 个数字、5 个数字的全排列
// 以数组 [1, 2, 3] 的全排列为例。

// 先写以 1 开头的全排列，它们是：[1, 2, 3], [1, 3, 2]，即 1 + [2, 3] 的全排列；
// 再写以 2 开头的全排列，它们是：[2, 1, 3], [2, 3, 1]，即 2 + [1, 3] 的全排列；
// 最后写以 3 开头的全排列，它们是：[3, 1, 2], [3, 2, 1]，即 3 + [1, 2] 的全排列。
// 总结搜索的方法：按顺序枚举每一位可能出现的情况，已经选择的数字在 当前 要选择的数字中不能出现。
// 按照这种策略搜索就能够做到 不重不漏。这样的思路，可以用一个树形结构表示。

// 执行用时 :72 ms, 在所有 JavaScript 提交中击败了93.35%的用户
// 内存消耗 :37.1 MB, 在所有 JavaScript 提交中击败了48.65%的用户

function permute(nums) {
    let res = [], tmp = [], used = {}
    function dfs() {
        if (tmp.length === nums.length) return res.push(tmp.slice())
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (used[num]) continue//跳过已经被加入到当前的全排列里的("前面的")数字
            used[num] = true
            tmp.push(num)
            dfs()
            used[num] = false
            tmp.pop()
        }
    }
    dfs()
    return res
}
// 执行用时 :68 ms, 在所有 JavaScript 提交中击败了97.15%的用户
// 内存消耗 :37 MB 在所有 JavaScript 提交中击败了49.89%的用户
// function permute(nums) {
//     let list = []
//     nums.sort((a, b) => {
//         return a - b
//     })
//     function backtrack(list, tempList, nums, used) {
//         if (tempList.length == nums.length) {
//             list.push([...tempList]);
//         } else {
//             for (let i = 0; i < nums.length; i++) {
//                 if (used[i]) continue;  //3:42递归真谛
//                 used[i] = true;
//                 tempList.push(nums[i]);
//                 backtrack(list, tempList, nums, used);
//                 used[i] = false;
//                 tempList.pop();
//             }
//         }
//     }
//     backtrack(list, [], nums, Array(nums.length).fill(false));
//     return list;
// }


console.log(permute([1, 2, 2, 3]))