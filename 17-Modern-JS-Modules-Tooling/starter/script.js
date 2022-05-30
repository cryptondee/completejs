'use strict';
/* 
// Chapter 270 
Write scripts in modules, or packages. 


join all modules into one file -> bundling 

convert modern javascript back to ES5 -> Transpiling/polyfiling (babel)

Can be done with webpack or Parcel 
Webpack can be complex.

Parcel doesnt require a setup, and easy to use.

// Chpater 271 an overview of modules

Modules
a reusable piece of code that encapsulates implementation details

usaally a standalone file but it doesnt have to be 

needs to be `import`ed -> they will be dependencies 

modues make it easy to compose software, they are small building block that we can put togehter to build complex applications.

isolate compoments :  each module can be developed in isolation without thinkign about the entire codebase;

abstrace code: implement low level code in modules and import these abstrations into other modules 

often module lead to an organized code base

and makes it easy to reuse the code. 

// ES6 modules 
ES6 modules are stored in files, exactly one module per file.

What is the difference between ES6 module and scripts?

Top level variables are scoped to module with ES6 modules, meaning they are private by default. they only way a external module access it is by exporting that value/variable. 

Scripts variables are always global, this could lead to global name space polution and collision when multiple scripts try to instantiate the same name for a variable. 

ES6 modules always runs in strict mode, wheres scripts run in sloppy mode

ES6 `this` keyword will always be undefined, whereas scripts' `this` will point to the window object

ES6 allows for imports and export, script doesnt. Imports are always hoisted. 

with HTML linking if you will need ot use <script type="module"> instead of <script>

The files will be downloaded in an asynchronos way by default with ES6, with scripts they are downloaded synchronously, to do it asynchronosly you'll need to use async or defer
*/
//  Chapter 272 Exporting and importing value
// importing module
import {
  addToCart,
  totalPrice as price, // to change the variable name
  tq,
} from './shoppingCart.js';
console.log(`importing module`);
addToCart('toke', 50);

console.log(tq, price);
