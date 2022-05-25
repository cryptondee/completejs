'use strict';
/* // OOP Objected Oriented Programming 

Object-oriented programming is a programming paradigm based onthe concept of objects;

We use objects to model (describe) real-woprld or abstract feautres;

Objects may contain data (properties) and code (methods). By using objects, we pack data and the corresponding behavior into one block;

In OOP objects are self-contained pieces /blocks of code

Objects are building blocks of applications and interact with one another

Interactions happen through a public interface (APO) methjods that the code outside of the object can access and use to communicate with the object;

OOP was devoloped with the goal of organizing code to make it more flexible and easier to maintain (avoid spagehtti code)

// Classes 

Classes are like blue prints for creating objects (instances), JS doesn't work entirely with classes but has something conceptually the same. 

User {
  user // data
  passworld // data
  email // data

  login(password){ //code - methods
    // login logic
  }
  sendMessage(str){ // code - methods
    // sending logic 
  }
}

How to create classes? 

1) Abstraction
ignoring or hiding details that don't matter, allowing us to get an overview perspective of the thing we're implemetinh, instead of messing with details that don't really matter to our implementation

2) Encapsulation
Keeping properties and methods private inside the class, so they are not accessible from outside the calss. Some methods can be exposed as public interface (API)
Why? prevents external code from accidentally manipulating internal properties/state // allows to change internal implementation without the risk of breaking external code

user {
  user
  // Not accessible from outside the class
  private password  <--- private keyword doesn't exist in JS  syntax, this is purely  conceptual
  private email

  login(word){
    this.password == word <-- this is accessible inside the calss 
  }
  comment(text){
    this.checkSPAM(text)
  }
  private checkSPAM(text){
    // verify logic
  }
}

3) Inheritance
Making all properties and methods of a certain class available to a child class, froming a hierarchical relationship between classes. This allows us to reuse common logic and to model real-world relationships

user {
  user
  password
  email

  login(password){
    
  }
  sendMsg(str){

  }
}

admin {
  user
  password
  email
  permissions

  login(password){

  }
  sendMsg(str){

  }
  deleteUser(user){

  }
}

User and Admin have a lot of overlapping code, you can have one class inherit from the other. In this example user is the Parent class, and the admin the Childclass. The child inherets all the properties from the parent class.

4) Polymorphism
A child class can overwrite a method it inherited from a parent class [it's more compelx than that but enough for our purposes]

user {
  user
  password
  email
  login(password){
    // login logic
  }
  sendMsg(str){

  }
}

Admin {
  user
  password
  email
  permissions

  login (password, key){ // more secure login method because higher security is needed. 
    // different login
  }
  deleteUser(user){
    // 
  }
}
Author{
  user
  password
  email
  posts

  login(password){
    // more different login
  }
  writePost(){
    // writing logic
  }
}

// Chapter 207 OOP in javascript
OOP in js : prototypes 

Prototype -> contains methjods 
   ^
   | Prototypal inheritance /delegation 
   |
Object -> can acces methods

Objects are linked to a prototype object; 
Prototypal inheritance; the prototype contains methods (behavior) that are accessible to all objects linked to that protoype
Behavior is delegated to linked prototype object. 

How d oe we actually create prototypes? And how do we link objects to prototypes? How can we create new objects, without having classes?

1) Constructor functions
 Technique to create objecst from a function
 this is how builtin ojbecst like Arrays, maps, or Sets are actually implemented.

2) ES6 classes // More modern way of doing OOP
Modern alternative to construction function syntax
syntactic sugar: behind the scenes ES6 classe s work exactly like constructor functions
ES6 classes do not bheave like classes in "classical OOP" 

3) Object.create()
the easiest and most stragihtforward way of linking an object to a prototype object, however, not as used as much
*/
// // Chapter 208 Construction functiongs and the new operator

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // never create a method in a constructor function. Because if we had 1000 objects, we would have 1000 of these functions
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const andy = new Person('Andy', 2002);
// console.log(andy);
// // What happens when you use the new keyword?
// // 1. New {} is created
// // 2. function is called, this keyword is now  the  empty keyword in step 1
// // 3. {} linked to prototype
// // 4. function automatically returns the object

