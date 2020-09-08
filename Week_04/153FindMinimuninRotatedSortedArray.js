// Suppose an array sorted in ascending order is rotated at 
// some pivot unknown to you beforehand.

// (i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

// Find the minimum element.

// You may assume no duplicate exists in the array.

// Example 1:

// Input: [3,4,5,1,2] 
// Output: 1
// Example 2:

// Input: [4,5,6,7,0,1,2]
// Output: 0


// 用mid找到最小元素时有两种情况:
// [4,5,1,2,3]
//    m

// [4,5,1,2,3]
//      m

// 非以上两种情况时,说明mid的左右两个元素都不是答案了,
//可以大胆把区间缩小到[left,mid-1]或[mid+1, right]

// 最小的元素肯定在无序的区间内
// 思路是先用nums[mid]和其两边的元素比较,看看是不是已经找到分界点了, 
// nums[mid]是分界点时有两种情况:
// 1、mid是分界点上较大的元素, 如[4,1,2,3]里的4,
// 此时nums[mid] > nums[mid + 1]，此时mid + 1就是最小值，返回mid+1
// 2、mid是分界点上较小的元素, 如[4,1,2,3]里的1,
// 此时nums[mid] < nums[mid - 1]，返回mid

// 若mid不是分界点上的元素, 此时要
// 确定严格升序的一半后,抛弃掉严格升序的区间,
// 转而在非严格升序的里区间重新找mid

// 如何找到升序的一半区间?

// 若nums[mid] > nums[left] 
// 说明mid的左侧[left,mid-1]是升序,右侧[mid+1,right]是乱序，
// 最小值肯定不在mid左边，此时，我们需要在mid的右边找，
// 所以 left = mid + 1

// 若nums[mid] < nums[left] 
// 说明mid的左侧[left,mid-1]是乱序,mid的右侧[mid+1,right]是升序，
// 最小值肯定在mid左边[left,mid-1]，此时，我们需要在mid的左边找，
// 所以 right = mid - 1

// 若nums[mid] === nums[left] , 因为没有重复元素,
// 所以 left === right === mid, 说明整个数组都被搜索过了, 
// 定会被检查mid左右数字的逻辑return

// 终止条件是什么？分两种情况讨论：
// 1、若mid > mid + 1，此时mid + 1就是最小值，返回结果
// 2、若mid < mid - 1，此时mid就是最小值，返回结果
// 也就是用mid和两边的元素比较

// 执行用时：76 ms, 在所有 JavaScript 提交中击败了74.41%的用户
// 内存消耗：38 MB, 在所有 JavaScript 提交中击败了12.06%的用户
const findMin = function (nums) {
    if (!nums.length) return null
    if (nums.length === 1) return nums[0]
    let left = 0, right = nums.length - 1
    if (nums[right] > nums[left]) return nums[0] // 此时数组单调递增，first element就是最小值
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2)
        if (nums[mid] > nums[mid + 1]) return nums[mid + 1]
        if (nums[mid] < nums[mid - 1]) return nums[mid]
        if (nums[mid] > nums[left]) {
            left = mid + 1
        } else if (nums[mid] < nums[left]) {
            right = mid - 1
        }
    }
    return null
}

// 和Search in Rotated Sorted Array I这题换汤不换药。
// 同样可以根据A[mid]和A[end]来判断右半数组是否sorted：
// 原数组：0 1 2 4 5 6 7
// 情况1：  6 7 0 1 2 4 5   
// 情况2：  2 4 5 6 7 0 1  
// (1) A[mid] < A[end] => A[mid : end] sorted => min不在A[mid+1 : end]中
// 搜索A[start : mid]
// (2) A[mid] > A[end] => A[start : mid] sorted且又因为
// 该情况下A[end]<A[start] => min不在A[start : mid]中
// 搜索A[mid+1 : end]
// (3) base case：
// a. start =  end，必然A[start]为min，为搜寻结束条件。
// b. start + 1 = end，此时A[mid] =  A[start]，而min = min(A[mid], A[end])。
// 而这个条件可以合并到(1)和(2)中。
// var findMin = function (nums) {
//     var left = 0;
//     var right = nums.length - 1;
//     while (left < right) {
//         var mid = (left + right) >> 1;
//         if (nums[mid] > nums[right]) left = mid + 1;
//         else right = mid;
//     }
//     return nums[left];
// };

// 如果数组没有翻转，即 nums[left] <= nums[right]，
// 则 nums[left] 就是最小值，直接返回。

// 如果数组翻转，需要找到数组中第二部分的第一个元素：
// 下面讨论数组翻转的情况下，如何收缩区间以找到这个元素：

// 若 nums[left] <= nums[mid]，说明区间 [left,mid] 连续递增，
// 例：[3 , 4 , 5 , 1 , 2] 
//      l       m
// 则最小元素一定不在这个区间里，可以直接排除。因此，令 left = mid+1，
// 在 [mid+1,right], 也就是右区间继续查找

// 否则，说明区间 [left,mid] 不连续，则最小元素一定在这个区间里。
// 例：[4 , 5 , 1 , 2 , 3] => 不能在排除mid
//      l       m
// 例：[5 , 1 , 2 , 3 , 4] 
//      l       m
// 因此，令 right = mid，在 [left,mid] 继续查找
// [left,right] 表示当前搜索的区间。注意 right 更新时会被设为 mid 而不是 mid-1，
// 因为 mid 无法被排除

// 执行用时：80 ms, 在所有 JavaScript 提交中击败了63.42%的用户
// 内存消耗：37.9 MB, 在所有 JavaScript 提交中击败了25.16%的用户
var findMin = function (nums) {
    var left = 0, right = nums.length - 1;//左闭右闭区间
    while (left <= right) {// 实际上是不会跳出循环，当 left==right 时直接返回
        if (nums[left] <= nums[right]) { // 如果 [left,right] 递增，那就是没有旋转点或
            return nums[left] //旋转点已被[left,right]包含[3,4,5,1,2]第二次进入while
        }
        let mid = Math.floor(left + (right - left) / 2)
        if (nums[left] < nums[mid]) {// [left,mid] 连续递增，则在 [mid+1,right] 查找
            left = mid + 1;
        } else if (nums[mid] < nums[left]) {// [left,mid] 不连续，在 [left,mid] 查找
            right = mid;
        } else if (left === mid) {//例如[2,1], 直接把left
            left = mid + 1
        }
    }
    return nums[left]
};




// console.log(findMin([6, 7, 0, 1, 2, 4, 5]));
console.log(findMin([4, 5, 6, 7, 0, 1, 2]));