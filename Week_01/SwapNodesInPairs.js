// Given a linked list, swap every two adjacent nodes and return its head.

// You may not modify the values in the list's nodes, 
// only nodes itself may be changed.

// Example:

// Given 1->2->3->4, you should return the list as 2->1->4->3.
function ListNode(val) {
    this.val = val;
    this.next = null;
}
// 只交换值
// var swapPairs = function (head) {
//     if (!head) return head
//     let fast = head.next, slow = head

//     while (fast) {
//         let temp = fast.val
//         fast.val = slow.val
//         slow.val = temp
//         if (fast.next && fast.next.next) {
//             slow = fast.next
//             fast = fast.next.next
//         } else return head
//     }
//     return head
// };

//递归
// 第1个节点总是要连接第3个节点
// 第2个节点总是要连接第1个节点

// 第3个节点总是要连接第5个节点
// 第4个节点总是要连接第3个节点
// ...

// [1->2->3->4->5]
//  h  n  nn
// [1->2->3->4->5]
//        h  n  nn
//--------------------
// 递归返回
// [1->2->3->5<-4]
//        h  hn n
//           nn

// 4->3->5
// n  nn hn
//    h
//    ^
//    |
// 1->2
//--------------------
// 递归返回
// 4->3->5
// ^  ^
// |  |
//[1  2
// h  n

// 4->3->5
// ^  
// |  
// 1<-2
// h  n
var swapPairs = function (head) {
    if (!head || !head.next) return head;//递归到底了
    let next = head.next;//待会head.next就要被第3个节点覆盖了，先缓存第2个节点
    head.next = swapPairs(next.next);// 第1个节点指向第 3 个节点并把第3个节点当做head递归地把后面的节点交换
    next.next = head;// 第2个节点指向第 1 个节点
    return next; //返回交换后的节点，对于本层递归来说是第1个节点；对于递归上一层来说是第3个节点
};

let data = [1, 2, 3, 4, 5]
let head = new ListNode(data[0])
let p = head
for (let i = 1; i < data.length; i++) {
    const element = data[i];
    p.next = new ListNode(element)
    p = p.next
}

console.log(swapPairs(head))