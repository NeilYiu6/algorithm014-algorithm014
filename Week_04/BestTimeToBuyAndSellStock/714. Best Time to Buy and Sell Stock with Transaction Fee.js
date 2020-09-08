// Your are given an array of integers prices, for which the i-th element 
// is the price of a given stock on day i; and a non-negative integer fee 
// representing a transaction fee.

// You may complete as many transactions as you like, 
// but you need to pay the transaction fee for each transaction. 
// You may not buy more than 1 share of a stock at a time 
// (ie. you must sell the stock share before you buy again.)

// Return the maximum profit you can make.

// Example 1:
// Input: prices = [1, 3, 2, 8, 4, 9], fee = 2
// Output: 8
// Explanation: The maximum profit can be achieved by:
// Buying at prices[0] = 1
// Selling at prices[3] = 8
// Buying at prices[4] = 4
// Selling at prices[5] = 9
// The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
// Note:

// 0 < prices.length <= 50000.
// 0 < prices[i] < 50000.
// 0 <= fee < 50000.

// 每次交易要支付手续费，只要把手续费从利润中减去即可。改写方程：
// dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
// dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i] - fee)
// 解释：相当于买入股票的价格升高了。
// 在第一个式子里减也是一样的，相当于卖出股票的价格减小了。

var maxProfit = function (prices, fee) {
    let n = prices.length;
    if (n == 0) return 0;
    let dp = Array.from(new Array(n), () => [0, 0]);
    for (let i = 0; i < n; i++) {
        if (i == 0) {
            dp[0][1] = prices[0] - fee
        } else {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee);
        }
    }
    return dp[n - 1][0];
};

// var maxProfit = function (prices, fee) {
//     let n = prices.length;
//     if (n == 0) return 0;
//     let dp = Array.from(new Array(n), () => [0, 0]);
//     for (let i = 0; i < n; i++) {
//         if (i == 0) {
//             dp[0][1] = -prices[0]
//         } else {
//             dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
//             dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
//         }
//     }
//     return dp[n - 1][0];
// };
var maxProfit = function (prices, fee) {
    let n = prices.length;
    if (n == 0) return 0;
    let dp_i_0 = 0;
    let dp_i_1 = -Infinity;
    for (let i = 0; i < n; i++) {
        let tmp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, tmp - prices[i] - fee);
    }
    return dp_i_0;
};
