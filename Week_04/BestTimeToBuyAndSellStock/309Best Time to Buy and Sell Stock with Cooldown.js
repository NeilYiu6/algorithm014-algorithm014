// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. 
// You may complete as many transactions as you like 
// (ie, buy one and sell one share of the stock multiple times) 
// with the following restrictions:

// You may not engage in multiple transactions at the same time 
// (ie, you must sell the stock before you buy again).
// After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
// Example:

// Input: [1,2,3,0,2]
// Output: 3 
// Explanation: transactions = [buy, sell, cooldown, buy, sell]

// 每次 sell 之后要等一天才能继续交易。只要把这个特点融入上一题的状态转移方程即可：
// dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
// dp[i][1] = max(dp[i-1][1], dp[i-2][0] - prices[i])
// 解释：第 i 天选择 buy 的时候，要从 i-2 的状态转移，而不是 i-1 。

// dp[-1][k][0] = 0
// 解释：因为 i 是从 0 开始的，所以 i = -1 意味着还没有开始，这时候的利润当然是 0 。
// 区别于-Infinity的在于cooldown那题i===1也就是第二天的时候和推导dp[0][k][1] 的时候
// 要用到dp[-1][k][0] - prices[0] = -prices[0]
// 代表第一天就买入的利润是-prices[0]

// dp[0][k][0] 
// = max(dp[-1][k][0], dp[-1][k][1] + prices[i])
// = max(0, -infinity + prices[i]) = 0
// 第一天不持有股票的最大利润恒为0

// dp[0][k][1]
// = max(dp[-1][k][1], dp[-1][k][0] - prices[0])
// = max(-infinity, 0 - prices[0]) 
// = -prices[0]
// 第1天持有股票的最大利润恒为当天股价之负数

// dp[1][k][1]
// = max(dp[0][k][1], dp[0][k-1][0] - prices[1])
// = max(-prices[0], -prices[1]) 
//第2天持有股票的最大利润恒为第1、2天股价中的较小者
var maxProfit = function (prices) {
    let n = prices.length;
    if (n == 0) return 0;
    let dp = Array.from(new Array(n), () => [0, 0]);
    for (var i = 0; i < n; i++) {
        if (i == 0) {
            dp[0][1] = -prices[i];
        } else {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            if (i === 1) {
                dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
            } else {
                dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]);
            }
        }
    }
    return dp[n - 1][0];
};
// 解法二：动态规划 - 降维

var maxProfit = function (prices) {
    let n = prices.length;
    if (n == 0) return 0;

    let dp_i_0 = 0;
    let dp_i_1 = -Infinity;
    let dp_pre = 0;
    for (var i = 0; i < n; i++) {
        let tmp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, dp_pre - prices[i]);
        dp_pre = tmp;
    }
    return dp_i_0;
};
