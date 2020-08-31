// Given two integers n and k, return all possible combinations of 
// k numbers out of 1 ... n.

// You may return the answer in any order.

// Example 1:

// Input: n = 4, k = 2
// Output:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// Example 2:

// Input: n = 1, k = 1
// Output: [[1]]
//  

// Constraints:

// 1 <= n <= 20
// 1 <= k <= n

// 例: [1, 2, 3...n]

var combine = function (n, k) {

    let res = [], tmp = []
    let recur = (start) => {
        if (tmp.length === k) {
            res.push(tmp.slice())
        }
        for (let i = start; i < n; i++) {
            tmp.push(i)
            recur(i + 1)
            tmp.pop()
        }
    }
    recur(1)
    return res
}



// 先选一个数字，然后进入递归继续选，
//满足条件后加到结果中，然后回溯到上一步，继续递归。
// 执行用时：128 ms, 在所有 JavaScript 提交中击败了77.01%的用户
// 内存消耗：42.5 MB, 在所有 JavaScript 提交中击败了97.63%的用户
var combine = function (n, k) {
    var result = [], tmp = [];
    function combineSub(start) {
        if (tmp.length == k) {
            result.push(tmp.slice(0));
            return;
        }
        for (var i = start; i <= n; i++) {
            tmp.push(i);
            combineSub(i + 1);
            tmp.pop();
        }
    }
    combineSub(1);
    return result;
};

// 其中绿色的部分，是不能产生结果的分支，但是我们的代码确实又执行到了这部分。

// 上面的代码中，我们发现：其实如果 tmp 已经选择到 [1,4,5] 或者 [2,4,5] 或者 [3,4,5] ，
// 也就是最底层的最后一个叶子节点
// 后序的代码就没有必要执行，继续走也不能发现新的满足题意的组合。
// 干了类似于下面事情，其实有很多步骤是多余的：选择了 [1,4,5] 以后， 
// 5 弹出 [1,4,5] 成为 [1,4] , 4 弹出 [1,4] 成为 [1] ，然后 5 进来，成为 [1,5]，
// 在进来发现 for 循环都进不了（因为没有可选的元素），然后 5 又弹出，接着 1 弹出。

// 发现多余操作：那么我们如何发现多余的步骤呢，其实也是有规律可寻的，就在 for 循环中：

// for (int i = start; i <= n; i++) {
//     tmp.add(i);
//     generateCombinations(n, k, i + 1, tmp);
//     tmp.remove(tmp.size() - 1);
// }
// 这个函数干的事情，是从 [i, n] 这个区间里（注意，左右都是闭区间），
// 找到 k - tmp.size() 个元素。 i <= n 不是每一次都要走完的， i 有一个上限。

// 寻找规律：我们再看图，可以发现一些边界情况，帮助我们发现规律:

// 当选定了一个元素，即 tmp.size() == 1 的时候，接下来要选择 2 个元素， 
// i 最大的值是 4 ，因为从 5 开始选择，就无解了；
// 当选定了两个元素，即 tmp.size() == 2 的时候，接下来要选择 1 个元素， 
// i 最大的值是 5 ，因为从 6 开始选择，就无解了。

// 再如：如果 n = 6 ，k = 4，
// tmp.size() == 1 的时候，接下来要选择 3 个元素， i 最大的值是 4，最后一个被选的是 [4,5,6]；
// tmp.size() == 2 的时候，接下来要选择 2 个元素， i 最大的值是 5，最后一个被选的是 [5,6]；
// tmp.size() == 3 的时候，接下来要选择 1 个元素， i 最大的值是 6，最后一个被选的是 [6]；

// 再如：如果 n = 15 ，k = 4，
// tmp.size() == 1 的时候，接下来要选择 3 个元素，i 最大的值是 13，最后一个被选的是 [13,14,15]；
// tmp.size() == 2 的时候，接下来要选择 2 个元素， i 最大的值是 14，最后一个被选的是 [14,15]；
// tmp.size() == 3 的时候，接下来要选择 1 个元素， i 最大的值是 15，最后一个被选的是 [15]；

// 多写几遍（发现 max(i) 是我们倒着写出来），我么就可以发现 max(i) 与 
// 接下来要选择的元素貌似有一点关系，很容易知道：
// max(i) + 接下来要选择的元素个数 - 1 = n，其中， 
// 接下来要选择的元素个数 = k - tmp.size()，整理得到：
// max(i) = n - (k - tmp.size()) + 1
// 所以，我们的剪枝过程就是：把 i <= n 改成 i <= n - (k - tmp.size()) + 1 

// 执行用时：120 ms, 在所有 JavaScript 提交中击败了90.54%的用户
// 内存消耗：42.7 MB, 在所有 JavaScript 提交中击败了94.51%的用户
var combine = function (n, k) {
    var result = [];
    var tmp = [];
    function combineSub(start) {
        if (tmp.length == k) {
            result.push(tmp.slice(0));
            return;
        }
        var len = tmp.length;
        for (var i = start; i <= n - (k - len) + 1; i++) {
            tmp.push(i);
            combineSub(i + 1);
            tmp.pop();
        }
    }
    combineSub(1);
    return result;
};