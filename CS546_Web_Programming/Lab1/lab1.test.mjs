import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

// 5 calls to function 1
console.log(lab1.questionOne(["Hello", "good", "weather", "today"]));
console.log(lab1.questionOne(["Ths s nrdbl", "grd"])); // returns [0, true] 
console.log(lab1.questionOne(["O", "love", "CS 546.", "Best class ever."])); // returns [7, false] 
console.log(lab1.questionOne(["Testing", "function", "one", "now."])); // returns [8, true]
console.log(lab1.questionOne([" ", " ", " ", "  "])); // returns [0, true]
console.log(lab1.questionOne(["a", "t", "b", "g"])); // returns [1, false]

// 5 calls to function 2
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // returns ["d","e"] 
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })); // returns ["a","b","c","d","e","f"]
console.log(lab1.questionTwo( {'0.1': true, a: 5, '2': 'hi'}, {'3': true, b: 5, '44': "hi", '4': "bye", '5': 8})); // returns ['0.1', '2', '3', '4', '5', '44', 'a', 'b'] 
console.log(lab1.questionTwo( {103423123: true, a: 5, 2: 'hi', 1: 'test', 5000: 'test', cat: 300}, {3: true, b: 5, A: "hi", 4: "bye", 5: 8, cow: 100})); // returns ['1', '2', '3', '4', '5', '5000', '103423123', 'A', 'a', 'b', 'cat', 'cow']
console.log(lab1.questionTwo( {programming: true, '100': 40, C: 'hi', g: 'test', 1234: 'test', c: 300}, {c: true, '1234': 5, 'programming': "hi", C: "bye", dog: 100})); // returns ['100', 'dog', 'g']

// 5 calls to function 3
console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]]));   // returns {'0': [3.9,9], '1': [4.47,10], '2': [3.8,11]} 
console.log(lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]));  // returns {'0': [12.5, 17], '1': [2.9,9], '2': [14.98,19], '3': [58.66,35]} 
console.log(lab1.questionThree([[1,3,3], [100,50,60], [13,23,35], [24,33,54]]));  // returns {'0': [1.48, 7], '1': [1139.9, 210], '2': [70.66, 71], '3': [242.91, 111]};
console.log(lab1.questionThree([[32, 22, 49], [120,100,41], [40,80,60], [51,22,68]]));  // returns {'0': [272.15, 103], '1': [1934.02,261], '2': [1161.9,180], '3': [408.27,141]};
console.log(lab1.questionThree([[8,24,21], [15,30,42], [21,18,38], [11,32,25]]));  // returns {'0': [82.1, 53], '1': [158.45,87], '2': [83.1,77], '3': [118.64,68]};

// 5 calls to function 4
console.log(lab1.questionFour('patrick,hill,trees,home'));  //should return and then log ['rickpat', 'llhi', 'eestr', 'meho']
console.log(lab1.questionFour('joseph,ball,square,pencil'));  //should return and then log ['ephjos', 'llba', 'aresqu', 'cilpen'] 
console.log(lab1.questionFour('monica,pen,programming,algorithm'));  //should return and then log ['icamon', 'enp', 'ammingprogr', 'rithmalgo']
console.log(lab1.questionFour('a,book,computer,science'));  //should return and then log ['a', 'okbo', 'utercomp', 'encesci']  
console.log(lab1.questionFour('I,data,list,structures'));  //should return and then log ['I', 'tada', 'stli', 'turesstruc']  
