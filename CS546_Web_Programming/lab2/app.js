/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import * as arrayFunctions from './arrayUtils.js';
import * as objFunctions from './objUtils.js';
import * as stringFunctions from './stringUtils.js';

// Merge common elements test cases 

let event1 = undefined;
let event2 = undefined;
let event3 = undefined;
let event4 = undefined;
let allEvents = undefined;
let getEventsById = undefined;
let removeEventsById = undefined;
let renameEventsById = undefined;
console.log("Let's add few events");
//*************************...1....create an event1*****************************
try {
    const event1 = await eventData.create("Patrick's Big End of Summer BBQ","Come join us for our yearly end of summer bbq!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "phill@stevens.edu",30,0,"08/25/2024","2:00PM","8:00PM",false);
    console.log("Event1 has been added successfully!");
    console.log(event1);
} catch(e) {
    console.log(e);
}

try {
    const result = arrayFunctions.mergeCommonElements(["apple", 1, 3, "-1", 2, []], ["apple", 2, 8, [9], "hi"]);
    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    const result = arrayFunctions.mergeCommonElements([[]], ["apple"]);
    console.log(result);
} catch (error) {
    console.log(error);
}

// Find triangles test cases

try {
    const triangles = [
        [3, 4, 5],
        [5, 5, 5],
        [7, 24, 25],
    ];

    const result = arrayFunctions.findTriangles(triangles);

    // Assert the result
    console.log(result);

} catch (error) {
    console.log(error);
}

try {
    const triangles = [
        [3]
    ];

    const result = arrayFunctions.findTriangles([[3, 4, 5], [4, 4, 4], [7, 7, 2], [8, 9, 8.003]]);;

    console.log(result);

} catch (error) {
    console.log(error);
}

// String metrics test cases

try {
    const result = arrayFunctions.stringMetrics(['a', 'aa', 'aa', 'aaa', 'aaa', 'aaaa']);
    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    const failing = ["apple", 123, "cherry"];
    const result = arrayFunctions.stringMetrics(failing);
    console.log(result);
} catch (error) {
    console.log(error);
}

//Emoji counter test cases

try {
    const validEmojiMessage = ":smile:";
    console.log('blah');
    const result = stringFunctions.emojiCounter(':: :::: a ::: a:::');
    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    const invalidEmojiMessage = " ";
    const result = stringFunctions.emojiCounter(invalidEmojiMessage);
    console.log(result);
} catch (error) {
    console.log(error);
}

// Sort stock prices test cases

try {
    const lastStocks = "AAPL,150.50|GOOG,2500.00|MSFT,300.75";
    const currStocks = "AAPL,155.00|GOOG,2600.00|MSFT,305.50";

    const result = stringFunctions.sortStockPrices(lastStocks, currStocks);
    console.log(result);
} catch (error) {
    // Handle any unexpected errors that might occur during the test.
    console.log(error);
}

try {
    const lastStocks = 1;
    const currStocks = "AAPL,155.00 | GOOG,2600.00 | TSLA,800.00";

    const result = stringFunctions.sortStockPrices(lastStocks, currStocks);
    console.log(result);
} catch (error) {
    console.log(error);
}

// Mash Up test cases

try {
    const result = stringFunctions.mashUp(' a bcd ', ' aaaaa ');
    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    const result = stringFunctions.mashUp("Hello", "");
    console.log(result);
} catch (error) {
    console.log(error);
}

// Solve puzzles test cases
try {
    let puzzles = [
        { a: 'apple', b: 'banana', c: 'cherry' },
        { a: 'ant', b: 'bat', c: 'cat' },
    ];

    let pieces = { c: 'chocolate', d: 'donut', e: 'elephant' };

    let result = objFunctions.solvePuzzles(puzzles, pieces);

    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    let puzzles = [
        { a: 'apple', b: 'banana', c: 'cherry' },
        { x: 'ant', y: 'bat', z: 'cat' },
    ];

    let pieces = { c: 'chocolate', d: 'donut', e: 'elephant' };

    let result = objFunctions.solvePuzzles(puzzles, pieces);

    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    let hand = [{ suit: 'hearts', value: 'A' }, { suit: 'hearts', value: '2' }];
    let communityCards = [
        { suit: 'hearts', value: '3' },
        { suit: 'hearts', value: '4' },
        { suit: 'hearts', value: '5' }
    ];

    let result = objFunctions.evaluatePokerHand(hand, communityCards);
    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    let hand = [];
    let communityCards = [
        { suit: 'spades', value: '4' },
        { suit: 'hearts', value: '5' },
        { suit: 'hearts', value: '6' }
    ];

    let result = objFunctions.evaluatePokerHand(hand, communityCards);
    console.log(result);
} catch (error) {
    console.log(error);
}

// Combine objects test cases

try {
    const inputArray = [
        { a: 'Hi', b: 25 },
        { a: 'Hello', b: 30 },
        { a: 'World', b: 35 },
    ];
    const result = objFunctions.combineObjects(inputArray);

    console.log(result);
} catch (error) {
    console.log(error);
}

try {
    const inputArray = undefined;
    const result = objFunctions.combineObjects(inputArray);
    console.log(result);
} catch (error) {
    console.log(error);
}















