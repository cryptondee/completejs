'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Chapter 185 How the DOM really works
//info about the DOM

// Chapter 186 Selecting, creating, deleting elements

console.log(document.documentElement); // Selects the entire html
console.log(document.head); // Selects the head
console.log(document.body); // Selects the body

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); // Returns a nodelist, doesn't upgrade when changes to the DOM happen

console.log(allSections);
document.getElementById('section--1');
const allBtn = document.getElementsByTagName('button'); // Returns an HTML collection, this is a live collection  which changes when the DOM changes
console.log(allBtn);

console.log(document.getElementsByClassName('btn'));

//  creating and inserting elements
// .insertAdjacentHTML

const msg = document.createElement('div'); // creates a dom element and stores it in msg // not yet to be found in the page
msg.classList.add('cookie-message');
msg.textContent = 'we use cookies for improved funcitonality and analytics';
msg.innerHTML = `we use cookies for improved funcitonality and analytics. <button class="btn btn--close--cookie">Got it</button>`;
header.prepend(msg); // since msg is a live collection it gets prepended
//header.append(msg); //  however, because it can't be at two places at once, it gets append at the end
console.log(msg);
//header.append(msg.cloneNode(true)); due to the cloneNode method it can be placed on multiple places
//header.before(msg);// works similar to append
//header.after(msg);

// Delete elements
document
  .querySelector('.cookie-message')
  .addEventListener('click', function () {
    //msg.remove(); // is new
    msg.parentElement.removeChild(msg); // how its used to go
  });

// Chapter 187 attributes and classes

// styles
msg.style.backgroundColor = '#37383d';
msg.style.width = '120%';

console.log(msg.style.height); // doesnt work because `style` only works for inline styles. if nothing is set with inline styles it won't be found
console.log(msg.style.backgroundColor); // does work

console.log(getComputedStyle(msg)); // will be able to get all the styles.
console.log(getComputedStyle(msg).height); // will able to get what you want to find
msg.style.height =
  Number.parseFloat(getComputedStyle(msg).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered'); // can change style of properties

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className); // nav__logo
console.log(logo.src); // reading attributes works only on standard properties that is expected, custom attributes don't work // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.getAttribute('src')); // to get the relative src // img/logo.png
//non standard

console.log(logo.designer); // doesn't work for example, to fetch it you would need to use
console.log(logo.getAttribute('designer')); // getAttribute

logo.setAttribute('company', 'Bankist'); // adds an attribute
logo.setAttribute('data-version-number', '3');
const link = document.querySelector('.twitter-link');

console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // similar to includes
//don't use, will overwrite all the classes + only add one element
logo.className = 'jonas';

// Chapter 188 implement smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);
  console.log(e.target.getBoundingClientRect());
  console.log(
    'current scroll position (x/y)',
    window.pageXOffset,
    window.pageYOffset
  );

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // // scrolling
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset // current position + current scroll will get you to the place you wnat to be
  // );

  // window.scrollTo({
  //   // old skool way
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' }); // Only works in modern browers.
});

// chapter 189 types of events and event handlers
