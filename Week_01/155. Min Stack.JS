// Design a stack that supports push, pop, top, 
// and retrieving the minimum element in constant time.

// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.
//  

// Example 1:

// Input
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]

// Output
// [null,null,null,null,-3,null,0,-2]

// Explanation
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); // return -3
// minStack.pop();
// minStack.top();    // return 0
// minStack.getMin(); // return -2
//  

// Constraints:

// Methods pop, top and getMin operations will always be called on non-empty stacks.
// 通过次数150,192提交次数272,887
// 额外维护一个栈 min_stack，存栈中曾经的最小值
// 当第一个元素入栈或min_stack为空时，让它也入min_stack栈
// 之后入栈的元素，和 min_stack 栈的栈顶元素比较，
// 如果更小(或相等)，则让它入 min_stack 栈， min_stack 栈的栈顶始终是主栈的最小值
// 每当有元素出栈时，要判断出栈的是否是最小元素，
// 如果是，则 min_stack 的栈顶也要出栈，此时原本第二小的元素成了新的栈顶元素，备胎转正
/**
 * initialize your data structure here.
 */
var MinStack = function () {
    this.stack = []
    this.min_stack = []
};
MinStack.prototype.push = function (x) {
    this.stack.push(x)
    if (x <= this.getMin() || this.min_stack.length == 0) {
        this.min_stack.push(x)
    }
};

MinStack.prototype.pop = function () {
    let out = this.stack.pop()
    if (this.getMin() == out) {
        this.min_stack.pop()
    }
};

MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1]
};

MinStack.prototype.getMin = function () {
    return this.min_stack[this.min_stack.length - 1]
};

//   Your MinStack object will be instantiated and called as such:
var obj = new MinStack()
obj.push(x)
obj.pop()
var param_3 = obj.top()
var param_4 = obj.getMin()

