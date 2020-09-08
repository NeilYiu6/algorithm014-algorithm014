// Say you have an array for which the ith element is 
// the price of a given stock on day i.

// Design an algorithm to find the maximum profit. 
// You may complete at most two transactions.

// Note: You may not engage in multiple transactions at the same time 
// (i.e., you must sell the stock before you buy again).

// Example 1:

// Input: [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
//              Then buy on day 7 (price = 1) and sell on day 8 (price = 4), 
//              profit = 4-1 = 3.
// Example 2:

// Input: [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 1, buy on day 2 and sell them later, 
//              as you are
//              engaging multiple transactions at the same time.
//              You must sell before buying again.
// Example 3:

// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

// 开始的想法是求出收益第一高和第二高的两次买卖，然后加起来。
// 对于普通的情况是可以解决的，但是对于下边的情况
// [1, 5, 2, 8, 3, 10]
// 第一天买第二天卖，第三天买第四天卖，第五天买第六天卖，
// 三次收益分别是 4，6，7，最高的两次就是 6 + 7 = 13 了，
// 但这种有高位就卖出的贪心策略是错的
// 但是我们第二天其实可以不卖出，第四天再卖出，那么收益是 8 - 1 = 7，
// 再加上第五天买入第六天卖出的收益就是 7 + 7 = 14了。

// 正确做法: 
// 先把价格固定为1个，2个，3个...n个
// 价格固定后，固定交易次数为n次，n-1次...1次
// 价格和交易次数固定后，记录：
// 只有1个价格时交易次数为n...1时的持有最大利润
// [1, 5, 2, 8, 3, 10]
// dp table:
// [
//  [
//    [0,0],[0,-1],[0,-1] //第1天允许交易次数为0~2时不持有和持有的最大收益
//  ],                    //第1天有允许交易次数时持有的最大收益恒为-prices[0]
//  [
//    [0,0],[4,-1],[4,-1]//第2天允许交易次数为2，1时不持有的最大收益都是第1天允许交易次数为
//  ],// 2，1时持有然后第2天卖掉的收益(5-1)因为比第1天允许交易次数为2，1时不持有的收益(0)大
//  [
//    [0,0],[4,-1],[4,2]//第3天允许交易次数为2时持有的最大收益为第2天允许交易次数为1不持有
//   ],//然后第3天买的收益(4-2)，因为比第2天允许交易次数为2时持有的收益(-1)大
//  [
//    [0,0],[7,-1],[10,2]
//  ],
//  [
//    [0,0],[7,-1],[10,4]
//  ],
//  [
//    [0,0],[9,-1],[14,4]
//  ]
// ]

// ----------------------------------------------------------------------------
// 思考dp[i][k][0/1]时，
// 注意k代表最大允许交易次数，不一定是实际交易次数

// 例如[9,1,10,1], k=2
// 最优解明显是只买一次而不是买两次，
// 但可以证明的是，dp[i-1][k][0]一定大于等于dp[i-1][k-1][0]
// 也就是允许交易k次的利润一定大于等于允许交易k-1次的利润
// 因为允许k次时可以不交易第k次，但允许k-1次时不能交易第k次
// 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 依赖关系：

// 若把买入记作消耗一次交易机会

// 允许购买次数为k时，
// 第i天不持有股票时的最大收益等于

// (注)同样的允许购买次数k时，
// 第i-1天不持股(第i天rest)或第i-1天持股(第i天卖出)
// 两者中的最大收益：

// dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
//               max(   选择 rest  ,           选择 sell      )

