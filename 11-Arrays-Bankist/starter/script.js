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

// Chapter 147 Creating DOM elements + chapter 163 SORT functionality
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    // side effects caused the creation of the username key without returning anything
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
const user = 'Steven Thomas Williams'; // username should be lowercase first letter of each name/word
createUsername(accounts);
console.log(accounts);

const calcDisplaybalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => (acc += cur), 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => (acc += curr));
  labelSumIn.textContent = `${incomes} `;
  const outflow = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => (acc += curr));
  labelSumOut.textContent = `${Math.abs(outflow)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(function (mov) {
      return (mov * acc.interestRate) / 100;
    })
    .filter(mov => mov >= 1)
    .reduce((acc, curr) => (acc += curr));
  labelSumInterest.textContent = interest;
};

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

// // Chapter 149 Data transformations :map, filter, reduce
// /* this chapter introduces the map, filter, and reduce methods.
// the map method accepts an array and creates a new array based on the function provided.
// The filter method accepts and array and filters out the elements that don't adhere to the criteria and returns a new array
// The reduce method boils ('reduces') all array elements down to on single value (adding all elements together)
// */

// // Chapter 150
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const movementsUsd = movements.map(mov => mov * eurToUsd);
// console.log(movements); // not effected
// console.log(movementsUsd); // new array with new elements
// const movementsUsdFor = [];
// for (const mov of movements) movementsUsdFor.push(mov * eurToUsd);
// console.log(movementsUsdFor);

// const movementDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You've ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementDescription); // array with all the strings
// // Chapter 151

// // Chapter 152 Filter method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);
// const depositFor = [];
// for (const mov of movements) {
//   if (mov > 0) depositFor.push(mov);
// }
// console.log(depositFor);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// // Chapter 153 Reduce method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// // acc -> accumulator, all the values gets added up to the acc variable
// // const balance = movements.reduce(function (acc, cur, i, arr) {
// //   console.log(`iteration ${i}: ${acc}`);
// //   return acc + cur;
// // }, 0); // the 0 is the starting point of accumulation
// const balance = movements.reduce((acc, curr) => (acc += curr), 0);

// console.log(balance);
// let sum = 0;
// for (const mov of movements) {
//   // using for...of loops you will need an external variable (sum)
//   console.log(sum);
//   sum += mov;
// }
// console.log(sum);

// // maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// Chapter 154 Coding Challenge #2
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/
// const calcAverageHumanAge = function (ages) {
//   ages.map(function (age) {
//     if (age <= 2) {
//       console.log(`${age} * 2 = ${age * 2}`);
//       return age * 2;
//     } else {
//       console.log(`16 + ${age} + 4 = ${16 + age * 4}`);
//       return 16 + age * 4;
//     }
//   });
// };

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(function (age) {
//     if (age <= 2) {
//       console.log(`${age} * 2 = ${age * 2}`);
//       return age * 2;
//     } else {
//       console.log(`16 + ${age} + 4 = ${16 + age * 4}`);
//       return 16 + age * 4;
//     }
//   });
//   console.log(`Human age of the dogs are ${humanAge}`);
//   console.log(`------`);
//   const exludedDogs = humanAge.filter(function (age) {
//     if (age > 18) return age;
//   });
//   console.log(`here are the excluded dogs`);
//   console.log(exludedDogs);
//   console.log(`-----`);
//   const avgAge = exludedDogs.reduce((acc, curr) => (acc += curr));
//   console.log(`the average of the dogs ${avgAge / exludedDogs.length}`);
// };

// const test = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log(test);

// // Chapter 155 The magic of chaining methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
// // Pipeline
// const totalDepositUsd = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * eurToUsd)
//   .map((mov, i, arr) => {
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => (acc += mov));
// console.log(totalDepositUsd);

// Chapter 156 Coding challenge #3
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(function (age) {
//     if (age <= 2) {
//       console.log(`${age} * 2 = ${age * 2}`);
//       return age * 2;
//     } else {
//       console.log(`16 + ${age} + 4 = ${16 + age * 4}`);
//       return 16 + age * 4;
//     }
//   });
//   console.log(`Human age of the dogs are ${humanAge}`);
//   console.log(`------`);
//   const exludedDogs = humanAge.filter(function (age) {
//     if (age > 18) return age;
//   });
//   console.log(`here are the excluded dogs`);
//   console.log(exludedDogs);
//   console.log(`-----`);
//   const avgAge = exludedDogs.reduce((acc, curr) => (acc += curr));
//   console.log(`the average of the dogs ${avgAge / exludedDogs.length}`);
// };

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length);
//   return humanAge;
// };

// const test = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log(test);

// // Chapter 157 the find method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(mov => mov < 0); // The find method returns the first element that fits the criteria, different from the filter method that returns every element that fits the criteria + returns an array
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// // Chapter 158 Implementing the login

// let currentAccount;

// const updateUi = function (acc) {
//   // Display movements
//   displayMovements(acc.movements);
//   // Display balance
//   calcDisplaybalance(acc);
//   // Display summary
//   calcDisplaySummary(acc);
// };

// btnLogin.addEventListener('click', function (e) {
//   e.preventDefault(); // Prevents form from submitting
//   currentAccount = accounts.find(
//     acc => acc.username === inputLoginUsername.value
//   );
//   console.log(currentAccount);
//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     // Clear input fields
//     inputLoginUsername.value = inputLoginPin.value = '';
//     inputLoginPin.blur();
//     // display UI and message
//     labelWelcome.textContent = `Welcome back ${
//       currentAccount.owner.split(' ')[0]
//     }`;
//     containerApp.style.opacity = 100;

//     updateUi(currentAccount);
//   }
// });

// // Chapter 159 Implementing transfer
// btnTransfer.addEventListener('click', function (e) {
//   e.preventDefault();

//   const amount = Number(inputTransferAmount.value);
//   const receiverAcc = accounts.find(
//     acc => acc.username === inputTransferTo.value
//   );
//   inputTransferTo.value = inputTransferAmount = '';
//   if (
//     amount > 0 &&
//     receiverAcc &&
//     currentAccount.balance >= amount &&
//     receiverAcc?.username !== currentAccount.username
//   ) {
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);
//     updateUi(currentAccount);
//   } else {
//   }
// });

