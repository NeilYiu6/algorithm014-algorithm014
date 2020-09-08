// Say you have an array for which the i-th element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete at most k transactions.

// Note:
// You may not engage in multiple transactions at the same time 
// (ie, you must sell the stock before you buy again).

// Example 1:

// Input: [2,4,1], k = 2
// Output: 2
// Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
// Example 2:

// Input: [3,2,6,5,0,3], k = 2
// Output: 7
// Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.
//              Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
// ***************************************************************************************
// 三维数组的解法：
// 如果我们把买+卖算一次交易
// 那么这道题的限制是交易数，天数，手上有没有股票(有股票就不能买，没有股票就不能卖)
// 建立三维的数组：dp[i][k][2]
// 其中k表示的是交易次数，i表示的是第几天，2表示的是有两种状态：手上没有股票/手上有股票
// dp[i][k][0] 数组中的数字表示的是到了第i天，交易了k次，手上没有股票获得的最大利益
// dp[i][k][1] 数组中的数字表示的是到了第i天，交易了k次，手上持有股票获得的最大利益
// 在我们写转移方程之前我们还要先考虑之前提出来的问题--交易数怎么算，买+卖是一次交易，
// 我的t表示的是交易次数，那我到底是买入的时候t要加一了，还是卖出的时候t才加一？

// 答：都可以，不同的定义就会有不同的实现

// 来看一下两者有什么不同
// 1>买入就算一次交易：
// i天允许交易次数为t现在手上不持有 = 
// max(i-1天允许交易次数为t手上不持有，i-1天允许交易次数为t手上持有 + i天卖出价格prices)
// dp[i][t][0] = max(dp[i - 1][t][0], dp[i - 1][t] + prices[i]);

// i天允许交易次数为t现在手上持有 = 
// max(i-1天允许交易次数为t手上持有，i-1天允许交易次数为t-1手上不持有 - i天买入价格)
// dp[i][t][1] = max(dp[i - 1][t][1], dp[i - 1][t - 1][0] - prices[i])

// 2>买入后卖出才算一次交易
// i天允许交易次数为t现在手上不持有 = 
// max(i天允许交易次数为t手上不持有，i - 1天允许交易次数为t-1交易 + i天卖出)
// dp[i][t][0] = max(dp[i][t][0], dp[i - 1][t - 1][1] + prices[i])

// i天允许交易次数为t现在手上持有 = 
// max(i天允许交易次数为t现在手上持有，i - 1天允许交易次数为t + i天买入)
// dp[i][t][1] = max(dp[i][t][1], dp[i - 1][t][0] - prices[i])

// 除了转移方程不一样以外，还有初始状态不一样
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1>买入就算一次交易：
// dp[0][t][0] 0天允许交易次数为t，手上不持有：可能的 0
// dp[0][t][1] 0天允许交易次数为t，手上持有：不可能（0天没有股票，所以无法买入持有;
// 持有说明至少进行了一次买入，买入就交易，因此这里不可能【不可能意思就是不能从这里转移】
// dp[i][0][0] i天允许交易次数为0，手上不持有：0
// dp[i][0][1] i天允许交易次数为0，手上持有：不可能（不交易手上不可能持有）

// sell takes 1 trans
// var maxProfit = function (k, prices) {
//     if (!prices.length) return 0;
//     let n = prices.length;
//     if (k >= Math.floor(n / 2)) return maxProfitInfinity(prices);
//     let maxK = k;
//     let dp = Array.from({ length: n + 1 }, () => Array.from({ length: maxK + 1 }, () => new Array(2)));


//     for (let k = maxK; k >= 0; k--) { // 注意这种初始化方式
//         dp[0][k][0] = 0;
//         dp[0][k][1] = -Infinity;
//     }
//     for (let i = 1; i <= n; i++) { // 注意这里是从1开始
//         dp[i][0][0] = 0;
//         dp[i][0][1] = Math.max(dp[i - 1][0][1], dp[i - 1][0][0] - prices[i - 1]);
//         for (let k = maxK; k >= 1; k--) {
//             // dp[i-1][k-1][1] + prices[i-1] -> 上一天持有，今天卖出，今天消耗一次交易机会
//             dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k - 1][1] + prices[i - 1]);
//             // dp[i-1][k][0] - prices[i-1] 昨天卖出，今天买入，今天不消耗交易机会
//             dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k][0] - prices[i - 1]);
//         }
//     }
//     return dp[n][maxK][0];
// };

// buy takes 1 trans
var maxProfit = function (k, prices) {
    if (!prices.length) return 0;
    let n = prices.length;
    if (k >= Math.floor(n / 2)) return maxProfitInfinity(prices);
    let maxK = k;
    let dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: maxK + 1 },
            () => new Array(2)));
    for (let k = maxK; k >= 0; k--) { 
        dp[0][k][0] = 0;
        dp[0][k][1] = -Infinity;
    }
    for (let i = 1; i <= n; i++) { // 注意这里是从1开始
        dp[i][0][0] = 0;
        dp[i][0][1] = -Infinity;
        for (let k = maxK; k >= 1; k--) {
            // dp[i-1][k][1] + prices[i-1] -> 上一天持有，今天卖出，k刚好使最大次数,+prices[i-1]
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i - 1]);
            // dp[i-1][k-1][0] - prices[i-1] 上一天卖出，今天买入，k-1,-prices[i-1]
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i - 1]);
        }
    }
    return dp[n][maxK][0];
};