// (注解)为什么不依赖于允许购买次数为k-1时第i-1天持股和不持股的最大收益？
// 也就是为什么不 dp[i][k][0] = max(dp[i-1][k-1][0], dp[i-1][k-1][1] + prices[i])？
// 因为求的是max，天数一样的前提下，允许购买次数为k时收益肯定比k-1大
// 也就是dp[i][k][0] 其实等于第i-1天购买次数小于等于k的所有最大收益中的max
// max(dp[i-1][0][0]  , dp[i-1][0][1]   + prices[i],
//     dp[i-1][1][0]  , dp[i-1][1][1]   + prices[i],
//    ... 
//     dp[i-1][k-1][0], dp[i-1][k-1][1] + prices[i], 
//     dp[i-1][k][0],   dp[i-1][k][1]   + prices[i])
// 只是允许购买次数小于k的收益都一定小于等于k的，
// 所以才可以省略掉允许购买次数那些小于k的，化简成
// dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
// ----------------------------------------------------------------------------
// 允许购买次数为k时，
// 第i天持有股票时的最大收益等于

// (注2)同样的允许购买次数k下，第i-1天持股(第i天rest)；
// (注1)或允许购买次数为k-1下，第i-1天不持股(第i天买入)
// 两者中的最大收益：

// dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
//               max(   选择 rest  ,           选择 buy         )

// (注1解)为什么不是允许购买次数为k时第i-1天不持股的收益，也就是
// dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k][0]-prices[i]) ？
// 因为允许购买次数为k时第i-1天不持股的最大收益很可能是买了k次以后的收益
// 这个时候第i天就没有购买次数了，因为被i-1天用完了
// 所以第i-1天要给第i天“留”1次交易机会
// 所以允许购买次数为k时第i天不持股的最大收益不依赖于
// 允许购买次数为k时第i-1天不持股的最大收益

// (注2解)为什么不依赖允许购买次数为k-1时第i-1天持股(第i天rest)的收益？
// 因为允许购买次数小于k的收益都一定小于等于k的，
// 所以才可以省略掉那些允许购买次数小于k的，
// 同上第i天不持股的问题

// ----------------------------------------------------------------------------

// 若把卖出记作消耗一次交易机会
// 第i天若不持有股票
// 第i天的最大收益依赖于
// 同样的卖出次数k时，第i-1天不持股和卖出次数k-1时持股(第i天卖出)
// 两者中的最大收益
// dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k-1][1] + prices[i])
// ----------------------------------------------------------------------------
// 第i天若持有股票
// 第i天的最大收益依赖于
// 同样购买次数k下，第i-1天持股和不持股(第i天买入)
// 两者中的最大收益
// dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k][1] - prices[i])

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 然后要定义 base case。
// dp[i][k][0/1]中的i代表第i+1天最大利润
// 也就是dp[0]代表第1天最大利润
// --------------------------------------------------------------------

// dp[-1][k][0] = 0
// 解释：因为 i 是从 0 开始的，所以 i = -1 意味着还没有开始，这时候的利润当然是 0 。
// 区别于-Infinity的在于cooldown那题i===1也就是第二天的时候和推导dp[0][k][1] 的时候
// 要用到dp[-1][k][0] - prices[0] = -prices[0]
// 代表第一天就买入的利润是-prices[0]
// --------------------------------------------------------------------

// dp[-1][k][1] = -infinity
// 解释：还没开始的时候，无论有多少允许购买次数都是不可能持有股票的
// 把利润设成负无穷表示这种不可能。
// 之所以设成负无穷，是为了下面在max(...,...)里如果有可以推成dp[-1][k][1]的项时，
// 可以舍去。

// --------------------------------------------------------------------
// dp[i][0][1] = -infinity
// 解释：没有允许购买次数时，第i天是不可能持有股票的，用负无穷表示这种不可能。

// dp[i][0][1] = max(dp[i-1][0][1], dp[i-1][-1][0] - prices[i])
// 而dp[i-1][-1][0] - prices[i]代表
// 第i-1天没持有，i天时买入, 而第i天允许购买次数为0，不可以买入
// 所以属于不可能的情况，可以舍去

// 所以 dp[i][0][1] 恒等于 dp[i-1][0][1]， 
// 也就是没有允许购买次数时，第i天持有股票的话只能是第i-1天就持有

