// 57. 3Sum

// Given an array S of n integers, are there elements a, b, c in S such that 
// a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
// Example

// Example 1:

// Input:[2,7,11,15]
// Output:[]

// Example 2:

// Input:[-1,0,1,2,-1,-4]
// Output:	[[-1, 0, 1],[-1, -1, 2]]

// Notice

// Elements in a triplet (a,b,c) must be in non-descending order. (ie, a ≤ b ≤ c)

// The solution set must not contain duplicate triplets.

// 首先对数组进行排序，排序后固定一个数 nums[i]，
// 再使用左右指针指向 nums[i]后面的两端，
// 数字分别为 nums[L] 和 nums[R]，
// 计算三个数的和 sum 判断是否满足为 0，满足则添加进结果集
// 如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环

// 去重：

// 从第二个数字开始，每固定第一个数都看看是不是和上一个数一样
// 例[-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1],[-1,0,1]]
// 答案：[[-1,-1,2],[-1,0,1]]
// 如果 nums[i] == nums[i−1]，则说明该数字重复，会导致结果重复，所以应该跳过

// 找到一组答案以后，left/right的小循环要跳过后面重复的数
// 例[-2,0,0,2,2]
// 输出[[-2,0,2],[-2,0,2]]
// 答案[[-2,0,2]]
// 当 sum == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++
// 当 sum == 0 时，nums[R] == nums[R-1] 则会导致结果重复，应该跳过，R--

// 例[-2,0,1,1,2]
// 输出[[-2,0,2]]
// 答案[[-2,0,2],[-2,1,1]]
// 时间复杂度：O(n^2)，n 为数组长度
// 执行用时：152 ms, 在所有 JavaScript 提交中击败了89.98%的用户
// 内存消耗：48.3 MB, 在所有 JavaScript 提交中击败了49.29%的用户
var threeSum = function (nums) {
    let ans = [];
    const len = nums.length;
    if (nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); 
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
        let L = i + 1;
        let R = len - 1;
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            if (sum == 0) {
                ans.push([nums[i], nums[L], nums[R]]);
                while (L < R && nums[L] == nums[L + 1]) L++; 
                while (L < R && nums[R] == nums[R - 1]) R--; 
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }
    return ans;
};
// 哈希表
// const threeSum = function (nums) {
//     if (!nums || nums.length < 3) return [];
//     nums.sort((a, b) => a - b);
//     let resArr = [], len = nums.length;
//     for (let i = 0; i < len - 2; i++) {
//         if (i !== 0 && nums[i] === nums[i - 1]) continue;
//         let map = new Map();
//         for (let j = i + 1; j < len; j++) {//这循环既是找第2个数也是在找第3个数
//             if (map.has(-nums[i] - nums[j])) { //找第3个数
//                 resArr.push([nums[i], nums[j], (-nums[i] - nums[j])]);
//                 //找到答案三个数以后才去重，譬如3个0的时候，先找到3个0然后才开始跳过和第2个数相同的数
//                 while (j + 1 < len && nums[j] === nums[j + 1]) j++;
//             }
//             map.set(nums[j], true); //记录潜在的第2/3个数
//         }
//     }
//     return resArr; // O(n^3) ?
// };
console.log(JSON.stringify(threeSum([0, 0, 0])));

// [-4, -1, -1, 0, 1, 2] 提早去重
// var threeSum = function (nums) {
//     let ans = [];
//     const len = nums.length;
//     if (nums == null || len < 3) return ans;
//     nums.sort((a, b) => a - b); // 排序
//     for (let i = 0; i < len; i++) {
//         if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
//         if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
//         let L = i + 1;
//         let R = len - 1;
//         while (L < R) {
//             const sum = nums[i] + nums[L] + nums[R];
//             if (sum == 0) {
//                 ans.push([nums[i], nums[L], nums[R]]);
//                 while (L < R && nums[L] == nums[L + 1]) L++; // 去重
//                 while (L < R && nums[R] == nums[R - 1]) R--; // 去重
//                 L++;
//                 R--;
//             } else if (sum < 0) {
//                 L++
//                 while (L < R && nums[L] == nums[L - 1]) L++; // 去重
//             } else if (sum > 0) {
//                 R--;
//                 while (L < R && nums[R] == nums[R + 1]) R--; // 去重
//             }
//         }
//     }
//     return ans;
// };

// Set去重
// var threeSum = function (nums) {
//     if (nums.length === 0) {
//         return []
//     }
//     let ans = new Set();
//     const len = nums.length;
//     if (nums == null || len < 3) return ans;
//     nums.sort((a, b) => a - b); // 排序
//     for (let i = 0; i < len - 2; i++) {
//         // if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
//         // if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
//         let L = i + 1;
//         let R = len - 1;
//         while (L < R) {
//             const sum = nums[i] + nums[L] + nums[R];
//             if (sum == 0) {
//                 ans.add(`${nums[i]},${nums[L]},${nums[R]}`);
//                 L++;
//                 R--;
//             }
//             else if (sum < 0) L++;
//             else if (sum > 0) R--;
//         }
//     }
//     return Array.from(ans).map((item) => {
//         return item.split(',').map((ele) => {
//             return Number(ele)
//         })
//     });
// };
