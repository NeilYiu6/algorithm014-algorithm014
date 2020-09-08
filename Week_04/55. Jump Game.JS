// Given an array of non-negative integers, you are initially 
// positioned at the first index of the array.

// Each element in the array represents your maximum jump length at that position.

// Determine if you are able to reach the last index.

//  

// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. 
// Its maximum jump length is 0, which makes it impossible to reach the last index.
//  

// Constraints:

// 1 <= nums.length <= 3 * 10^4
// 0 <= nums[i][j] <= 10^5


// 如果某一个作为 起跳点 的格子可以跳跃的距离是 n，
// 那么表示后面 n 个格子都可以作为 起跳点。
// 可以对每一个能作为 起跳点 的格子都尝试跳一次，把 能跳到最远的距离 max 不断更新。
// 如果可以一直跳到最后，就成功了。

var canJump = function (nums) {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > max) return false;
        max = Math.max(max, i + nums[i]);
    }
    return true;
};
