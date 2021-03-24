'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ``;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i, arr) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type} </div>
      <div class="movements__value"> ${mov}  €</div>
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
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySumary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  //DISPLAY BALANCE
  calcDisplayBalance(acc);

  //DISPLAY MOVEMENTS
  displayMovements(acc.movements);

  //DISPLAY SUMARY
  calcDisplaySumary(acc);
};

createUsernames(accounts);

//current acount
let currentAccount;

//EVENT
btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault(); //prevent form from subbmitting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //DISPLAY UI AND WELCOME MSG
    labelWelcome.textContent = `Good day, ${
      currentAccount.owner.split(` `)[0]
    }!`;
    containerApp.style.opacity = 100;

    //CLEAR FIELDS
    inputLoginPin.value = inputLoginUsername.value = ``;
    inputLoginPin.blur(); // faz perder o foco, o mouse nao fica sobre o campo

    //UPDATE UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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

    //UPDATE UI
    updateUI(currentAccount);

    //CLEAR FIELDS
    inputTransferAmount.value = inputTransferTo.value = ``;
  }
});

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //ADD MOVEMENT
    currentAccount.movements.push(amount);

    //UPDATE UI
    updateUI(currentAccount);

    //clean fields
    inputLoanAmount.value = ``;
  }
});

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
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

  displayMovements(currentAccount.movements, !sortedState);

  sortedState = !sortedState;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

function arrayMethods() {
  let arr = [`a`, `b`, `c`, `d`, `e`];

  //slice
  console.log(arr.slice(2)); //não mudao array original
  console.log(arr.slice(2, 4));
  console.log(arr.slice(-2));

  //splice
  //console.log(arr.splice(2));
  console.log(arr.splice(-1)); // muda o array original
  console.log(arr.splice(1, 2));
  console.log(arr);

  //reverse
  arr = [`a`, `b`, `c`, `d`, `e`];

  let arr2 = [`j`, `i`, `h`, `g`, `f`];

  console.log(arr2.reverse());
  console.log(arr2); //muda o array original

  //concat
  const letters = arr.concat(arr2);
  console.log(letters);
  //alternativa seria
  console.log([...arr, ...arr2]); //não altera os arrays originais

  //Join
  console.log(letters.join(`-`)); // resultado é uma string
}
//arrayMethods()