// // Chapter 160 the findIndex method
// btnClose.addEventListener('click', function (e) {
//   e.preventDefault();
//   if (
//     currentAccount.username === inputCloseUsername.value &&
//     currentAccount.pin === Number(inputClosePin.value)
//   ) {
//     const index = accounts.findIndex(
//       // will return the first index number that matches the criteria
//       acc => acc.username === currentAccount.username
//     );
//     // delete accoutn
//     accounts.splice(index, 1);

//     // Hide UI
//     containerApp.style.opacity = 0;
//   } else {
//     console.log('wrong pin or username');
//   }
// });

// // Chapter 161 Some and Every
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // SOME method
// console.log(movements);
// console.log(movements.includes(-130)); // check for equality, finds if there is an element in the array from the param

// const anyDeposits = movements.some(mov => mov > 5000); // check for condition, is there an element that fits the arrays condition
// console.log(anyDeposits);

// btnLoan.addEventListener('click', function (e) {
//   e.preventDefault();
//   const amount = Number(inputLoanAmount.value);
//   if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
//     // add movmenet
//     currentAccount.movements.push(amount);
//     // update ui
//     updateUi(currentAccount);
//     //
//     inputLoanAmount.value = '';
//   }
// });
// // EVERY method
// console.log(account4.movements.every(mov => mov > 0)); // Every method returns true when all the elements adhere to the criteria

// // Seperate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));

// // Chapter 162 Flat and flatMap

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); // The flat method (only works on new browsers), can unnest a nested array and fill it into a single array. Its similar to using spread, however this is even easier.
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(1)); // If you have deeper nested arrays you can use the param to decide how deep to go into the array // will have same result as flat()
// console.log(arrDeep.flat(2)); // Will unnest all the nested arrays and bring it back

// // Separate lines
// // const accountMovements = accounts.map(acc => acc.movements);
// // console.log(accountMovements);
// // const allMovements = accountMovements.flat();
// // console.log(allMovements);
// // const sumMovements = allMovements.reduce((acc, curr) => (acc += curr));
// // console.log(sumMovements);

// // Flat
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, curr) => (acc += curr));
// console.log(`overal balance ${overalBalance}`);

// // Flat map
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements) // is the combination of flat and map, however, it can only go one level deep
//   .reduce((acc, curr) => (acc += curr));
// console.log(overalBalance2);

// // Chapter 163 Sorting arrays
// // Strings
// const owners = ['jonas', 'zach', 'adam', 'marhta'];
// console.log(owners.sort());
// // ['adam', 'jonas', 'marhta', 'zach']
// console.log(owners); // Sort mutates the original array
// // ['adam', 'jonas', 'marhta', 'zach']

// //Numbers
// console.log(movements);
// console.log(movements.sort());
// // [-130, -400, -650, 1300, 200, 3000, 450, 70], this  doesn't work because the sort converts everything to a string and than sorts them.
// // To fix this you can use a callback function with sort.
// // return < 0   A,B (keep order)
// // return > 0   B,A (switch order)
// movements.sort((a, b) => {
//   // This sorts in ascending order
//   if (a > b) return 1;
//   if (b > a) return -1;
//   console.log(a, b);
// });
// // Simplified
// movements.sort((a, b) => a - b);
// console.log(`---`);
// console.log(movements.sort((a, b) => a - b));

// console.log(movements);
// movements.sort((a, b) => {
//   // This sorts in descending order
//   if (a > b) return -1;
//   if (b > a) return 1;
//   console.log(a, b);
// });
// console.log(movements);

// // Simplified
// console.log(`---`);
// console.log(movements.sort((a, b) => b - a));
// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });

