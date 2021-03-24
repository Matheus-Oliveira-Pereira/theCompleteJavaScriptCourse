'use strict';

function defaultParameters() {
  const bookings = [];
  const creatBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
  ) {
    // Old mode
    //   numPassengers = numPassengers || 1;
    //   price = price || 199;
    const booking = {
      flightNum,
      numPassengers,
      price,
    };
    console.log(booking);
    bookings.push(booking);
  };

  creatBooking(`LH123`);
  creatBooking(`LH123`, 2, 800);
  creatBooking(`LH123`, 7);
  creatBooking(`LH123`, undefined, 400);
}
//defaultParameters()

function alteraOobjetoOriginalCuidado() {
  const flight = `LH234`;
  const jonas = {
    name: `Jonas Schmedtmann`,
    passport: 241684328424,
  };

  const checkIn = function (flightNum, passenger) {
    flightNum = `LH999`;
    passenger.name = `Mr.` + passenger.name;
    if (passenger.passport === 241684328424) {
      alert(`Check in`);
    } else {
      alert(`Wrong passenger`);
    }
  };

  //checkIn(flight, jonas);

  console.log(flight);
  console.log(jonas);

  const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000000);
  };

  newPassport(jonas);
  checkIn(flight, jonas);
}
//alteraOobjetoOriginalCuidado()

function callbackFunctions() {
  const oneWord = function (str) {
    return str.replaceAll(` `, ``).toLowerCase();
  };

  const upperFirstWord = function (str) {
    const [first, ...others] = str.split(` `);
    return [first.toUpperCase(), ...others].join(` `);
  };

  const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`transformed by: ${fn.name}`);
  };

  transformer(`JavaScript is the best!`, upperFirstWord);
  transformer(`JavaScript is the best!`, oneWord);

  const high5 = function () {
    console.log(`🖐`);
  };

  document.body.addEventListener(`click`, high5);

  [`Jonas`, `Martha`, `Adam`].forEach(high5);
}
//callbackFunctions()

function functionsReturnFunctions() {
  const greet = function (greeting) {
    return function (name) {
      console.log(`${greeting} ${name}`);
    };
  };

  const greeterHey = greet(`Hey`);

  greeterHey(`Jonas`);
  greeterHey(`Steven`);

  greet(`Hello`)(`Jonas`);

  const greet2 = greeting => name => console.log(`${greeting} ${name}`);
  greet2(`EAE`)(`BOCA DE PELO`);
}
//functionsReturnFunctions()

function bindMethod() {
  const lufthansa = {
    airline: `Lufthansa`,
    iataCode: `LH`,
    bookings: [],
    book(flighNumber, name) {
      console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flighNumber}`
      );

      this.bookings.push({ flight: `${this.iataCode}${flighNumber}`, name });
    },
  };

  lufthansa.book(239, `Jonas`);
  lufthansa.book(635, `John`);
  console.log(lufthansa);

  const eurowings = {
    airline: `Eurowings`,
    iataCode: `EW`,
    bookings: [],
  };

  const book = lufthansa.book;
  //não vai funcinar por causa do this, porem tem 3 metodos de contornar isso

  //1 - call aponta para qual objeto o this deve apontar
  book.call(eurowings, 23, `Sarah Will`);
  book.call(lufthansa, 23, `Sarah Will`);
  console.log(eurowings);
  console.log(lufthansa);

  const swiss = {
    airline: `Swiss Air Lines`,
    iataCode: `LX`,
    bookings: [],
  };

  book.call(swiss, 583, `Mary Cooper`);
  console.log(swiss);

  //2 - apply method - não é mais usado
  const fligthData = [583, `Geoge Cooper`];
  book.apply(swiss, fligthData);
  console.log(swiss);

  book.call(swiss, ...fligthData);

  //3 - Bind method - cria uma função em que o this funciona no objeto progamado
  const bookEW = book.bind(eurowings);
  const bookLH = book.bind(lufthansa);
  const bookLX = book.bind(swiss);
  bookEW(23, `Steven Willians`);

  const bookeEW23 = book.bind(eurowings, 23); //função para o obejto que vai funcionar o this, e um parameto especifico
  console.log(`Jonas`);
  console.log(`Janete`);

  //whit event listeners
  lufthansa.planes = 300;
  lufthansa.buyPlanes = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
  };

  document
    .querySelector(`.buy`)
    .addEventListener(`click`, lufthansa.buyPlanes.bind(lufthansa));

  //Partial Application

  const addTax = (rate, value) => value + value * rate;
  console.log(addTax(0.1, 200));

  const addVAT = addTax.bind(null, 0.23);

  const addTaxRate = function (rate) {
    return function (value) {
      value + value * rate;
    };
  };

  const addVAT2 = addTaxRate(0.23);
}
//bindMethod()

function codyChallenge() {
  const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    registerNewAnswer() {
      const answer = Number(
        prompt(`${this.question}
    ${this.options.join(`\n`)}
    (Write option number)`)
      );
      typeof answer === `number` &&
        answer < this.answers.length &&
        answer >= 0 &&
        this.answers[answer]++;

      this.displayResults();
      this.displayResults(`string`);
    },

    displayResults(type = `array`) {
      if (type === `array`) console.log(this.answers);
      if (type === `string`)
        console.log(`Poll results ar ${this.answers.join(`,`)}.`);
    },
  };

  document
    .querySelector(`.poll`)
    .addEventListener(`click`, poll.registerNewAnswer.bind(poll));

  const data1 = [5, 2, 3];
  const data2 = [1, 5, 3, 9, 6, 1];

  poll.displayResults.call({ answers: data1 });
  poll.displayResults.call({ answers: data1 }, `string`);
  poll.displayResults.call({ answers: data2 });
  poll.displayResults.call({ answers: data2 }, `string`);
}
//codyChallenge()

function funcoesImediatas() {
  const runOnce = function () {
    console.log(`This will never run again`);
  };
  runOnce(); // MESMO QUE VC CHAME UMA VEZ, ESSA FUNÇÇAO AINDA PODE SER CHAMADA NO FUTURO

  (function () {
    console.log(`This will never run again`);
  })();

  (() => console.log(`This ALSO will never run again`))();
}
//funcoesImediatas()
function closures() {
  const secureBooking = function () {
    let passengerCount = 0;
    return function () {
      passengerCount++;
      console.log(`${passengerCount} passengers`);
    };
  };

  const booker = secureBooking();

  booker();
  booker();
  booker();

  let f;

  const g = function () {
    const a = 23;
    f = function () {
      console.log(a * 2);
    };
  };

  const h = function () {
    const b = 777;
    f = function () {
      console.log(b * 2);
    };
  };

  g();
  f();

  //re-assigning f function
  h();
  f();

  const boardPassenger = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
      console.log(`We are now boarding all ${n} passengers`);
      console.log(`There are 3 groups, each with ${perGroup} passengers `);
    }, 1000);
    wait * 1000;
    console.log(`Will start Boarding in ${wait} seconds`);
  };

  boardPassenger(180, 3);
}
//closures()

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector(`body`).addEventListener(`click`, function () {
    header.style.color = `blue`;
  });
})();
