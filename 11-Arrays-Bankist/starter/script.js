'use strict';

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// // Chapter 142 Simple array methods
// // Slice method, does not mutate original array
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr);
// console.log(arr.slice());

// // Splice method, mutates original array
// // console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
// console.log(arr);

// /// Reverse method, mutates original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse());
// console.log(arr2);

// // Concat method, does not mutate original array
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // Join method, does not mutate original array, returns a string
// console.log(letters.join('-'));
// console.log(letters);

// // Chapter 143 New at method

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0)); // new method using .at() instead of []

// // use case for using .at() over []
// // supose we would want to get the last element of an array you would do  the old way
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]); //using slice

// // using .at method
// console.log(arr.at(-1)); // now you can use the indexing method like slice.

// // why use .at over [], if you want to method chain or want to grab the last element of an array or start counting from the back of  an array.
// // if you want to grab an element from an known index use []

// console.log('jonas'.at(0)); // at also works for strings

// // Chapter  144 Looping arrays using forEach

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   // to access the index of the element, you'll need to deconstruct the variables and look up the entries.
//   if (movement > 0) {
//     console.log(`On tx ${i} you've deposited ${movement}`);
//   } else {
//     console.log(`you withdrew ${Math.abs(movement)}`);
//   }
// }
// console.log(` --- for each --- `);
// movements.forEach(function (movement, index, array) {
//   // forEach it passes current element of array, the index, and the entire array
//   // For each is an higher order function, i.e. it takes an function. The order is always 1) element, 2) index, 3)the array
//   if (movement > 0) {
//     console.log(`on tx ${index} you've deposited ${movement}`);
//   } else {
//     console.log(`you withdrew ${Math.abs(movement)}`);
//   }
// });
// // 0: function (200)
// // 1: function (450)
// // 2: function (400)

// // When to use forEach and when For Of loop.
// // You can not break out of an forEach loop, i.e. break statement does not work. If you want to break out of the loop use the For..Of loop

// //Chapter 145 forEach with maps and Sets
// // Map
// const currencies = new Map([
//   ['USD', 'United States Dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound Sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   // similar to an array, however the second value is the key instead instead of an index
//   console.log(`${value}, ${key} `);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) { // since there are only values, keys doesn't make sense here
//   console.log(`${value}, ${key}`);
// });

// Chapter 146 PROJECT: basic app

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Chapter 147 Creating DOM elements
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
// Chapter 148 Coding Challenge #1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// const checkDogs = function (arr) {
//   //Challenge 1
//   const editedJulia = dogsJulia.slice(1, -2);
//   console.log(editedJulia);
//   //Challenge 2
//   const combinedData = [...editedJulia, ...dogsKate];
//   console.log(combinedData);
//   //Challenge 3
//   arr.forEach(function (value, i) {
//     const type = value > 3 ? 'Adult' : 'Puppy';
//     if (type === 'Adult') {
//       console.log(`Dog ${i + 1}, is ${value} years old and is an ${type}`);
//     } else {
//       console.log(`Dog ${i + 1}, is ${value} years old and is an ${type}`);
//     }
//   });
// };

// checkDogs(dogsKate);

// Chapter 149 Data transformations :map, filter, reduce
/* this chapter introduces the map, filter, and reduce methods. 
the map method accepts an array and creates a new array based on the function provided. 
The filter method accepts and array and filters out the elements that don't adhere to the criteria and returns a new array
The reduce method boils ('reduces') all array elements down to on single value (adding all elements together)
*/

// Chapter 150
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementsUsd = movements.map(mov => mov * eurToUsd);
console.log(movements); // not effected
console.log(movementsUsd); // new array with new elements
const movementsUsdFor = [];
for (const mov of movements) movementsUsdFor.push(mov * eurToUsd);
console.log(movementsUsdFor);

const movementDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You've ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementDescription); // array with all the strings
// Chapter 151
