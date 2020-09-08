// Given two words (beginWord and endWord), and a dictionary's word list, 
// find the length of shortest transformation sequence from beginWord to endWord, 
// such that:
// Only one letter can be changed at a time.
// Each transformed word must exist in the word list. 
// Note that beginWord is not a transformed word.
// Note:
// Return 0 if there is no such transformation sequence.
// All words have the same length.
// All words contain only lowercase alphabetic characters.
// You may assume no duplicates in the word list.
// You may assume beginWord and endWord are non-empty and are not the same.

// Example 1:

// Input:
// beginWord = "hit",
// endWord = "cog",
// wordList = ["hot","dot","dog","lot","log","cog"]

// Output: 5

// Explanation: As one shortest transformation is 
// "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.

// Example 2:

// Input:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]

// Output: 0

// Explanation: The endWord "cog" is not in wordList, 
// therefore no possible transformation.

// 让你将 'hit' 变为 'cog'，发现这两个单词没有一个相同的字母，
// 就尝试先将第一个 'h' 换成 'c'，看看 'cit' 在不在字典中，
// 发现不在，那么把第二个 'i' 换成 'o'，看看 'hot' 在不在，发现在
// 然后保持第二个字母,改变第一和第二个字母, 也就是尝试 'cot' 或者 'hog'，
// 发现都不在，
// 简单粗暴的方法就是遍历所有的情况，
// 我们将起始单词的每一个字母都用26个字母来替换，
// 比如起始单词 'hit' 就要替换为 'ait', 'bit', 'cit', .... 'yit', 'zit'，
// 将每个替换成的单词都在字典中查找一下，如果有的话，那么说明可能是潜在的路径，
// 要保存下来。

// 字典里面的单词只能使用一次.一个单词若使用多次相当于转换成这个单词然后以此单词为起点
// 继续搜索后又回到了这个单词, 这样搜出来的路径一定不是最短路

// dfs要判断路径最短的话要
// 不断和遍历过的结果做对比，然后找到最短路径
// 复杂度就高很多了, bfs的话不需要把非最短的路径也遍历完,
// 有点每种可能性齐头并进, 最短的路径找到的时候马上返回, 
// 较长的路径没机会继续深入的感觉, 
// 而dfs要把较长的路径都走完再比较

// Time Complexity: O(n * 26 ^ l) -> O(n * 26 ^ l / 2), l = len(word), n =| wordList |
// Space Complexity: O(n)
function ladderLength(beginWord, endWord, wordList) {
    let dict = new Set(wordList), step = 1, queue = [beginWord]
    while (queue.length) {
        let len = queue.length
        while (len--) {
            const curWord = queue.shift();
            if (curWord === endWord) return step;
            for (let i = 0; i < curWord.length; i++) {
                for (let j = 0; j < 26; j++) {//例如w=hit,依次分别替换第0位h, 第1位i, 第2位t为26个字母
                    const nextWord = curWord.slice(0, i) + String.fromCharCode('a'.charCodeAt(0) + j) + curWord.slice(i + 1);  // 97 -> 'a'
                    if (dict.has(nextWord)) { // 每次变换一个位置就去看看字典里有没有
                        queue.push(nextWord); // 字典里有变换了一个位置后的词，加入队列中待下一次重复相同步骤
                        dict.delete(nextWord);// 删除已到达过的节点以避免环
                    }
                }
            }
        }
        step++;
    }
    return 0;
}
// 用visited.
// 说明：可以直接在 wordSet (由 wordList 放进集合中得到)里做删除。
// 但更好的做法是新开一个哈希表，遍历过的字符串放进哈希表里。
// 这种做法具有普遍意义。绝大多数在线测评系统和应用场景都不会在意空间开销。

function ladderLength(beginWord, endWord, wordList) {
    let dict = new Set(wordList), step = 1, queue = [beginWord], visited = new Set([beginWord])
    while (queue.length) {
        let len = queue.length
        while (len--) {
            const curWord = queue.shift();
            if (curWord === endWord) return step;
            for (let i = 0; i < curWord.length; i++) {
                for (let j = 0; j < 26; j++) {//例如w=hit,依次分别替换第0位h, 第1位i, 第2位t为26个字母
                    const nextWord = curWord.slice(0, i)
                        + String.fromCharCode('a'.charCodeAt(0) + j)
                        + curWord.slice(i + 1);  // 97 -> 'a'
                    if (dict.has(nextWord) && !visited.has(nextWord)) { // 每次变换一个位置就去看看字典里有没有
                        visited.add(nextWord)
                        queue.push(nextWord); // 字典里有变换了一个位置后的词，加入队列中待下一次重复相同步骤
                    }
                }
            }
        }
        step++;
    }
    return 0;
}

