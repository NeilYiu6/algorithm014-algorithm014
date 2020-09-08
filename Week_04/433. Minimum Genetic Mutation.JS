// A gene string can be represented by an 8-character long string, 
// with choices from "A", "C", "G", "T".

// Suppose we need to investigate about a mutation (mutation from "start" to "end"), 
// where ONE mutation is defined as ONE single character changed in the gene string.

// For example, "AACCGGTT" -> "AACCGGTA" is 1 mutation.

// Also, there is a given gene "bank", which records all the valid gene mutations. 
// A gene must be in the bank to make it a valid gene string.

// Now, given 3 things - start, end, bank, your task is to determine 
// what is the minimum number of mutations needed to mutate from "start" to "end". 
// If there is no such a mutation, return -1.

// Note:

// Starting point is assumed to be valid, so it might not be included in the bank.
// If multiple mutations are needed, all mutations during in the sequence must be valid.
// You may assume start and end string is not the same.
//  

// Example 1:

// start: "AACCGGTT"
// end:   "AACCGGTA"
// bank: ["AACCGGTA"]

// return: 1
//  

// Example 2:

// start: "AACCGGTT"
// end:   "AAACGGTA"
// bank: ["AACCGGTA", "AACCGCTA", "AAACGGTA"]

// return: 2
//  

// Example 3:

// start: "AAAAACCC"
// end:   "AACCCCCC"
// bank: ["AAAACCCC", "AAACCCCC", "AACCCCCC"]

// return: 3

// 这题和单词接龙是一毛一样的, 不同的是26个字母改成了ACGT四个字母

// 执行用时：68 ms, 在所有 JavaScript 提交中击败了83.84%的用户
// 内存消耗：38.7 MB, 在所有 JavaScript 提交中击败了5.66%的用户
var minMutation = function (start, end, bank) {
    if (start == end) return 0;
    var bankSet = new Set(bank), genes = 'ACGT', level = 0,
        queue = [start]
    while (queue.length) {
        var len = queue.length;
        while (len--) {
            var curr = queue.shift();
            if (curr == end) return level;
            for (var i = 0; i < curr.length; i++) {
                for (var r = 0; r < genes.length; r++) {
                    let nextGene = curr.slice(0, i) + genes[r] + curr.slice(i + 1)
                    if (bankSet.has(nextGene)) {
                        bankSet.delete(nextGene);
                        queue.push(nextGene);
                    }
                }
            }
        }
        level++;
    }
    return -1;
};
// 使用visited
var minMutation = function (start, end, bank) {
    if (start == end) return 0;
    var bankSet = new Set(bank), genes = 'ACGT', level = 0,
        queue = [start], visited = new Set([start])
    while (queue.length) {
        var len = queue.length;
        while (len--) {
            var curr = queue.shift();
            if (curr == end) return level;
            for (var i = 0; i < curr.length; i++) {
                for (var r = 0; r < genes.length; r++) {
                    let nextGene = curr.slice(0, i) + genes[r] + curr.slice(i + 1)
                    if (!visited.has(nextGene) && bankSet.has(nextGene)) {
                        visited.add(nextGene);
                        queue.push(nextGene);
                    }
                }
            }
        }
        level++;
    }
    return -1;
};

// var minMutation = function(start, end, bank) {
//     if(start == end){
//         return 0;
//     }
//     var bankSet = new Map();
//     for(var i = 0;i<bank.length;i++){
//         bankSet.set(bank[i],true);
//     }
//     var genes = ['A','C','G','T'];
//     var level = 0;
//     var visited = new Map();
//     visited.set(start,true);
//     var queue = [start];
//     while(queue.length != 0){
//         var size = queue.length;
//         while(size > 0){
//             var curr = queue.pop();
//             if(curr == end){
//                 return level;
//             }
//             var arrCurr = curr.split('');
//             for(var i = 0;i<arrCurr.length;i++){
//                 var oldCurr = arrCurr[i];
//                 for(var r = 0;r<genes.length;r++){
//                     arrCurr[i] = genes[r];
//                     var strCurr = arrCurr.join('');
//                     if(!visited.has(strCurr) && bankSet.has(strCurr)){
//                         visited.set(strCurr,true);
//                         queue.unshift(strCurr);
//                     }
//                 }
//                 arrCurr[i] = oldCurr;
//             }size--;
//         }
//         level++;
//     }
//     return -1;
// };

var minMutation = function (start, end, bank) {
    if (start == end) return 0;
    var bankSet = new Set(bank);
    var genes = ['A', 'C', 'G', 'T'];
    var level = 0;
    var queue = [[start, 0]];
    while (queue.length != 0) {
        var curr = queue.shift();
        level = curr[1]
        if (curr[0] == end) return level;
        var arrCurr = curr[0];
        for (var i = 0; i < arrCurr.length; i++) {
            for (var r = 0; r < genes.length; r++) {
                if (genes[r] != arrCurr[i]) {
                    var strCurr = (arrCurr.slice(0, i)) + genes[r] + (arrCurr.slice(i + 1));
                    if (bankSet.has(strCurr)) {
                        queue.push([strCurr, level + 1]);
                        bankSet.delete(strCurr);
                    }
                }
            }
        }
    }
    return -1;
};


/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
    if (start == end) {
        return 0;
    }
    var bankSet = new Map();
    for (var i = 0; i < bank.length; i++) {
        bankSet.set(bank[i], true);
    }
    var genes = { 'A': ["C", "G", "T"], 'C': ["A", "G", "T"], 'G': ["A", "C", "T"], 'T': ["A", "C", "G"] };
    var level = 0;
    var queue = [start];
    while (queue.length != 0) {
        var size = queue.length;
        while (size > 0) {
            var curr = queue.pop();
            if (curr == end) {
                return level;
            }
            var arrCurr = curr.split('');
            for (var i = 0; i < arrCurr.length; i++) {
                var oldCurr = arrCurr[i];
                var tmpGenes = genes[oldCurr];
                var len = tmpGenes.length;
                for (var r = 0; r < len; r++) {
                    arrCurr[i] = tmpGenes[r];
                    var strCurr = arrCurr.join('');
                    if (bankSet.has(strCurr)) {
                        bankSet.delete(strCurr);
                        queue.unshift(strCurr);
                    }
                }
                arrCurr[i] = oldCurr;
            }
            size--;
        }
        level++;
    }
    return -1;
};
