// Given n non-negative integers a1, a2, ..., an , 
// where each represents a point at coordinate (i, ai). 
// n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0).
// Find two lines, which together with x-axis forms a container, such that the container 
// contains the most water.

// Note: You may not slant the container and n is at least 2.

// The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. 
// In this case, the max area of water (blue section) the container can contain is 49.

// Example:

// Input: [1,8,6,2,5,4,8,3,7]
// Output: 49
//brute force
// 利用两层遍历，计算任意两个柱子所形成的容器的容量，保存最大的容量即可。
// 时间复杂度：O(n ^ 2)
// var maxArea = function (height) {
//     var res = 0;
//     for (var i = 0; i < height.length - 1; i++) {
//         for (var j = i + 1; j < height.length; j++) {
//             var temp = (j - i) * Math.min(height[i], height[j]);
//             if (temp > res) {
//                 res = temp;
//             }
//         }
//     }
//     return res;
// };

// 最初我们考虑由最外围两条线段构成的区域。现在，为了使面积最大化，我们需要考虑更长的两条线段之间的区域。
// 如果我们试图将指向较长线段的指针向内侧移动，矩形区域的面积将受限于较短的线段而不会获得
// 比把较短指针箱内移动而得到的增加。
// 因为移动较短线段的指针会得到一条相对较长的线段，这可以克服由宽度减小而引起的面积减小。

// 但是，在同样的条件下，移动指向较短线段的指针尽管造成了矩形宽度的减小，但却可能会有助于面积的增大。
//best
// 执行用时:60 ms    , 在所有 JavaScript 提交中击败了97.46 %    的用户
// 内存消耗:35.7 MB    , 在所有 JavaScript 提交中击败了31.49 %    的用户
// 时间复杂度：O(n)，一次扫描。
// 空间复杂度：O(1)，使用恒定的空间。

var maxArea = function (heights) {
    let area = 0, left = 0, right = heights.length - 1
    while (left < right) {
        let newArea = Math.min(heights[left], heights[right]) * (right - left)
        if (newArea > area) area = newArea
        if (heights[left] < heights[right]) left++
        else right--
    }
    return area
}

console.log(maxArea([2, 3, 4, 5, 18, 17, 6]))