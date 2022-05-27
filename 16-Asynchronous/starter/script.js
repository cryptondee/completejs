'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////
const getCountryDataAlpha = function (country) {
  const request = new XMLHttpRequest();
  const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
  request.open('GET', url);
  request.send();

  request.addEventListener('load', function () {
    const requested = JSON.parse(this.responseText);
    const data = requested[0];
    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name"> ${data.name.common} </h3>
    <h4 class="country__region"> ${data.region} </h4>
    <p class="country__row"><span>🏃‍♂️</span></p> ${(
      +data.population / 1e6
    ).toFixed(2)}M inhabitants
    </p>
    <p class="country__row"><span>🌎</span>${Object.values(data.languages)}</p>
    <p class="country__row"><span>💴</span>${
      Object.values(data.currencies)[0].name
    }</p>
    </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
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

const getCountryDataAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  const url = `https://restcountries.com/v3.1/name/${country}`;
  request.open('GET', url);
  request.send();
  //ajax call country 1
  request.addEventListener('load', function () {
    const requested = JSON.parse(this.responseText);
    const data = requested[0];
    console.log(data);
    //render country
    renderCountry(data);
    // get neighbour country
    const [...neighbour] = data.borders;
    if (!neighbour) return;
    console.log(neighbour);
    neighbour.forEach(country => getCountryDataAlpha(country));
  });
};

// Chapter 251 Promises and the Fetch API
const country = 'netherlands';
const url = `https://restcountries.com/v3.1/name/${country}`;

// what is a promise?
/* Promise is an object hat is used as a placeholder for the future result of an asynchronous operation
less formaly put
a container for an asynchronously delivered value
even futher down
a container for a future value , i.e. a response from an ajax call, you are expecting a value in the future.
*/

// Promise life cycle
/*
pending // before the future value is available
settled // async task has been finished
fulfilled -> succesfully got the data, now available|| rejected  -> error in fetching a task
*/

// Chapter 252 consuming promise

// const getCountryData = function (country) {
//   const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
//   const request = fetch(url)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
//   const request = fetch(url)
//     .then(res => res.json())
//     .then(data => renderCountry(data[0]));
// };
// getCountryData('nld');

// Chapter 253 chaining promises

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errMsg = 'Something went wrong') {
  fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errMsg} ${res.status}`);
    return res.json();
  });
};
// const getCountryData = function (country) {
//   const url = `https://restcountries.com/v3.1/alpha?codes=${country}`;
//   const request = fetch(url)
//     .then(res => {
//       if (!res.ok)
//         throw new Error(`Country (${country}) not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbour}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country neighbour not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(`something went wrong ${err}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

const getCountryData = function (country) {
  getJSON(
    `https://www.restcountries.com/v3.1/alpha?codes=${country}`,
    `Country (${country}) not found`
  ).then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders[0];
    if (!neighbour) return;
    return getJSON(
      `https://www.restcountries.com/v3.1/name/${neighbour}`,
      `Neightbour (${neighbour} not found)`
    );
  });
};

btn.addEventListener('click', function () {
  getCountryData('nld');
});
