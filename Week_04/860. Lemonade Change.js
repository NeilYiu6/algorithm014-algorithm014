// At a lemonade stand, each lemonade costs $5. 

// Customers are standing in a queue to buy from you, 
// and order one at a time (in the order specified by bills).

// Each customer will only buy one lemonade and pay with either
//  a $5, $10, or $20 bill.  You must provide the correct change 
//  to each customer, so that the net transaction 
//  is that the customer pays $5.

// Note that you don't have any change in hand at first.

// Return true if and only if you can provide every 
// customer with correct change.

// Example 1:

// Input: [5,5,5,10,20]
// Output: true
// Explanation: 
// From the first 3 customers, we collect three $5 bills in order.
// From the fourth customer, we collect a $10 bill and give back a $5.
// From the fifth customer, we give a $10 bill and a $5 bill.
// Since all customers got correct change, we output true.
// Example 2:

// Input: [5,5,10]
// Output: true
// Example 3:

// Input: [10,10]
// Output: false
// Example 4:

// Input: [5,5,10,10,20]
// Output: false
// Explanation: 
// From the first two customers in order, we collect two $5 bills.
// For the next two customers in order, we collect a $10 bill and give back a $5 bill.
// For the last customer, we can't give change of 
// $15 back because we only have two $10 bills.
// Since not every customer received correct change, the answer is false.

// Note:

// 0 <= bills.length <= 10000
// bills[i] will be either 5, 10, or 20.

// 每张账单只能是5、10、20
// 柠檬水均是5元一份
// 店家自己没有零钱

// 当收到20时
// 优先匹配店家手里的1张10和1张5，如有返回true
// 店家手里的10--
// 店家手里的5--
// 如没有重新匹配3张5，如有返回true
// 店家手里的5-=3
// 如都没有返回false
// 当收到10时
// 优先匹配一张5如有返回true
// 店家手里的5--，10++
// 如没有返回false
// 当收到5时
// 店家手里的5++
var lemonadeChange = function (bills) {
    let five = 0, ten = 0
    for (let i = 0; i < bills.length; i++) {
        const bill = bills[i];
        if (bill === 5) five++
        else if (bill === 10) {
            if (!five) return false
            five-- && ten++
        } else if (bill === 20) {
            if (ten && five) ten-- && five--
            else if (five >= 3) five -= 3
            else return false
        }
    }
    return true
}



