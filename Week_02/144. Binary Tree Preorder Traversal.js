// Given a binary tree, return the preorder traversal of its nodes' values.

// Example:

// Input: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// Output: [1,2,3]
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
var preorderTraversal = function (root) {
    let res = []
    let recur = function (node) {
        if (!node) {
            return
        }
        res.push(node.val)
        recur(node.left)
        recur(node.right)
    }
    recur(root)
    return res
};

var preorderTraversal = function (root) {
    if (!root) {
        return []
    }
    let stack = [root], res = []
    while (stack.length) {
        let node = stack.pop()
        res.push(node.val)
        node.right && stack.push(node.right)
        node.left && stack.push(node.left)
    }
    return res
}