// Given a binary tree, return the inorder traversal of its nodes' values.

// Example:

// Input: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3
// Output: [1,3,2]

// Input: [1,2,6,3,5]
//      1
//     / \
//    2   6
//   / \ 
//  3   5
// Output: [3,5,2,6,1]

// Follow up: Recursive solution is trivial, could you do it iteratively?

// 前序遍历这个逻辑无法直接应用到中序遍历上:

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

// 为什么以上前序遍历的代码，不能和中序遍历通用呢，因为在迭代的过程中，其实我们有两个操作，
// 一个是处理：将元素放进result数组中，一个是访问：遍历节点。
// 前序遍历的顺序是中左右，
// 要先访问的元素是中间节点，要处理的元素也是中间节点，所以才能写出相对简洁的代码，
// 因为要访问的元素和要处理的元素顺序是一致的，都是中间节点。

// 那么再看看中序遍历，中序遍历是左中右，先访问的是二叉树顶部的节点，然后一层一层向下访问，
// 直到到达树左面的最底部，再开始处理节点（也就是在把节点的数值放进result数组中），
// 这就造成了处理顺序和访问顺序不一致。

// 所以要将访问的节点放入栈中，把要处理的节点也放入栈中但是要做标记，
// 标记就是要处理的节点放入栈之后，紧接着放入一个空指针



var inorderTraversal = function (root) {
    if (!root) {
        return []
    }
    let stack = [root], res = []
    while (stack.length) {
        let node = stack.pop()
        if (node) {
            node.right && stack.push(node.right)
            stack.push(node)
            stack.push(null)
            node.left && stack.push(node.left)
        } else {
            res.push(stack.pop().val)
        }
    }
    return res
}


// var inorderTraversal = function (root) {
//     let res = []
//     let recur = function (node) {
//         if (!node) {
//             return
//         }
//         recur(node.left)
//         res.push(node.val)
//         recur(node.right)
//     }
//     recur(root)
//     return res
// };