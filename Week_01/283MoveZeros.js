// Move Zeroes
// Given an array nums, write a function to move all 0's 
// to the end of it while maintaining 
// the relative order of the non-zero elements.
// Example 1:
// Input: nums = [0, 1, 0, 3, 12],
// Output: [1, 3, 12, 0, 0].
// Example 2:
// Input: nums = [0, 0, 0, 3, 1],
// Output: [3, 1, 0, 0, 0].
// Notice
//     You must do this in-place without making a copy of the array.
//     Minimize the total number of operations.

// 需要用两个指针，
// r不停的向后扫，找到非零位置，然后和l指针交换位置即可

// 1. 数组从开头部分如果不是0，那这一部分元素就不需要动了，
// 比如[1, 1, 2, 0, 3]，我们显然不需要对前面的1, 1, 2做什么

// 2. l指针找到数组第一个为0的元素，为了保证非0元素的相对位置不变，
// 我们再去寻找这个0元素之后的第一个非0元素，并将二者交换。

// 3. 为了方便叙述，我在这里设定指向第一个0元的指针为left，left之后，
// 指向第一个非0的指针为right，第2步做的，实际上就是交换两个指针指向的元素，
// 交换完成后，我们令left 和 right 各自向前移动一位，
// 那么此时left指向的还是当前数组的第一个0元素，而right指向的不一定是非0元。比如下面这个例子：

// (1) [1, 1, 2, 0, 0, 3, 0, 4]，交换后-> [1, 1, 2, 3, 0, 0, 0, 4]
//               l     r                              l     r
// (2) left += 1, right += 1, 此时，left = 4, right = 6，
// 可见left指向的还是当前数组的第一个0，而right指向的却是0

// 4. 所以，为了能继续上面第2步的操作，只要right指向的是0，
// 我们就令right += 1，直到不是0为止。

// 第一次遇到非零元素，将非零元素与数组nums[0]互换，
// 第二次遇到非零元素，将非零元素与nums[1]互换，
// 第三次遇到非零元素，将非零元素与nums[2]，
// 以此类推，直到遍历完数组
// [1, 0, 0, 3, 12]
//  l 
//  r

//     l
//     r

// [1, 0, 0, 3, 12]
//     l
//           r

// [1, 3, 0, 0, 12]
//        l
//              r

// [1, 3, 12, 0, 0]
//            l
//                 r
function moveZeroes(nums) {
    let left = 0, right = 0;
    for (let left = 0; left < nums.length; left++) {
        if (nums[left] !== 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]]
            right++
        }
    }
}

// 执行用时：88 ms, 在所有 JavaScript 提交中击败了43.47%的用户
// 内存消耗：39.7 MB, 在所有 JavaScript 提交中击败了40.19%的用户
// 使用2个下标指针，赋值最少，时间复杂度最低
// 思路：可以先把所有非0的元素移到前面，然后将后面的位置补0。
// 使用指针i，指向需要插入的下标，使用指针j指向遍历的下标。遍历一遍，
// 如果j指向的位置为0，则i不变，j++后移；如果j指向的位置不为0，
// 则将j位置的元素值赋值到i位置，然后i++
function moveZeroes(nums) {
    let left = 0
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] != 0) {
            nums[left] = nums[right];
            left++;
        }
    }
    for (let p = left; p < nums.length; p++) {
        nums[p] = 0;
    }
}
console.log(moveZeros([0, 1, 0, 3, 12]));
