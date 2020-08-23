// Given a binary tree, return the preorder traversal of its nodes' values.

// Example:

// Input: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// Output: [1,2,3]

// Input: [1,2,6,3,5]
//      1
//     / \
//    2   6
//   / \ 
//  3   5

// Output: [3,5,2,6,1]

// Follow up: Recursive solution is trivial, could you do it iteratively?
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// var preorderTraversal = function (root) {
//     let res = []
//     let recur = function (node) {
//         if (!node) {
//             return
//         }
//         res.push(node.val)
//         recur(node.left)
//         recur(node.right)
//     }
//     recur(root)
//     return res
// };

// iterative
// 风格和中序不统一
// var preorderTraversal = function (root) {
//     if (!root) {
//         return []
//     }
//     let stack = [root], res = []
//     while (stack.length) {
//         let node = stack.pop()
//         res.push(node.val)
//         node.right && stack.push(node.right)
//         node.left && stack.push(node.left)
//     }
//     return res
// }

var preorderTraversal = function (root) {
    if (!root) {
        return []
    }
    let stack = [root], res = []
    while (stack.length) {
        let node = stack.pop()
        if (node) {
            node.right && stack.push(node.right)
            node.left && stack.push(node.left)
            stack.push(node)
            stack.push(null)
        } else {
            res.push(stack.pop().val)
        }
    }
    return res
}