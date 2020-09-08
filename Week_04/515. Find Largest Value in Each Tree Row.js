// Given the root of a binary tree, return an array of the largest value
// in each row of the tree (0-indexed).

// Example 1:
// 	     1
// 	    / \
// 	   3   2
// 	  / \   \ 
// 	 5   3   9
// Input: root = [1,3,2,5,3,null,9]
// Output: [1,3,9]

// Example 2:

// Input: root = [1,2,3]
// Output: [1,3]

// Example 3:

// Input: root = [1]
// Output: [1]

// Example 4:

// Input: root = [1,null,2]
// Output: [1,2]

// Example 5:

// Input: root = []
// Output: []
//  
// Constraints:

// The number of the nodes in the tree will be in the range [1, 104].
// -231 <= Node.val <= 231 - 1

//   Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

// 一行一行的遍历, 在每一行中找到最大值即可
var largestValues = function (root) {
    if (!root) return []
    let queue = [root], res = []
    while (queue.length) {
        let len = queue.length
        let curMax = -Infinity
        while (len--) {
            let node = queue.shift()
            if (node && curMax < node.val) curMax = node.val
            node && node.left && queue.push(node.left)
            node && node.right && queue.push(node.right)
        }
        res.push(curMax)
    }
    return res
};