"use strict"; //stric mode  - tem que ser a primeira linha do codigo

function logger() {
  console.log(`meu nome é matheus`);
}
//logger()

function fruitProcessor(apples, oranges) {
  const juice = `suco com ${apples} maçãs e com ${oranges} larajas`;
  return juice;
}
//const appleJuice = fruitProcessor(5, 0)
//console.log(appleJuice)

//const appleOrangeJuice = fruitProcessor(3, 2)
//console.log(appleOrangeJuice)

function functionExpression() {
  const calcAge = function (birthYear) {
    return 2021 - birthYear;
  };

  const age = calcAge(1998);
  console.log(age);
}

function arrowFunction() {
  const calcAge = (birthYear) => 2021 - birthYear;

  const age = calcAge(1998);
  console.log(age);

  const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2020 - birthYear;
    const retirement = 65 - age;
    return `faltam ${retirement} anos para o ${firstName} se aposentar`;
  };

  console.log(yearsUntilRetirement(1998, `Matheus`));
}
//arrowFunction()

function callingFunctionInAFunction() {
  function cutFruitPieces(fruit) {
    return fruit * 4;
  }

  function fruitProcessor(apples, oranges) {
    const applesPices = cutFruitPieces(apples);
    const orangesPieces = cutFruitPieces(oranges);

    const juice = `suco com ${applesPices} pedaços de maçã e com ${orangesPieces} pedaços de laraja`;
    return juice;
  }

  const appleJuice = fruitProcessor(5, 0);
  console.log(appleJuice);

  const appleOrangeJuice = fruitProcessor(3, 2);
  console.log(appleOrangeJuice);
}
//callingFunctionInAFunction()

function exercise1Part2() {
  const calcAverage = (score1, score2, score3) =>
    (score3 + score2 + score1) / 3;

  let calcAvgDolphins = calcAverage(44, 23, 71);
  let calcAvgKoalas = calcAverage(65, 54, 49);

  function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
      console.log(` Dolphins wins (${avgDolphins} vs ${avgKoalas})`);
    } else if (avgKoalas >= 2 * avgDolphins) {
      console.log(`Koalas wins (${avgKoalas} vs ${avgDolphins}`);
    } else {
      console.log(`No winners`);
    }
  }

  checkWinner(calcAvgDolphins, calcAvgKoalas);

  calcAvgDolphins = calcAverage(85, 54, 41);
  calcAvgKoalas = calcAverage(23, 34, 27);

  checkWinner(calcAvgDolphins, calcAvgKoalas);
}
//exercise1Part2()

function arrays() {
  const friends = [`savs`, `samir`, `flavio`];

  const yearsl = new Array(1998, 1999, 1997);

  console.log(friends);

  console.log(friends[0]);

  console.log(friends.length);

  console.log(friends[friends.length - 1]);

  friends[2] = `Tales`;

  console.log(friends);

  const firstName = `Matheus`;

  const matheus = [firstName, `Pereira`, 2020 - 1998, friends];

  console.log(matheus);

  const calcAge = function (birthYear) {
    return 2021 - birthYear;
  };

  const years = [1997, 1998, 1999, 1980, 1975];

  console.log(calcAge(years[0]));

  const ages = [
    calcAge(years[0]),
    calcAge(years[1]),
    calcAge(years[2]),
    calcAge(years[years.length - 1]),
  ];

  console.log(ages);
}
//arrays()

function arraysOperantion() {
  const friends = [`savs`, `samir`, `flavio`];

  friends.push(`Rica`); //add rica no final do array friends
  friends.unshift(`Jordan`); //add jordan ao inicio do array friends
  console.log(friends);

  friends.pop(); //remove o ultimo elemento do array
  friends.shift(); //remove o primeiro elemento do array

  console.log(friends);

  console.log(friends.indexOf(`samir`));
  console.log(friends.indexOf(`Rica`));
  console.log(friends.includes(`Samir`));
}
//arraysOperantion()

function codyChallenge2() {
  function calcTip(bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  }

  const bills = [125, 500, 44];
  const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
  const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];

  console.log(bills);
  console.log(tips);
  console.log(total);
}
//codyChallenge2()

function objects() {
  const jonas = {
    firstName: `Jonas`,
    lastName: `Schmedtmann`,
    age: 2037 - 1991,
    job: `Teacher`,
    friends: [`Michael`, `Peter`, `Steven`],
  };

  console.log(jonas);
  console.log(jonas.lastName);
  console.log(jonas[`lastName`]);

  const nameKey = `Name`;
  console.log(jonas[`first` + nameKey]);
  console.log(jonas[`last` + nameKey]);

  const interesredIn = prompt(`No que vc ta enteressado porra escolhe ae`);

  if (jonas[interesredIn]) {
    console.log(jonas[interesredIn]);
  } else {
    console.log(`Não caralho, isso eu não sei informar `);
  }

  jonas.location = `Portugal`;
  jonas[`twitter`] = `@jonasschmedtman`;
  console.log(jonas);

  console.log(
    `${jonas.firstName} tem ${jonas.friends.length} amigos, e seu melhor amigo é o ${jonas.friends[0]}`
  );
}
//objects()

