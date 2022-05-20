'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');

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
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); // Not efficient, if we have 100 links,  there would be 100 copies of the callbackfunction on each of those links to make it more efficient use event delegation. You can do that by putting the event listend to a common parent.

// 1. add eventlistener to common parent
// 2. determine what element origanted the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Parent
  console.log(e.target);
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    // to prevent event triggers have the same parent, but isn't the target.
    console.log('link');
    const id = e.target.getAttribute('href'); // target where it actually happends, by bubbling the event getst triggered even though it isn't 'targetted'
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // new method Guard clause
  // the guard clause is needed for when there are values that aren't valid, this will  only check for valid values , certain condition is matched
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // if (clicked) {
  //   // traditional way
  //   clicked.classList.add('operations__tab--active');
  // }

  // Activate content area
  // remove active classes
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // add/show content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Menu fade animation
// Passing arguments to event handlers
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// sticky navigation
const initCords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   // scroll event works,  but bad for performance due to events triggering at every scroll
//   // console.log(window.scrollY);
//   if (window.scrollY > initCords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// // Chapter 185 How the DOM really works
// //info about the DOM

// // Chapter 186 Selecting, creating, deleting elements

// console.log(document.documentElement); // Selects the entire html
// console.log(document.head); // Selects the head
// console.log(document.body); // Selects the body

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section'); // Returns a nodelist, doesn't upgrade when changes to the DOM happen

// console.log(allSections);
// document.getElementById('section--1');
// const allBtn = document.getElementsByTagName('button'); // Returns an HTML collection, this is a live collection  which changes when the DOM changes
// console.log(allBtn);

// console.log(document.getElementsByClassName('btn'));

// //  creating and inserting elements
// // .insertAdjacentHTML

// const msg = document.createElement('div'); // creates a dom element and stores it in msg // not yet to be found in the page
// msg.classList.add('cookie-message');
// msg.textContent = 'we use cookies for improved funcitonality and analytics';
// msg.innerHTML = `we use cookies for improved funcitonality and analytics. <button class="btn btn--close--cookie">Got it</button>`;
// header.prepend(msg); // since msg is a live collection it gets prepended
// //header.append(msg); //  however, because it can't be at two places at once, it gets append at the end
// console.log(msg);
// //header.append(msg.cloneNode(true)); due to the cloneNode method it can be placed on multiple places
// //header.before(msg);// works similar to append
// //header.after(msg);

// // Delete elements
// document
//   .querySelector('.cookie-message')
//   .addEventListener('click', function () {
//     //msg.remove(); // is new
//     msg.parentElement.removeChild(msg); // how its used to go
//   });

// // Chapter 187 attributes and classes

// // styles
// msg.style.backgroundColor = '#37383d';
// msg.style.width = '120%';

// console.log(msg.style.height); // doesnt work because `style` only works for inline styles. if nothing is set with inline styles it won't be found
// console.log(msg.style.backgroundColor); // does work

// console.log(getComputedStyle(msg)); // will be able to get all the styles.
// console.log(getComputedStyle(msg).height); // will able to get what you want to find
// msg.style.height =
//   Number.parseFloat(getComputedStyle(msg).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // can change style of properties

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className); // nav__logo
// console.log(logo.src); // reading attributes works only on standard properties that is expected, custom attributes don't work // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png
// console.log(logo.getAttribute('src')); // to get the relative src // img/logo.png
// //non standard

// console.log(logo.designer); // doesn't work for example, to fetch it you would need to use
// console.log(logo.getAttribute('designer')); // getAttribute

// logo.setAttribute('company', 'Bankist'); // adds an attribute
// logo.setAttribute('data-version-number', '3');
// const link = document.querySelector('.twitter-link');

// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // similar to includes
// //don't use, will overwrite all the classes + only add one element
// logo.className = 'jonas';

// // Chapter 188 implement smooth scrolling

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1cords = section1.getBoundingClientRect();
//   console.log(s1cords);
//   console.log(e.target.getBoundingClientRect());
//   console.log(
//     'current scroll position (x/y)',
//     window.pageXOffset,
//     window.pageYOffset
//   );

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // // scrolling
//   // window.scrollTo(
//   //   s1cords.left + window.pageXOffset,
//   //   s1cords.top + window.pageYOffset // current position + current scroll will get you to the place you wnat to be
//   // );

//   // window.scrollTo({
//   //   // old skool way
//   //   left: s1cords.left + window.pageXOffset,
//   //   top: s1cords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' }); // Only works in modern browers.
// });

// // chapter 189 types of events and event handlers

// const alertH1 = function (e) {
//   alert('hi');
//   h1.removeEventListener('mouseenter', alertH1); // to remove the eventlisten, will listen to event once
// };

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1);
// //

