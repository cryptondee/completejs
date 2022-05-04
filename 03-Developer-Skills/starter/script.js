// Remember, we're gonna use strict mode in all scripts now!
'use strict';
// Problem 1
const temp1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temp2 = [6, -4, -12, -2, 'error', 18, 23, 34, 30, 28, 18, 10];

// const calcTempAmp = function (temps) {
//   const intOnly = function (temps) {
//     const ints = [];
//     for (let i = 0; i < temps.length; i++) {
//       if (typeof temps[i] == 'number') {
//         ints.push(temps[i]);
//       }
//     }
//     return ints.sort(compareNumbers);
//   };
//   function compareNumbers(a, b) {
//     return a - b;
//   }
//   const ints = intOnly(temperatures);
//   const highestTemp = ints[ints.length - 1];
//   const lowestTemp = ints[0];
//   const tempAmp = highestTemp - lowestTemp;
//   return tempAmp;
// };

// console.log(calcTempAmp(temperatures));

// problem 2 OWN SOLUTION using a for loop to push to temps

// const calcTempAmp = function (temps, temps2) {
//   for (let i = 0; i < temps2.length; i++) {
//     if (typeof temps2[i] == 'number') {
//       temps.push(temps2[i]);
//     }
//   }
//   console.log(temps);

//   const intOnly = function (temps) {
//     const ints = [];
//     for (let i = 0; i < temps.length; i++) {
//       if (typeof temps[i] == 'number') {
//         ints.push(temps[i]);
//       }
//     }
//     return ints.sort(compareNumbers);
//   };
//   function compareNumbers(a, b) {
//     return a - b;
//   }
//   const ints = intOnly(temps);
//   const highestTemp = ints[ints.length - 1];
//   const lowestTemp = ints[0];
//   const tempAmp = highestTemp - lowestTemp;
//   return tempAmp;
// };

// console.log(calcTempAmp(temp1, temp2));

// problem 2 using concat function
// const calcTempAmp = function (temps, temps2) {
//   temps = temps.concat(temps2);
//   const intOnly = function (temps) {
//     const ints = [];
//     for (let i = 0; i < temps.length; i++) {
//       if (typeof temps[i] == 'number') {
//         ints.push(temps[i]);
//       }
//     }
//     return ints.sort(compareNumbers);
//   };
//   function compareNumbers(a, b) {
//     return a - b;
//   }
//   const ints = intOnly(temps);
//   const highestTemp = ints[ints.length - 1];
//   const lowestTemp = ints[0];
//   const tempAmp = highestTemp - lowestTemp;
//   return tempAmp;
// };

// console.log(calcTempAmp(temp1, temp2));

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: 10, //Number(prompt(' Degress celsius: ')),
//   };
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };
// // A) identify the bug
// console.log(measureKelvin());

// const calcTempAmplitudeBug = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);
//   let max = 0;
//   let min = 0;

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max, min);
//   return max - min;
// };
// const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// console.log(amplitudeBug);

// Coding challenge # 1
/* Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures. 

Example: [17,21,23, will print " ... 18 in 1 days, 21 in 2 days .. 23 in 3 days"]

Create a fucntion 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use hte problem-solving framework: understand the problem and break it up into sub-problems!

Test data 1: [17, 21, 23]
Test data 2: [12,5,-5,0,4]

1) read out array
2) print ... TEMP .. in X days 

2. create a loop to store the X and temp and append to an empty array
*/
const printForecast = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str = str + ` ${arr[i]} °C in ${i + 1} days ...`;
  }
  return str;
};
const test = printForecast([17, 21, 23]);
console.log('...' + test);
