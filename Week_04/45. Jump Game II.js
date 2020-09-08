// Given an array of non-negative integers, you are initially positioned 
// at the first index of the array.

// Each element in the array represents your maximum jump length at that position.

// Your goal is to reach the last index in the minimum number of jumps.

// Example:

// Input: [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2.
//     Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Note:

// You can assume that you can always reach the last index.

// 每次在上次的最大可跳范围内计算下一次可以跳的最远的位置
// 也就是当前坐标+当前可跳距离
// 作为一个"边界", 也就是下一次的起跳点
// 遍历到这个边界时,表示要以当前格子为起跳点
// 重新在可跳范围内选择可以跳的最远的位置,
// 也就是要更新下一次的起跳点
// 若以当前格子为起跳点的可跳范围已覆盖了终点,
// 表示计算完成

// 需要保证两点：

// 1. 跳到最远的位置
// 例如：[2, 3, 1, 1, 4]。如果，第一次直接跳两格，则会“错过”直接跳到结尾的"3"。
// 而解决方案是，遍历中间，维护一个能跳到的最大距离的值。下方程序中的相应变量为 max。

// 2. 使用最少的跳跃次数
// 如果选择 nums[i]~nums[i+nums[i]]，之间的数组元素值作为跳跃的步数。
// 那跳跃的次数如何考虑和处理？
// 在遍历中间后，还要遍历末尾的 nums[i+nums[i]] 。
// 这样保证了所有下一步数组值，跳跃次数的一致。
// 例如：nums = [2, 3, 3, 1, 1, 1]。
// nums[0] = 2，能最远跳到 nums[2]。
// 遍历 nums[1], nums[2] ，能跳的最远的距离均为 3 ，
// 在加上本身的下标 1，2。比较之后，选取跳到 nums[2]

// [2]的时候应该输出0,
// 但若for里面写i<len,第一次判断if (lastMax == i)必然进入
// 相当于到达第一个起跳点时必然算作跳了1步  
// 而只有一个起跳点的时候要看做跳了0步

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    var steps = 0, nextMax = 0, lastMax = 0, len = nums.length;
    if (nums.length === 1) return 0

    for (var i = 0; i < len; i++) {
        nextMax = Math.max(nextMax, i + nums[i]);//以当前格子i为起跳点计算下一次可以跳的最远的位置并尝试更新下一次起跳点
        if (lastMax == i) {//到达起跳点，就用下一次可以跳的最远的位置作为下一个起跳点，并且步数加一
            lastMax = nextMax;
            steps++;
        }
        if (lastMax >= len - 1) break;//当前格子为起跳点的可跳范围已覆盖了终点
    }
    return steps;
}
console.log(jump([2, 2, 1, 0]));