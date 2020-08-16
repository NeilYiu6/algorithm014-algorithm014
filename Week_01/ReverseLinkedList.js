// Reverse a singly linked list.

// Example:

// Input: 1->2->3->4->5->NULL
// Output: 5->4->3->2->1->NULL
// Follow up:

// A linked list can be reversed either iteratively or recursively. Could you implement both?
// 解法一：迭代
// 时间复杂度：O(n)
// 空间复杂度：O(1)

var reverseList = function (head) {
    let prev = null;
    let curr = head;
    while (curr != null) {
        let tempNext = curr.next;
        curr.next = prev;
        prev = curr;
        curr = tempNext;
    }
    return prev;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}
let head = new ListNode(1)
head.next = new ListNode(2)
head.next = new ListNode(3)
head.next = new ListNode(4)
head.next = new ListNode(5)

console.log(reverseLinkedList(head))