// dp[i][0][1] 恒等于 dp[i-1][0][1]代表
// dp[-1][0][1] === dp[0][0][1] ===...=== dp[i][0][1] = -Infinity

// 也可以理解成没有允许购买次数时第i天持有股票，
// 只能是没有允许购买次数时i-1天就持有的，第i天选择rest，
// 没有允许购买次数时第i-1天持有股票，
// 只能是没有允许购买次数时i-2天就持有的，第i-1天选择rest，
// ...
// 这样的话第1天当天没有允许购买次数时，只能第0天就持有股票，第1天选择rest，
// 而第0天还没开始，是不可能持有股票的，

// 所以第i天不可能既没有允许购买次数，又持有股票
// ########################################################################
// 注意若把卖出当做一次交易，这个base case不一样
// dp[i][0][1] 
// = Math.max(dp[i - 1][0][1], dp[i - 1][0][0] - prices[i]);
// = Math.max(dp[i - 1][0][1], -prices[i]);
// 无法化简为-Infinity
// 因为-prices[i]不一定比dp[i - 1][0][1]大
// 例如[2,1,4,5,2,9,7]
// -prices[1]===-1比dp[0][0][1]===-2大
// -prices[2]===-4比dp[1][0][1]===-1小
// ########################################################################
// --------------------------------------------------------------------

// dp[i][0][0] = 0
// 解释：剩余购买次数为0，又不持有股票，利润当然是 0 。

// 由于定义上是买入股票的时候才消耗1次购买次数，所以k=0时还是可以卖出的
// 所以dp[i][0][0] = max(dp[i-1][0][0], dp[i-1][0][1] + prices[i])

// 又因为dp[i-1][0][1] === dp[i][0][1] === -Infinity
// 所以dp[i-1][0][1] + prices[i] = -Infinity, 一定比dp[i-1][0][0]小，
// 也可以理解为没有允许购买次数时第i-1天不可能持有股票，所以就不可能sell

// 所以dp[i][0][0] 恒等于 dp[i-1][0][0] 
// 所以dp[i][0][0] === dp[i-1][0][0] === dp[-1][0][0] === 0

// 也可以理解为第i天既没有允许购买次数，也不持有股票，利润恒为0

// -----------------------------------------------------------------------
// dp[0][k][0] 
// = max(dp[-1][k][0], dp[-1][k][1] + prices[i])
// = max(0, -infinity + prices[i]) = 0
// 第一天不持有股票的最大利润恒为0

// dp[0][k][1]
// = max(dp[-1][k][1], dp[-1][k][0] - prices[0])
// = max(-infinity, 0 - prices[0]) 
// = -prices[0]
// 第1天持有股票的最大利润恒为当天股价之负数
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 把上面的状态转移方程总结一下：
// base case：
// dp[0][k][0] = dp[i][0][0] = 0
// dp[0][k][1] = dp[i][0][1] = -infinity

// 状态转移方程：
// dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
// dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
// ----------------------------------------------------------------------------

