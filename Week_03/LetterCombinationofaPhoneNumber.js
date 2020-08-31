// Letter Combinations of a Phone Number
// Given a digit string excluded '0' and '1', return all possible letter combinations 
// that the number could represent.
// A mapping of digit to letters (just like on the telephone buttons) is given below.
// Example 1:
// Input: "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
// Explanation: 
// '2' could be 'a', 'b' or 'c'
// '3' could be 'd', 'e' or 'f'
// Example 2:
// Input: "5"
// Output: ["j", "k", "l"]
// Notice
// Although the answer above is in lexicographical order, your answer could be 
// in any order you want.


// "23" -> a,b,c ; f,e,d
// af, ae, ad
// bf, be, bd
// cf, ce, cd

//dfs
// 复杂度分析
// 时间复杂度：O(3^m ×4^n )，其中 m 是输入中对应 3 个字母的数字个数（包括数字 2、3、4、5、6、8），
// n 是输入中对应 4 个字母的数字个数（包括数字 7、9），m+nm+n 是输入数字的总个数。
// 当输入包含 m 个对应 3 个字母的数字和 n 个对应 4 个字母的数字时，不同的字母组合一共有 3^m ×4^n  种，
// 需要遍历每一种字母组合。

// 空间复杂度：O(m+n)，其中 m 是输入中对应 3 个字母的数字个数，
// n 是输入中对应 4 个字母的数字个数，m+n 是输入数字的总个数。
// 除了返回值以外，空间复杂度主要取决于哈希表以及回溯过程中的递归调用层数，
// 哈希表的大小与输入无关，可以看成常数，递归调用层数最大为 m+n。

function letterCombinations(digits) {
    if (digits.length <= 0) return [];
    let res = []
    let dict = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
    function dfs(temp) {
        if (temp.length == digits.length) return res.push(temp);
        let str = dict[digits[temp.length]];
        for (let i = 0; i < str.length; ++i) {
            dfs(temp + str[i]);
        }
    }
    dfs('');
    return res;
}


// function letterCombinations(digits) {
//     if (digits.length <= 0) return [];
//     let res = [], temp = ''
//     let dict = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
//     function dfs() {
//         if (temp.length == digits.length) return res.push(temp);
//         let str = dict[digits[temp.length]];
//         for (let i = 0; i < str.length; ++i) {
//             temp += str[i]
//             dfs();
//             temp = temp.slice(0, -1);
//         }
//     }
//     dfs();
//     return res;
// }

// 建立一个字典，用来保存每个数字所代表的字符串，
// 然后我们还需要一个变量 level，记录当前生成的字符串的字符个数，
// 在递归函数中我们首先判断 level，
// 如果跟 digits 中数字的个数相等了，我们将当前的组合加入结果 res 中，
// 然后返回。否则我们通过 digits 中的数字到 dict 中取出字符串，
// 然后遍历这个取出的字符串，将每个字符都加到当前的组合后面，并调用递归函数即可

// 执行用时 :56 ms, 在所有 JavaScript 提交中击败了93.31%的用户
// 内存消耗 :3.8 MB, 在所有 JavaScript 提交中击败了92.86%的用户
// function letterCombinations(digits) {
//     if (digits.length <= 0) return [];
//     let res = [], level = 0, temp = ''
//     let dict = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
//     function dfs() {
//         if (level == digits.length) return res.push(temp);
//         let str = dict[Number(digits[level])];
//         for (let i = 0; i < str.length; ++i) {
//             level++
//             temp += str[i]
//             dfs();
//             level-- // backtrack
//             temp = temp.slice(0, -1);
//         }
//     }
//     dfs();
//     return res;
// }

// function letterCombinations(digits) {
//     if (digits.length <= 0) return [];
//     let res = [];
//     let dict = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
//     function dfs(level, tempRes) {
//         if (level == digits.length) return res.push(tempRes);
//         let str = dict[Number(digits[level])];
//         for (let i = 0; i < str.length; ++i) {
//             dfs(level + 1, tempRes + str[i]);
//         }
//     }
//     dfs(0, "");
//     return res;
// }

// 这道题我们也可以用迭代 Iterative 来解(BFS)，在遍历 digits 中所有的数字时，
// 我们先建立一个临时的字符串数组t，然后跟上面解法的操作一样，
// 通过数字到 dict 中取出字符串 str，然后遍历取出字符串中的所有字符，
// 再遍历当前结果 res 中的每一个字符串，将字符加到后面，
// 并加入到临时字符串数组t中。取出的字符串 str 遍历完成后，将临时字符串数组赋值给结果 res，
// function letterCombinations(digits) {
//     if (digits.length <= 0) return [];
//     let res = [""];
//     let dict = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
//     for (let i = 0; i < digits.length; ++i) {
//         let t = [];
//         let str = dict[Number(digits[i])];
//         for (let j = 0; j < str.length; ++j) {
//             for (let k = 0; k < res.length; k++) {
//                 const s = res[k];
//                 t.push(s + str[j]);
//             }
//         }
//         res = t;
//     }
//     return res;
// }

console.log(letterCombinations('23'))