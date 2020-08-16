// 给定一个排序数组，你需要在原地删除重复出现的元素，
// 使得每个元素只出现一次，返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

// 示例 1:
// 给定数组 nums = [1,1,2], 

// 函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

// 你不需要考虑数组中超出新长度后面的元素。

// 示例 2:
// 给定 nums = [0,0,1,1,1,2,2,3,3,4],

// 函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

// 你不需要考虑数组中超出新长度后面的元素。

// 说明:

// 为什么返回数值是整数，但输出的答案是数组呢?

// 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

// 你可以想象内部操作如下:

// // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
// let len = removeDuplicates(nums);

// // 在函数里修改输入数组对于调用者是可见的。
// // 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
// for (let i = 0; i < len; i++) {
//     prlet(nums[i]);
// }
//**************************************************************************** */
// 给定一个 排序数组， 需要 原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度 -- <1>
// 不得使用额外的数组空间， 必须 在原地修改输入数组并在使用O(1)额外空间的条件下完成 -- <2>
// 示例： 给定 nums = [1,1,2]
// 函数应该返回新的长度 2 && 原数组 nums 的前两个元素被修改为 1，2 即 nums = [1.2,2]--<3>
// 不需要考虑数组中超出新长度后面的元素 --<4>
// 摘抄题目解释内部操作 根据返回函数的长度len，会打印出该长度范围内的元素 --<5>

// for(var i = 0; i<len;i++){
//     console.log(nums[i])
// }

// 由<1><2><3> 可知 要求的函数是对原数组中的元素进行修改 是虚拟替换重复元素从而达到删除的效果

// 由<2><4><5> 可知 返回结果为实际数组新长度的必要意义

// 1、函数调用之后 原数组长度不变
// 2、不能新建一个数组存储 删除重复数据后的数组，因为空间复杂度要求为 O(1)
// 3、根据修改替换原数组重复元素 和 返回长度 动态遍历出 不准新建的新数组里应该有的元素
// 示例：

// [1,1,2] => [1,2,2] return [1,2].length == 2
// [0,0,1,1,1,2,2,3,3,4] => [0,1,2,3,4,2,2,3,3,4] return [0,1,2,3,4].length == 5
// [1,2,3,3,4,5,6,6,7] => [1,2,3,4,5,6,7,6,7] return [1,2,3,4,5,6,7].length == 7
// 由示例规律可得：
// 返回的长度 = 原数组的长度 - 重复元素的长度
// 元素被修改后的数组 = 原数组经历右边操作：
// <1> 设置数组重复元素的个数为 count = 0
// <2> 从数组第二个元素开始遍历 i = 1;i<nums.length;i++;
// <3> 当遇到第一个重复的元素时 count++
// <4> 当遍历到与上一个的元素不重复即不相同时 此时当前元素需要向前移 n 个重复元素
// 的位置即替换即相当于替换最近一次重复元素第一次出现的索引位置上的元素
//  最近一次重复元素第一次出现的位置上的元素 = 当前元素 => nums[i-count] = nums[i] && 
//  符合循环条件则继续遍历回到第<2>步 否则进入下一步
// <5> 返回长度 n - count
// 由此可以生成解法一：
/**
* @param {number[]} nums
* @return {number}
*/
// var removeDuplicates = function(nums) {
//     var count = 0;
//     var n = nums.length;
//     for(let i = 1;i<n;i++){
//         if(nums[i] != nums[i-1]){
//             nums[i-count] = nums[i]
//         }else{
//             count++;
//         }
//     }
//     return n-count;
// };

// 由以上分析可知 符合题意的解题关键在于 确定最近一次重复元素第一次出现的位置 && 
// 替换此位置上的元素为遍历的当前元素
// 第一种思路是通过 重复元素个数确认 最近一次需要被替换的 因为是排序好的
//  所以可以直接减去中间重复的个数找到所求需替换位置值
// 第二种思路：
// 不通过计算重复个数 通过追踪重复元素的指针位置 并动态更新 =>
// 增加一个 是重复元素且是第一次出现的位置指针 r 默认初始化为 0 ，数组遍历从 i = 1 开始
// 当且仅当遇到下一个不相同即不重复的元素时，更新指针位置为下一个元素
// (虽然是重复元素但是还是要保留第一个不能被替换) && nums[r] = nums[i]
// 否则指针位置不动，原数组继续遍历
// 数组遍历完后 返回 r+1 (为什么加1？因为是索引位置，而题目要求返回的是长度)
// 由此可生成解法二：【即所谓的双指针法】

/**
  * @param {number[]} nums
  * @return {number}
  */
// var removeDuplicates = function (nums) {
//     var j = 0, n = nums.length;
//     for (let i = 1; i < n; i++) {
//         if (nums[i] != nums[i - 1]) {
//             j++;
//             nums[j] = nums[i];
//         }
//     }
//     return j + 1;
// };

// 首先注意数组是有序的，那么重复的元素一定会相邻。
// 要求删除重复元素，实际上就是将不重复的元素移到数组的左侧。
// 考虑用 2 个指针，一个在前指向最后的一个唯一元素，记作 lastUniq，`
// 一个在后指向最后一个和最后的唯一元素相同的元素，记作 lastDulp，算法流程如下：
// 1.比较 lastUniq 和 lastDulp 位置的元素是否相等。
// 2.如果相等，lastDulp 后移 1 位
// 3.如果不相等，将 lastDulp 位置的元素复制到 lastUniq+1 位置上，lastUniq 后移一位，lastDulp 后移 1 位
// 4.重复上述过程，直到 lastDulp 等于数组长度。
// 5.返回 lastUniq + 1，即为新数组长度。
function removeDuplicates(nums) {
    if (nums === null || nums.length === 0) return 0
    let lastUniq = 0, lastDulp = 1 // lastDulp: the last element that's dulplicated with the last unique element
    while (lastDulp < nums.length) {
        // lastDul ain't dulp with lastUniq anymore，in other words, a new uniq is found, 
        // move uniq forth to firstDlup pos, replace it with lastDulp(now uniq), and move lastDulp forth 
        if (nums[lastDulp] !== nums[lastUniq]) nums[++lastUniq] = nums[lastDulp++]
        else { lastDulp++; }
    }
    return lastUniq + 1// lastUniq是索引，+1才是长度
}

