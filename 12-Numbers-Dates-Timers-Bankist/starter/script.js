'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-01-08T14:11:59.604Z',
    '2021-01-25T17:01:17.194Z',
    '2021-01-31T23:36:17.929Z',
    '2021-02-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementsDate = (date, acc) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, `0`);
  //   const month = `${date.getMonth() + 1}`.padStart(2, `0`);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(acc.locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: `currency`,
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ``;

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i, arr) {
    const type = mov > 0 ? `deposit` : `withdrawal`;

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, currentAccount);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type} </div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(` `)
      .map(names => names[0])
      .join(``);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySumary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const updateUI = function (acc) {
  //DISPLAY BALANCE
  calcDisplayBalance(acc);

  //DISPLAY MOVEMENTS
  displayMovements(acc);

  //DISPLAY SUMARY
  calcDisplaySumary(acc);
};

const startLogOutTimer = () => {
  const tick = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //in each call, print the reimaning time to UI
    labelTimer.textContent = `${minutes}:${sec}`;

    //when  seconds stop timer and log out user
    if (time === 0) {
      clearInterval(logOutTimer);

      //Log Out
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }

    //decrese 1 second
    time--;
  };
  // set time to 5 seconds
  let time = 120;

  //call the timer every second]
  tick();
  const logOutTimer = setInterval(tick, 1000);
  return logOutTimer;
};

createUsernames(accounts);

//current acount
let currentAccount;
let CurrentTimer;

//FALE ALWAYS LOGI IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// day/month/year

//EVENT
btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault(); //prevent form from subbmitting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //DISPLAY UI AND WELCOME MSG
    labelWelcome.textContent = `Good day, ${
      currentAccount.owner.split(` `)[0]
    }!`;
    containerApp.style.opacity = 100;

    //create current  date
    const now = new Date();
    const options = {
      hour: `numeric`,
      minute: `numeric`,
      day: `numeric`,
      month: `numeric`,
      year: `numeric`,
      //weekday: `numeric`,
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, `0`);
    // const month = `${now.getMonth() + 1}`.padStart(2, `0`);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, `0`);
    // const min = `${now.getMinutes()}`.padStart(2, `0`);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //CLEAR FIELDS
    inputLoginPin.value = inputLoginUsername.value = ``;
    inputLoginPin.blur(); // faz perder o foco, o mouse nao fica sobre o campo

    //START TIMER
    if (CurrentTimer) clearInterval(CurrentTimer);
    CurrentTimer = startLogOutTimer();

    //UPDATE UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const reciverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  //verify value
  if (
    amount > 0 &&
    reciverAccount &&
    amount <= currentAccount.balance &&
    reciverAccount?.username !== currentAccount.username
  ) {
    //Transferir
    currentAccount.movements.push(-amount);
    reciverAccount.movements.push(amount);

    //ADD transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAccount.movementsDates.push(new Date().toISOString());
    //UPDATE UI
    updateUI(currentAccount);

    //CLEAR FIELDS
    inputTransferAmount.value = inputTransferTo.value = ``;

    //RESET THE TIMER
    clearInterval(CurrentTimer);
    currentAccount = startLogOutTimer();
  }
});

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      //ADD MOVEMENT
      currentAccount.movements.push(amount);

      //ADD transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      //UPDATE UI
      updateUI(currentAccount);

      //clean fields
      inputLoanAmount.value = ``;
    }, 2500);
  }
  //RESET THE TIMER
  clearInterval(CurrentTimer);
  currentAccount = startLogOutTimer();
});

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //DELETE ACCOUNT
    accounts.splice(index, 1);

    //HIDE UI
    containerApp.style.opacity = 0;

    //CLEAR FIELDS
    inputClosePin.value = inputCloseUsername.value = ``;
  }
});

let sortedState = false;

btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sortedState);

  sortedState = !sortedState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

function convertionAndCheckNumbers() {
  //numbers always have decimals

  //conversion
  console.log(Number(`23`));
  console.log(+'23');

  //parsing
  console.log(Number.parseInt(`30px`)); //SÓ funciona se a string começar com numberos

  console.log(Number.parseInt(`2.5rem`));
  console.log(Number.parseFloat(`2.5rem`));

  console.log(`-----------------ISNaN------------`);

  console.log(Number.isNaN(20));
  console.log(Number.isNaN(`20`));
  console.log(Number.isNaN(+`20X`));

  console.log(`-----------------ISFINITE------------`);
  console.log(Number.isFinite(20));
  console.log(Number.isFinite(`20`));
}
// convertionAndCheckNumbers();

