// Given a set of distinct integers, return all possible subsets.
// Example
// Example 1:

// Input: [0]
// Output:
// [
//   [],
//   [0]
// ]
// Example 2:

// Input: [1,2,3]
// Output:
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]
// Challenge
// Can you do it in both recursively and iteratively?

// Notice
// Elements in a subset must be in non-descending order.
// The solution set must not contain duplicate subsets.

//https://www.cnblogs.com/TenosDoIt/p/3451902.html

// 求集合的所有子集问题。题目要求子集中元素非递减序排列，
// 因此我们先要对原来的集合进行排序。原集合中每一个元素在子集中有两种状态：要么存在、要么不存在。
// 这样构造子集的过程中每个元素就有两种选择方法：选择、不选择，
// 因此可以构造一颗二叉树，例如对于例子中给的集合[1,2,3]，
// 构造的二叉树如下（左子树表示选择该层处理的元素，右子树不选择），最后得到的叶子节点就是子集：
// https://www.cnblogs.com/TenosDoIt/p/3451902.html
//                         []        
//                    /          \        
//                   /            \     
//                  /              \
//               [1]                []
//            /       \           /    \
//           /         \         /      \        
//        [1 2]       [1]       [2]     []
//       /     \     /   \     /   \    / \
//   [1 2 3] [1 2] [1 3] [1] [2 3] [2] [3] []      仅在此层把节点推进结果数组

// O(2 ^ n)

// 每发展一个子节点相当于在原节点答案数组中加一个元素，也就是递归再下一层
// 但以整个数组为候选来供父节点发展子节点会导致重复，
// 办法是只允许以自己后面的元素作为发展子节点的候选。
// 一个元素尝尽了所有自己以后的元素的可能性以后，要把自己pop出来换下一个元素再下递归
//                                  []        
//                    /              |         \
//                   /               |          \
//                  /                |           \
//               [1]                [2]          [3]         startPos： 1    仅在下来此层时把节点推进结果数组，回溯上来时不推（错误❌，回溯上来时subset会pop掉2,即恢复到[1]来进入到下个for循环，也就是i=2的for循环，因为当前是i=1的for循环）
//            /       \           /    \         /
//           /         \         /              
//        [1 2]       [1 3]    [2 3]                         startPos： 2    仅在下来此层时把节点推进结果数组，回溯上来时不推
//       /     \      /   \    /
//   [1 2 3]                                                 startPos： 3    仅在下来此层时把节点推进结果数组，回溯上来时不推
//     /                 
var subsets = function (nums) {
    let n = nums.length, tmp = [], res = [];
    let backtrack = (start) => {
        res.push(tmp.slice());
        for (let i = start; i < n; i++) {
            tmp.push(nums[i]);
            backtrack(i + 1);
            tmp.pop();
        }
    }
    backtrack(0);
    return res;
};
// BFS
// O(2 ^ n)
// function subsets(S) {
//     let result = [];
//     let singleRes = [];
//     result.push(singleRes);
//     S.sort((a, b) => {
//         return a - b
//     })
//     // sort(S.begin(), S.end());
//     for (let i = 0; i < S.length; i++) {
//         let levelSize = result.length;
//         for (let j = 0; j < levelSize; j++) {
//             singleRes = [...result[j]];
//             singleRes.push(S[i]);
//             result.push(singleRes);
//             // console.log(`******${JSON.stringify(result)}******`)
//         }
//         // console.log(JSON.stringify(result))
//     }
//     return result;
// }

// dfs iterative
// function subsets(nums) {
//     if (nums == null || nums.length <= 0)
//         return [];
//     let res = [];
//     let levelStack = [];
//     let tempList = [];
//     levelStack.push(0);

//     while (!levelStack.isEmpty()) {
//         let pos = levelStack.pop();
//         if (pos == nums.length) { //Exit condition
//             res.add([...tempList]);
//             if (tempList && tempList.length > 0)
//                 tempList.pop()
//             continue;
//         }
//         //Left child
//         levelStack.push(pos + 1);
//         //Right child
//         tempList.push(nums[pos]);
//         levelStack.push(pos + 1);
//     }
//     return res;
// }

console.log(subsets([1, 2, 3]))