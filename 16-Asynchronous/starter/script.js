'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// // ///////////////////////////////////////
// const getCountryDataAlpha = function (country) {
//   const request = new XMLHttpRequest();
//   const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
//   request.open('GET', url);
//   request.send();

//   request.addEventListener('load', function () {
//     const requested = JSON.parse(this.responseText);
//     const data = requested[0];
//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//     <h3 class="country__name"> ${data.name.common} </h3>
//     <h4 class="country__region"> ${data.region} </h4>
//     <p class="country__row"><span>🏃‍♂️</span></p> ${(
//       +data.population / 1e6
//     ).toFixed(2)}M inhabitants
//     </p>
//     <p class="country__row"><span>🌎</span>${Object.values(data.languages)}</p>
//     <p class="country__row"><span>💴</span>${
//       Object.values(data.currencies)[0].name
//     }</p>
//     </div>
//     </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
      <h3 class="country__name"> ${data.name.common} </h3>
      <h4 class="country__region"> ${data.region} </h4>
      <p class="country__row"><span>🏃‍♂️</span></p> ${(
        +data.population / 1e6
      ).toFixed(2)}M inhabitants
      </p>
      <p class="country__row"><span>🌎</span>${Object.values(
        data.languages
      )}</p>
      <p class="country__row"><span>💴</span>${
        Object.values(data.currencies)[0].name
      }</p>
      </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryDataAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   const url = `https://restcountries.com/v3.1/name/${country}`;
//   request.open('GET', url);
//   request.send();
//   //ajax call country 1
//   request.addEventListener('load', function () {
//     const requested = JSON.parse(this.responseText);
//     const data = requested[0];
//     console.log(data);
//     //render country
//     renderCountry(data);
//     // get neighbour country
//     const [...neighbour] = data.borders;
//     if (!neighbour) return;
//     console.log(neighbour);
//     neighbour.forEach(country => getCountryDataAlpha(country));
//   });
// };

// // Chapter 251 Promises and the Fetch API
// const country = 'netherlands';
// const url = `https://restcountries.com/v3.1/name/${country}`;

// // what is a promise?
// /* Promise is an object hat is used as a placeholder for the future result of an asynchronous operation
// less formaly put
// a container for an asynchronously delivered value
// even futher down
// a container for a future value , i.e. a response from an ajax call, you are expecting a value in the future.
// */

// // Promise life cycle
// /*
// pending // before the future value is available
// settled // async task has been finished
// fulfilled -> succesfully got the data, now available|| rejected  -> error in fetching a task
// */

// // Chapter 252 consuming promise

// // const getCountryData = function (country) {
// //   const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
// //   const request = fetch(url)
// //     .then(function (res) {
// //       return res.json();
// //     })
// //     .then(function (data) {
// //       console.log(data);
// //       renderCountry(data[0]);
// //     });
// // };

// // const getCountryData = function (country) {
// //   const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
// //   const request = fetch(url)
// //     .then(res => res.json())
// //     .then(data => renderCountry(data[0]));
// // };
// // getCountryData('nld');

// // Chapter 253 chaining promises

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errMsg} ${res.status}`);
    return res.json();
  });
};
// // const getCountryData = function (country) {
// //   const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
// //   const request = fetch(url)
// //     .then(res => {
// //       if (!res.ok)
// //         throw new Error(`Country (${country}) not found (${res.status})`);
// //       return res.json();
// //     })
// //     .then(data => {
// //       renderCountry(data[0]);
// //       const neighbour = data[0].borders[0];
// //       if (!neighbour) return;
// //       return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbour}`);
// //     })
// //     .then(res => {
// //       if (!res.ok) throw new Error(`Country neighbour not found ${res.status}`);
// //       return res.json();
// //     })
// //     .then(data => {
// //       renderCountry(data[0], 'neighbour');
// //     })
// //     .catch(err => {
// //       console.log(`${err}`);
// //       renderError(`something went wrong ${err}`);
// //     })
// //     .finally(() => (countriesContainer.style.opacity = 1));
// // };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.com/v3.1/alpha?codes=${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('aus');
// });

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(`you are in ${data.city}, ${data.country}`);
//       return fetch(`https://www.restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(data => data.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.log(`there has been an error ${err.message}`));
// };

// console.log(whereAmI(52.508, 13.138));

// // Chapter 257 Async behind the scenes event loop
// console.log('test start');
// setTimeout(() => console.log(`0 sec timer`, 0));
// Promise.resolve(`Resolved promise 1`).then(res => console.log(res));
// Promise.resolve(`Resolve promise 2`).then(res => {
//   for (let i = 0; i < 100000; i++) {}
//   console.log(res);
// });
// console.log('test end');