// // h1.onmouseenter = function (e) {
// //   // old, better to use addEventListener, its better to use that one because you can add multiple events to the eventlisten, using the old one you can not
// //   alert('hi');
// // };

// // Chapter 190 Event progation: bubbling and capturing
// /* Events happen in multiple phases,
// starting from 1) capturing phase, where the event is defined 2) target phase where the event happens and travels down the dom tree to reach the target, 3) bubbling phase when it has happend and sends it back to the top (document), it is as each event has happend in each of the parent elements*/

// // chapter 191 Event progagation in practice

// // random color  = rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
//   // stop event progagation
//   e.stopPropagation(); // this will ensure that only the event happends in the target, in practice it is not a good idea to stop progagation of events
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('nanv', e.target, e.currentTarget);
//   }
//   //true // the third param of addEventListener switches the bubbling to capturing phase, it will trigger  before bubbling happen, in this example NAV/LINK/CONTAINER will trigger in this order because it first goes down the domtree, and then up again. The default is bubbling
// );
// // e.target is  where the event actually happened/triggered
// // e.currentTarget is where the event is attached to

// // Chapter 192 Event delegation: Implementing page navigation
// // implemented at // page navigation

// // // Chapter 193
// const h1 = document.querySelector('h1');
// // going downwards: child
// console.log(h1.querySelectorAll('.highlight')); // selects the child elements with the highlight class, no matter how deep
// console.log(h1.childNodes); // gives us all the nodes from the element so text, comments, html tags, this isn't as used as often, better to use `.children`
// console.log(h1.children); // gives us only the elements thats in h1 (only works for direct children)
// h1.firstElementChild.style.color = 'white'; // Only the first element  changes
// h1.lastElementChild.style.color = 'orangered'; // Only the last element  changes

// // goi ng upwards : parents
// console.log(h1.parentNode); // selects the direct parent

// h1.closest('.header').style.background = 'black'; // selects parents that is closest to the element, not direct

// // going sideways: siblings // In js you can only select direct siblings, so the next one and previous oen
// console.log(h1.previousElementSibling); // null because there is no next
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling); // for the nodes
// console.log(h1.nextSibling);

// // if you want all the siblings, not just the previous and next one. you can go to the parent to retrievev all the elements

// console.log(h1.parentElement.children); // includes all the siblings + itself
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.75)';
//   }
// });

// Chapter 194 building a tab component
// Tabbed component

// Chapter 195
// Menu fade animation

// Chapter 196
// sticky navigation

// Chapter 197 A better way: intersection API
// const obsCallBack = function (entries, observer) {
//   // when section1 is intersecting the viewport at `threshold` 10%, than obsCallBack w ill get called with 2 args: entries and the actual object, entries is an array of the threshold entries
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], //  if the section target is 10% of the viewport than trigger
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeigh = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeigh}px`,
});
headerObserver.observe(header);

// Chapter 198 Reveal elements with scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // guard clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // will stop observering when its triggered
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});
// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

// Chapter 199 Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    // Only remove blur filter after images has loaded, creates a consistent experience
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(img => imgObserver.observe(img));

// Chapter 200 Building a slider component
// slider
let curSlide = 0;

const slider = function () {
  // selectors
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  // Data
  const maxSlide = slides.length;

  //functions
  const createDots = function () {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    // next slide
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    // previous slide
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // event handlers

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  const dotContainer = document.querySelector('.dots');

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
  goToSlide(0);
  createDots();
  activateDot(0);
};

const init = function () {
  slider();
};

init();

// Chapter 202 Life cylce DOM events

document.addEventListener('DOMContentLoaded', function (e) {
  // this was used to prevent scripts loading before everything else was loaded. But by placing the script tags at the end of the body prevents this from becoming an issue
  console.log('HTML parsed and dom tree build!', e);
});
window.addEventListener('load', function (e) {
  console.log('fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault(); // some browser require it
//   console.log(e);
//   e.returnValue = '';
// });

// Chapter 203 Efficient script loading // defer and async
// never include script tag in the head, it will fetch + execute all the scripts before finishing the parsing of the html, which might cause issues and is bad for perfomance
// always place it at the end of the body when everyhing is parsed // however this isn't perfect
// script could be downloaded before the html is parsed
// you can use `async` to download the script
// parsing html + fetching script happens at the same time
// however, the html parsing still stops for the script execution.
// Defer -> best option if you need to rely on the scripts to built the website
// script is still loaded async but the executing happens only at the end of the html parsing. same loading time as async, core difference is that html parsing doesn't get interupted this way.
// async and defer attribute has no effect when placed at the end of body tag
// Async -> if you do not need to rely on the script.