// // Chapter 164 more ways of creating and filling arrays
// // ways to create an array
// const arr2 = [1, 2, 3, 4, 5];
// console.log(new Array(1, 2, 3, 4, 5));

// const x = new Array(7); // if you pass in 1 element, the new Array function will create empty array with the number passed, in as empty elements, in this case it will create an array with 7 empty elements
// console.log(x);
// //x.fill(1); // will fill the entire array with the value passed and it will mutate the underlying array
// x.fill(1, 3, 5); // first param is what you want to fill, second param is where you want to start, third param is where to stop
// console.log(x);
// arr2.fill(23, 2, 6);
// console.log(arr2);

// /// Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const randomDice = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.random() * 6 + 1)
// );
// console.log(randomDice);

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('', ''))
//   );
//   console.log(movementsUI);
// });

// //  Chapter 165 Which Array method to use?
// /*
// Start with what do you I want to do with this array?
// - To mutate original array
//   --- Add to original array ---
//   .push (end)
//   .unshift (start)
//   --- Remove from original ---
//   .pop (end)
//   .shift (start)
//   .splice ( any)
//   --- Other methods ---
//   .reverse (reverses the order)
//   .sort (sorts based on string)
//   .fill (adds elements to an array)

// - a new array
//   --- computed from original ---
//   .map (loops over all the elements and does something to it)
//   --- filter using condition ---
//   .filter
//   --- portion of the original array ---
//   .slice
//   --- adding original to a different array ---
//   .concat
//   --- flattening or unnesting arrays ---
//   .flat
//   .flatmap

// - an array index
//   --- based on Value  ---
//   .indexOf
//   --- based on condition ---
//   .findIndex

// - or retrieve an array element
//   --- based on condition ---
//   .find

// - know if an element is included in an array
//   --- based on value ---
//   .includes
//   --- based on condition ---
//   .some
//   .every

// - get a new string
//   --- basd on separator string ---
//   .join

// - to transform to value
//   --- based on accumulator ---
//   .reduce

// - or loop over an array
//   --- basd on callback ---
//   .forEach
//   does not create a new array
// */

// // Chapter 166 array methods practice

// const bankDepositSum = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(mov => mov > 0)
//   .reduce((acc, curr) => (acc += curr));

// console.log(bankDepositSum);

// const bankWithdrawalSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov < 0)
//   .reduce((acc, curr) => (acc += curr));
// console.log(bankWithdrawalSum);

// const numDeposist1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, curr) => (curr >= 1000 ? acc + 1 : acc), 0);
// console.log(numDeposist1000);

// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits);
// console.log(withdrawals);

// const convertTitleCase = function (title) {
//   const capitlize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'the', 'but', 'and', 'or', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word =>
//       exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(' ');
//   return capitlize(titleCase);
// };
// console.log(convertTitleCase('this is a logn title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// // Chapter 167 Coding challenge #4
// /*
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

// GOOD LUCK 😀
// */
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// // challenge 1
// dogs.forEach(function (value, index, arr) {
//   value.recommendedFood = Math.trunc(value.weight ** 0.75 * 28) / 1000;
//   value.curFood = value.curFood / 1000;
// });
// console.log(dogs);
// // challenge 2

// const sarahDog = 'Sarah';

// dogs.forEach(function (value) {
//   if (
//     value.owners.includes('Sarah') &&
//     value.curFood / 1000 > value.recommendedFood * 0.9 &&
//     value.curFood / 1000 < value.recommendedFood * 1.1
//   ) {
//     console.log(`dog isn't eating to much : ${value.owners}`);
//   } else {
//     console.log(`dog is eating to much : ${value.owners}`);
//   }
// });
// // Challenge 3
// const ownersEatTooMuch = dogs.map(function (dog) {
//   if (dog.curFood > dog.recommendedFood * 1.1) {
//     return dog.owners;
//   }
// });
// const ownersEatTooLittle = dogs
//   .map(function (dog) {
//     console.log(dog.curFood);
//     console.log(dog.recommendedFood);
//     if (dog.curFood < dog.recommendedFood) {
//       return dog.owners;
//     }
//   })
//   .filter(value => value !== undefined);

// // console.log(ownersEatTooMuch.filter(value => value !== undefined).flat());
// console.log(ownersEatTooLittle.filter(value => value !== undefined).flat());
// // Challenge 4
// ownersEatTooLittle.forEach(function (value) {
//   console.log(`${value} dogs eat to little`);
// });

// // challenge 5
// const eatEnough = dogs.map(dog =>
//   dog.curFood === dog.recommendedFood ? console.log(true) : console.log(false)
// );
// // Challenge 6
// const eatOkay = dogs.map(dog =>
//   dog.curFood > dog.recommendedFood * 0.9 &&
//   dog.curFood < dog.recommendedFood * 1.1
//     ? dog
//     : ''
// );
// // Challenge 7
// // challenge 8
