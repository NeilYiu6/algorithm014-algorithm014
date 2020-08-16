// Design your implementation of the circular double-ended queue (deque).

// Your implementation should support following operations:

// MyCircularDeque(k): Constructor, set the size of the deque to be k.
// insertFront(): Adds an item at the front of Deque. 
// Return true if the operation is successful.
// insertLast(): Adds an item at the rear of Deque. 
// Return true if the operation is successful.
// deleteFront(): Deletes an item from the front of Deque. 
// Return true if the operation is successful.
// deleteLast(): Deletes an item from the rear of Deque. 
// Return true if the operation is successful.
// getFront(): Gets the front item from the Deque. 
// If the deque is empty, return -1.
// getRear(): Gets the last item from Deque. 
// If the deque is empty, return -1.
// isEmpty(): Checks whether Deque is empty or not. 
// isFull(): Checks whether Deque is full or not.
//  

// Example:

// MyCircularDeque circularDeque = new MycircularDeque(3); // set the size to be 3
// circularDeque.insertLast(1);			// return true
// circularDeque.insertLast(2);			// return true
// circularDeque.insertFront(3);			// return true
// circularDeque.insertFront(4);			// return false, the queue is full
// circularDeque.getRear();  			// return 2
// circularDeque.isFull();				// return true
// circularDeque.deleteLast();			// return true
// circularDeque.insertFront(4);			// return true
// circularDeque.getFront();			// return 4
//  

// Note:

// All values will be in the range of [0, 1000].
// The number of operations will be in the range of [1, 1000].
// Please do not use the built-in Deque library.
/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */

 // 插入删除时间复杂度O(n)
var MyCircularDeque = function (k) {
    this.arr = [];
    this.k = k;
};

MyCircularDeque.prototype.insertFront = function (value) {
    if (this.isEmpty()) {
        this.arr[0] = value;
        return true;
    } else if (this.isFull()) {
        return false;
    } else {
        this.arr.unshift(value);
        return true;
    }
};

MyCircularDeque.prototype.insertLast = function (value) {
    if (this.isEmpty()) {
        this.arr[0] = value;
        return true;
    } else if (this.isFull()) {
        return false;
    } else {
        this.arr.push(value);
        return true;
    }
};

MyCircularDeque.prototype.deleteFront = function () {
    if (this.isEmpty()) {
        return false;
    } else {
        this.arr.shift();
        return true;
    }
};

MyCircularDeque.prototype.deleteLast = function () {
    if (this.isEmpty()) {
        return false;
    } else {
        this.arr.pop();
        return true;
    }
};

MyCircularDeque.prototype.getFront = function () {
    if (this.isEmpty()) {
        return -1;
    } else {
        return this.arr[0];
    }
};

MyCircularDeque.prototype.getRear = function () {
    if (this.isEmpty()) {
        return -1;
    } else {
        return this.arr[this.arr.length - 1];
    }
};

MyCircularDeque.prototype.isEmpty = function () {
    return this.arr.length == 0;
};

MyCircularDeque.prototype.isFull = function () {
    return this.arr.length >= this.k;
};



//   Your MyCircularDeque object will be instantiated and called as such:
var obj = new MyCircularDeque(k)
var param_1 = obj.insertFront(value)
var param_2 = obj.insertLast(value)
var param_3 = obj.deleteFront()
var param_4 = obj.deleteLast()
var param_5 = obj.getFront()
var param_6 = obj.getRear()
var param_7 = obj.isEmpty()
var param_8 = obj.isFull()


// 优化
 // 插入删除时间复杂度O(1)
// // 执行用时：128 ms, 在所有 JavaScript 提交中击败了85.45%的用户
// // 内存消耗：44.8 MB, 在所有 JavaScript 提交中击败了64.29%的用户
// var MyCircularDeque = function (k) {
//     this.capacity = k + 1;
//     this.front = 0;
//     this.rear = 0;
//     this.data = [];
// };

// MyCircularDeque.prototype.insertFront = function (value) {
//     if (this.isFull()) return false;
//     this.front = (this.front - 1 + this.capacity) % this.capacity;
//     this.data[this.front] = value;
//     return true;
// };

// MyCircularDeque.prototype.insertLast = function (value) {
//     if (this.isFull()) return false;
//     this.data[this.rear] = value;
//     this.rear = (this.rear + 1 + this.capacity) % this.capacity;
//     return true;
// };

// MyCircularDeque.prototype.deleteFront = function () {
//     if (this.isEmpty()) return false;
//     this.front = (this.front + 1 + this.capacity) % this.capacity;
//     return true;
// };

// MyCircularDeque.prototype.deleteLast = function () {
//     if (this.isEmpty()) return false;
//     this.rear = (this.rear - 1 + this.capacity) % this.capacity;
//     return true;
// };

// MyCircularDeque.prototype.getFront = function () {
//     if (this.isEmpty()) return -1;
//     return this.data[this.front];
// };

// MyCircularDeque.prototype.getRear = function () {
//     if (this.isEmpty()) return -1;
//     return this.data[(this.rear - 1 + this.capacity) % this.capacity];
// };

// MyCircularDeque.prototype.isEmpty = function () {
//     return this.front === this.rear;
// };

// MyCircularDeque.prototype.isFull = function () {
//     return (this.rear + 1) % this.capacity === this.front;
// };
