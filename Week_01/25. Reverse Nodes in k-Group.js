// Given a linked list, reverse the nodes of a linked list 
// k at a time and return its modified list.

// k is a positive integer and is less than or equal 
// to the length of the linked list.
//  If the number of nodes is not a multiple of k then left-out 
// nodes in the end should remain as it is.

// Example:

// Given this linked list: 1->2->3->4->5

// For k = 2, you should return: 2->1->4->3->5

// For k = 3, you should return: 3->2->1->4->5

// Note:

// Only constant extra memory is allowed.
// You may not alter the values in the list's nodes, 
// only nodes itself may be changed.

//   Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}
// 递归会先到底再翻转
// 以K个节点为一组，从最后一组开始翻转，
// 一组翻转完成后，返回这组的第一个节点给上一组

// 本组翻转前，要翻转的节点中的第一个(head)总是要把next指向下一组的第一个结点
// 因为翻转前的head翻转后一定会变成最后一个

//  [1->2->3->4->5]  3
//   h        p
// 递归返回p, 也就是这组的第一个节点
//--------------------------
//    ------->
//  [1  2->3->4->5]  3
//   h  n     p 

//    ------->
//  [1  2->3->4->5]  2
//   p h/n  
//--------------------------
//    ------->
//  [1<-2  3->4->5]  2
//   p  h  n     

//    ------->
//  [1<-2  3->4->5]  1
//      p h/n   
//--------------------------
//    ------->
//  [1<-2<-3  4->5]  1
//      p  h  n   

//    ------->
//  [1<-2<-3  4->5]  0
//         p h/n   
// 递归返回p, 也就是这组的第一个节点
//--------------------------

// 执行用时：84 ms, 在所有 JavaScript 提交中击败了94.21%的用户
// 内存消耗：41.3 MB, 在所有 JavaScript 提交中击败了41.52%的用户
var reverseKGroup = function (head, k) {
    //prev指向要交换的最后一个节点(即从1开始数第k个节点)的后一个节点(第k+1个节点)
    //或上一个节点
    let len = 0, prev = head
    //首先判断当前链表长度还有没有 k 那么长，顺便得到了剩余链表的 head，放在prev里
    while (len < k) {
        if (prev === null) return head//若没有k那么长，返回剩余链表的 head
        prev = prev.next
        len++
    }
    prev = reverseKGroup(prev, k)//下一层递归不够k个的时候直接返回了最后一个要翻转的元素的下一个元素给prev
    while (k > 0) {// 来到这里说明够k个节点，开始反转链表
        let next = head.next//待会下一个节点就要被第k+1个或上一个节点节点覆盖了，先缓存下一个节点
        //如[1, 2, 3, 4, 5]
        //   h  n     p
        // 第1个节点的next指向第k+1个节点或
        // 第2个以后的节点的next指向上一个节点
        head.next = prev
        // head/prev后移
        prev = head//把当前head节点当做上一个节点，准备覆盖下一个节点的next指针
        head = next//把下一个节点当做head把后面的节点反转
        k--
    }
    // [3->2->1->4->5]
    return prev
}


let data = [1, 2, 3, 4, 5]
let head = new ListNode(data[0])
let p = head
for (let i = 1; i < data.length; i++) {
    const element = data[i];
    p.next = new ListNode(element)
    p = p.next
}
console.log(reverseKGroup(head, 3))

// 另一种写法
// var reverseKGroup = function (head, k) {
//     //prev始终指向要交换的最后一个节点(即从1开始数第k个节点)的后一个节点(第k+1个节点)
//     let prev = head, count = 0;
//     while (prev != null && count != k) {
//         prev = prev.next;
//         count++;
//     }
//     if (count == k) {// 足够k个节点，去反转
//         // 递归链接后续k个反转的链表头节点
//         prev = reverseKGroup(prev, k);//下一层递归不够k个的时候直接返回了最后一个要翻转的元素的下一个元素给prev
//         //如[1, 2, 3, 4, 5]
//         //   h        t
//         while (count != 0) {
//             count--;
//             // 反转链表
//             let next = head.next;//待会head.next就要被第3个节点覆盖了，先缓存第2个节点
//             head.next = prev;// 第1个节点指向第 3 个节点并把第3个节点当做head把后面的节点交换
//             prev = head;
//             head = next;
//         }
//         head = prev;
//     }
//     return head;
// };