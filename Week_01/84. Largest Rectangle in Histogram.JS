// Given n non-negative integers representing the histogram's 
// bar height where the width of each bar is 1, 
// find the area of largest rectangle in the histogram.

// Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].

// The largest rectangle is shown in the shaded area, which has area = 10 unit.

// Example:

// Input: [2,1,5,6,2,3]
// Output: 10

// 方法一：暴力求解
// 我们可以遍历每根柱子，以当前柱子 i 的高度作为矩形的高，
// 那么矩形的宽度边界即为向左找到第一个高度小于当前柱体 i 的柱体，
// 向右找到第一个高度小于当前柱体 i 的柱体。

// 对于每个柱子我们都如上计算一遍以当前柱子作为高的矩形面积，
// 最终比较出最大的矩形面积即可。

var largestRectangleArea = function (heights) {
    let area = 0;

    for (let i = 0; i < heights.length; i++) {
        const height = heights[i];
        let left = i;
        let right = i;
        // 向前遍历查找左边界：
        // 判定边界的条件是遇到下一个高度大于等于当前高度。则表明当前left为左边界
        // 如果说直接判断heights[left]，会出现退出循环时，left多走了一步，
        // 造成计算宽度时很难处理，因此判断left - 1
        // 如果left为0，heights[-1]为undefined，heights[-1]>=height都为false
        while (heights[left - 1] >= height) {
            left--;
        }
        // 向后遍历查找右边界：
        // 判定边界的条件是遇到下一个高度大于等于当前高度。则表明当前right为右边界
        // 如果说直接判断heights[right]，会出现退出循环时，right多走了一步，
        // 造成计算宽度时很难处理，因此判断right + 1
        // 如果right为heights.length，heights[heights.length]为undefined，
        // heights[heights.length]>=height都为false
        while (heights[right + 1] >= height) {
            right++;
        }
        // 根据当前查找的边界计算宽度
        const width = right - left + 1;
        // 计算当前面积，并与已存储的面积对比，取最大值
        area = Math.max(area, width * height);
    }

    return area;
};

// 不妨想一下这里的双重循环是否可以优化？

// 我们每遍历到当前柱体 i 时：

// 上述写法中，我们需要再嵌套一层 while 循环来向左找到第一个比柱体 i 高度小的柱体，
// 这个过程是 O(N) 的；
// 那么我们可以 O(1) 的获取柱体 i 左边第一个比它小的柱体吗？
// 答案就是单调增栈，因为对于栈中的柱体来说，栈中第i-1个柱体就是左边第一个高度小于自身的柱体。
// 所以可以遍历每个柱体，
// 若当前的柱体高度大于等于栈顶柱体的高度， 就直接将当前柱体入栈，
// 若当前的柱体高度小于栈顶柱体的高度，说明当前栈顶柱体找到了右边的第一个小于自身的柱体，
// 那么就可以将栈顶柱体出栈来计算以其为高的矩形的面积了，
// 计算完以后以这个出了栈的柱体为高的矩形面积就确定了，可以放心扔掉了

// 出了while循环，此时还需要把这个计算过的柱体的下一个柱体，也就是"当前主题"
// 重新push回栈内，开始找它的左右边界

// 注意heights数组左侧需要加1个0来解决原数组为[2,1,...]，
// 计算2的最大面积时栈中没有左边界元素的尴尬
// 右侧也需要加1个0解决原数组为[1,2]，
// 计算2的最大面积时栈中没有右边界元素的尴尬

var largestRectangleArea = function (heights) {
    var maxarea = 0, stack = [];
    heights = [0, ...heights, 0]
    for (var i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
            let curHeight = heights[stack.pop()]
            maxarea = Math.max(maxarea, curHeight * (i - stack[stack.length - 1] - 1));
        }
        stack.push(i);
    }
    return maxarea;
};

console.log(largestRectangleArea([1, 2, 3]));

var largestRectangleArea = function (heights) {
    var maxarea, stack = []
    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[stack[stack.length - 1] > heights[i]]) {
            let prevHeight = heights[stack.pop()]
            let width = i - stack[stack.legnth - 1] - 1
            maxarea = Math.max(maxarea, prevHeight * (i - stack[stack.length - 1] - 1))
        }
        stack.push(i)
    }
    return maxarea
}