// Given an array nums, there is a sliding window of size k 
// which is moving from the very left of the array to the very right. 
// You can only see the k numbers in the window. 
// Each time the sliding window moves right by one position. 
// Return the max sliding window.

// Follow up:
// Could you solve it in linear time?

// Example:

// Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
// Output: [3,3,5,5,6,7] 
// Explanation: 

// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
//  

// Constraints:

// 1 <= nums.length <= 10^5
// -10^4 <= nums[i] <= 10^4
// 1 <= k <= nums.length

// 核心思路：维护一个单调队列，队头元素到队尾元素依次递减，然后最大值就是队列中的第一个元素
// 合法性判断：滑动窗口外的元素删掉
// 维护单调队列：如果新加进来的数大于等于队尾元素，则依次将队尾元素删除，始终维护队头元素是最大值
// 当满足滑动窗口区间范围时，将队头元素推入结果数组中。
// 时间复杂度为O(N),空间复杂度为O(N)

var maxSlidingWindow = function (nums, k) {
    const deque = []; //存放单调队列的下标
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (i - deque[0] >= k) deque.shift(); //在滑动窗口之外的直接从队头删掉
        while (nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();  //如果新加进来的数比单调队列中原来的数都要大，则直接弹出队列中的其他数
        }
        deque.push(i);
        //数组下标从0开始，k=3时 ，下标为0，1，2的数组元素构成一个滑动窗口，所以条件为i>=k-1就可以将答案存入res中
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
};