// 时间复杂度：O(M * N) ,M为单词长度，,N为单词列表长度
// 空间复杂度：O(M * N) ,M长度的单词化为邻接单词形式时需要M，N同上
// 用广度优先搜索搜索从beginWord到endWord的最短路径问题
// 思路分析
// 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",

// 从起点"hit"变换到终点"cog"
// 每次变换
// 只能变动其中一个单词
// 且必须在字典中
// 因此每次变换，其实就是走了一步
// 每次变换前后的单词差异只有其中一个字符
// 设唯一不同的字符为*
// "hit" -> "hot" -> "dot" -> "dog" -> "cog"

// hit ----> h*t <-----hot
// dot ----> *ot <-----hot
// dot ----> do* <-----dog
// dog ----> *og <-----cog
// 我们把相差唯一一个字符的两个单词称为邻接单词
// 因此 单词'xyz'的所有邻接单词为
// '*yz'
// 'x*z'
// 'xy*'
// 因为单词的下一个变换单词即是邻接单词
// 例如我们要从'hit'变换到'hot'
// hit的邻接单词形式有
// *it
// h*t
// hi*
// hot的邻接单词形式有
// *ot
// h*t
// ho*
// 我们寻找他们相同的邻接单词形式
// 为h*t
// 反过来
// 符合h*t形式的单词有
// hit
// hot
// 因此在代码中，此处便是寻找下一邻接单词的关键逻辑
// 代码逻辑
// 求出wordList中的所有单词的所有邻接单词形式
// 将具有相同邻接单词形式的单词放在一个集合里
// 形如 hash[邻接单词形式] = [单词1,单词2,...,单词n]
// 当我们在寻找下一个邻接单词是谁时，我们通过求当前单词的邻接单词的形式，
// 去枚举上一步的所有邻接单词形式的集合
// 存在则在邻接单词形式对应的单词集合里，遍历寻找符合的目标单词
// 找到，则返回
// 没找到，当前寻址步数++，继续寻址
// 我们将从起点 beginWord --> endWord 的寻址路线，抽象为队列
// 初始值是起点，入队
// 出队，通过邻接单词形式变换寻址，逻辑如上
// 核心逻辑在第一步
// 解题技巧
// 每个邻接单词形式对应的单词既有可能相同，会出现循环寻址即环的形式
// 例如 h*t -> hot、*ot -> hot
// 因此维护一个访问记录数组，访问比较过的单词，下次不再访问

var ladderLength = function (beginWord, endWord, wordList) {
    if (!endWord || wordList.indexOf(endWord) == -1) {
        return 0;
    }
    // 各个通用状态对应所有单词
    var comboDicts = {};
    var len = beginWord.length;
    for (var i = 0; i < wordList.length; i++) {
        for (var r = 0; r < len; r++) {
            var newWord = wordList[i].substring(0, r) + '*' + wordList[i].substring(r + 1, len);
            (!comboDicts[newWord]) && (comboDicts[newWord] = []);
            comboDicts[newWord].push(wordList[i]);
        }
    }
    var queue = [[beginWord, 1]];
    var visited = { beginWord: true };
    while (queue.length > 0) {
        var currNode = queue.shift();
        var currWord = currNode[0];
        var currLevel = currNode[1];
        for (var i = 0; i < len; i++) {
            var newWord = currWord.substring(0, i) + '*' + currWord.substring(i + 1, len);
            if (newWord in comboDicts) {
                var tmpWords = comboDicts[newWord];
                for (var z = 0; z < tmpWords.length; z++) {
                    if (tmpWords[z] == endWord) return currLevel + 1;
                    if (!visited[tmpWords[z]]) {
                        visited[tmpWords[z]] = true;
                        queue.push([tmpWords[z], currLevel + 1]);
                    }
                }
            }
        }
    }
    return 0;
};

// 双向宽度优先搜索 (Bidirectional BFS) 算法适用于如下的场景：
// 无向图
// 所有边的长度都为 1 或者长度都一样
// 同时给出了起点和终点

