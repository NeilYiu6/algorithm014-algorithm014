// Given a linked list, return the node where the cycle begins. 
// If there is no cycle, return null.

// To represent a cycle in the given linked list, 
// we use an integer pos which represents the position (0-indexed) 
// in the linked list where tail connects to. If pos is -1, 
// then there is no cycle in the linked list.

// Note: Do not modify the linked list.

//  

// Example 1:

// Input: head = [3,2,0,-4], pos = 1
// Output: tail connects to node index 1
// Explanation: There is a cycle in the linked list, 
// where tail connects to the second node.


// Example 2:

// Input: head = [1,2], pos = 0
// Output: tail connects to node index 0
// Explanation: There is a cycle in the linked list, 
// where tail connects to the first node.


// Example 3:

// Input: head = [1], pos = -1
// Output: no cycle
// Explanation: There is no cycle in the linked list.
//  

// Follow-up:
// Can you solve it without using extra space?

// 这类链表题目一般都是使用双指针法解决的，例如寻找距离尾部第K个节点、寻找环入口、寻找公共尾部入口等。

// 算法流程：

// 1. 双指针第一次相遇： 设两指针 fast，slow 指向链表头部 head，fast 每轮走 2 步，slow 每轮走 1 步；

// 1.1. 第一种结果： fast 指针走过链表末端，说明链表无环，直接返回 null；
// TIPS: 若有环，两指针一定会相遇。因为每走 1 轮，fast 与 slow 的间距 +1，fast 终会追上 slow；

// 1.2. 第二种结果： 当fast == slow时， 两指针在环中 第一次相遇 。
// 下面分析此时fast 与 slow走过的 步数关系 ：
// 设链表共有 a+b 个节点，其中 链表头部到链表入口 有 a 个节点（不计链表入口节点）， 
// 链表环 有 b 个节点（这里需要注意，a 和 b 是未知数，例如图解上链表 a=4 , b=5）；
// 设两指针分别走了 f，s 步，则有：
// 1.2.1. fast 走的步数是slow步数的 2 倍，即 f = 2s；（解析： fast 每轮走 2 步）
// 1.2.2. fast 比 slow多走了 n 个环的长度，即 f = s + nb；（ 解析： 双指针都走过 a 步，
// 然后在环内绕圈直到重合，重合时 fast 比 slow 多走 环的长度整数倍 ）；
// 以上两式相减得：f = 2nb，s = nb，即fast和slow 指针分别走了 2n，
// n 个 环的周长 （注意： n 是未知数，不同链表的情况不同）。

// 2. 第一次相遇后情况分析：

// 如果让指针从链表头部一直向前走并统计步数k，那么所有 走到链表入口节点时的步数是：k=a+nb
// （先走 a 步到入口节点，之后每绕 1 圈环（ b 步）都会再次到入口节点）。
// 而目前，slow 指针走过的步数为 nb 步。因此，我们只要想办法让 slow 再走 a 步停下来，就可以到环的入口。
// 但是我们不知道 a 的值，该怎么办？依然是使用双指针法。我们构建一个指针，此指针需要有以下性质：
// 此指针和slow 一起向前走 a 步后，两者在入口节点重合。那么从哪里走到入口节点需要 a 步？答案是链表头部head。

// 3. 双指针第二次相遇：
// slow指针 位置不变 ，将fast指针重新 指向链表头部节点 ；slow和fast同时每轮向前走 1 步；
// TIPS：此时 f = 0，s = nb ；
// 当 fast 指针走到f = a 步时，slow 指针走到步s = a+nb，此时 两指针重合，并同时指向链表环入口 。

// 4. 返回slow指针指向的节点。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var detectCycle = function (head) {
    if (!head || !head.next) return null;
    let fast = head;
    let slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) break;//找到环
    }
    if (fast != slow) return null;//无环
    fast = head;
    while (slow != fast) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
};


// 复杂度分析：
// 时间复杂度 O(N) ：第二次相遇中，慢指针须走步数 a < a + b；第一次相遇中，
// 慢指针须走步数 a + b - x < a + b，其中 x 为双指针重合点与环入口距离；因此总体为线性复杂度；
// 空间复杂度 O(1) ：双指针使用常数大小的额外空间。
// var detectCycle = function (head) {
//     let slowP = head, fastP = head // 都从头节点出发
//     while (fastP) {                // head就是null了，没有入环点，直接返回null
//         if (fastP.next == null) return null // fastP.next为null也说明无环
//         slowP = slowP.next           // 慢指针走一步
//         fastP = fastP.next.next      // 快指针走两步
//         if (slowP == fastP) {        // 首次相遇,说明有环
//             fastP = head               // 让快指针回到头节点
//             while (true) {             // 开启循环，让快慢指针相遇
//                 if (slowP == fastP) {    // 第二次相遇，地点发生在入环处
//                     return slowP           // 返回出指针的位置
//                 }
//                 fastP = fastP.next       // 快慢指针都走一步
//                 slowP = slowP.next
//             }
//         }
//     }
//     return null
// };