function objects2() {
  const jonas = {
    firstName: `Jonas`,
    lastName: `Schmedtmann`,
    birthYear: 1991,
    job: `Teacher`,
    friends: [`Michael`, `Peter`, `Steven`],
    hasDriverLicense: false,
    //calcAge: function (birthYear) {
    //    return 2037 - birthYear;
    //}
    //calcAge: function () {
    //    return 2037 - this.birthYear
    //}
    calcAge: function () {
      this.age = 2037 - this.birthYear;
      return this.age;
    },

    getSumary: function () {
      return `${this.firstName} is a ${this.calcAge()}-year old ${
        this.job
      }, and he has ${this.hasDriverLicense ? `a` : `no`} driver's license.`;
    },
  };

  console.log(jonas.calcAge());

  console.log(jonas.age);

  console.log(jonas.getSumary());
}
//objects2()

function codyChallenge3() {
  const mark = {
    fullName: `Mark Miller`,
    mass: 78,
    height: 1.69,
    calcBMI: function () {
      this.bmi = this.mass / this.height ** 2;
      return this.bmi;
    },
  };

  const john = {
    fullName: `John Smith`,
    mass: 92,
    height: 1.95,
    calcBMI: function () {
      this.bmi = this.mass / this.height ** 2;
      return this.bmi;
    },
  };

  if (mark.calcBMI() > john.calcBMI()) {
    console.log(
      `${mark.fullName} BMI(${mark.bmi}) is higher than ${john.fullName}(${john.bmi})`
    );
  } else {
    console.log(
      `${john.fullName} BMI(${john.bmi}) is higher than ${mark.fullName}(${mark.bmi})`
    );
  }
}
//codyChallenge3()

function loopFor() {
  for (let rep = 1; rep <= 10; rep++) {
    //fica em loop até o rep chegar em 10, rep++ faz somar 1 a variavel rep depois do loop
    console.log(`lifting wights repetition ${rep} `);
  }
}
//loopFor()

function loopForInArrays() {
  const jonasArray = [
    `Jonas`,
    `Schmedtmann`,
    2037 - 1991,
    `Teacher`,
    [`Michael`, `Peter`, `Steven`],
    true,
  ];

  const JonasArrayTypeof = [];

  for (let i = 0; i < jonasArray.length; i++) {
    console.log(jonasArray[i]);

    //JonasArrayTypeof[i] = typeof jonasArray[i]; ouuuuu
    JonasArrayTypeof.push(typeof jonasArray[i]);
  }

  console.log(JonasArrayTypeof);

  const years = [1999, 1998, 1987, 1970];
  const age = [];

  for (let i = 0; i < years.length; i++) {
    age.push(2020 - years[i]);
  }

  console.log(age);

  console.log(`continue in loops`);
  for (let i = 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] !== `string`) continue;
    console.log(jonasArray[i]);
  }

  console.log(`breack in loops`);
  for (let i = 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] === `number`) break;
    console.log(jonasArray[i]);
  }
}
loopForInArrays();

function loopBackwardsAndLoopsInsideLoops() {
  const jonasArray = [
    `Jonas`,
    `Schmedtmann`,
    2037 - 1991,
    `Teacher`,
    [`Michael`, `Peter`, `Steven`],
  ];

  for (let i = jonasArray.length - 1; i > -1; i--) {
    console.log(jonasArray[i]);
  }

  for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`--------Starting exercise ${exercise}`);

    for (let rep = 1; rep < 6; rep++) {
      console.log(`Lifting weight repetition ${rep}`);
    }
  }
}
//loopBackwardsAndLoopsInsideLoops()

function loopWhile() {
  let rep = 1;

  while (rep <= 10) {
    console.log(`Lifting weight repetition ${rep}`);
    rep++;
  }

  let dice = Math.trunc(Math.random() * 6) + 1;

  while (dice !== 6) {
    console.log(`you rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log(`loop is about to end...`);
  }
}
//loopWhile()

function codyChallenge4() {
  const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

  const tips = [];

  const totals = [];

  for (let i = 0; i < bills.length; i++) {
    function calcTip(bill) {
      return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
    }
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + tips[i]);
  }

  console.log(bills);
  console.log(tips);
  console.log(totals);
}
//codyChallenge4()

function codyChallenge4Bonus() {
  const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

  const tips = [];

  const totals = [];

  for (let i = 0; i < bills.length; i++) {
    function calcTip(bill) {
      return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
    }

    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + tips[i]);
  }

  function calcAverage(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    let average = sum / arr.length;
    console.log(`the average of the totals is ${average}`);
  }

  calcAverage(totals);
}
codyChallenge4Bonus();
