// Given two sorted integer arrays nums1 and nums2,
//  merge nums2 into nums1 as one sorted array.

// Note:

// The number of elements initialized in nums1 and nums2 are m and n respectively.
// You may assume that nums1 has enough space 
// (size that is greater or equal to m + n) to hold additional elements from nums2.
// Example:

// Input:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// Output: [1,2,2,3,5,6]
// Constraints:

// -10^9 <= nums1[i], nums2[i] <= 10^9
// nums1.length == m + n
// nums2.length == n

// // 初级版
// var merge = function (nums1, m, nums2, n) {
//     let tail = m + n - 1, p2 = n - 1, p1 = m - 1
//     while (tail >= 0) {
//         if (nums1[p1] > nums2[p2] || p2 < 0) {
//             nums1[tail] = nums1[p1]
//             p1--
//         } else {
//             nums1[tail] = nums2[p2]
//             p2--
//         }
//         tail--
//     }
//     return nums1
// };

//                m     t
// nums1 = [1,2,3,0,0,0],   m = 3
//                 n
// nums2 = [0,2,5,6],         n = 4

//                m   t
// nums1 = [1,2,3,0,5,6],   m = 3
//              n
// nums2 = [0,2,5,6],         n = 4

//              m   t
// nums1 = [1,2,3,3,5,6],   m = 3
//              n
// nums2 = [0,2,5,6],         n = 4

//              m t
// nums1 = [1,2,3,3,5,6],   m = 3
//            n
// nums2 = [0,2,5,6],         n = 4

//            m t
// nums1 = [1,2,2,3,5,6],   m = 3
//            n
// nums2 = [0,2,5,6],         n = 4

//          m t
// nums1 = [1,1,2,3,5,6],   m = 3
//            n
// nums2 = [0,2,5,6],         n = 4

// while end




// 双指针 + 从后向前
// 思路
// 两个数组从小到大排序
// 且题目要求 修改nums1为合并排好序的nums1+nums2
// 双指针
// 两个分别指向两个数组尾部的指针
// 从后向前
// 比较两指针位置的值
// 大的一定是结果数组的最大值
// 一一填充到 nums1的末尾
// 遍历完后
// 当 n > 0 时
// 说明 nums2 中还有剩余没有比较的数字
// 将其插入替换 nums1 数组前面n个数字即可
var merge = function (nums1, m, nums2, n) {
    let tail = m + n;
    while (m > 0 && n > 0) {//
        nums1[--tail] = nums1[m - 1] < nums2[n - 1] ? nums2[--n] : nums1[--m];
    }
    if (n > 0) {// 当nums2第1个数比nums1小，m===0时n>0
        nums1.splice(0, n, ...nums2.slice(0, n));
    }
};

