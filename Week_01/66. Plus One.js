// Given a non-empty array of digits representing a non-negative integer, 
// increment one to the integer.

// The digits are stored such that the most significant digit is at 
// the head of the list, and each element in the array contains a single digit.

// You may assume the integer does not contain any leading zero, 
// except the number 0 itself.

// Example 1:

// Input: [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123.
// Example 2:

// Input: [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321.

// 1. 末位无进位，则末位加一即可，因为末位无进位，前面也不可能产生进位，比如 45 => 46
// 2. 末位有进位，在中间位置进位停止，则需要找到进位的典型标志，
// 即为当前位 %10后为 0，则前一位加 1，直到不为 0 为止，比如 499 => 500
// 3. 末位有进位，并且一直进位到最前方导致结果多出一位，对于这种情况，
// 需要在第 2 种情况遍历结束的基础上，进行单独处理，比如 999 => 1000
// 在下方的 Java 和 JavaScript 代码中，对于第三种情况，
// 对其他位进行了赋值 0 处理，Java 比较 tricky 直接 new 数组即可，
// JavaScript 则使用了 ES6 语法进行赋值
// 时间复杂度：O(n)

var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i]++
            return digits //进位到这里停止了
        } else {
            digits[i] = 0;
        }
    }
    digits.unshift(1);//能来到这里就是进位到多出一位了
    return digits
};

// var plusOne = function (digits) {
//     return Array.from((BigInt(digits.join('')) + BigInt(1)).toString());
// };