// Chapter 258 Building a simple promise
// const lotteryPromise = new Promise(function (resolved, reject) {
//   console.log(`lottery is happening`);
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolved('You Win!');
//     } else {
//       reject(new Error(`You've lost!`));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // promisify setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(5)
//   .then(() => {
//     console.log(`i waited 2 seconds`);
//     return wait(1);
//   })
//   .then(() => console.log('I waited another second'));

// Promise.resolve('abc').then(x => console.log(x));

// Chapter 260 Promisifying geolocation api

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       console.log(lat, lng);
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('Error something went wrong');
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`you are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('there is an issue with restcountries api');
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`There has been an error ${err.message}`));
// };

// whereAmI();

// chapter 261 code challenge #2
/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
// let img;

// // promisify setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(data => {
//     console.log(data);
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     return wait(2);
//   })
//   .then(() => {
//     createImage('img/img-2.jpg');
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//   })

//   .catch(err => console.error(`There has been an error ${err.message}`));

// chapter 262 consuming promises with async/await
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;
//   console.log(pos.coords);
//   const geoCode = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const geoCodeData = await geoCode.json();
//   console.log(geoCodeData);
//   const res = await fetch(
//     `https://www.restcountries.com/v3.1/name/${geoCodeData.country}`
//   );
//   const data = await res.json();
//   renderCountry(data[0]);
//   console.log(lat, lng);
// };
// whereAmI();
// console.log(`hi`);
// // Chapter 263 error handling
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     console.log(pos.coords);
//     const geoCode = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!geoCode.ok) throw new Error(`geocode error`);
//     const geoCodeData = await geoCode.json();
//     console.log(geoCodeData);
//     const res = await fetch(
//       `https://www.restcountries.com/v3.1/name/${geoCodeData.country}`
//     );
//     const data = await res.json();
//     renderCountry(data[0]);
//     console.log(lat, lng);
//   } catch (err) {
//     console.error(`There has been an error : ${err.message}`);
//     renderError(`something went wrong ${err.message}`);
//   }
// };
// whereAmI();
// console.log(`hi`);
// Chapter 264 returning values from async functions
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     console.log(pos.coords);
//     const geoCode = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!geoCode.ok) throw new Error(`geocode error`);
//     const geoCodeData = await geoCode.json();
//     console.log(geoCodeData);
//     const res = await fetch(
//       `https://www.restcountries.com/v3.1/name/${geoCodeData.country}`
//     );
//     const data = await res.json();
//     renderCountry(data[0]);
//     console.log(lat, lng);
//     return `You are in ${geoCodeData.city}, ${geoCodeData.country}`;
//   } catch (err) {
//     console.error(`There has been an error : ${err.message}`);
//     renderError(`something went wrong ${err.message}`);
//     throw err;
//   }
// };
// // whereAmI() old way of catching erros from return
// //   .then(city => console.log(`2: ${city}`))
// //   .catch(err => console.log(`3: ${err.message}`))
// //   .finally(() => console.log(`3: finished`));

// (async function () {
//   try {
//     const data = await whereAmI();
//     console.log(data);
//   } catch (err) {
//     console.error(`err ${err}`);
//   }
// })();

// // Chapter 265  Running promises in parralel
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data);
//     // data.forEach(country => console.log(country[0].capital));
//     const capitals = data.map(el => console.log(el[0].capital));
//     return capitals;
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('germany', 'spain', 'portugal');

//// Chapter 266 Other promise combinators , race allSetteld, and any
//// Promise.race -> good for very long promises, as only the first one to load will get return.
// const timeOut = function (ms) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('request took to long')), ms;
//     });
//   });
// };

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     timeOut(2000),
//   ]);
//   console.log(res[0]);
// })();

// // Promise.allSettled
// // will return an array of all settled promises, rejected and resolved. will never short circuit

// Promise.allSettled([
//   Promise.resolve('succes'),
//   Promise.reject('ERROR'),
//   Promise.resolve('succes'),
// ]).then(res => console.log(res));

// // Promise.any
// // will return the first fulfilled promises, ignoring rejected ones. i.e. this will always return a resolved promise
// Promise.any([
//   Promise.reject('ERROR'),
//   Promise.resolve('succes 1'),

//   Promise.resolve('succes 2'),
// ]).then(res => console.log(res));

// Chapter 267 Coding challenge #3
const imgContainer = document.querySelector('.images');

// promisify setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
let currentImg;
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    currentImg = document.createElement('img');
    currentImg.src = imgPath;
    currentImg.addEventListener('load', function () {
      imgContainer.append(currentImg);
      resolve(currentImg);
    });
    currentImg.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log(img);
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

loadNPause();
