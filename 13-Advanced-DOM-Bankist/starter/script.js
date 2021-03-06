'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const nav = document.querySelector(`.nav`);

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);

const section1 = document.querySelector(`#section--1`);

//PAGE NAVIGATION ----------------------------

// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

//1 - add event listener to commum parent element
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();

  //2 - determine what element originated the event
  //matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// OPEN MODAL---------------------------------

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//BUTTON SCROLLING --------------------------------

btnScrollTo.addEventListener(`click`, e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //console.log(e.target.getBoundingClientRect());

  //console.log(`Current Scroll (X/Y):`, window.pageXOffset, pageYOffset);

  //console.log(
  //`height, width viewport:`,
  //document.documentElement.clientHeight,
  // document.documentElement.clientWidth
  // );

  //scrolling-------------------

  //old school
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });

  //modern
  section1.scrollIntoView({ behavior: `smooth` });
});

//TABBED COMPONENT----------------------------------
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  console.log(clicked);

  //Guard Clause
  if (!clicked) return;

  //Active Tab
  tabs.forEach(el => el.classList.remove(`operations__tab--active`));
  clicked.classList.add(`operations__tab--active`);

  //CONTENT AREA
  tabsContent.forEach(content =>
    content.classList.remove(`operations__content--active`)
  );

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

//MENU FADE ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`nav`).querySelector(`img`);

    siblings.forEach(e => {
      if (e !== link) e.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Passing "argument" into handler
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));

//Sticky navigation -----------------------------------------

function m??todoN??oRecomendado() {
  const initialCoords = section1.getBoundingClientRect();

  window.addEventListener(`scroll`, function (e) {
    if (window.scrollY > initialCoords.top) nav.classList.add(`sticky`);
    else nav.classList.remove(`sticky`);
  });
}

// const obsCallback = function (entries, observer) {
//   entries.forEach(entries => {
//     console.log(entries);
//   });
// };

