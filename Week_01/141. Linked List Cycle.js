// Given a linked list, determine if it has a cycle in it.

// To represent a cycle in the given linked list, 
// we use an integer pos which represents the position (0-indexed) 
// in the linked list where tail connects to. If pos is -1, 
// then there is no cycle in the linked list.

//  

// Example 1:

// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where tail connects to the second node.


// Example 2:

// Input: head = [1,2], pos = 0
// Output: true
// Explanation: There is a cycle in the linked list, where tail connects to the first node.

// Example 3:

// Input: head = [1], pos = -1
// Output: false
// Explanation: There is no cycle in the linked list.

// Follow up:

// Can you solve it using O(1) (i.e. constant) memory?

/**
 * Definition for singly-linked list.
 **/
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// var hasCycle = function (head) {
//     if (!head) return false
//     let fast = head.next
//     let slow = head
//     while (fast && slow && fast.val !== slow.val) {
//         fast = fast.next
//         if (!fast) return false
//         fast = fast.next
//         slow = slow.next
//     }
//     return fast && slow && fast.val === slow.val ? slow : false
// };

var hasCycle = (head) => {
    let fastP = head
    let slowP = head
    while (fastP) { // 快指针没有指向null, 这样写有效防止head===null的情况
        if (fastP.next == null) return false // 下一个为null了，没有环
        slowP = slowP.next // 快的前面都有节点，慢的前面当然有
        fastP = fastP.next.next // 推进2个节点
        if (slowP === fastP) return true // 快慢指针相遇，有环
    }
    return false // fastP为null了也始终不相遇
}


let head = new ListNode(1)
head.next = new ListNode(2)
console.log(hasCycle(head));