// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia:
// “The lowest common ancestor is defined between two nodes p and q
// as the lowest node in T that has both p and q as descendants
// (where we allow a node to be a descendant of itself).”

// Given the following binary tree:  root = [3,5,1,6,2,0,8,null,null,7,4]

// Example 1:

// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
// Example 2:

// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a
// descendant of itself according to the LCA definition.
//

// Note:

// All of the nodes' values will be unique.
// p and q are different and both values will exist in the binary tree.

// 我们递归遍历整棵二叉树，定义 f_x
//   表示 x 节点的子树中是否包含 p 节点或 q 节点，如果包含为 true，否则为 false。
//   那么符合条件的最近公共祖先 x 一定满足如下条件：

// (f_lson​	&& f_rson​) ∣∣ ((x = p ∣∣ x = q) && (f_lson​ ∣∣ f_rson​))

// 其中 lson 和 rson 分别代表 x 节点的左孩子和右孩子。
// 初看可能会感觉条件判断有点复杂，我们来一条条看，

// 1. f_lson代表当前节点的左子树包含p或q, f_rson代表当前节点的右子树包含p或q, 
// f_lson​ && f_rson 说明当前节点的左子树和右子树把 p 节点和 q 节点都包含进来了，
// 如果左子树包含的是 p 节点，那么右子树只能包含 q 节点，
// 如果左子树包含的是 q 节点，那么右子树只能包含 p 节点，
// 因为 p 节点和 q 节点都是不同且唯一的节点，
// 所以如果满足f_lson​ && f_rson即可说明 x 就是我们要找的最近公共祖先。

// 2.再来看第二条判断条件，这个判断条件即是考虑了 x 恰好是 p 节点或 q 节点
// 且它的左子树或右子树有一个包含了另一个节点的情况，
// 因此如果满足这个判断条件亦可说明 x 就是我们要找的最近公共祖先。

// 你可能会疑惑这样找出来的公共祖先深度是否是最大的。其实是最大的，
// 因为我们是自底向上(后序遍历)从叶子节点开始更新的，
// 所以在所有满足条件的公共祖先中一定是深度最大的祖先先被访问到，且由于 f_x
// 本身的定义很巧妙，在找到最近公共祖先 x 以后，f_x
// 按定义被设置为 true ，即假定了这个子树中只有一个 p 节点或 q 节点，
// 因此其他公共祖先不会再被判断为符合条件。

var lowestCommonAncestor = function (root, p, q) {
	let ans;
	const dfs = (node) => {
		if (!node) return false;
		const isInL = dfs(node.left);
		const isInR = dfs(node.right);
		if ((isInL && isInR) || //当前节点的左子树和右子树把 p 节点和 q 节点都包含进来了
			((node === p || node === q) && (isInL || isInR))) { //node 恰好是 p 节点或 q 节点且它的左子树或右子树有一个包含了另一个节点的情况
			ans = node;
		}
		//node是p或q的时候就会往父节点传true, 然后父节点继续不断往上传true
		return isInL || isInR || node === p || node === q;
	}
	dfs(root);
	return ans;
};


// // 最近公共祖先的定义： 设节点 root 为节点 p, q 的某公共祖先，
// // 若其左子节点 root.left 和右子节点 root.right
// // 都不是 p,q 的公共祖先，则称 root 是 “最近的公共祖先” 。

// // 根据以上定义，若 root 是 p, q 的 最近公共祖先 ，则只可能为以下情况之一：
// // 1. p 和 q 在 root 的子树中，且分列 root 的 异侧（即分别在左、右子树中）；
// // 2. p = root ，且 q 在 root 的左或右子树中；
// // 3. q = root，且 p 在 root 的左或右子树中；

// // 考虑通过递归对二叉树进行后序遍历，当遇到节点 p 或 q 时返回。
// // 从底至顶回溯，当节点 p, q在节点 root 的异侧时，
// // 节点 root 即为最近公共祖先，则向上返回 root 。

// // 执行用时：80 ms, 在所有 JavaScript 提交中击败了83.20%的用户
// // 内存消耗：44.6 MB, 在所有 JavaScript 提交中击败了50.00%的用户
// function lowestCommonAncestor(root, p, q) {
// 	let recur = function (node) {
// 		if (!node || node === p || node === q) {
// 			return node
// 		}
// 		let left = recur(node.left)
// 		let right = recur(node.right)
// 		if (left && right) {//p 和 q 分别在root的左、右子树中
// 			return node
// 		}
// 		return left || right
// 	}
// 	return recur(root)
// }



// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/discuss/418449/Fast-or-JavaScript-or-Simple-or-Recursion
