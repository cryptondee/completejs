'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);

    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();

    const displaydate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displaydate}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = `${now.getMinutes()}`.padStart(2, '0');

    labelDate.textContent = `${day}/${month}/${year} ${hour}:${minute}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// //  Chapter 170
// console.log(23 === 23.0); // This will return true, only one + type

// // Base10 = 0 - 9  //  1 / 10 = 0.1 however if we try to divide 3/10 we get 3.333333
// // binary base2  = 0 - 1 // Similar with base2, sometimes the +s get divided in a weird way, were you have padding zeros with weird +
// console.log(0.1 + 0.2); /// return 0.30000000000000004

// // This causes weird stuff to happen

// console.log(0.1 + 0.2 === 0.3); // this will return false, eventhough its 0.1 + 0.2 = 0.3

// // to convert strings to number you can use the Number() function or use + infront of the string as JS has type conversion
// // Conversion
// console.log(Number('23'));
// console.log(+'23');

// //Parsing
// console.log(Number.parseInt('30px')); // string needs to start with number otherwise it doesn't work
// console.log(Number.parseInt('es30')); // doesnt work

// console.log(Number.parseInt('  2.5rem')); // returns 2
// console.log(Number.parseFloat('  2.5rem')); // returns 2.5 // Best way to read a number from a string

// // Only use if you want to check if the value is NaN
// console.log(Number.isNaN(20)); // to check if it is NOT A NUMBER
// console.log(Number.isNaN('20')); // will also return false because it is NOT a NaN
// console.log(Number.isNaN(+'20x')); // this will return true because this returns NaN
// console.log(Number.isNaN(23 / 0)); // gives the value of infiniy, so not a NaN

// // Best way to check if the value is a real number
// console.log(Number.isFinite(20)); // this will return true because 20 is a number
// console.log(Number.isFinite('20')); // this will give false because it is a string
// console.log(Number.isFinite(+'20')); // this will give true because + converts the string to number
// console.log(Number.isFinite(+'20x')); // this will give false because it is a NaN
// console.log(Number.isFinite(23 / 0)); // this will give false because it vlaue is infinity thus not a number

// // Chapter 171 Math and Rounding
// console.log(Math.sqrt(25)); // square root
// console.log(25 ** (1 / 2)); // square root
// console.log(8 ** (1 / 3)); // cubic root

// console.log(Math.max(5, 18, 23, 11, 2)); // returns the highest number 23
// console.log(Math.max(5, 18, '23', 11, 2)); // Math.max does use type conversion so 23 will work here
// console.log(Math.max(5, 18, '23x', 11, 2)); // Math.max however, does not use parsing so 23x won't work and return NaN

// console.log(Math.min(5, 18, 23, 11, 2)); // returns min

// console.log(Math.PI * Number.parseFloat('10px') ** 2); // radius of 10px circle

// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1 + min);
// console.log(randomInt(10, 20));

// // Roudning integers
// console.log(Math.trunc(23.3)); // removes decimals  //23
// console.log(Math.round(23.9)); // will round to the nearest integer // 24

// console.log(Math.ceil(23.9)); // will round to the up integer // 24

// console.log(Math.floor(23.9)); // will round to the down integer // 23

// //for positive numbers, floor and trunc work the same, however for negative numbers it doesnt
// console.log(Math.floor(-23.9)); // will round to the down integer // 24
// console.log(Math.trunc(-23.9)); // will round to the down integer // 23

// // rounding decimals
// console.log((2.7).toFixed(0)); // Will always return a string
// console.log((2.7).toFixed(3)); // will add three decimals, thus 2.700
// console.log((2.345).toFixed(2)); // will return 2.35 as it will round to the nearest
// console.log(+(2.345).toFixed(2)); // adding + will convert the string to a number

// // Chapter 172 Remainder  // modulo
// console.log(5 % 2); // remainder returns the remainder of the division
// console.log(5 / 2); // 5 = 2 * 2  =1

// console.log(8 % 3); // 2
// console.log(8 / 3); // 8 = 2 * 3 + 2

// console.log(6 % 2); // 0 because 2 * 3 = 6 // no remainder left
// console.log(6 / 2); // 3
// console.log(7 % 2); // 1 because 2 * 3 + 1 = 7
// console.log(7 / 2); // 3.5

// const isEven = n => n % 2 === 0;

// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(10));
// console.log(isEven(5));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

// // Chapter 173 Numeric separators
// // 287,460,000,000
// const diameter = 287_460_000_000;
// console.log(diameter);

// const price = 345_99;
// console.log(price);

// const tansferFee = 15_00;
// const transferFee = 1_500;

// // const PI = 3._141592; // not allowed  placed after .
// // const PI = 3.14_1592; // allowed
// // const PI = 3_.141592; // not allowed  placed before .
// // const PI = _3.141592; // not allowed  placed infront
// // const PI = 3.141592_; // not allowed placed at end
// // const PI = 3.14__1592; // not allowed two __

// console.log(Number('2300_00')); // doesn't work will return NaN

// // Chapter 174 working with BIGINT

// // numbers are represented in 64 bits, which mean there only 64  1s or 0s to represent a number, only 53 are used to store the digits themself, the rest are used for decimal points. If there is a limit of 53 BITS, that means that there is a number of how big a number can be, which is

// console.log(typeof (2 ** 53 - 1)); // 9007199254740991
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 1); // 9007199254740992 <- this isn't right it only added 1 when it needed to add 2
// console.log(2 ** 53 + 0); // 9007199254740992 <- this isn't right it only added 1 when it needed to add 2
// console.log(2 ** 53 + 2); // 9007199254740994

// // ES2020 introduced BIGINT

// console.log(123124903845903840913839102381203); // 1.2312490384590385e+32
// console.log(123124903845903840913839102381203n); // The n at the n converts the number to a BigInt 123124903845903840913839102381203n
// console.log(BigInt(123124903845903840913839102381203)); // also possible using the BigInt function HOWEVER this will return 123124903845903848839386390069248n, which is different from the one above, that is because JS needs to internally convert the int to bigint which causes issues, best is to use n at the end

// // Operations works the same, however it isn't possible to mix big ints with regular numbers.

// const huge = 123124901284910283012n;
// const num = 23;
// //console.log(huge*num) // doesn't work
// console.log(huge * BigInt(num)); // now it does work

// console.log(20n > 15); // this however does work
// console.log(20n === 20); // however will return falsee === does not use type conversion so there are two different types, BigInt and regular number

// // Math functions does not work with bigint

// // division
// console.log(10n / 3n); // will return the closes bigint = 3n , it will cut off the decimal points

// // Chapter 175 Creating dates
// // create a date
// // const now = new Date();
// // console.log(now);
// // console.log(new Date('May 17 2022 21:41:29'));
// // console.log(new Date('december 24, 2015'));

// // console.log(new Date(account1.movementsDates[0]));

// // console.log(new Date(2037, 10, 19, 15, 23, 5)); // months are zero bases, thus 0-11  // 10 will return nov
// // console.log(new Date(2037, 10, 33)); // will return nov 30 + 3 days, i.e dec 3

// // console.log(new Date(0));
// // console.log(new Date(3 * 24 * 60 * 60 * 1000)); // three days later

// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()); //  2037 //there is also getYear but never use that one
// console.log(future.getMonth()); // 10 // return month 0-11 based
// console.log(future.getDate()); // 19 // will return the day
// console.log(future.getDay()); // 4 // will return the day of the week
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString()); // 2037-11-19T14:23:00.000Z // international standard of representing dates
// console.log(future.getTime()); // 2142253380000 time stamp

// console.log(new Date(2142253380000)); //Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time) same as future

// console.log(Date.now()) // will return timestamp of right now

// future.setFullYear(20) // also for month,day,hours,minutes,secs

// Chapter 177
