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
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWorld = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
// higher order
const transformer = function (str, fn) {
  console.log(`Original str : ${str}`);
  console.log(`Transformed string : ${fn(str)}`);

  console.log(`transformed by: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWorld);
transformer('Javascript is the best!', oneWord);

const high5 = function () {
  console.log('highfive');
};
document.body.addEventListener('click', high5);

['Jonas', 'martha', 'adam'].forEach(high5);

//// Chapter 132
