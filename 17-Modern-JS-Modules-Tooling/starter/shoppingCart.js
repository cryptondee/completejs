'use strict';
// exporting module
console.log('exporting module');

const shippingCost = 10;
const cart = [];
// variables are scoped to the module, which means cant be used by the importing modules. If we want to use it in the importing scrypto you will need to export the variables/values. There are two types of exports, named exports and default exports.
// named exports are the easiest one, the only thing you need to do is add 'export' infront of anything you want to export.

export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${product} x ${quantity} was added to the cart`);
};

// exports need to happen in the top level code, cna't work in functions

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };
