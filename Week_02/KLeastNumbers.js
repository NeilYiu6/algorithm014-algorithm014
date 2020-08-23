// 输入整数数组 arr ，找出其中最小的 k 个数。
// 例如，输入4、5、1、6、2、7、3、8这8个数字，
// 则最小的4个数字是1、2、3、4。

//  

// 示例 1：

// 输入：arr = [3,2,1], k = 2
// 输出：[1,2] 或者 [2,1]
// 示例 2：

// 输入：arr = [0,1,2,1], k = 1
// 输出：[0]
//  

// 限制：

// 0 <= k <= arr.length <= 10000
// 0 <= arr[i] <= 10000

// 因为堆里最大的(堆顶)元素>堆中其他元素，只要保证: 
// 堆里最大的(堆顶)元素<不在堆中的其他元素
// 就可以保证: 堆中所有元素<不在堆中的其他元素

function makeHeap(arr) {//用arr构造大顶堆
    let last = arr.length - 1
    for (let i = Math.floor((last - 1) / 2); i >= 0; i--) {
        sink(arr, i)        //从最后一个非叶子节点下沉
    }
}
function sink(arr, i) {    //把i向下沉以保持大顶堆结构
    let left = 2 * i + 1
    let right = 2 * i + 2
    let maxChild = arr[right] > arr[left] ? right : left
    if (arr[maxChild] >= arr[i]) {//最大的儿子比自己大，下沉
        [arr[i], arr[maxChild]] = [arr[maxChild], arr[i]]
        sink(arr, maxChild) //交换后要看看交换后的根还要不要下沉
    }
}
var getLeastNumbers = function (nums, k) {
    var kMaxHeap = nums.slice(0, k)
    makeHeap(kMaxHeap) // 创建长度为k的最大堆
    for (let i = k; k < nums.length; k++) {
        // 堆里最大的(堆顶)元素>当前元素，
        // 说明堆里最大的(堆顶)元素不是在nums中第k小的，
        // 用当前元素替换堆顶元素来保持
        // 堆里最大的(堆顶)元素<不在堆中的其他元素
        if (kMaxHeap[0] > nums[k]) {
            kMaxHeap[0] = nums[k]
            sink(kMaxHeap, 0)
        }
    }
    return kMaxHeap
}