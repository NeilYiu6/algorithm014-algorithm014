// Given a binary tree, return the level order traversal of its nodes' values. 
// (ie, from left to right, level by level).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its level order traversal as:
// [
//   [3],
//   [9,20],
//   [15,7]
// ]


//  Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// BFS使用队列，把每个还没有搜索到的点依次放入队列，
// 然后再弹出队列的头部元素当做当前遍历点。BFS总共有两个模板：

// 如果不需要确定当前遍历到了哪一层，BFS模板如下。

// while queue 不空：
//     cur = queue.pop()
//     for 节点 in cur的所有相邻节点：
//         if 该节点有效且未访问过：
//             queue.push(该节点)

// 如果要确定当前遍历到了哪一层，BFS模板如下。

// level = 0
// while queue 不空：
//     size = queue.size()
//     while (size --) {
//         cur = queue.pop()
//         for 节点 in cur的所有相邻节点：
//             if 该节点有效且未被访问过：
//                 queue.push(该节点)
//     }
//     level ++;

// 这里增加了level表示当前遍历到二叉树中的哪一层了，
// 也可以理解为在一个图中，现在已经走了多少步了。
// size表示在当前遍历层有多少个元素，也就是队列中的元素数，
// 我们把这些元素一次性遍历完，即把当前层的所有元素都向外走了一步。

// 上面两个是通用模板，在任何题目中都可以用，是要记住的！

// 本题要求二叉树的层次遍历，所以同一层的节点应该放在一起，故使用模板二。

// 使用队列保存每层的所有节点，每次把队列里的原先所有节点进行出队列操作，
// 再把每个元素的非空左右子节点进入队列。因此即可得到每层的遍历。

var levelOrder = function (root) {
    const ret = [], queue = [root];
    if (!root) return ret;
    while (queue.length) {
        let len = queue.length;
        ret.push([]);
        while (len--) {
            const node = queue.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return ret;
};


let root = new TreeNode(3)
root.left = new TreeNode(9)
root.right = new TreeNode(20)
root.right.left = new TreeNode(15)
root.right.right = new TreeNode(7)
console.log(levelOrder(root));