// const matilda = new Person('Matilda', 2007);
// const jack = new Person('Jack', 2007);
// console.log(matilda);
// console.log(jack);

// console.log(andy instanceof Person); // to check if the object is an instanceof the constructor function person

// // Chapter 209 Prototypes
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   //create a prototype on the object Person. this way you won't have duplicate functions and all new instances can inherit the function
//   return 2037 - this.birthYear;
// };
// console.log(Person.prototype);

// const andy = new Person('Andy', 2002);
// console.log(andy.calcAge());

// Person.prototype.species = 'Homo Sapiens';
// console.log(andy.species); // however property isn't directly in the object itself, its in the prototype
// console.log(andy); // however property isn't directly in the object itself, its in the prototype
// console.log(andy.hasOwnProperty('firstName')); //Will return true you can check if an object has a certain property, instead of being able to access it due to inheritance
// console.log(andy.hasOwnProperty('species')); // will return false, but you can still access it by using `andy.species`

//// Chapter 210 Prototypal inheritance and the prototype chain

// // Chapter 211 prototypal inheritance on built-in objetcs

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };
// Person.prototype.calcAge = function () {
//   return 2037 - this.birthYear;
// };

// Person.prototype.species = 'Homo Sapiens';

// const andy = new Person('Andy', 2002);

// console.log(andy.__proto__); // Person constructor
// console.log(andy.__proto__.__proto__); // Object constructor
// console.log(andy.__proto__.__proto__.__proto__); // returns null, because object is the top of the prototype chain

// console.log(Person.prototype.constructor); // returns the function
// console.dir(Person.prototype.constructor); // to return the actuall object fucntion

// const arr = [2, 5, 6, 2, 3, 5];
// console.log(arr.__proto__); // each array will inherit the methods from the proto type
// console.log(arr.__proto__ === Array.prototype); // This wil return true

// Array.prototype.unique = function () {
//   // You can extend the prototype by adding onto the original prototype. However this is generally not a good idea.
//   return [...new Set(this)]; // newer versions of JS might add new methods with same name but different approach, which will break your code
// }; // Secondly, if you work in a team it might be confusing along the way

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.log(h1);
// console.dir(h1);
// console.dir(x => x + 1);

// // Chapter 212 Coding Challenge #1
// /* 1. Use a consturctor function to implemetn a Car. A car has a make and a speed property. The seped property is the current speed of the car in km/j;
// 2. Impleemtn an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. create 2 car objects and exeriment with calling 'accelerate' and 'brake' multiple times on each of them.
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   console.log(`ACCELERATE: we are currently going ${this.speed} km/p hour`);
// };
// Car.prototype.brake = function () {
//   this.speed = this.speed - 5;
//   console.log(`BRAKE: we are currently going ${this.speed} km/p hour`);
// };

// const bmw = new Car('bmw', 120);
// const mercedes = new Car('Cercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.brake();
// bmw.brake();
// bmw.brake();

// mercedes.accelerate();
// mercedes.brake();
// mercedes.accelerate();

// // Chapter 213 ES6 classes

// // Class expression
// const PersonCl = class {};

// // Class declartion
// class PersonCl2 {
//   constructor(firstName, birthYear) {
//     // needs to be called constructor.
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     // Everything outside the constructor will be in the prototype of the object and not the object iself. this is the same as PeronCl2.prototype.calcAge
//     console.log(2037 - this.birthYear);
//   } // No commas between the methods

//   greet() {
//     console.log(`hey ${this.firstName}`);
//   }
// }

// const jessica = new PersonCl2('Jessica', 2002);

// console.log(jessica);

// // PersonCl2.prototype.greet = function () {
// //   console.log(`hey ${this.firstName}`);
// // };
// jessica.greet();
// // 1. Classes are NOT hoisted
// // 2. Classes are first-class citizens
// // 3. Classes are executed in strict mode

// // Chapter 214 setters and getters // ntot used that much but can be usefull for validations
// const account = {
//   owner: 'andy',
//   movements: [200, 300, 100, -500],
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     return 2037 - this.birthYear;
//   }
//   get age() {
//     return 2037 - this.birthYear;
//   }
//   // set a property that already exists
//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }
//   get fullName() {
//     return this._fullName;
//   }
// }