const maxProfitInfinity = (prices) => {
    if (!prices.length) return 0;
    let dp_i_0 = 0;
    let dp_i_1 = -Infinity;
    let n = prices.length;
    for (i = 0; i < prices.length; i++) {
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
    }
    return dp_i_0;
}



// 2>买入后卖出才算一次交易：
// dp[0][t][0] 第0天，允许交易次数为t，手上不持有: 0
// dp[0][t][1] 第0天，允许交易次数为t，手上持有: 不可能(0天没有股票，所以无法买入持有) 
// 【如果这里不这样初始化，而是初始化为0，那么我允许交易次数为t的无法去做max,
// max它会取这个0,而不会去取那些负值,而实际上应该取那些负值】
// dp[i][0][0] 第i天，允许交易次数为0，手上不持有：0
// 以上三个初始值都和买入就算一次交易一样，关键是下面那一个不一样了
//---------------------------------------------------------
// dp[i][0][1] 第i天，允许交易次数为0，手上持有：有效的 
// dp[i][0][1] = max(dp[0][i - 1][1], dp[0][i-1][0]-prices[i])
//               max(  前一天就持有   ，    前一天没有，今天买     )
// class Solution {
//     public:
//         int maxProfit(int k, vector<int>& prices) {
//     if (!prices.size()) return 0;
//     if (k >= prices.size() / 2) {
//         int sum = 0;
//         for (int i = 1; i < prices.size(); i++)
//         {
//             int val = prices[i] - prices[i - 1];
//             sum += (val > 0 ? val : 0);
//         }
//         return sum;
//     }
//     vector < vector < vector < int >>> dp(k + 1, vector<vector<int>>(prices.size() + 1, vector<int>(2, 0)));
//     for (int t = 0; t <= k; t++)
//     {
//         dp[0][t][1] = -1000000;
//     }

//     dp[0][1][1] = -prices[0];
//     for (int i = 2; i <= prices.size(); i++)
//     dp[i][0][1] = max(dp[0][i - 1][1], -prices[i - 1]);

//     for (int t = 1; t <= k; t++)
//     {
//         for (int i = 1; i <= prices.size(); i++)
//         {
//             dp[i][t][0] = max(dp[i - 1][t][0], dp[i - 1][t - 1][1] + prices[i - 1]);
//             dp[i][t][1] = max(dp[i - 1][t][1], dp[i - 1][t][0] - prices[i - 1]);

//         }
//     }
//     return dp[k][prices.size()][0];
// }
// };
// 二维数组的解法
// 如果说我们把一次买 / 一次卖都当是一次交易，那么总的交易数字是2 * k，0表示没有交易, 0天代表没有股票
// dp[0][0] = 0 0天么有交易，钱最大是0
// dp[t][0] 当是第0天的时候，t(t >= 1)次交易，第0天没有交易，所以是 - 100000
// 【这里初始化后，下面这里才是正确的，如果不初始化为 - 1000000，初始化为0，t = 1 
// 那么这里相当于不会买入dp[i][t] = max(dp[i - 1][t - 1] - prices[i - 1], dp[i - 1][t]) 】

// class Solution {
//     public:
//         int maxProfit(int k, vector<int>& prices) {
//     if (!prices.size()) return 0;
//     if (k >= prices.size() / 2) {
//         int sum = 0;
//         for (int i = 1; i < prices.size(); i++)
//         {
//             int val = prices[i] - prices[i - 1];
//             sum += (val > 0 ? val : 0);
//         }
//         return sum;
//     }

//     vector < vector < int >> dp(k * 2 + 1, vector<int>(prices.size() + 1, 0));
//     for (int t = 1; t <= 2 * k; t += 2)
//     dp[t][0] = -1000000;

//     for (int t = 1; t <= 2 * k; t++)
//     {
//         for (int i = 1; i <= prices.size(); i++)
//         {
//             if (t % 2 == 1)//买入
//             {
//                 dp[i][t] = max(dp[i - 1][t - 1] - prices[i - 1], dp[i - 1][t]);
//             }
//             else//卖出
//             {
//                 dp[i][t] = max(dp[i - 1][t - 1] + prices[i - 1], dp[i - 1][t]);
//             }
//         }
//     }
//     return dp[k * 2][prices.size()];
// }
// };


//*********************************************************** */

// var maxProfit = function (k, prices) {
//     let n = prices.length;
//     if (k > n / 2) {
//         k = Math.floor(n / 2);  //这样也可以，但其实增加了时间复杂度和内存消耗
//         // return maxProfit_k_infinity(prices); //也可以
//     }
//     let profit = new Array(k);
//     //初始化买入卖出时的利润
//     for (let j = 0; j <= k; j++) {
//         profit[j] = {
//             profit_in: -prices[0],
//             profit_out: 0
//         };
//     }
//     for (let i = 0; i < n; i++) {
//         for (let j = 1; j <= k; j++) {
//             profit[j] = {
//                 profit_out: Math.max(profit[j].profit_out, profit[j].profit_in + prices[i]),
//                 profit_in: Math.max(profit[j].profit_in, profit[j - 1].profit_out - prices[i])
//             }
//         }
//     }
//     return profit[k].profit_out;
// };
