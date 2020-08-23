// https://www.cnblogs.com/chengxiao/p/6129630.html
// 堆排序的基本思想是：将待排序序列构造成一个大顶堆，
// 此时，整个序列的最大值就是堆顶的根节点,最小值就是末尾元素。
// 根节点将其与末尾元素进行交换，
// 此时末尾就为最大值。然后将剩余n-1个元素重新构造成一个堆，
// 这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列了

// recursive
// Time: O(n log n)
// Space O(1)
// Runtime: 96 ms, faster than 83.92% of JavaScript online submissions for Sort an Array.
// Memory Usage: 40.6 MB, less than 100.00% of JavaScript online submissions for Sort an Array.
function sink(arr, i, last) {//把第i个元素向下沉保持大顶堆结构，直到第size-1个元素
	const left = 2 * i + 1
	const right = 2 * i + 2
	let max = i
	if (left <= last && arr[left] > arr[max]) max = left
	if (right <= last && arr[right] > arr[max]) max = right
	if (max != i) {
		;[arr[i], arr[max]] = [arr[max], arr[i]]
		sink(arr, max, last) // 和子节点交换后，从交换后的子节点索引继续下沉
	}
}
function makeHeap(arr) {
	let last = arr.length - 1//最后一个节点的父节点就是最后一个非叶子结点
	for (let i = Math.floor((last - 1) / 2); i >= 0; i--) {
		//从最后一个非叶子节点开始，从右往左，从下到上下沉节点，使每个节点的子节点都小于自己，最后形成一个大顶堆
		sink(arr, i, last)
	}
}
function sortArray(arr) {
	makeHeap(arr)
	for (i = arr.length - 1; i > 0; i--) {
		;[arr[i], arr[0]] = [arr[0], arr[i]]
		sink(arr, 0, i - 1)
	}
	return arr
}


// 执行用时 :108 ms, 在所有 JavaScript 提交中击败了93.64%的用户
// 内存消耗 :40.9 MB, 在所有 JavaScript 提交中击败了80.70%的用户
// 调整最大堆，使index的值大于左右节点
function adjustHeap(nums, index, size) {
	// 交换后可能会破坏堆结构，需要从index开始递归下沉每个节点使得每一个节点都大于其左右子结点
	while (true) {
		let max = index
		let left = index * 2 + 1 // 左节点
		let right = index * 2 + 2 // 右节点
		if (left < size && nums[max] < nums[left]) max = left //左节点比根节点大，把左节点设为max
		if (right < size && nums[max] < nums[right]) max = right //右节点比max大，把左节点设为max
		if (index === max) break; //左右节点都比根小
		// 如果左右结点大于当前的结点则交换，并再以交换的max位置为当前节点循环一遍
		// 判断交换后的左右结点位置是否破坏了以左右结点为根的子树的堆结构
		// （左右结点各自的左右节点比左右结点小了）
		// 如（[4,9,8,5,6]=>[9,4,8,5,6]时4到了9的位置后4的子节点都比4大）
		[nums[index], nums[max]] = [nums[max], nums[index]]
		index = max
	}
}
function buildHeap(nums) {
	let start = Math.floor(nums.length / 2 - 1) //注意这里的头节点是从0开始的，所以最后一个非叶子结点是parseInt(nums.length/2-1)
	for (let i = start; i >= 0; i--) {
		// 从最后一个非叶子结点开始调整，直至堆顶。
		adjustHeap(nums, i, nums.length)
	}
}
function sortArray(nums) {
	buildHeap(nums) // 1. 用nums建立最大堆
	for (let i = nums.length - 1; i > 0; i--) {
		// 2. 循环n-1次，每次循环后交换堆顶元素和堆底元素并重新调整堆结构
		;[nums[i], nums[0]] = [nums[0], nums[i]]
		adjustHeap(nums, 0, i)
	}
	return nums
}


// recursive 2
// function heapify(array, index, heapSize, cmp) {
//     var left = 2 * index + 1;
//     var right = 2 * index + 2;
//     var largest = index;
//     if (left < heapSize && cmp(array[left], array[index]) > 0) {
//         largest = left;
//     }
//     if (right < heapSize && cmp(array[right], array[largest]) > 0) {
//         largest = right;
//     }
//     if (largest !== index) {
//         var temp = array[index];
//         array[index] = array[largest];
//         array[largest] = temp;
//         heapify(array, largest, heapSize, cmp);
//     }
// }
// function buildMaxHeap(array, cmp) {
//     for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
//         heapify(array, i, array.length, cmp);
//     }
//     return array;
// }
// function comparator(a, b) {
//     return a - b;
// }
// function sortArray(array, cmp) {
//     cmp = cmp || comparator;
//     var size = array.length;
//     var temp;
//     buildMaxHeap(array, cmp);
//     for (var i = array.length - 1; i > 0; i -= 1) {
//         temp = array[0];
//         array[0] = array[i];
//         array[i] = temp;
//         size -= 1;
//         heapify(array, 0, size, cmp);
//     }
//     return array;
// };

// Runtime: 84 ms, faster than 97.79% of JavaScript online submissions for Sort an Array.
// Memory Usage: 40.9 MB, less than 100.00% of JavaScript online submissions for Sort an Array.
// function heapify(heap, i, max) {
//     var index, leftChild, righChild;
//     while (i < max) {
//         index = i;
//         leftChild = 2 * i + 1; // left child
//         righChild = leftChild + 1; // right child
//         if (leftChild < max && heap[leftChild] > heap[index]) index = leftChild;
//         if (righChild < max && heap[righChild] > heap[index]) index = righChild;
//         if (index === i) return;
//         [heap[i], heap[index]] = [heap[index], heap[i]]
//         i = index;
//     }
// }
// function buildMaxHeap(array) {// Build a max heap out of all array elements passed in.
//     var i = Math.floor(array.length / 2 - 1);
//     while (i >= 0) heapify(array, i--, array.length);
// }
// function sortArray(array) {
//     buildMaxHeap(array); // Build our max heap.
//     lastElement = array.length - 1;  // Find last element.
//     while (lastElement > 0) {// Continue heap sorting until we have just one element left in the array.
//         [array[0], array[lastElement]] = [array[lastElement], array[0]]
//         heapify(array, 0, lastElement);
//         lastElement--
//     }
//     return array
// }

console.log(sortArray([-4, 0, 7, 4, 9, -5, -1, 0, -7, -1]))