// const andy = new PersonCl('Andy Wong', 2002);
// console.log(andy);

// const walter = new PersonCl('Walter White', 1965);
// console.log(walter);

// // Chapter 215 Static methods
// Array.from(document.querySelectorAll('h1')); // will return the array
// //[1,2,3].from() // will not work, .from is only attached to the Array, it isn't in the prototype.

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// // to add a static method a constructor function
// Person.hey = function () {
//   console.log(this);
//   console.log('waves, hello');
// };
// Person.hey();

// // create a static method in class

// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     // Added to the instance, thus prototype
//     return 2037 - this.birthYear;
//   }

//   static hey() {
//     // only added to the PersonCl object
//     console.log('hello');
//   }
// }
// PersonCl.hey();

// // Chapter 216 Object.create() // least used way
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto); // this will create an object `steven`, that will linked to the Object prototype `PersonProto`
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// console.log(steven);
// steven.calcAge();

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1990);
// sarah.calcAge();

// // Chapter 217  Coding challenge #2
// /*
// 1. Re-create challenge 1, but this tine using an ES6 class;
// 2. add a getter caleld "speedUS", which returns the current speed in mi/h (divide by 1.6)
// 3. add a setted called 'SpeedUS', which set the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the unput by 1.6)
// 4. Create a new car and exerpiment with the accelerate, brake, getter setter
// */

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`ACCELERATE: we are going ${this.speed} KM/H per hour`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`BRAKE: we are going ${this.speed} KM/H per hour`);
//   }
//   get speedUS() {
//     return `SpeedUS: We are going ${this.speed / 1.6} Mi/H`;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new Car('ford', 120);
// console.log(ford);
// ford.accelerate();
// ford.brake();
// console.log(ford.speedUS);
// console.log((ford.speedUS = 50));
// console.log(ford);

// // Chapter 218 Inheritance Between "Classes": Constructor Functions
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   //this.firstName = firstName; // this is a copy of the person object
//   //this.birthYear = birthYear; // this is an issue because if the person object changes in the future, this will not be reflected in the student object
//   //Person.(firstName,birthYear) // this doesn't work because this is now just a normal function call, we aren't using the `new` operator, which means that the `this` keyword is undefined
//   Person.call(this, firstName, birthYear); // the call method will set the this keyword to the current object.
//   this.course = course;
// };

// Student.prototype = Object.create(Person.prototype); // create the link before you add methods to it, otherwise the methods will be overwritten with an empty prototype

// Student.prototype.introduce = function () {
//   console.log(`my name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'CS');
// console.log(mike);
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

// // Chapter 219 Coding challenge #3
// /*
// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`ACCELERATE: we are going ${this.speed} at KM/H`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`BRAKE: we are going ${this.speed} at KM/H`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `we are going ${this.speed} KM/H and the charge is ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 140, 50);
// console.log(tesla);
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.chargeBattery(90);
// console.log(tesla);
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();

// // Chapter 220 ES6 classes

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`hey ${this.fullName}`);
//   }
//   get age() {
//     return 2037 - this.birthYear;
//   }
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name`);
//   }

//   get fullName() {
//     return this._fullName;
//   }
//   static hey() {
//     console.log(`hey there`);
//   }
// }

// class StudentCl extends PersonCl {
//   // extends will link the studentCl prototype with the personCl prototype
//   constructor(fullName, birthYear, course) {
//     // no need to use personCl.call(this,....)
//     // here we use super(), super() is basically the constructor function of the parent class, same thing is happening but only behind the scenes
//     // super() always need to happen first! Because super will create the this function.
//     super(fullName, birthYear);
//     this.course = course;
//   }
//   introduce() {
//     console.log(`my name is ${this.fullName} and I study ${this.course}`);
//   }
//   calcAge() {
//     console.log(
//       `i'm ${
//         2037 - this.birthYear
//       } years old, but as a student i feel more like ${
//         2037 - this.birthYear + 10
//       }`
//     );
//   }
// }

// const martha = new StudentCl('Martha Jones', 2021, 'cs');
// console.log(martha);
// martha.introduce();
// martha.calcAge();

