'use strict';
///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

X 1. Create one player array for each team (variables 'players1' and 'players2')
X 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
X 3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// const [players1, players2] = game.players;
// console.log(players1, players2);
// const allPlayers = [...players1, ...players2];
// const [gk, ...fieldplayers] = players1;
// console.log(gk);
// console.log(fieldplayers);
// console.log(allPlayers);
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1);
// console.log(draw);
// console.log(team2);

// const printGoals = function (...str) {
//   let totalGoals = 0;
//   for (let i = 0; i < str.length; i++) {
//     console.log(str[i]);
//     totalGoals++;
//   }
//   console.log(`total goals scored ${totalGoals}`);
// };

// printGoals(...game.scored);

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  name: 'classico Italinao',
  location: 'G.molstraat 34, Zaandam',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic', 'Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//test commit
// if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// // with optional chaining
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// for (const day of weekdays) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }
// // methods
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exit');

// const users = [{ name: 'Andy', email: 'hello@andy.com' }];
// console.log(users[0]?.name ?? 'user array empty');

const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

const values = Object.values(openingHours);
console.log(values);

const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// console.log(restaurant);
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// // for (const item of menu) console.log(item);
// // for (const item of menu.entries()) {
// //   console.log(`${item[0] + 1} : ${item[1]}`);
// // }

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1} : ${el}`);
// }

// console.log(menu.entries());
// console.log([...menu.entries()]);
// const rest1 = {
//   name: 'Capri',
//   numGuest: 20,
// };
// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };
// // or assignment operator
// rest1.numGuests = rest1.numGuest || 10;
// rest2.numGuests = rest2.numGuest || 10;

// rest1.numGuest ||= 10;
// rest2.numGuest ||= 10;
// // nullish assignment will asign variable if the first is not null or undefined
// rest1.numGuest ??= 10;
// rest2.numGuest ??= 10;

// rest1.owner &&= 'Anon';
// rest2.owner &&= 'Anon';

// console.log(rest1);
// console.log(rest2);

// restaurant.numGuest = 0;
// const guests = restaurant.numGuest || 10;
// console.log(guests);

// //nullish: null and undefiend not 0 or '' ?? <- nullish operant
// const guestCorrect = restaurant.numGuest ?? 10;
// console.log(guestCorrect);

// console.log(0 || 'jonas');
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mush', 'spinahc');
// }
// restaurant.orderPizza && restaurant.orderPizza('mush', 'spinach');

// // 1) destructering
// // spread because on right side of =
// const arr = [1, 2, ...[3, 4]];
// //rest because on left side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherfoods] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherfoods);
// // objects

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // 2) functions
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };
// add(2, 3);
// add(5, 3, 7, 2);
// add(5, 3, 7, 2, 1, 2);
// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushroom', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushroom');

// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);
// // copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// const newMenu2 = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(newMenu2);

// const str = 'andy';
// const letter = [...str, ' ', 's. '];
// console.log(letter);

// const ingredients = [
//   prompt(`let's make pasta! Ingredient 1?`),
//   prompt(`let's make pasta! Ingredient 2?`),
//   prompt(`let's make pasta! Ingredient 3?`),
// ];
// console.log(ingredients);

// const pasta = restaurant.orderPasta(...ingredients);

// const newRestaurant = { ...restaurant, founder: 'andy', foundedIn: 2000 };
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'roma';

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// const [x, y, z] = arr;
// console.log(x, y, z);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// const [starterMeal, mainMeal] = restaurant.order(2, 0);
// console.log(starterMeal, mainMeal);

// const nested = [2, 4, [5, 6]];

// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };
