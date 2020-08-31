// Implement pow(x, n), which calculates x raised to the power n (x^n).

// Example 1:

// Input: 2.00000, 10
// Output: 1024.00000
// Example 2:

// Input: 2.10000, 3
// Output: 9.26100
// Example 3:

// Input: 2.00000, -2
// Output: 0.25000
// Explanation: 2^-2 = 1/(2^2) = 1/4 = 0.25
// Note:

// -100.0 < x < 100.0
// n is a 32-bit signed integer, within the range [−231, 231 − 1]

// 例pow(3,4)
//  3  *  3  *  3  *  3 ===
// 3*3 * 3*3 

// 例pow(3,5)
//  3  *  3  *  3  *  3  *  3 ===
// 3*3 * 3*3 *  3

// 时间复杂度 O(logn) ： 二分的时间复杂度为对数级别。
// 空间复杂度 O(1)

// 3^3 = (3*3)^1 * 3 = 9^0 * 9 * 3 = 27
var myPow = function (x, n) {
    if (n < 0) return 1 / myPow(x, -n);
    if (n === 0) return 1;
    if (n % 2 === 0) return myPow(x * x, Math.floor(n / 2));
    if (n % 2 !== 0) return myPow(x * x, Math.floor(n / 2)) * x;
};

var myPow = function (num, power) {
    if (power < 0) return 1 / num * myPow(1 / num, -(power + 1))
    if (power === 0) return 1
    if (power === 1) return num
    // 以上分别为power小于0 等于0 等于1 的情况
    let res = 1
    while (power > 1) { // power大于1
        if (power % 2 === 1) {
            res = res * num
            power--
        }
        num = num * num
        power = power / 2
    }
    return res * num
};


// console.log(myPow(9.88023, 3));
console.log(myPow(-9, 3));