// // Chapter 221 Inheritance Between "Classes": Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstname, birthYear, course) {
//   PersonProto.init.call(this, firstname, birthYear);
//   this.course = course;
// };
// StudentProto.introduce = function () {
//   console.log(`my name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'cs');
// jay.introduce();
// jay.calcAge();

// Chapter 222 Another class example
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movements = [];
//     this.locale = navigator.language;

//     console.log(`Thanks for opening an account ${owner}`);
//   }
//   // public interface
//   deposit(val) {
//     this.movements.push(val);
//   }
//   withdraw(val) {
//     this.deposit(-val);
//   }
//   approveLoan(val) {
//     return true;
//   }
//   requestLoan(val) {
//     if (this.approveLoan(val)) {
//       this.deposit(val);
//       console.log(`loan approved`);
//     }
//   }
// }

// const acc1 = new Account('Andy', 'EUR', 1111);
// console.log(acc1);
// //acc1.movements.push(250); // this is possible, however it isn't recommended, better to create a method that interacts with the properties
// //acc1.movements.push(-250); // this is possible, however it isn't recommended, better to create a method that interacts with the properties
// acc1.deposit(300);
// acc1.withdraw(140);
// console.log(acc1);
// acc1.requestLoan(1000); // should retun loand approved and add 1000 to the movements
// acc1.approveLoan; // shouldn't be able to be called,
// acc1.pin; // also shouldn't be abled to be viewed. This is why we work with data encapsulation

// // Chapter 223  Encapsulation: Protected Properties and Methods
// // two reason why we need encapsulation
// // 1 Prevent code from outside the class to accidently maniuplate data from within the class
// // 2 when we expose a small API, than we can change all the internal methods with more confident
// // Issue : currently JS doesn't natively support privacy

// // now we will have to fake encapsulation

// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // protected property
//     this._pin = pin;
//     this._movements = []; // added underscore, this does not make the property truely private, this is just the convention of how it is done
//     this.locale = navigator.language;

//     console.log(`Thanks for opening an account ${owner}`);
//   }
//   // public interface
//   getMovements() {
//     return this._movements;
//   }

//   deposit(val) {
//     this._movements.push(val);
//   }
//   withdraw(val) {
//     this.deposit(-val);
//   }
//   _approveLoan(val) {
//     return true;
//   }
//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       this.deposit(val);
//       console.log(`loan approved`);
//     }
//   }
// }

// const acc1 = new Account('Andy', 'EUR', 1111);
// acc1.deposit(200);
// acc1.withdraw(100);
// console.log(acc1.getMovements());

// // Chapte 224 Encapsulation: Private Class Fields and Methods

// // 1 Public fileds
// // 2 private fields
// // 3 public methods
// // 4 private methods
// // Also have the static version.

// class Account {
//   // 1 Public field (instances) // won't be added to the prototype
//   locale = navigator.language;

//   // 2 Private fields # makes the property private (available on the instance and not the prototype)
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // protected property
//     this.#pin = pin;
//     //this._movements = []; // added underscore, this does not make the property truely private, this is just the convention of how it is done
//     //this.locale = navigator.language;

//     console.log(`Thanks for opening an account ${owner}`);
//   }
//   // 3 public interface // Public methods
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//   }
//   withdraw(val) {
//     this.deposit(-val);
//   }
//   _approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       // change to # > _
//       this.deposit(val);
//       console.log(`loan approved`);
//     }
//   }
//   // 4 Private methods // use to hide implementation details from the outside however this doesn't work yet. this will be seen as a private field.
//   // #approveLoan(val) {
//   //   return true;
//   // }
// }

// const acc1 = new Account('Andy', 'EUR', 1111);
// acc1.deposit(200);
// acc1.withdraw(100);
// console.log(acc1.getMovements());
// console.log(acc1);
// //console.log(acc1.#movements); // Private, thus will throw an error
// //console.log(acc1.#pin); // Private, thus will throw an error
// //console.log(acc1.#approveLoan); // Private, thus will throw an error

// // Chapter 225 Chaining methods
// class Account {
//   // 1 Public field (instances) // won't be added to the prototype
//   locale = navigator.language;

