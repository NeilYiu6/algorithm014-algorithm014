// You are given an integer array nums sorted in ascending order, and an integer target.

// Suppose that nums is rotated at some pivot unknown to you beforehand 
// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// If target is found in the array return its index, otherwise, return -1.

// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
// Example 3:

// Input: nums = [1], target = 0
// Output: -1
//  

// Constraints:

// 1 <= nums.length <= 5000
// -10^4 <= nums[i] <= 10^4
// All values of nums are unique.
// nums is guranteed to be rotated at some pivot.
// -10^4 <= target <= 10^4


let arr = [4, 5, 6, 7, 0, 1, 2]
// realmid = (mid + rot) % n => let arr = [0, 1, 2, 4, 5, 6, 7]
let target = 6

// 执行用时：60 ms, 在所有 JavaScript 提交中击败了97.13%的用户
// 内存消耗：33.4 MB, 在所有 JavaScript 提交中击败了100.00%的用户
// 本题是需要使用二分查找，怎么分是关键，举个例子：

// 第一类
// [2, 3, 4, 5, 6, 7, 1] 这种，
// 也就是 nums[start] < nums[mid]。此例子中就是 2 < 5；
//(或nums[mid]>=nums[end])
// 这种情况下，前半部分有序。因此如果 nums[start] <= target < nums[mid]，
// 则在前半部分找，否则去后半部分找。

// 第二类
// 6 7 1 2 3 4 5 这种，
// 也就是 nums[start] > nums[mid]。此例子中就是 6 > 2；
// (或nums[mid]<nums[end])
// 这种情况下，后半部分有序。因此如果 nums[mid] < target <=nums[end]。
// 则在后半部分找，否则去前半部分找。

//为什么nums[start]===nums[mid]时要归为前半部分升序？

// 根本原因是let mid = Math.floor(start + (end - start) / 2)，
// 若改成let mid = Math.ceil(start + (end - start) / 2)，
// 则要归到后半部分升序

//因为当元素不重复时，nums[start]===nums[mid]可能是以下这种情况：
// [3,   1]   target===1
//  s/m  e
// 由于mid是向下取整得出来的，所以mid === start === 0
// 此时后半部分[mid, end]([0, 1])根本不是升序

// var search = function (nums, target) {
// 	let start = 0, end = nums.length - 1
// 	while (start <= end) {
// 		let mid = Math.floor(start + (end - start) / 2)
// 		if (nums[mid] == target) return mid
// 		if (nums[start] <= nums[mid]) {//前半部分升序
// 			//target在[start, mid-1], 也就是前半部分
// 			// 这里target===nums[mid]时早就被上面return了，所以可以忽略=的情况
// 			if (nums[start] <= target && target < nums[mid]) {
// 				//但是target===nums[start]时还是在[start, mid-1]区间，
// 				//必须来到这里的[start, mid-1]搜索而不是到else的[mid+1, end]
// 				end = mid - 1
// 			} else if (target < nums[start] || nums[mid] < target) {
// 				start = mid + 1//target在[mid+1, end], 也就是后半部分
// 			}
// 		} else if (nums[start] > nums[mid]) {//后半部分升序
// 			//target在[mid+1, end],也就是后半部分
// 			// 这里target===nums[mid]时早就被上面return了，所以可以忽略=的情况
// 			if (nums[mid] < target && target <= nums[end]) {
// 				//但是target===nums[end]时还是在[mid+1, end]区间，
// 				//必须来到这里的[mid+1, end]搜索而不是到else的[start, mid-1]
// 				start = mid + 1
// 			} else if (target < nums[mid] || nums[end] < target) {
// 				end = mid - 1//target在[start, mid-1], 也就是后半部分
// 			}
// 		}
// 	}
// 	return -1
// }

// console.log(search(arr, target));
// console.log(search([6, 7, 0, 1, 2, 4, 5], 0))
// console.log(search([4, 5, 6, 7, 0, 1, 2], 3));
// console.log(search([3, 1], 1));

// [4,5,6,1,2,3]
// console.log(search([3, 1], 1));

function search(nums, target) {
	const findMinIndex = function (nums) {
		if (!nums.length) return null
		if (nums.length === 1) return 0
		let left = 0, right = nums.length - 1
		if (nums[right] > nums[left]) return 0 // 此时数组单调递增，first element就是最小值
		while (left <= right) {
			let mid = Math.floor(left + (right - left) / 2)
			if (nums[mid] > nums[mid + 1]) return mid + 1
			if (nums[mid] < nums[mid - 1]) return mid
			if (nums[mid] > nums[left]) {
				left = mid + 1
			} else if (nums[mid] < nums[left]) {
				right = mid - 1
			}
		}
		return -1
	}
	let n = nums.length, left = 0, right = n - 1
	let rot = findMinIndex(nums)
	// rot is the index of the smallest value and also
	// the number of places rotated.
	left = 0, right = n - 1;
	// 先装作数组是有序未翻转的数组作二分查找, 要比较目标前再利用旋转位置的位移
	// (假mid + rot) % n计算出真正的mid然后用realmid和target比较
	// The usual binary search and accounting for rotation.
	while (left <= right) {
		let mid = Math.floor(left + (right - left) / 2)
		let realmid = (mid + rot) % n;
		if (nums[realmid] == target) return realmid;
		if (nums[realmid] < target) left = mid + 1;
		else right = mid - 1;
	}
	return -1;
}
console.log(search([1,3], 1));