// 根据给定字典构造的图可能会很大，而广度优先搜索的搜索空间大小依赖于每层节点的分支数量。
// 假如每个节点的分支数量相同，搜索空间会随着层数的增长指数级的增加。
// 考虑一个简单的二叉树，每一层都是满二叉树的扩展，节点的数量会以 2 为底数呈指数增长。
// 如果使用两个同时进行的广搜可以有效地减少搜索空间。一边从 beginWord 开始，
// 另一边从 endWord 开始。我们每次从两边各扩展一个节点，
// 当发现某一时刻两边都访问了某一顶点时就停止搜索。这就是双向广度优先搜索，
// 它可以可观地减少搜索空间大小，从而降低时间和空间复杂度。

// 算法

// 算法与之前描述的标准广搜方法相类似。

// 唯一的不同是我们从两个节点同时开始搜索，同时搜索的结束条件也有所变化。

// 我们现在有两个访问数组，分别记录从对应的起点是否已经访问了该节点。

// 如果我们发现一个节点被两个搜索同时访问，就结束搜索过程。因为我们找到了双向搜索的交点。
// 过程如同从中间相遇而不是沿着搜索路径一直走。

// 双向搜索的结束条件是找到一个单词被两边搜索都访问过了。

// 最短变换序列的长度就是中间节点在两边的层次之和。因此，我们可以在访问数组中记录节点的层次。

// bi-directional BFS
// let ladderLength = function (beginWord, endWord, wordList) {
//     let wordListSet = new Set(wordList);
//     if (!wordListSet.has(endWord)) {
//         return 0;
//     }
//     let beginSet = new Set();
//     beginSet.add(beginWord);
//     let endSet = new Set();
//     endSet.add(endWord)
//     let level = 1;
//     while (beginSet.size > 0) {
//         let next_beginSet = new Set();
//         for (let key of beginSet) {
//             for (let i = 0; i < key.length; i++) {
//                 for (let j = 0; j < 26; j++) {
//                     let s = String.fromCharCode('a'.charCodeAt(0) + j);// 97 -> 'a'
//                     if (s != key[i]) {
//                         let new_word = key.slice(0, i) + s + key.slice(i + 1);
//                         if (endSet.has(new_word)) {
//                             return level + 1;
//                         }
//                         if (wordListSet.has(new_word)) {
//                             next_beginSet.add(new_word);
//                             wordListSet.delete(new_word);
//                         }
//                     }
//                 }
//             }
//         }
//         beginSet = next_beginSet;
//         level++;
//         if (beginSet.size > endSet.size) {
//             [beginSet, endSet] = [endSet, beginSet]
//         }
//     }
//     return 0;
// }

console.log(ladderLength('hit', 'cog', ["hot", "dot", "dog", "lot", "log", "cog"]));


// function ladderLength(origin, target, dict) {
//     // write your code here
//     if (dict == null) {
//         return 0;
//     }

//     if (origin === target) {
//         return 1;
//     }

//     let hash = new Set();
//     let nodesInLevel = [];
//     // 把目标词加到字典里因为要根据此字典找出在第n层共有几种可行变换
//     dict.push(target);
//     // 第一层只有原单词一个元素
//     nodesInLevel.push(origin);
//     // 每次寻找下一层有什么节点时都会重新遍历字典找出所有和当前单词仅相差一个字母的的单词
//     // 所以这时第n层和第n+1层的节点很可能有重复,所以用哈希表去重(哈希表里没有的才算是有效的下一步)
//     hash.add(origin);

//     let level = 1;

//     // 第n次变换看做第n层 
//     while (nodesInLevel.length !== 0) {
//         level++;
//         // 第n层的所有节点
//         let nodeCountInLevel = nodesInLevel.length;
//         for (let i = 0; i < nodeCountInLevel; i++) {
//             let word = nodesInLevel.shift();
//             // 重新遍历字典找出所有可能的下一步
//             let nextNodes = getNextWord(word, dict)
//             nextNodes.forEach((next) => {
//                 if (next === target) {
//                     return level;
//                 }
//                 // 去重
//                 if (!hash.has(next)) {
//                     nodesInLevel.push(next);
//                     hash.add(next);
//                 }
//             });
//         }
//     }

//     return level;
// }

// function getNextWord(word, dict) {
//     let list = [];
//     // hit
//     // ^ ^
//     // j
//     // a ... z
//     // ^     ^
//     // i
//     for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
//         for (let j = 0; j < word.length; j++) {
//             if (i == word.charAt(j).charCodeAt(0)) {
//                 continue;
//             }
//             let characters = [...word];
//             characters[j] = String.fromCharCode(i);
//             let newWord = characters.join('')

//             if (dict.includes(newWord)) {
//                 list.push(newWord);
//             }
//         }
//     }
//     return list;
// }
// console.log(ladderLength('a', 'c', ["a", "b", "c"]));