//   // 2 Private fields # makes the property private (available on the instance and not the prototype)
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // protected property
//     this.#pin = pin;
//     //this._movements = []; // added underscore, this does not make the property truely private, this is just the convention of how it is done
//     //this.locale = navigator.language;

//     console.log(`Thanks for opening an account ${owner}`);
//   }
//   // 3 public interface // Public methods
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }
//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }
//   _approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       // change to # > _
//       this.deposit(val);
//       console.log(`loan approved`);
//       return this;
//     }
//   }
//   // 4 Private methods // use to hide implementation details from the outside however this doesn't work yet. this will be seen as a private field.
//   // #approveLoan(val) {
//   //   return true;
//   // }
// }

// const acc1 = new Account('Andy', 'EUR', 1111);
// acc1.deposit(200);
// acc1.withdraw(100);
// console.log(acc1.getMovements());
// console.log(acc1);
// //console.log(acc1.#movements); // Private, thus will throw an error
// //console.log(acc1.#pin); // Private, thus will throw an error
// //console.log(acc1.#approveLoan); // Private, thus will throw an error
// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(300); // this doesn't work due to how it is currently set up
// console.log(acc1);

// // Chapter 226 ES 6 class summary
// class Person {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
// }

// class Student extends Person {
//   // student: child class // extends: inheritance between classes automatically sets prototype // Person: parent Class
//   university = 'UvA'; // Public field (similar to property available on CREATED OBJECT (instance))
//   #studyHours = 0; // Private field (not accessible outside of class)
//   #course;
//   static numSubjects = 10; // Static public field (available only on class)

//   constructor(fullName, birthYear, startYear, course) { // called by `new` operator, manditory in regular class, can be ommited in child class (use super)
//     super(fullName, birthYear); // Call to the parent class, only use whne using extends, need to happen before `this`
//     this.startYear = startYear;
//     this.#course = course; // redefining a private field, its unique per student
//   }
//   introduce() { // normal public method
//     console.log(`I study ${this.course} at ${this.university}`);
//   }
//   study(h) { // referencing private field and method
//     this.#makeCoffe();
//     this.#studyHours += h;
//   }
//   #makeCoffe() { // private method (isn't working yet, use _ instead)
//     return `Here is a coffee for you`;
//   }
//   get testScore() { // getter method, get value out of an object by writing the property instead of method (or using ())
//     return this._testScore;
//   }
//   set testScore(score) { // setter method use this.property = value
//     return this._testScore = score <= 20 ? score : 0;

//   }

//   static printCurriculum() { // Static method avaiably only on class can not acces instance properties nor methods, only static ones
//     console.log(`There are ${this.numSubjects} subjects`);
//   }
// }

// const student = new Student('Andy', 2002, 2020, 'cs'); // new operator to create an object

// // - Classes are just 'synthetic sugar' over constructor functions
// // - Classes are not hoisted
// // - Classes are first-class citizens
// // - Classes always executed in strict mode

// // Chapter 227 Coding Challenge 4
// /*
// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀
// */
// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make}  Accelerate: we are going ${this.speed} km/h`);
//     return this;
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} Brake: we are going ${this.speed} km/h`);
//     return this;
//   }
// }

// class EvCl extends CarCl {
//   #charge;
//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.#charge = charge;
//   }
//   accelerate() {
//     this.speed += 20;
//     this.#charge--;
//     console.log(
//       `${this.make} Accelerate: we are going ${this.speed} at ${
//         this.#charge
//       } charge left`
//     );
//     return this;
//   }
//   chargeTo(charge) {
//     this.#charge = charge;
//     console.log(`charged to ${this.#charge}`);
//     return this;
//   }
// }

// const bmw = new CarCl('bmw', 120);
// bmw.accelerate();
// bmw.brake();
// bmw.brake();
// bmw.brake();
// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();

// const tesla = new EvCl('Tesla', 120, 50);
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.brake();
// tesla.brake();
// tesla.chargeTo(90);

// tesla
//   .accelerate()
//   .accelerate()
//   .accelerate()
//   .brake()
//   .chargeTo(50)
//   .accelerate()
//   .accelerate();