// 根据递推公式，允许购买次数为k时第i天的最大利润和
// 允许购买次数为k-1时第i-1天的利润有关
// 所以要写出for i嵌套for k的循环从1递推上去
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Input: [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
//              Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

var maxProfit = function (prices) {
    let n = prices.length;
    if (n == 0) return 0;
    let maxTime = 2;
    let dp = Array.from({ length: n },
        () => Array.from({ length: maxTime + 1 },
            () => [0, 0]));
    // maxTime + 1的原因是若只有maxTime，
    // 最里面的循环k只能从0到maxTime-1，而k===0时要对
    // dp[i - 1][k - 1][0] - prices[i]作特殊处理，不简洁
    // 每个元素都初始化为[0, 0]的原因是k===1时dp[i - 1][k - 1][0] - prices[i]要访问dp[i-1][0][0]
    // 也就是base case dp[i][0][0]=0
    for (let i = 0; i < n; i++) {
        for (let k = maxTime; k >= 1; k--) {
            if (i == 0) {
                // dp[i][k][0] = 0;// 第i天既无法buy，也不持有股票，利润恒为0。由于上面有fill(0)了所以这句可以不要 
                dp[i][k][1] = -prices[i];
            } else {
                dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
                dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
            }
        }
    }
    return dp[n - 1][maxTime][0];
};
console.log(maxProfit([1, 5, 2, 8, 3, 10]))
// var maxProfit = function (prices) {
//     let n = prices.length;
//     if (n == 0) {
//         return 0;
//     }
//     let dp_i_1_0 = 0;
//     let dp_i_1_1 = -prices[0];
//     let dp_i_2_0 = 0;
//     let dp_i_2_1 = -prices[0];
//     for (let i = 0; i < n; i++) {
//         dp_i_1_0 = Math.max(dp_i_1_0, dp_i_1_1 + prices[i]);
//         dp_i_1_1 = Math.max(dp_i_1_1, - prices[i]);
//         dp_i_2_0 = Math.max(dp_i_2_0, dp_i_2_1 + prices[i]);
//         dp_i_2_1 = Math.max(dp_i_2_1, dp_i_1_0 - prices[i]);
//     }
//     return dp_i_2_0;
// };
// K正序
// 把dp[0][k][0/1]dp[-1][k][0/1]：
// var maxProfit = function (prices) {
//     if (!prices.length) return 0;
//     let maxK = 2;
//     let n = prices.length;
//     let dp = Array.from({ length: n + 1 }, () => Array.from({ length: maxK + 1 },
//         () => new Array(2)));
//     for (let k = 0; k <= maxK; k--) { // 注意这种初始化方式
//         dp[0][k][0] = 0;
//         dp[0][k][1] = -Infinity;
//     }

//     for (let i = 1; i <= n; i++) { // 注意这里是从1开始
//         dp[i][0][0] = 0;//可以理解为第i天既无法buy，也不持有股票，利润恒为0
//         dp[i][0][1] = -Infinity;

//         for (let k = 1; k <= maxK; k++) {
//             dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i - 1]);
//             dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i - 1]);
//         }
//     }
//     return dp[n][maxK][0];
// };

// console.log(maxProfit())
// ***************************************************************************************
// 我们不用递归思想进行穷举，而是利用「状态」进行穷举。我们具体到每一天，看看总共有几种可能的「状态」，
// 再找出每个「状态」对应的「选择」。我们要穷举所有「状态」，穷举的目的是根据对应的「选择」更新状态。
// 听起来抽象，你只要记住「状态」和「选择」两个词就行，下面实操一下就很容易明白了。

// for 状态1 in 状态1的所有取值：
//     for 状态2 in 状态2的所有取值：
//         for ...
//             dp[状态1][状态2][...] = 择优(选择1，选择2...)

// 比如说这个问题，每天都有三种「选择」：买入、卖出、无操作，我们用 buy, sell, rest 表示这三种选择。
// 但问题是，并不是每天都可以任意选择这三种选择的，因为 sell 必须在 buy 之后，buy 必须在 sell 之后。
// 那么 rest 操作还应该分两种状态，一种是 buy 之后的 rest（持有了股票），
// 一种是 sell 之后的 rest（没有持有股票）。而且别忘了，我们还有交易次数 k 的限制，

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// k代表最大允许交易次数，不一定是实际交易次数
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 就是说你 buy 还只能在 k > 0 的前提下操作。
// 我们现在的目的只是穷举，你有再多的状态，
// 老夫要做的就是一把梭全部列举出来。这个问题的「状态」有三个，第一个是天数，
// 第二个是允许交易的最大次数，第三个是当前的持有状态（即之前说的 rest 的状态，
// 我们不妨用 1 表示持有，0 表示没有持有）。然后我们用一个三维数组就可以装下这几种状态的全部组合：
// dp[i][k][0 or 1]
// 0 <= i <= n-1, 1 <= k <= K
// n 为天数，大 K 为最多交易数
// 此问题共 n × K × 2 种状态，全部穷举就能搞定。

// for 0 <= i < n:
//     for 1 <= k <= K:
//         for s in {0, 1}:
//             dp[i][k][s] = max(buy, sell, rest)
// 而且我们可以用自然语言描述出每一个状态的含义，比如说 dp[3][2][1] 的含义就是：
// 今天是第三天，我现在手上持有着股票，至今最多进行 2 次交易。再比如 dp[2][3][0] 的含义：
// 今天是第二天，我现在手上没有持有股票，至今最多进行 3 次交易。
// 我们想求的最终答案是 dp[n - 1][K][0]，即最后一天，最多允许 K 次交易，最多获得多少利润。
// 读者可能问为什么不是 dp[n - 1][K][1]？因为 [1] 代表手上还持有股票，[0] 表示手上的股票已经卖出去了，
// 很显然后者得到的利润一定大于前者。
// 记住如何解释「状态」，一旦你觉得哪里不好理解，把它翻译成自然语言就容易理解了。

// 现在，我们完成了「状态」的穷举，我们开始思考每种「状态」有哪些「选择」，应该如何更新「状态」。

//*********************************************************** */

// k = 2 和前面题目的情况稍微不同，因为上面的情况都和 k 的关系不太大。
// 这道题 k = 2 和后面要讲的 k 是任意正整数的情况中，对 k 的处理就凸显出来了。
// 原始的动态转移方程，没有可化简的地方
// dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
// dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
// 按照之前的代码，我们可能想当然这样写代码（错误的）：

// int k = 2;
// int[][][] dp = new int[n][k + 1][2];
// for (int i = 0; i < n; i++)
//     if (i - 1 == -1) { /* 处理一下 base case*/ }
//     dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
//     dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
// }
// return dp[n - 1][k][0];

// 为什么错误？我这不是照着状态转移方程写的吗？
// 还记得前面总结的「穷举框架」吗？就是说我们必须穷举所有状态。其实我们之前的解法，
// 都在穷举所有状态，只是之前的题目中 k 都被化简掉了。比如说第一题，k = 1：

// 这道题由于没有消掉 k 的影响，所以必须要对 k 进行穷举：
// int max_k = 2;
// int[][][] dp = new int[n][max_k + 1][2];
// for (int i = 0; i < n; i++) {
//     for (int k = max_k; k >= 1; k--) {
//         if (i - 1 == -1) { /*处理 base case */ }
//         dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
//         dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
//     }
// }
// // 穷举了 n × max_k × 2 个状态，正确。
// return dp[n - 1][max_k][0];
// 这里 k 取值范围比较小，所以可以不用 for 循环，直接把 k = 1 和 2 的情况全部列举出来也可以：
// dp[i][2][0] = max(dp[i-1][2][0], dp[i-1][2][1] + prices[i])
// dp[i][2][1] = max(dp[i-1][2][1], dp[i-1][1][0] - prices[i])
// dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
// dp[i][1][1] = max(dp[i-1][1][1], -prices[i])

// int maxProfit_k_2(int[] prices) {
//     int dp_i10 = 0, dp_i11 = Integer.MIN_VALUE;
//     int dp_i20 = 0, dp_i21 = Integer.MIN_VALUE;
//     for (int price : prices) {
//         dp_i20 = Math.max(dp_i20, dp_i21 + price);
//         dp_i21 = Math.max(dp_i21, dp_i10 - price);
//         dp_i10 = Math.max(dp_i10, dp_i11 + price);
//         dp_i11 = Math.max(dp_i11, -price);
//     }
//     return dp_i20;
// }



// So I'm assuming you were coding for the case when k = 2. 
// It's NOT that "the other definition did not work", 
// but rather you need to pay attention to the base cases as they are different now. 
// I will explain in details below.

// As I mentioned in the post, for this case we have four variables: 
// T[i][1][0], T[i][1][1], T[i][2][0] and T[i][2][1] 
// (they have the same meaning as defined in my post). 
// Now if we use the other interpretation of the "no multiple transaction constraint" 
// where selling a stock takes one transaction while buying does not, 
// the recurrence relations are:

// T[i][1][0] = max(T[i-1][1][0], T[i-1][0][1] + prices[i])
// T[i][1][1] = max(T[i-1][1][1], T[i-1][1][0] - prices[i])
// T[i][2][0] = max(T[i-1][2][0], T[i-1][1][1] + prices[i])
// T[i][2][1] = max(T[i-1][2][1], T[i-1][2][0] - prices[i])

// However, one of the base cases now is different (the last one):

// T[-1][k][0] = 0
// T[-1][k][1] = -Infinity
// T[i][0][0] = 0
// T[i][0][1] = max(T[i-1][0][1], T[i-1][0][0] - prices[i])

// The first two terms have the same explanation as before: no stock no profit, 
// and it is impossible for us to hold 1 stock if no stock is available.

// The third term T[i][0][0] = 0 is understood as follows: if k = 0, 
// we have no way to sell any stock since selling will take one transaction
//  (per our interpretation above). 
//  Therefore the profit won't change with i (since no transaction is performed) 
//  and if we trace all the way back to the beginning of the very first day (i = -1), 
//  we know the profit is 0.

// The last term T[i][0][1] = max(T[i-1][0][1], T[i-1][0][0] - prices[i]) is, 
// however, different from our original base case and is understood as follows: 
// even if now k = 0, we can still buy stocks since buying a stock does not 
// take any transaction (again per our interpretation above). 
// Therefore despite k = 0, we still need to choose the maximum profits from the two actions 
// -- rest and buy, corresponding to the two entries in the max function.

// sell takes 1 trans

// var maxProfit = function (prices) {
//     if (!prices.length) return 0;
//     let maxK = 2;
//     let n = prices.length;
//     let dp = Array.from({ length: n }, () => Array.from({ length: maxK + 1 },
//         () => new Array(2).fill(0)));
//     for (let i = 0; i < n; i++) {
//         // dp[i][0][0] = 0;//第i天既无法buy，也不持有股票，利润恒为0。由于上面有fill(0)了所以这句可以不要 
//         if (i > 0) {
//             dp[i][0][1] = Math.max(dp[i - 1][0][1], dp[i - 1][0][0] - prices[i]);
//         } else {
//             dp[i][0][1] = -prices[i];
//         }
//         for (let k = maxK; k >= 1; k--) {
//             if (i == 0) {
//                 // dp[i][k][0] = 0;// 第i天既无法buy，也不持有股票，利润恒为0。由于上面有fill(0)了所以这句可以不要 
//                 dp[i][k][1] = -prices[i]
//             } else {
//                 // dp[i-1][k-1][1] + prices[i-1] -> 上一天持有，今天卖出，今天消耗一次交易机会
//                 dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k - 1][1] + prices[i]);
//                 // dp[i-1][k][0] - prices[i-1] 昨天卖出，今天买入，今天不消耗交易机会
//                 dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k][0] - prices[i]);
//             }
//         }
//     }
//     return dp[n - 1][maxK][0];
// };
// console.log(maxProfit([2,1,4,5,2,9,7]))

// 把dp[0][k][0/1]dp[-1][k][0/1]：
// var maxProfit = function (prices) {
//     if (!prices.length) return 0;
//     let maxK = 2;
//     let n = prices.length;
//     let dp = Array.from({ length: n + 1 },
//         () => Array.from({ length: maxK + 1 },
//             () => new Array(2)));
//     for (let k = maxK; k >= 0; k--) { // 注意这种初始化方式
//         dp[0][k][0] = 0;
//         dp[0][k][1] = -Infinity;
//     }
//     for (let i = 1; i <= n; i++) { // 注意这里是从1开始
//         dp[i][0][0] = 0;//第i天既无法buy，也不持有股票，利润恒为0
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
// Now you might be wondering why the two interpretations have different base cases.
// Here is an explanation.

// If we take the interpretation such that buying a stock takes 
// one transaction while selling does not, following the same logic as above, 
// the base cases should really be:

// T[-1][k][0] = 0
// T[-1][k][1] = -Infinity
// T[i][0][1] = -Infinity
// T[i][0][0] = max(T[i-1][0][0], T[i-1][0][1] + prices[i])

// The first two terms again have the same meaning as before.

// For the third term, no transaction is possible now since k = 0 
// and buying will take one transaction, so the profit won't change with i. 
// If again we trace all the way back to the beginning of the first day (i = -1), 
// the profit is found to be -Infinity.

// For the last term, however, selling is still possible even if k = 0 since selling 
// does not take any transactions. Therefore we still need to choose the 
// maximum profits from the two actions -- rest and sell.

// Then why can we set T[i][0][0] = 0 instead of using the last equation above? 
// The reason is due to the fact that if T[i][0][1] = -Infinity, 
// then T[i-1][0][1] + prices[i] will always be less than T[i-1][0][0], 
// thus the max function will always be evaluated to T[i-1][0][0], 
// that is, we always have T[i][0][0] = T[i-1][0][0]. 
// And if we trace all the way back to the beginning (i = -1), 
// this value is found to be 0, therefore we can set T[i][0][0] = 0. 
// However, this result does not hold for the other interpretation, 
// which is why we are forced to use the recurrence equation instead.

// Lastly, for comparison, here is the solution using explicitly the recurrence equation 
// for T[i][0][0] in the base cases, instead of setting it directly to 0:

// public int maxProfit(int[] prices) {
//     int[][][] T = new int[prices.length + 1][3][2];

//     T[0][0][1] = T[0][1][1] = T[0][2][1] = Integer.MIN_VALUE;

//     for (int i = 1; i <= prices.length; i++) {
//         T[i][0][1] = Integer.MIN_VALUE;
//         T[i][0][0] = Math.max(T[i - 1][0][0], T[i - 1][0][1] + prices[i - 1]); // use recurrence equation instead of setting it directly to 0
//         T[i][1][1] = Math.max(T[i - 1][1][1], T[i - 1][0][0] - prices[i - 1]);
//         T[i][1][0] = Math.max(T[i - 1][1][0], T[i - 1][1][1] + prices[i - 1]);
//         T[i][2][1] = Math.max(T[i - 1][2][1], T[i - 1][1][0] - prices[i - 1]);
//         T[i][2][0] = Math.max(T[i - 1][2][0], T[i - 1][2][1] + prices[i - 1]);
//     }

//     return Math.max(T[prices.length][2][0], T[prices.length][2][1]);
// }

// var maxProfit = function (prices) {
//     let n = prices.length;
//     if (n == 0) {
//         return 0;
//     }
//     let dp_i_1_0 = 0;
//     let dp_i_1_1 = -Infinity;
//     let dp_i_2_0 = 0;
//     let dp_i_2_1 = -Infinity;
//     for (let i = 0; i < n; i++) {
//         dp_i_1_0 = Math.max(dp_i_1_0, dp_i_1_1 + prices[i]);
//         dp_i_1_1 = Math.max(dp_i_1_1, 0 - prices[i]);
//         dp_i_2_0 = Math.max(dp_i_2_0, dp_i_2_1 + prices[i]);
//         dp_i_2_1 = Math.max(dp_i_2_1, dp_i_1_0 - prices[i]);
//     }
//     return dp_i_2_0;
// };