function mathAndRounding() {
  //raiza quadrada
  console.log(Math.sqrt(25));

  //raiz cubica
  console.log(25 ** (1 / 3));

  //maximo e minimo
  console.log(Math.max(5, 18, 23, 10, 11));
  console.log(Math.max(5, 18, `23`, 10, 11));
  console.log(Math.min(5, 18, `23`, 10, 11));

  //math.PI
  //Math.ramdom - numero aleatorio entre 0 e 1

  const ramdomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min;

  console.log(ramdomInt(-10, 20));

  //arredoondameno

  console.log(Math.round(23.3));
  console.log(Math.round(23.9));

  console.log(Math.ceil(23.3));
  console.log(Math.ceil(23.9));

  console.log(Math.floor(23.3));
  console.log(Math.floor(23.9));

  console.log(Math.trunc(-23.3));
  console.log(Math.floor(-23.3));

  //rounding decimals
  console.log((2.7).toFixed(0)); //retorna uma string
  console.log((2.7).toFixed(3));
  console.log((2.7).toFixed(2));
  console.log(+(2.7).toFixed(2));
}
//mathAndRounding()

function resto() {
  console.log(5 % 2); // pega o resto
  console.log(8 % 3);

  const isEven = n => n % 2 === 0;

  console.log(isEven(5));
  console.log(isEven(10));
  console.log(isEven(12321231232132132132131512345678));

  labelBalance.addEventListener(`click`, function () {
    [...document.querySelectorAll(`.movements__row`)].forEach((row, i) => {
      if (i % 2 === 0) row.style.backgroundColor = `orangered`;
      if (i % 3 === 0) row.style.backgroundColor = `blue`;
    });
  });
}
//resto()

function bigInt() {
  console.log(2 ** 53 - 1);
  console.log(Number.MAX_SAFE_INTEGER);

  console.log(98486484864919594984168684984914n);
  console.log(BigInt(849845498168417546846416));
}
//bigInt

function datee() {
  //create a DATE
  const now = new Date();
  console.log(now);

  console.log(new Date(`Mon Feb 01 2021 13:15:53`));
  console.log(new Date(`December 24, 2015`));
  console.log(new Date(account1.movementsDates[0]));

  console.log(new Date(2037, 10, 19, 15, 23, 5));

  console.log(new Date(0));
  console.log(new Date(3 * 24 * 60 * 60 * 1000));

  //working with dates
  console.log(`-----------------Working with dates`);
  const future = new Date(2037, 10, 19, 15, 23);
  console.log(future);
  console.log(future.getFullYear());
  console.log(future.getMonth()); // começa do 0
  console.log(future.getDate()); // dia do mes
  console.log(future.getDay()); // dia da semana
  console.log(future.getHours());
  console.log(future.getMinutes());
  console.log(future.toISOString());
  console.log(future.getTime());

  console.log(new Date(2142267780000));
  console.log(Date.now());

  future.setFullYear(2040);
  console.log(future);

  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

  const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
  const days2 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
  const days3 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 30));
  console.log(days1);
  console.log(days2);
  console.log(days3);
}
datee();

function intlNumbes() {
  const num = 32065165.23;
  const options = {
    style: `currency`,
    unit: `celsius`,
    currency: `EUR`,
    useGrouping: false,
  };
  console.log(`US: `, new Intl.NumberFormat(`en-US`, options).format(num));
  console.log(`Germany: `, new Intl.NumberFormat(`de-DE`, options).format(num));
  console.log(`Syria: `, new Intl.NumberFormat(`ar-SY`, options).format(num));
  console.log(
    `Portugues: `,
    new Intl.NumberFormat(`pt-BR`, options).format(num)
  );
  console.log(
    `de acordo com o navagador: `,
    new Intl.NumberFormat(navigator.language, options).format(num)
  );
}
//intlNumbes()
const igredients = [`olives`, `spinach`];

function timer() {
  const pizzaTimer = setTimeout(
    (ing1, ing2) =>
      console.log(`Here is your pizza 🍕 with ${ing1} and ${ing2}`),
    3000,
    ...igredients
  );
  console.log(`waiting...`);

  if (igredients.includes(`spinach`)) clearTimeout(pizzaTimer); //para o timer

  setInterval(() => {
    const now = new Date();
    console.log(now);
  }, 1000);
}
//timer()

function testePraBia() {
  const date = new Date();
  console.log(date);
  console.log(date.valueOf());
  console.log(date.getTimezoneOffset());
  // console.log(data.getTimezoneOffset() * 60000);
  // const date2 = new Date(date.valueOf() - data.getTimezoneOffset() * 60000);
  //  console.log(date2);

  const hora = `00:00:00.000`;
  const tentariva = new Date(`2020-01-01T${hora}`);
  console.log(tentariva);
}
testePraBia();
