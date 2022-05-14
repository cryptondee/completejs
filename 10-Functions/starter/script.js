'use strict';
//// Chapter 128
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //ES5 default values
//   //numPassengers = numPassengers || 1
//   //price = price || 199

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123', 50, 100);
// createBooking('LH123', 20, 150);
// createBooking('LH123', 50);
// createBooking('LH123', undefined, 150);

// console.log(bookings);

//// Chapter 129

// const flight = 'LH234';
// const andy = {
//   name: 'Andy Wong',
//   passport: 12341234,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 12341234) {
//     alert('Check in');
//   } else {
//     alert('Wrong passport');
//   }
//   console.log(passenger);
// };

// checkIn(flight, andy);
// console.log(flight);
// console.log(andy);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000);
// };

// newPassport(andy);
// checkIn(flight, andy);

//// Chapter 130

//// Chapter 131
// const oneWord = function (str) {
//   return str.replaceAll(' ', '').toLowerCase();
// };

// const upperFirstWorld = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// // higher order
// const transformer = function (str, fn) {
//   console.log(`Original str : ${str}`);
//   console.log(`Transformed string : ${fn(str)}`);

//   console.log(`transformed by: ${fn.name}`);
// };

// transformer('Javascript is the best!', upperFirstWorld);
// transformer('Javascript is the best!', oneWord);

// const high5 = function () {
//   console.log('highfive');
// };
// document.body.addEventListener('click', high5);

// ['Jonas', 'martha', 'adam'].forEach(high5);

//// Chapter 132
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('hello');

//// Chapter 133
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };
// console.log(lufthansa);

// lufthansa.book(239, 'Andy Wong');
// lufthansa.book(239, 'Andy Peng');

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// // Call method
// const book = lufthansa.book; // a way to abstract methods/functions from a function outside a function however, this will cause  `this` keyword issues, use book.call() to assing an object to clear the issue.

// //book(23, 'Sara Wiliams)'); // will fail due to this pointing to nothing.
// book.call(eurowings, 23, 'Sarah Williams'); // This fixes the this keyword issue by assigning eurowings as the object

// const swiss = {
//   airline: 'Swiss Airlines',
//   iataCode: 'LX',
//   bookings: [],
// };
// book.call(swiss, 583, 'Marry Cooper');
// //Apply method -- not that used anymore
// // Works the same way as call, the only difference is that it takes an array as an argument after the `this` keyword
// const flightData = [523, 'Michael Saylor'];
// // book.apply(swiss, flightData)
// book.apply(swiss, [200, 'Michael Saylor']);

// // different way of accepting arrays for `call` method
// book.call(swiss, ...flightData);
// console.log(swiss);

// //// Chapter 134
// // Bind method
// // Similar to call method with the difference being that it doesn't set a `this` keyword, but returns a function with the `this` keyword bound
// // Example need to use eurowings all the time, you can use the bind method to create a new function with eurowings as the object

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// bookEW(23, 'Steve Belo');
// console.log(eurowings);

// // Similar to how you can pass arguments in the call method, you can do so aswell with the bind method, which well set them to stone in the function

// const bookEW23 = book.bind(eurowings, 23); // this will create a function that predefines eurowings and the flightNum of 23, only the name needs to be passed on
// bookEW23('Mechala Adala');
// console.log(eurowings);

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;

//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // lufthansa.buyPlane.bind(lufthansa), returns a function that has lufthansa bound to it. Call method doesn't work here because it is a function, and you need to RETURN a function
// // Partial application

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23); // Null is used becuase the `this` keyword doesn't matter here,
// console.log(addVAT(23));

// const addTaxesFunction = function (taxRate) {
//   return function (value) {
//     return value + value * taxRate;
//   };
// };

// const tax25 = addTaxesFunction(25);
// console.log(tax25(300));
//// Chapter 135 Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answer: new Array(4).fill(0),
  registerNewAnswer() {
    const tempanswer = prompt(`${this.question}\n${this.options.join('\n')}`);
    if (tempanswer === '0') {
      // refactor this method
      this.answer[0] += 1;
      console.log(poll.answer);
    } else if (tempanswer === '1') {
      this.answer[1] += 1;
      console.log(poll.answer);
    } else if (tempanswer === '2') {
      this.answer[2] += 1;
      console.log(poll.answer);
    } else if (tempanswer === '3') {
      this.answer[3] += 1;
      console.log(poll.answer);
    } else {
      prompt('Invalid input try again!');
    }
    this.displayResults();
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(poll.answer);
    } else if (type === 'string') {
      console.log(
        `Poll results are ${this.answer[0]}, ${this.answer[1]}, ${this.answer[2]}, ${this.answer[3]}`
      );
    }
  },
};

const ansBtn = document.querySelector('.poll');
ansBtn.addEventListener('click', function () {
  poll.registerNewAnswer();
});

poll.displayResults('array');

// Chapter 136 Immediately invoked function Expression (IIFE)
const runOnce = function () {
  console.log('this will never run again');
};
runOnce(); // this however can used multiple times

(function () {
  // this is an IIFE
  // putting the entire function in `()` will allow you to run it oncce
  console.log('this will never run again');
})();
// same with arrow functions
(() => console.log('this will also never run again'))();
// the reason you want to have an immediately invoked fuction expression is that you can keep data inside the scope private. Everything within the function stays inside the function scope. However with ES6 you can use `const` or `let`in `{}` which will also create a private scope, thus IIFE are less neeeded now adays. `var` however is accessible outside the `{}` so its best to use let or const instead.

// Chapter 137 Closures

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

// Chapter 138 More closure

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
h();
f();

// Example 2

const boardPassenger = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, e ach with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassenger(180, 3);
// Closures are remnants of information that gets stored to a variable after an execution chain has finished. Normally if a variable is within a function, after the execution the variable is gone. However, if you it is saved to the variable if it came in contact with in during the execution.

// Chapter 138 Coding Challenge

/* Take the IIFE below and at the end of the function. attach an event listener that changes the color of the selcted h1 element ('header') to blue, each time the BODY element is clicked. do NOT select the h1 element again!

and now explain to yourself or someone around you WH Y this worked. Take all the time you need. Think about WHEN e xactly the callback function is executed and what that means for the varialbes involed in this example.
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  const body = document.querySelector('body');
  body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
