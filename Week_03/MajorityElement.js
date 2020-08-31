// Given an array of size n, find the majority element. 
// The majority element is the element that appears more than ⌊ n/2 ⌋ times.

// You may assume that the array is non-empty and the 
// majority element always exist in the array.

// Example 1:

// Input: [3,2,3]
// Output: 3
// Example 2:

// Input: [2,2,1,1,1,2,2]
// Output: 2

// 想法
// 我们知道出现次数最多的元素大于n/2次，所以可以用哈希表来快速统计每个元素出现的次数。

// 算法
// 我们使用哈希表来存储每个元素，然后用一个循环在线性时间内遍历 nums ，然后我们只需要返回有最大值的键。

// 时间复杂度：O(n)
// 我们将 nums 迭代一次，哈希表的插入是常数时间的。所以总时间复杂度为 O(n) 时间的。
// 空间复杂度：O(n)
// 执行用时 :68 ms, 在所有 JavaScript 提交中击败了89.47%的用户
// 内存消耗 :38 MB, 在所有 JavaScript 提交中击败了30.65%的用户
var majorityElement = function (nums) {
    if (nums.length == 1) return nums[0];
    let map = {}, result;
    for (let i = 0, len = nums.length; i < len; i++) {
        if (map.hasOwnProperty(nums[i])) {
            map[nums[i]]++;
            if (map[nums[i]] > len / 2) {
                result = nums[i];
                return result;
            }
        } else map[nums[i]] = 1;
    }
};

// 投票求解
// 符合直觉的做法是利用额外的空间去记录每个元素出现的次数，
// 并用一个单独的变量记录当前出现次数最多的元素。

// 但是这种做法空间复杂度较高，有没有可能进行优化呢？ 答案就是用"投票算法"。

// 投票算法的原理是通过不断消除不同元素直到没有不同元素，剩下的元素就是我们要找的元素。
// 时间复杂度：O(n)
// Boyer-Moore 算法严格执行了 n 次循环，所以时间复杂度是线性时间的。
// 空间复杂度：O(1)
// Boyer-Moore 只需要常数级别的额外空间。
var majorityElement = function (nums) {
    let count = 0;
    let candidate = null;
    nums.forEach(function (num) {
        if (count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    });
    return candidate;
}

// // 暴力求解
// var majorityElement = function (nums) {
//     if (nums.length == 1) return nums[0];
//     for (let i = 0, len = nums.length; i < len; i++) {
//         let count = 1;
//         for (let j = i + 1; j < len; j++) {
//             if (nums[i] == nums[j]) count++;
//             if (count > len / 2) return nums[i];
//         }
//     }
// };

// // 排序求解
// 时间复杂度：O(nlgn)
// 空间复杂度：O(lgn)
// var majorityElement = function (nums) {
//     nums.sort();
//     return nums[parseInt(nums.length / 2)];
// }


// 分治
// 时间复杂度：O(nlgn)
// 空间复杂度：O(lgn)
// 执行用时：84 ms, 在所有 JavaScript 提交中击败了69.77%的用户
// 内存消耗：39.4 MB, 在所有 JavaScript 提交中击败了93.59%的用户

function majorityElement(nums) {
    function countInRange(num, lo, hi) {
        let count = 0;
        for (let i = lo; i <= hi; i++) {
            if (nums[i] == num) count++;
        }
        return count;
    }
    function majorityElementRec(lo, hi) {
        // base case; the only element in an array of size 1 is the majority element.
        if (lo == hi) return nums[lo];
        // recurse on left and right halves of this slice.
        let mid = Math.floor((hi - lo) / 2) + lo;
        let left = majorityElementRec(lo, mid);
        let right = majorityElementRec(mid + 1, hi);
        // if the two halves agree on the majority element, return it.
        if (left == right) return left;
        // otherwise, count each element IN A RANGE and return the "winner".
        let leftCount = countInRange(left, lo, hi);
        let rightCount = countInRange(right, lo, hi);
        return leftCount > rightCount ? left : right;
    }
    return majorityElementRec(0, nums.length - 1);
}


// Ο(1) ＜ (Ο(logn) === O(log2n)) ＜ Ο(n) ＜ (Ο(nlogn) === Ο(nlog2n)) ＜ Ο(n^2) ＜Ο(n^3) ＜ … ＜ Ο(2^n) ＜ Ο(n!)