// const obsOptions = {
//   root: null, //null faz observar todo  o viewport
//   threshold: [0], //define o limite que faz com que o a fun????o de callback seja ativada, ou seja nessa caso quando chegar na section 1, e atingir um limite de 0.1 ou 10% do viewport a fun????o ?? ativada
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(`.header`);
const navHeigth = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeigth}px`,
});
headerObserver.observe(header);

//REVEAL SECTIONS -----------------------------------------

const allSections = document.querySelectorAll(`.section`);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (sec) {
  sectionObserver.observe(sec);
  //sec.classList.add(`section--hidden`);
});

// Lazy loading Images -----------------------------------------
const imgTargets = document.querySelectorAll(`img[data-src]`);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //REPLACE SRC WITH DATA-SRC
  entry.target.src = entry.target.dataset.src;

  //Retire class que dxa a imagem zoada
  entry.target.addEventListener(`load`, function (e) {
    entry.target.classList.remove(`lazy-img`);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const sliders = function () {
  const slides = document.querySelectorAll(`.slide`);
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  const dotContainer = document.querySelector(`.dots`);

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDot = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  const curDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add(`dots__dot--active`);
  };

  const goToslide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}% )`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToslide(curSlide);
    curDot(curSlide);
  };

  const previusSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToslide(curSlide);
    curDot(curSlide);
  };

  const init = function () {
    createDot();
    curDot(0);
    goToslide(0);
  };

  init();

  //event handlers
  btnRight.addEventListener(`click`, nextSlide);

  btnLeft.addEventListener(`click`, previusSlide);

  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowLeft`) previusSlide();
    if (e.key === `ArrowRight`) nextSlide();
  });

  dotContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      const { slide } = e.target.dataset;
      goToslide(slide);
      curDot(slide);
    }
  });
};
sliders();
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

function selectingCreateAndDeletingElements() {
  //SELECTING ELEMENTS ------------------------------------------------------------

  console.log(document.documentElement);
  console.log(document.head);
  console.log(document.body);

  const header = document.querySelector(`.header`);
  const allSections = document.querySelectorAll(`.section`);
  console.log(allSections);

  document.getElementById(`section--1`);

  const allButtons = document.getElementsByTagName(`button`);
  console.log(allButtons);

  console.log(document.getElementsByClassName(`btn`));

  //CREATING AND INSERTING ELEMENTS-----------------------------------------------------------

  // .insertAdjacentHTML;

  const message = document.createElement(`div`);
  message.classList.add(`cookie-message`);
  //message.textContent(`We use cookied for improved functionality anda analytics`);
  message.innerHTML = `We use cookied for improved functionality anda analytics. <button class = "btn btn--close--cookie">Got It!</button`;

  //header.prepend(message); //adiciona no dom como primeiro filho do header

  header.append(message);
  //adiciona por ultimmo no elemento, so pode adicionar uma vez, para mais vezes fa??a uma copia
  //header.append(message.cloneNode(true));

  //header.before(message); //adiciona a msg antes do header

  //header.after(message); //add a msg depois do header

  // DELETE ELEMENTS ----------------------------------------------------------
  document
    .querySelector(`.btn--close--cookie`)
    .addEventListener(`click`, () => {
      message.remove();
      //message.parentElement.removeChild(message); //antigo mas funciona
    });
}
//selectingCreateAndDeletingElements()

function stylesAttributesAndClasses() {
  const header = document.querySelector(`.header`);
  const message = document.createElement(`div`);
  message.classList.add(`cookie-message`);
  //message.textContent(`We use cookied for improved functionality anda analytics`);
  message.innerHTML = `We use cookied for improved functionality anda analytics. <button class = "btn btn--close--cookie">Got It!</button`;

  //header.prepend(message); //adiciona no dom como primeiro filho do header

  header.append(message);

  document
    .querySelector(`.btn--close--cookie`)
    .addEventListener(`click`, () => {
      message.remove();
      //message.parentElement.removeChild(message); //antigo mas funciona
    });

  //styles

  message.style.backgroundColor = `#37383d`;
  message.style.width = `120%`;

  console.log(getComputedStyle(message));
  console.log(getComputedStyle(message).color);
  console.log(getComputedStyle(message).height);

  message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 30 + `px`;

  document.documentElement.style.setProperty(`--color-primary`, `orangered`);

  //atributos
  const logo = document.querySelector(`.nav__logo`);
  console.log(logo.alt);
  console.log(logo.src);
  console.log(logo.src);
  console.log(logo.className);

  //atributos que n??o s??o padr??es`
  logo.setAttribute(`designer`, `Jonas`); //cria um atributo
  console.log(logo.getAttribute(`designer`)); //designer seria um atributo que vc criou

  console.log(logo.getAttribute(`src`));

  // links
  const link = document.querySelector(`.nav__link--btn`);
  console.log(link.href);
  console.log(link.getAttribute(`href`));

  // data atributes
  logo.setAttribute(`data-version-number`, `3.0`); //cria um atributo
  console.log(logo.dataset.versionNumber);

  //classes
  logo.classList.add(`c`);
  logo.classList.remove(`c`);
  logo.classList.toggle(`c`);
  logo.classList.contains(`c`);
}
//stylesAttributesAndClasses();

function typesOfEventHandler() {
  const h1 = document.querySelector(`h1`);

  const alertH1 = e => {
    alert(`addeventlistener`);

    h1.removeEventListener(`mouseenter`, alertH1);
  };

  h1.addEventListener(`mouseenter`, alertH1);

  h1.onmouseenter = alertH1;
}

function eventPropagation() {
  const randomInt = (min, max) => Math.floor(Math.random() * max - min) + min;
  const randomColor = () =>
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

  document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
    this.style.backgroundColor = randomColor();

    //stop propagtion
    //e.stopPropagation();
  });

  document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
    this.style.backgroundColor = randomColor();
  });

  document.querySelector(`.nav`).addEventListener(`click`, function (e) {
    this.style.backgroundColor = randomColor();
  });
}

function domTraversing() {
  const h1 = document.querySelector(`h1`);

  //Going downwards: child
  console.log(
    `-------------------Going downwards: child-----------------------`
  );
  console.log(h1.querySelectorAll(`.highlight`));
  console.log(h1.childNodes);
  console.log(h1.children);
  h1.firstElementChild.style.color = `white`;
  h1.lastElementChild.style.color = `white`;

  //Going upwards: parents
  console.log(`------------------Going upwards: parents----------------------`);
  console.log(h1.parentNode);
  console.log(h1.parentElement);

  h1.closest(`.header`).style.background = `var(--gradient-secondary  )`;
  h1.closest(`h1`).style.background = `var(--gradient-primary  )`;

  //Going sideways: siblings
  console.log(`--------------Going sideways: siblings------------------`);
  console.log(h1.previousElementSibling);
  console.log(h1.nextElementSibling);

  console.log(h1.previousSibling);
  console.log(h1.nextSibling);

  console.log(h1.parentElement.children);
  [...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) el.style.transform = `scale(0.5)`;
  });
}
