// Given a collection of numbers that might contain duplicates, return all possible unique permutations.

// Example:

// Input: [1,1,2]
// Output:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]
// https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2/
// 当数组中有重复元素的时候，可以先将数组排序，排序以后在递归的过程中可以很容易发现重复的元素。
// 发现重复元素的时候，让这一个分支跳过，以达到“剪枝”的效果，重复的排列就不会出现在结果集中。
// 原数组为[1,2',2'',2'''...]
// 如果要选2放入到排列中的话，2是有重复的，
// 一定只能按照[1,2',2'',2'''...]这样的顺序选，
// 也就是如果是第二个2以后的话，一定要看前面的2有没有拿出来，
// 前面有了才能拿自己出来
// 否则必定出现重复，如[1,2']和[1,2'']重复
// for循环中总是会从0循环到最后一个
// *************************************************************************************************************************************************
// 执行用时 :76 ms, 在所有 JavaScript 提交中击败了99.18%的用户
// 内存消耗 :37.8 MB, 在所有 JavaScript 提交中击败了69.49%的用户
// 输入[1', 1'', 2] 输出 [[1', 1'', 2], [1', 2, 1''], [2, 1', 1'']]
//used[i-1]是false时说明当前第i个元素是递归树里与第i-1个元素平行的关系，
// 因为第i-1个元素递归完回来时used[i-1]会被重置为false再进入下一个for循环（也就是当前循环）
//used[i-1]是true时说明当前第i个元素是递归树里在第i-1个元素的下层，
// 因为第i-1个元素还在执行其下层递归的时候才会还没来得及把used[i-1]重置为false
//used[i]是true时说明还没循环到未使用的元素（因为i在每次递归时都是从0开始循环的），
//例如原数组[1,2,3], 已选数组(tempList)为[1]的一层递归, i=0时used[0]===true，
// 表示第0个数已经选过了，应直接跳过选第1个数
// *************************************************************************************
// 用一个全局的数组记录一下第i个数是否已经加到当前的全排列里了，
// 若发现第前一个数(第i-1个数)和当前数字(第i个数)相等且前一个数没有被加到当前的全排列里，
// 就一定是属于重复数字的一个dfs分支，可以剪枝
function permuteUnique(nums) {
    let list = [], tempList = [], used = []//used代表第i个数是否已经加入到集合里了
    nums.sort((a, b) => a - b)
    function backtrack() {
        if (tempList.length == nums.length) {
            list.push([...tempList]);
        } else {
            for (let i = 0; i < nums.length; i++) {
                if (used[i] //用来跳过已经被加入到当前的全排列里的("前面的")数字
                    || i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
                used[i] = true;
                tempList.push(nums[i]);
                backtrack();
                used[i] = false;
                tempList.pop();
            }
        }
    }
    backtrack();
    return list;
}
// *************************************************************************************************************************************************
// 执行用时 :76 ms, 在所有 JavaScript 提交中击败了99.18%的用户
// 内存消耗 :37.8 MB, 在所有 JavaScript 提交中击败了69.49%的用户
// function permuteUnique(nums) {
//     let list = []
//     nums.sort((a, b) => {
//         return a - b
//     })
//     backtrack(list, [], nums, Array(nums.length).fill(false));
//     return list;
// }
// //used[i-1]是false时说明当前第i个元素是递归树里与第i-1个元素平行的关系，因为第i-1个元素递归完回来时used[i-1]会被重置为false再进入下一个for循环（也就是当前循环）
// //used[i-1]是true时说明当前第i个元素是递归树里在第i-1个元素的下层，因为第i-1个元素还在执行其下层递归的时候才会还没来得及把used[i-1]重置为false
// //used[i]是true时说明还没循环到未使用的元素（因为i在每次递归时都是从0开始循环的），
// //例如原数组[1,2,3], 已选数组(tempList)为[1]的一层递归, i=0时used[0]===true，表示第0个数已经选过了，应直接跳过选第1个数
// function backtrack(list, tempList, nums, used) {
//     if (tempList.length == nums.length) {
//         list.push([...tempList]);
//     } else {
//         let pre = nums[0] - 1;
//         for (let i = 0; i < nums.length; i++) {
//             if (!used[i] && pre != nums[i]) {
//                 tempList.push(nums[i]);
//                 used[i] = true;
//                 backtrack(list, tempList, nums, used);
//                 used[i] = false;
//                 tempList.pop();
//                 pre = nums[i];
//             }
//         }
//     }
// }
console.log(permuteUnique([1, 2, 2, 3]))
