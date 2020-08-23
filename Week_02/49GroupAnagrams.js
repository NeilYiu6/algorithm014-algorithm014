// 49. 字母异位词分组
// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，
// 但排列不同的字符串。

// 示例:

// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// 说明：

// 所有输入均为小写字母。
// 不考虑答案输出的顺序。

// 分入同一组的字符串的特征：字符以及字符的个数相等，但是顺序不同；
// 这样的特征其实可以做一个映射，思想来源于哈希规则。
// 这里要去除顺序的影响，那么我们就只关心每个字符以及它出现的次数；

// 首先初始化 tempId = [0,0,0,0,0...0]，
// 数字分别代表 a,b,c,d,e...z 出现的次数，以"," 分割。

// 这样的话，"abb" 就映射到了 [1,2,0...0]。

// "cdc" 就映射到了 [0,0,2,1...0]。

// "dcc" 就映射到了 [0,0,2,1...0]。

// 然后用tempId数组转成字符串id
// 然后如果当前str的 groupId 一样，就把值映射到对应的 groupId 里。

// 时间复杂度：O(NK)。
// 执行用时：144 ms, 在所有 JavaScript 提交中击败了48.68%的用户
// 内存消耗：49.8 MB, 在所有 JavaScript 提交中击败了21.68%的用户
var groupAnagrams = function (strs) {
    let aCharCode = 'a'.charCodeAt(),  //97
        hash = {}
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i], tempId = Array(26).fill(0)
        for (let j = 0; j < str.length; j++) { // 计算唯一的id
            tempId[str.charCodeAt(j) - aCharCode]++
        }
        let groupId = tempId.join()
        if (hash[groupId]) hash[groupId].push(str)
        else hash[groupId] = [str]
    }
    return Object.values(hash)
};
// 用Map加速
// 执行用时 :124 ms(176 ms worse), 在所有 JavaScript 提交中击败了90.96%的用户
// 内存消耗 :45.2 MB, 在所有 JavaScript 提交中击败了66.67%的用户
// var groupAnagrams = function (strs) {
//     let aCharCode = 'a'.charCodeAt(),  //97
//         hash = new Map()
//     for (let i = 0; i < strs.length; i++) {
//         let str = strs[i], tempId = Array(26).fill(0)
//         for (let j = 0; j < str.length; j++) { // 计算唯一的id
//             tempId[str.charCodeAt(j) - aCharCode]++
//         }
//         let groupId = tempId.join()
//         if (hash.has(groupId)) {
//             let groupArray = hash.get(groupId)
//             groupArray.push(str)
//             hash.set(groupId, groupArray)
//         } else {
//             hash.set(groupId, [str])
//         }
//     }
//     return [...hash.values()]
// };


// 利用素数性质求解

// 每个字符对应一个 ASCII 值，用 ASCII 值乘以字符出现的次数的和感觉上就能表征一组字符串，
// 但是很容易想到，这里面会有重复的值；
// 一个替代的做法是，把 ASCII 值 替换成为质数，于是这些数值一定不会有公约数，
// 不在一组的数，它们的和一定不相等（也就是放在哈希表里，肯定不会被分在一个桶里）；
// 所有输入均为小写字母，因此只需要做 26 个映射，这种映射可以通过数组实现。

// var groupAnagrams = function (strs) {
//     let res = {}, charList = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103];
//     for (let i = 0; i < strs.length; i++) {
//         const str = strs[i]
//         const hash = str.split('').reduce((sum, s) => {
//             return sum * charList[s.charCodeAt(0) - 97]
//         }, 1)
//         res[hash] ? res[hash].push(str) : res[hash] = [str]
//     }
//     return Object.values(res)
// };

// 执行用时 :140 ms, 在所有 JavaScript 提交中击败了71.51%的用户
// 内存消耗 :47.8 MB, 在所有 JavaScript 提交中击败了33.33%的用户
// var groupAnagrams = function (strs) {
//     let hash = new Map()
//     for (let i = 0; i < strs.length; i++) {
//         let str = strs[i], keyMap = {}, groupId = ''
//         for (let j = 0; j < str.length; j++) {
//             if (!keyMap[str.charCodeAt(j)]) keyMap[str.charCodeAt(j)] = 1
//             else keyMap[str.charCodeAt(j)]++
//         }
//         for (const key in keyMap) {
//             groupId += '' + key + keyMap[key]
//         }
//         if (hash.has(groupId)) {
//             let groupArray = hash.get(groupId)
//             groupArray.push(str)
//             hash.set(groupId, groupArray)
//         } else {
//             hash.set(groupId, [str])
//         }
//     }
//     console.log(hash);
//     return [...hash.values()]
// };





console.log(groupAnagrams(['abc', 'cdc']))
