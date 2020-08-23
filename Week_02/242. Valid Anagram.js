// Given two strings s and t , write a function to determine if t 
// is an anagram of s.

// Example 1:

// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:

// Input: s = "rat", t = "car"
// Output: false
// Note:
// You may assume the string contains only lowercase alphabets.

// Follow up:
// What if the inputs contain unicode characters? 
// How would you adapt your solution to such case?

// The standard solution using a map:

var isAnagram = function (s, t) {
    if (t.length !== s.length) return false;
    let counts = {};
    for (let c of s) {
        counts[c] = (counts[c] || 0) + 1;
    }
    for (let c of t) {
        if (!counts[c]) return false;
        counts[c]--;// 保证字母数量一样
    }
    return true;
};

// // ...which can be "minified" to:
// var isAnagram = function (s, t, m = {}) {
//     for (let c of s) m[c] = (m[c] || 0) + 1;
//     for (let c of t) if (!m[c]--) return false;
//     return Object.values(m).every(v => !v);
// };

// // Using an array as buckets:
// var isAnagram = function (s, t) {
//     if (t.length !== s.length) return false;
//     const counts = [];
//     for (let c of s) {
//         let i = c.charCodeAt(0) - 'a'.charCodeAt(0);
//         counts[i] = (counts[i] || 0) + 1;
//     }
//     for (let c of t) {
//         let i = c.charCodeAt(0) - 'a'.charCodeAt(0);
//         if (!counts[i]) return false;
//         counts[i]--;
//     }
//     return true;
// };

// dumb dumb
// var isAnagram = function (s, t) {
//     let hash = {}
//     s = s.split('')
//     t = t.split('')
//     if (s.length!==t.length) {
//         return false
//     }
//     for (let index = 0; index < s.length; index++) {
//         let sChar = s[index]
//         if (t.indexOf(sChar) !== -1) {
//             t.splice(t.indexOf(sChar) , 1)

//                 hash[sChar] = true

//         } 
//     }
//     if (t.length>0) {
//         return false
//     }
//     for (let index = 0; index < s.length; index++) {
//         const char = s[index];
//         if (hash.hasOwnProperty(char)) {
//             const c = hash[char];
//             if (!c) {
//                 return false
//             }
//         } else {
//             return false
//         }
//     }

//     return true
// };

console.log(isAnagram("yqhbicoumu",
    "ouiuycbmqh"));