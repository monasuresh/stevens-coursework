/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as helper from './helpers.js';

let solvePuzzles = (puzzles, pieces) => {
      if (!puzzles) {
            throw 'Puzzles do not not exist';
      }

      if (!Array.isArray(puzzles)) {
            throw 'puzzles must be an array';
      }

      if (puzzles.length === 0) {
            throw 'There are no puzzles in the puzzles array.';
      }

      const allowedChars = 'abcde';

      for (const puzzle of puzzles) {
            if (typeof puzzle !== 'object' || puzzle === null || Array.isArray(puzzle)) {
                  throw 'Each element in puzzles must be an object';
            }

            // Check if the object has at least one key/value pair
            if (Object.keys(puzzle).length === 0) {
                  throw 'Each object in puzzles must have at least one key/value pair';
            }

            for (let key in puzzle) {
                  key = key.trim();
                  if (key !== 'a' && key !== 'b' && key !== 'c' && key !== 'd' && key !== 'e') {
                        throw 'Error: The keys in each object must puzzle object must be a lowercase a - e.';
                  }
            }

            for (let key in puzzle) {
                  let trimmedKey = key.trim();
                  if (puzzle.hasOwnProperty(trimmedKey) && key !== trimmedKey) {
                        throw 'There are duplicate keys.';
                  }
            }
      }

      if (!pieces) {
            throw 'Pieces do not exist';
      }

      if (typeof pieces !== 'object' || pieces === null || Array.isArray(pieces)) {
            throw 'Pieces must be an object.';
      }

      // Check if the object has at least one key/value pair
      if (Object.keys(pieces).length === 0) {
            throw 'Pieces must have at least one key/value pair';
      }

      for (let key in pieces) {
            if (key !== 'a' && key !== 'b' && key !== 'c' && key !== 'd' && key !== 'e') {
                  throw 'Error: The keys in pieces object must be a lowercase a - e.';
            }
      }

      for (let key in pieces) {
            let trimmedKey = key.trim();
            if (pieces.hasOwnProperty(trimmedKey) && trimmedKey !== key) {
                  throw 'There are duplicate keys.';
            }
      }

      const completedPuzzles = [];

      let isCompleted = true;

      for (let puzzle of puzzles) {
            // Create a copy of the puzzle
            let completedPuzzle = { ...puzzle };

            for (const key of ['a', 'b', 'c', 'd', 'e']) {
                  // If the key is missing in the puzzle, try to find it in pieces
                  if (!completedPuzzle.hasOwnProperty(key)) {
                        if (pieces.hasOwnProperty(key)) {
                              completedPuzzle[key] = pieces[key];
                        } else {
                              isCompleted = false;
                              continue;
                        }
                  }
            }

            // Add the completed puzzle to the result
            if (isCompleted) {
                  completedPuzzles.push(completedPuzzle);
            }
      }

      for (let puzzle of completedPuzzles) {
            let trimmedPuzzle = {};
            for (let key in puzzle) {
                  let trimmedKey = key.trim();
                  let trimmedValue = puzzle[key];
                  if (typeof trimmedValue === 'string') {
                        trimmedValue = trimmedValue.trim();
                  }
                  trimmedPuzzle[trimmedKey] = trimmedValue;
            }
            completedPuzzles[completedPuzzles.indexOf(puzzle)] = trimmedPuzzle;
      }

      return completedPuzzles;
};

let evaluatePokerHand = (hand, communityCards) => {
      helper.validateCards(hand, communityCards);
      // Combine hand and communityCards to form the player's full hand

      let trimmedHand = [];
      let trimmedCommunity = [];

      for (let element of hand) {
            let obj = {};
            for (let property in element) {
                  let value = element[property].trim();
                  obj[property.trim()] = value;
            }

            trimmedHand.push(obj);
      }

      for (let element of communityCards) {
            let obj = {};
            for (let property in element) {
                  let value = element[property].trim();
                  obj[property.trim()] = value;
            }

            trimmedCommunity.push(obj);
      }

      const fullHand = [...trimmedHand, ...trimmedCommunity];

      // Determine the best hand
      if (helper.hasStraightFlush(fullHand)) {
            return 'Straight Flush';
      } else if (helper.hasThreeOfAKind(fullHand)) {
            return 'Three of a Kind';
      } else if (helper.hasPair(fullHand)) {
            return 'Pair';
      } else {
            return 'High Card';
      }
};

let combineObjects = (arr) => {
      if (!arr) {
            throw 'Input was not supplied or null, undefined, an empty string NaN, false, or 0';
      } else if (!Array.isArray(arr)) {
            throw 'The input type is not an array';
      } else if (arr.length < 2) {
            throw 'The array must have exactly at least 2 objects';
      }

      for (let element of arr) {
            if (!element) {
                  throw 'Input was not supplied or null, undefined, an empty string NaN, false, or 0';
            } else if (Array.isArray(element)) {
                  throw 'Input must be an object, but an array was supplied';
            } else if (typeof element !== 'object') {
                  throw 'Input is not of type object';
            } else if (Object.keys(element).length <= 0) {
                  throw 'Objects must have at least one key.';
            }

            for (let key in element) {
                  let trimmedKey = key.trim();
                  if (element.hasOwnProperty(trimmedKey) && key !== trimmedKey) {
                        throw 'There are duplicate keys.';
                  }
            }


      }

      let trimmedArr = [];

      for (let element of arr) {
            let trimmedObj = {};
            for (let property in element) {
                  let trimmedProperty = property.trim();
                  let trimmedValue = element[property];

                  if (typeof trimmedValue === "string") {
                        trimmedValue = element[property].trim();
                  }
                  trimmedObj[trimmedProperty] = trimmedValue;
            }

            trimmedArr.push(trimmedObj);
      }

      const commonKeys = [];

      for (let i = 0; i < trimmedArr.length; i++) {
            for (let element in trimmedArr[i]) {
                  let isFound = true;
                  for (let j = 0; j < trimmedArr.length; j++) {
                        if (!trimmedArr[j].hasOwnProperty(element)) {
                              isFound = false;
                              break;
                        }
                  }
                  if (isFound && commonKeys.indexOf(element) === -1) {
                        commonKeys.push(element);
                  }
            }
      }

      const result = {};
      for (let i = 0; i < commonKeys.length; i++) {
            const key = commonKeys[i];
            result[key] = [];
            for (let j = 0; j < trimmedArr.length; j++) {
                  if (trimmedArr[j].hasOwnProperty(key)) {
                        if (!result[key].includes(trimmedArr[j][key])) {
                              result[key].push(trimmedArr[j][key]);
                        }
                  }
            }
      }

      return result;
};

export {
      solvePuzzles,
      evaluatePokerHand,
      combineObjects
};