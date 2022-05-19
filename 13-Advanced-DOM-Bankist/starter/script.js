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
header.prepend(msg); // since msg is a live collection
header.append(msg);
console.log(msg);
// che ckout if this works
