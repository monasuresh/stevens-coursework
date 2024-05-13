/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as helper from './helpers.js';

let mergeCommonElements = (...args) => {
  if (args.length < 2) {
    throw 'There are less than 2 arguments.';
  }

  for (const arg of args) {
    let arr = [...args];
    if (!arg) {
      throw 'Input was not supplied or null, undefined, an empty string NaN, false, or 0';
    } else if (!Array.isArray(arg)) {
      throw 'One or more of the arguments is not an array.';
    } else if (arg.length === 0) {
      throw 'One or more array is empty.';
    }

    const flattened = arg.flat(Infinity);
    if (flattened.length === 0) {
      throw 'One or more of the arrays is empty after flattening.';
    }

    for (const element of flattened) {
      if (typeof element !== 'string' && typeof element !== 'number' && !Array.isArray(element) || (isNaN(element) && typeof element !== 'string') || element === Infinity || element === -Infinity) {
        throw 'One or more of the arguments is not a string, number, or array';
      }
    }
  }

  let arrays = [];

  for (let arg of args) {
    arrays.push(arg.flat(Infinity));
  }

  let setDifferenceArray = [];

  setDifferenceArray.push(...arrays[0]);

  helper.sortSetDifferenceArray(setDifferenceArray, arrays);

  return setDifferenceArray;
};

let findTriangles = (arr) => {
  if (!arr) {
    throw 'Input was not supplied or null, undefined, an empty string NaN, false, or 0';
  } else if (!Array.isArray(arr) || !arr.every(Array.isArray)) {
    throw 'The input is not an array of arrays.';
  }

  for (let element of arr) {
    for (let innerArrayElement of element) {
      if (typeof innerArrayElement !== "number" || isNaN(innerArrayElement) || innerArrayElement === Infinity || innerArrayElement === -Infinity || innerArrayElement === Number.MAX_SAFE_INTEGER || innerArrayElement === Number.MAX_VALUE || innerArrayElement === Number.MIN_SAFE_INTEGER || innerArrayElement === Number.MIN_VALUE) {
        throw 'One or more arguments is not a valid number.';
      }

      if (innerArrayElement <= 0) {
        throw 'The length of the sides must be greater than or equal to 0.';
      }
    }
  }

  for (const element of arr) {
    if (!((element[0] < element[1] + element[2]) && (element[1] < element[0] + element[2]) && (element[2] < element[1] + element[0]))) {
      throw 'Invalid triangle.';
    }
  }
  const areaAndPerimeterObj = {};

  for (let i = 0; i < arr.length; i++) {
    let a = arr[i][0];
    let b = arr[i][1];
    let c = arr[i][2];

    let semiPerimeter = (a + b + c) / 2;
    let area = Math.sqrt(semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c));
    let roundedArea = Math.round(area * 100) / 100;
    let perimeter = a + b + c;
    let triangleType = "";
    let roundedPerimeter = Math.round(perimeter * 100) / 100;

    if (a === b && a === c && b === c) {
      triangleType = "equilateral"
    } else if (a === b || b === c || a === c) {
      triangleType = "isosceles"
    } else {
      triangleType = "scalene"
    }
    areaAndPerimeterObj[`${i}`] = [roundedArea, roundedPerimeter, triangleType];
  }
  return areaAndPerimeterObj; //return result
};

let stringMetrics = (arr) => {
  if (!arr) {
    throw 'Input was not supplied or null, undefined, an empty string NaN, false, or 0';
  } else if (!Array.isArray(arr)) {
    throw 'The argument is not an array';
  }

  for (let element of arr) {
    if (typeof element !== "string") {
      throw 'One or more elements of the array is not a string.';
    }

    if (element.trim().length === 0) {
      throw 'One or more of the strings is either an empty string or a string with just spaces.';
    }
  }

  if (arr.length < 2) {
    throw 'There are less than 2 elements in the array';
  }

  let numVowels = 0;
  let numConsonants = 0;
  let shortest = [];
  let longest = [];
  let mean = 0;
  let median = 0;
  let mode = 0;
  let minLength = Infinity;
  let maxLength = 0;

  let vowels = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];
  let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z',
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

  let trimmedStringsArray = [];

  for (let s of arr) {
    s = s.trim();
    trimmedStringsArray.push(s);
    for (let c of s) {
      if (vowels.includes(c)) {
        numVowels++;
      }

      if (consonants.includes(c)) {
        numConsonants++;
      }
    }

    if (s.length < minLength) {
      shortest.splice(0, shortest.length);
      shortest.push(s);
      minLength = s.length;
    } else if (s.length == minLength) {
      shortest.push(s);
    }

    if (s.length > maxLength) {
      longest.splice(0, shortest.length);
      longest.push(s);
      maxLength = s.length;
    } else if (s.length == maxLength) {
      longest.push(s);
    }
  }

  let lengthOfStrings = [];

  for (let s of trimmedStringsArray) {
    lengthOfStrings.push(s.length);
  }

  // find the mean
  let sum = lengthOfStrings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  lengthOfStrings.sort();
  mean = sum / lengthOfStrings.length;
  let roundedMean = Math.round(mean * 100) / 100;

  // find the median

  if (lengthOfStrings.length % 2 == 0) {
    let middle1 = lengthOfStrings[Math.floor(lengthOfStrings.length / 2) - 1];
    let middle2 = lengthOfStrings[Math.floor(lengthOfStrings.length / 2)];
    median = (middle1 + middle2) / 2;
  } else {
    median = lengthOfStrings[Math.floor(lengthOfStrings.length / 2)];
  }

  // find the mode
  const modeObj = {};

  for (let s of lengthOfStrings) {
    if (modeObj.hasOwnProperty(s)) {
      modeObj[s] = modeObj[s] + 1;
    } else {
      modeObj[s] = 1;
    }
  }

  let modeMax = 0;
  let modes = [];

  for (const key in modeObj) {
    if (modeObj[key] > modeMax) {
      modes = [parseInt(key)];
      modeMax = modeObj[key];
    } else if (modeObj[key] === modeMax) {
      modes.push(parseInt(key));
    }
  }

  // Check if everything occurs the same number of times using a loop
  let allSame = true;
  for (const key in modeObj) {
    if (modeObj[key] !== modeMax) {
      allSame = false;
      break;
    }
  }

  // Set mode accordingly
  if (allSame) {
    mode = false;
  } else if (modes.length === 1) {
    mode = modes[0];
  } else {
    mode = modes.sort();
  }

  let firstValue = modes[0];
  let isSameValue = true;
  for (let i = 1; i < modes.length; i++) {
    if (modes[i] !== firstValue) {
      isSameValue = false;
    }
  }

  if (isSameValue) {
    mode = modes[0];
  }

  if (shortest.length < 2) {
    shortest = shortest[0];
  }

  if (longest.length < 2) {
    longest = longest[0];
  }

  return { 'vowel': numVowels, 'consonants': numConsonants, 'longest': longest, 'shortest': shortest, 'mean': roundedMean, 'median': median, 'mode': mode };
};

export {
  mergeCommonElements,
  findTriangles,
  stringMetrics
}






