export const questionOne = (arr) => {
  // Implement question 1 here
  let sum = 0;
  for (let stringToCheck of arr) {
    for (let letter of stringToCheck) {
      if (letter == 'a' || letter == 'A' || letter == 'e' || letter == 'E' || letter == 'I' || letter == 'i' || letter == 'O' || letter == 'o' || letter == 'U' || letter == 'u') {
        sum += 1;
      }
    }
  }

  return [sum, sum % 2 == 0]; //return result
};

export const questionTwo = (obj1, obj2) => {
  // Implement question 2 here
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const setDifferenceArray = [];

  for (let obj1Key of obj1Keys) {
    if (!obj2Keys.includes(obj1Key)) {
      setDifferenceArray.push(obj1Key);
    }
  }

  for (let obj2Key of obj2Keys) {
    if (!obj1Keys.includes(obj2Key)) {
      setDifferenceArray.push(obj2Key);
    }
  }

  // sort the array using bubble sort
  let i = 0;
  let j = 0;
  let temp = 0;

  for (i = 0; i < setDifferenceArray.length - 1; i++) {
    for (j = 0; j < setDifferenceArray.length - i - 1; j++) {
      if (!isNaN(setDifferenceArray[j]) && !isNaN(setDifferenceArray[j + 1])) {
        if (parseFloat(setDifferenceArray[j]) > parseFloat(setDifferenceArray[j + 1])) {
          temp = setDifferenceArray[j];
          setDifferenceArray[j] = setDifferenceArray[j + 1];
          setDifferenceArray[j + 1] = temp;
        }
      } else {
        if (setDifferenceArray[j] > setDifferenceArray[j + 1]) {
          temp = setDifferenceArray[j];
          setDifferenceArray[j] = setDifferenceArray[j + 1];
          setDifferenceArray[j + 1] = temp;
        }
      }
    }
  }
  return setDifferenceArray; //return result
};

export const questionThree = (arr) => {
  // Implement question 3 here
  const areaAndPerimeterObj = {};

  for (let i = 0; i < arr.length; i++) {
    let semiPerimeter = (arr[i][0] + arr[i][1] + arr[i][2]) / 2;
    let area = Math.sqrt(semiPerimeter * (semiPerimeter - arr[i][0]) * (semiPerimeter - arr[i][1]) * (semiPerimeter - arr[i][2]));
    let roundedArea = Math.round(area * 100) / 100;
    let perimeter = arr[i][0] + arr[i][1] + arr[i][2];
    areaAndPerimeterObj[`${i}`] = [roundedArea, perimeter];
  }
  return areaAndPerimeterObj; //return result
};

export const questionFour = (string) => {
  // Implement question 4 here
  const reversedHalfStrings = string.split(',');

  for (let i = 0; i < reversedHalfStrings.length; i++) {
    let indexToReverse = parseInt(reversedHalfStrings[i].length / 2);
    let firstHalf = reversedHalfStrings[i].slice(0, indexToReverse);
    let secondHalf = reversedHalfStrings[i].slice(indexToReverse, reversedHalfStrings[i].length);

    reversedHalfStrings[i] = secondHalf + firstHalf;
  }

  return reversedHalfStrings; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Monica',
  lastName: 'Suresh',
  studentId: '20009795'
};
