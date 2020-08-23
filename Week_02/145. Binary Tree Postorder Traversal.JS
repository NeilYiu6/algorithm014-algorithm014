// Given a binary tree, return the postorder traversal of its nodes' values.

// Example:

// Input: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// Output: [3,2,1]

// Input: [1,2,6,3,5]
//      1
//     / \
//    2   6
//   / \ 
//  3   5

// Output: [3,5,2,6,1]

// Follow up: Recursive solution is trivial, could you do it iteratively?

var postorderTraversal = function (root) {
    let res = [];
    let stack = [];
    if (root) stack.push(root);
    while (stack.length) {
        root = stack.pop();
        if (root) {
            stack.push(root);
            stack.push(null);
            root.right && stack.push(root.right);
            root.left && stack.push(root.left);
        } else {
            res.push(stack.pop().val);
        }
    }
    return res;
};