function foreachMethod() {
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  //FOR OF PORDE SER QUEBRADO, INTERROMPIDO
  for (const [i, movement] of movements.entries()) {
    //for (const movement of movements) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${i + 1}:You withdrew ${Math.abs(movement)}`);
    }
  }

  console.log(`--------------------FOREACH--------------------`);
  //NÃO PODE SER QUEBRADO OU INTERROMPIDO
  movements.forEach(function (movement, index, array) {
    if (movement > 0) {
      console.log(`Movement ${index + 1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
    }
  });
}
//foreachMethod()

function forEachMethodSetMap() {
  //MAP
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);

  currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
  });

  const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
  currenciesUnique.forEach(function (value, _value, map) {
    console.log(`${_value}: ${value}`);
  });
}
//forEachMethodSetMap

function codyChalenge() {
  // Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
  // § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
  const juliaData1 = [3, 5, 2, 12, 7];
  const juliaData2 = [9, 16, 6, 8, 3];
  const kateData1 = [4, 1, 15, 8, 3];
  const kateData2 = [10, 5, 6, 1, 4];

  const checkDogs = function (dogsJulia, dogsKate) {
    const correctDogsJulia = [...dogsJulia];
    correctDogsJulia.splice(0, 1);
    correctDogsJulia.splice(-2);

    const ageAllDogs = [...correctDogsJulia, ...dogsKate];

    console.log(dogsJulia);
    console.log(dogsKate);
    console.log(correctDogsJulia);
    console.log(ageAllDogs);

    ageAllDogs.forEach((dog, i) => {
      if (dog > 2) {
        console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
      } else {
        console.log(`Dog number ${i + 1} is still a puppy 🐶`);
      }
    });
  };
  checkDogs(juliaData1, kateData1);
  checkDogs(juliaData2, kateData2);
}
//codyChalenge()

function theMapMethod() {
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  const eurToUsd = 1.1;

  const movementsUSD = movements.map(mov => mov * eurToUsd);

  console.log(movements);
  console.log(movementsUSD);

  const movementsUSDfor = [];
  for (const mov of movements) {
    movementsUSDfor.push(mov * eurToUsd);
  }
  console.log(movementsUSDfor);

  const movementsDescriptions = movements.map(
    (mov, i) =>
      `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(
        mov
      )}`
  );

  console.log(movementsDescriptions);
  console.log(movementsDescriptions.join(`\n`));
}
//theMapMethod

function filterAndReduce() {
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  const deposits = movements.filter(mov => mov > 0);

  console.log(deposits);

  const withdraws = movements.filter(mov => mov < 0); //value, index, array

  console.log(withdraws);

  const balance = movements.reduce((acc, mov) => acc + mov, 100); //accumulator, value, index , arra // o valor depois da conta matematica, é o valor a soma ja começa, se for 100 sera 100+ os valores do array

  console.log(balance);

  //maximum valor movements array
  const maxValor = movements.reduce((acc, mov) => {
    if (acc > mov) return acc;
    else return mov;
  }, movements[0]);

  console.log(maxValor);
}
//filterAndReduce()

function codyChalenge2() {
  const calcAverageHumanAge = function (dogsAge) {
    const humanDogAges = dogsAge
      .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
      .filter(dogHumanAge => dogHumanAge >= 18)
      .reduce(
        (acc, oldDogHumanAge, i, arr) => acc + oldDogHumanAge / arr.length,
        0
      );
    console.log(humanDogAges);
  };

  calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
  calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
}
//codyChalenge2

function findMethod() {
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  const totalDepositsUSD = movements
    .filter(mov => mov > 0)
    .map(mov => mov * 1.1)
    .reduce((acc, mov) => acc + mov, 0);

  console.log(totalDepositsUSD);

  const firstWithdraew = movements.find(mov => mov < 0);

  console.log(firstWithdraew); // mostra o primeiro elemento que satisfaça a condição aplicada no find

  const account = accounts.find(acc => acc.owner === `Jessica Davis`);
  console.log(account);
}
//findMethod();

function someAndEveryMethod() {
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  //SOME
  console.log(movements.includes(-130));

  const anyDeposits = movements.some(mov => mov > 1500);
  console.log(anyDeposits);

  //EVERY
  console.log(movements.every(mov => mov > 0));
  console.log(movements.every(mov => typeof mov === `number`));

  //Separate callback
}
//someAndEveryMethod();

function flatAndFlatMapMethod() {
  const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
  console.log(arr.flat());

  const arrDeepNesthed = [[[1, 2], 3], [4, [5, 6]], 7, 8];
  console.log(arrDeepNesthed.flat(2));
  //flat
  const overalBalance = accounts
    .map(acc => acc.movements)
    .flat(1)
    .reduce((acc, mov) => acc + mov, 0);

  console.log(overalBalance);

  //flatMap
  const overalBalance2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);

  console.log(overalBalance2);
}
//flatAndFlatMapMethod()

function sortMethod() {
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  const owners = [`Jonas`, `Martha`, `Zach`, `Adam`]; //altera o array original
  console.log(owners.sort());

  // return <0 A, B ( KEEP ORDER)
  // return >0 A, B (SWITCHORDER  )

  movements.sort((a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
  });
  console.log(movements);

  movements.sort((a, b) => {
    if (a > b) return -1;
    if (b > a) return 1;
  });

  console.log(movements);

  //MÉTODO MAIS PRATICO
  movements.sort((a, b) => a - b);
  console.log(movements);
}
//flatAndFlatMethod()

function fillAndFromMethod() {
  const arr = [1, 2, 3, 4, 5, 6, 7];

  const x = new Array(7); // cria um array vazio com o tamnho 7
  console.log(x);

  //x.fill(1); // unico metodo que funciona nesse tipo de array, preeenche o array com 1, ou outro argumento escolhido
  x.fill(1, 3, 5); // preenche o array com 1 a partir do index 3 e para de preencher no index 5
  console.log(x);

  arr.fill(23, 2, 6);
  console.log(arr);

  const y = Array.from({ length: 7 }, () => 1);
  console.log(y);

  const z = Array.from({ length: 7 }, (cur, i) => i + 1);
  console.log(z);

  labelBalance.addEventListener(`click`, function () {
    const movementsUI = Array.from(
      document.querySelectorAll(`.movements__value`),
      el => Number(el.textContent.replace(`€`, ``))
    );
    console.log(movementsUI);
  });
}
//fillAndFromMethod()

function codyChalenge3() {
  const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

  dogs.forEach(
    (dog, i) => (dogs[i].recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
  );

  console.log(dogs);

  //const sarahDog = dogs.find(dog => dog.owners.find(owner => owner === `Sarah`));
  const sarahDog = dogs.find(dog => dog.owners.includes(`Sarah`));

  const dogsAlimentation = function (dog) {
    if (
      sarahDog.curFood > sarahDog.recommendedFood * 0.9 &&
      sarahDog.curFood < sarahDog.recommendedFood * 1.1
    )
      console.log(`It's eating an okay amount.`);
    if (sarahDog.curFood < sarahDog.recommendedFood * 0.9)
      console.log(`It's eating too little`);
    else console.log(`It's eating too much`);
  };
  dogsAlimentation(sarahDog);

  const ownersEatTooMuch = dogs
    .filter((dog, i) => dog.curFood > dog.recommendedFood * 1.1)
    .flatMap(dog => dog.owners);

  console.log(ownersEatTooMuch);

  const ownersEatTooLittle = dogs
    .filter((dog, i) => dog.curFood < dog.recommendedFood * 0.9)
    .flatMap(dog => dog.owners);

  console.log(ownersEatTooLittle);

  console.log(`${ownersEatTooLittle.join(` and `)}'s dogs eat too little!`);

  console.log(`${ownersEatTooMuch.join(` and `)}'s dogs eat too much!`);
  // const allDogsAlimentation = function (dogs) {

  console.log(dogs.some(dog => dog.recommendedFood === dog.curFood));
  console.log(
    dogs.some(
      dog =>
        dog.curFood > dog.recommendedFood * 0.9 &&
        dog.curFood < dog.recommendedFood * 1.1
    )
  );

  const ownersEatOkay = dogs
    .filter(
      (dog, i) =>
        dog.curFood > dog.recommendedFood * 0.9 &&
        dog.curFood < dog.recommendedFood * 1.1
    )
    .flatMap(dog => dog.owners);

  console.log(ownersEatOkay);

  const dogsCopy = dogs
    .slice()
    .sort((a, b) => a.recommendedFood - b.recommendedFood);

  console.log(dogs);
  console.log(dogsCopy);

  //   if (
  //     sarahDog.curFood > sarahDog.recommendedFood * 0.9 &&
  //     sarahDog.curFood < sarahDog.recommendedFood * 1.1
  //   )
  //     console.log(`It's eating an okay amount.`);
  //   if (sarahDog.curFood < sarahDog.recommendedFood * 0.9)
  //     console.log(`It's eating too little`);
  //   else console.log(`It's eating too much`);
  // };
}

const mock = [
  {
    currency: 'R$',
    id: 1,
    nome: 'Demanda',
    paramAmount: 696.6,
    refdate: '2020-12-01T00:00:00',
  },
  {
    currency: 'R$',
    id: 2,
    nome: 'Consumo',
    paramAmount: 4908.104,
    refdate: '2020-12-01T00:00:00',
  },
  {
    currency: 'R$',
    id: 1,
    nome: 'Demanda',
    paramAmount: 696.6,
    refdate: '2021-01-01T00:00:00',
  },
  {
    currency: 'R$',
    id: 2,
    nome: 'Consumo',
    paramAmount: 4190.231,
    refdate: '2021-01-01T00:00:00',
  },
  {
    currency: 'R$',
    id: 1,
    nome: 'Demanda',
    paramAmount: 696.6,
    refdate: '2021-02-01T00:00:00',
  },
  {
    currency: 'R$',
    id: 2,
    nome: 'Consumo',
    paramAmount: 3706.402,
    refdate: '2021-02-01T00:00:00',
  },
  {
    currency: 'R$',
    id: -1,
    nome: 'Excedentes Reativos',
    paramAmount: 0,
    refdate: '2020-12-01T00:00:00',
  },
  {
    currency: 'R$',
    id: -1,
    nome: 'Excedentes Reativos',
    paramAmount: 0,
    refdate: '2021-01-01T00:00:00',
  },
  {
    currency: 'R$',
    id: -1,
    nome: 'Excedentes Reativos',
    paramAmount: 0,
    refdate: '2021-02-01T00:00:00',
  },
  {
    currency: 'R$',
    id: -2,
    nome: 'Impostos',
    paramAmount: 1470.9929,
    refdate: '2020-12-01T00:00:00',
  },
  {
    currency: 'R$',
    id: -2,
    nome: 'Impostos',
    paramAmount: 1286.3351,
    refdate: '2021-01-01T00:00:00',
  },
  {
    currency: 'R$',
    id: -2,
    nome: 'Impostos',
    paramAmount: 1161.8801,
    refdate: '2021-02-01T00:00:00',
  },
];

let uniqueData = new Set();

mock.forEach((item, index) => {
  uniqueData.add(item.refdate);
});

const diferenteDatas = [...uniqueData];
const arr = [];

diferenteDatas.forEach((data, i) => {
  let arrL = mock.find(item => item.refdate === data);
  console.log(`Arr` + arrL);
  //arr.push([mock.find(item => item.refdate === data)]);
});

// console.log(uniqueData);
// console.log(diferenteDatas);

// //console.log(arr);

const array = [
  { a: 1, b: 1 },
  { a: 2, b: 4 },
  { a: 1, b: 2 },
  { a: 1, b: 3 },
  { a: 2, b: 0 },
];

const ar = array.find(a => a);
