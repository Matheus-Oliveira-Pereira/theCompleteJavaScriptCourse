'use strict';

const weekdays = [`mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enhanced objects literals
  openingHours,

  order(starteIndex, mainIndex) {
    return [this.starterMenu[starteIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery(starteIndex, mainIndex, time, addres) {
    console.log(
      `Order recived ${this.starterMenu[starteIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${addres} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...OtherIngredients) {
    console.log(mainIngredient);
    console.log(OtherIngredients);
  },
};

function destructuringArrays() {
  const arr = [1, 2, 3];

  const [x, y, z] = arr; //armazenando dados de um array em variaveis
  console.log(x, y, z);

  let [main, , secundary] = restaurant.categories; // armazenando dados selecionados de um array em variaveis
  console.log(main, secundary);

  [main, secundary] = [secundary, main]; // invertando os valores

  console.log(main, secundary);

  console.log(restaurant.order(2, 0));

  //recebendo dos valores no return da função
  const [starter, mainCourse] = restaurant.order(2, 0);
  console.log(starter, mainCourse);

  const nested = [2, 4, [5, 6]];

  let [a, , [b, c]] = nested;
  console.log(a, b, c);

  //default values
  const [p = 1, q = 1, r = 1] = [5, 6];
  console.log(p, q, r);
}
//destructuringArrays()

function destructuringObejcts() {
  const { name, openingHours, categories } = restaurant;
  console.log(name, openingHours, categories);

  const {
    name: restaurantName,
    openingHours: hours,
    categories: tags,
  } = restaurant;

  //default vallues
  console.log(restaurantName, hours, tags);
  const { menu = [], starterMenu: starters = [] } = restaurant;
  console.log(menu, starters);

  //mutating variables
  let a = 111;
  let b = 999;
  const obj = {
    a: 23,
    b: 7,
    c: 14,
  };

  ({ a, b } = obj);
  console.log(a, b);

  //nested objects
  const {
    fri: { open, close },
  } = openingHours;
  console.log(open, close);

  restaurant.orderDelivery({
    time: '22:30',
    addres: `avenida via del sole, 21`,
    mainIndex: 2,
    starteIndex: 2,
  });
}
//destructuringObejcts();

function spreadOperator() {
  const arr = [7, 8, 9];

  const newArray = [1, 2, ...arr];
  console.log(newArray);

  const newMenu = [...restaurant.mainMenu, `Gnocci`];
  console.log(newMenu);

  //copy array
  const mainMenuCopy = [...restaurant.mainMenu];

  //merge arrays
  const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
  console.log(menu);

  //ITERABLES: arrys, strings, maps, sets. Not Obejcts
  const str = `Jonas`;
  const letters = [...str];
  console.log(letters);

  // const ingredients = [
  //   prompt(`Lets's make pasta!
  // Igredient 1?`),
  //   prompt(`Lets's make pasta!
  // Igredient 2?`),
  //   prompt(`Lets's make pasta!
  // Igredient 3?`),
  // ];

  // restaurant.orderPasta(...ingredients);

  //Obejects
  const newRestaurant = { foudedeIn: 1998, ...restaurant, founder: `Guiseppe` };
  console.log(newRestaurant);

  const restaurantCopy = { ...restaurant };
  restaurantCopy.name = `Ristorante Roma`;
  console.log(restaurant);
  console.log(restaurantCopy);
  console.log(restaurant.name);
}
//spreadOperator();

function restPatternAndParameters() {
  //1) destructuring
  const [a, b, ...others] = [1, 2, 3, 4, 5, 6];
  console.log(a, b, others);

  const [pizza, , rissoto, ...otherFoods] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
  ];

  console.log(pizza, rissoto, otherFoods);

  //Objects
  const { sat, ...weekdays } = restaurant.openingHours;
  console.log(weekdays);

  //2)functions
  const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
  };

  add(2, 3);
  add(5, 6, 5, 4, 5);
  add(1, 8, 7, 7, 8, 9, 4, 6, 1, 4);

  const x = [23, 5, 7];
  add(...x);

  restaurant.orderPizza(`cogumelo`, `calabresa`, `ovo0`, `sal`);
}
//restPatternAndParameters()

function shortCircuiting() {
  // Use Any data types , can return any data type,short-circuiting
  console.log(`------OR------`);
  console.log(3 || `jonas`);
  console.log(`` || `jonas`);
  console.log(true || 0);
  console.log(undefined || null);
  console.log(undefined || 0 || '' || `hello` || 23 || null);

  const guests = restaurant.numGuest ? restaurant.numGuest : 10;
  console.log(guests);

  const guests2 = restaurant.numGuest || 10;
  console.log(guests2);

  console.log(`------AND------`);

  console.log(0 && `jonas`);
  console.log(7 && `jonas`);
  console.log(`hello` && 23 && null && `jonas`);

  if (restaurant.orderPizza) {
    restaurant.orderPizza(`cogumelo`, `espinafre`);
  }
  restaurant.orderPizza && restaurant.orderPizza(`cogumelo`, `espinafre`);
}
//shortCircuiting();
function nullishCoalescingOperator() {
  restaurant.numGuest = 0;
  const guests = restaurant.numGuest || 10;
  console.log(guests);

  const guestsCorrect = restaurant.numGuest ?? 10;
  console.log(guestsCorrect);
}
//nullishCoalescingOperator();

function codyChallenge1() {
  const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };

  const [player1, player2] = game.players;
  const [gk, ...fieldPlayers] = player1;
  const allplayers = [...player1, ...player2];
  const players1Final = [...player1, `Thiago`, `Costa`, `Perisic`];
  const {
    odds: { team1, x: draw, team2 },
  } = game;

  const printGoals = function (...playerNames) {
    console.log(`${playerNames.length} gols feitos`);
    // for (let i = 0; i < playerNames.length; i++) {
    //   console.log(`${playerNames[i]}(1)`);
    // }
  };
  console.log(player1, player2);
  console.log(gk, fieldPlayers);
  console.log(allplayers);
  console.log(players1Final);
  console.log(team1, draw, team2);

  restaurant.orderPizza(`Calabresa`, `pepperoni`, `champinhos`);
  printGoals(...game.scored);

  team1 < team2 && console.log(`${game.team1} is more likely to win`);

  team2 < team1 && console.log(`${game.team2} is more likely to win`);
}
//codyChallenge1();

function forOfLoop() {
  const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

  for (const item of menu) console.log(item); //percorre automaticamente o array

  for (const [i, el] of menu.entries()) {
    //entries separa o counteudo entre o numero equuivale a posição do iten no array, e o item
    console.log(`${i + 1}: ${el}`);
  }
}
//forOfLoop();

function optionalChaining() {
  //whit optnal chaining
  console.log(restaurant.openingHours.mon?.open); //? verifica se mon existe, caso seja undefined retorna imediatamente

  //Example
  const days = [`mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`];
  for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? `close`;
    console.log(`On ${day}, we open at ${open}`);
  }

  //methods
  console.log(restaurant.order?.(0, 1) ?? `method  dois not exist`);
  console.log(restaurant.orderNada?.(0, 1) ?? `method  dois not exist`);

  //arrays
  const users = [{ name: `Jonas`, email: `hello@jonas.com.io` }];
  console.log(users[0] ?? `User array dont exist`);
}
//optionalChaining()

function loopingObjects() {
  console.log(`Loooping O ---------------------------------`);

  const properties = Object.keys(restaurant.openingHours); //retorna as propriedades de dentro do objeto passado
  console.log(properties);

  let openStr = `we are open ${properties.length} days:`;

  for (const day of properties) {
    openStr += ` ${day},`;
  }
  console.log(openStr);

  //property values
  const values = Object.values(openingHours); //retorna o counteudo de dentro dos objetos
  console.log(values);

  //entire object
  const entries = Object.entries(openingHours); //retorna o nome "key"(na primeira posição do array) e o counteudo "values"( na segunda posição do array)
  console.log(entries);

  for (const x of entries) {
    //pega array por array
    console.log(x);
  }

  console.log(`-------------------------------------------------`);

  for (const [key, { open, close }] of entries) {
    console.log(`On ${key} we open at ${open} and close at ${close}`);
  }
}
//loopingObjects();

function codyChallenge2() {
  const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };
  //Loop over the game.scored array and print each player name to the console,
  //along with the goal number (Example: "Goal 1: Lewandowski")

  for (const [i, player] of game.scored.entries()) {
    console.log(`Goal ${i + 1}: ${player}`);
  }
  //2
  let averageOdd = 0;
  const odds = Object.values(game.odds);
  for (const values of odds) {
    averageOdd += values;
  }
  averageOdd /= odds.length;
  console.log(averageOdd);

  //3
  for (const [team, odds] of Object.entries(game.odds)) {
    const teamStr = team === `x` ? `Draw` : `Victory ${game[team]}`;
    console.log(`Odd of ${teamStr}: ${odds}`);
  }

  const scorers = {};
  for (const player of game.scored) {
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);
  }
  console.log(scorers);
}
//codyChallenge2();

function sets() {
  const orderSets = new Set([
    `pasta`,
    `pizza`,
    `pizza`,
    `risotto`,
    `pasta`,
    `pizza`,
  ]);

  console.log(orderSets);
  console.log(orderSets.size); //quantidade de elementos dentro do set
  console.log(orderSets.has(`pizza`));
  console.log(orderSets.has(`bread`));
  orderSets.add(`Garlic Bread`);
  orderSets.add(`Garlic Bread`);
  orderSets.delete(`risotto`);
  //orderSets.clear(); limpa o set
  console.log(orderSets);

  for (const order of orderSets) console.log(order);

  console.log(new Set(`ariane`));

  //example
  const staff = [`Waiter`, `Chef`, `Waiter`, `Manager`, `Chef`, `Waiter`];
  const staffUnique = [...new Set(staff)];
  console.log(staffUnique);
}
sets();

function maps() {
  const rest = new Map();
  rest.set(`name`, `classico Italiano`);
  rest.set(1, `Firenze, Italy`);
  rest.set(2, `Lisbon, Portugal`);
  rest
    .set(`categories`, ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set(`Open:`, 11)
    .set(`Close:`, 23)
    .set(true, `We are open`)
    .set(false, `We are close`);
  console.log(rest.get(`name`));
  console.log(rest.get(true));
  console.log(rest);

  const time = 8;
  console.log(rest.get(time > rest.get(`Open:`) && time < rest.get(`Close:`)));

  console.log(rest.has(`categories`));
  rest.delete(2);
  rest.set([1, 2], `Test`);
  console.log(rest);
  console.log(rest.size);
  //clear também funciona
}
//maps();
function mapsInteration() {
  const question = new Map([
    [`Question`, `What is the best progamming language in the world?`],
    [1, `C`],
    [2, `JAVA`],
    [3, `JavaScript`],
    [`Correct`, 3],
    [true, `Correct 🎉`],
    [false, `Try Again`],
  ]);
  console.log(question);

  //convert object to map
  const hoursMap = new Map(Object.entries(openingHours));
  console.log(hoursMap);
  console.log(
    `------------------------------------------------------------------`
  );
  //quiz app
  console.log(question.get(`Question`));
  for (const [key, value] of question) {
    if (typeof key === `number`) console.log(`Answer ${key}: ${value}`);
  }
  const answer = 3; //Number(prompt(`Your Answer`));
  console.log(answer);

  console.log(question.get(answer === question.get(`Correct`)));

  //convert map to array]
  console.log([...question]);
  console.log([...question.entries()]);
  console.log([...question.values()]);
  console.log([...question.keys()]);
}
//mapsInteration()

/* quando escolher mas, set. objeto, array

DADOS PODEM VIR:

  * DO PRÓPIO PROGAMA
  * DA UI
  * FONTES EXTERNAS(API)
      API = INTERFACE DE PROGAMAÇÃO DE APLICATIVOS

  DESSAS FONTES CONSEGUIMOS DIVERSOS DADOS, QUE PRECIMAMOS ARMAZENAR, PARA ARMAZENAR PRECISAMOS DE "DATA STRUCTURES", PARA ESCOLHER
  FAÇA A SEGUINTE PERGUNTA:
  PRECISO DE UMA LISTA SIMPLES DE VALORES?
    SIM - USE UM ARRAY OU UM SET
    NÃO, PRECISO DE PARES DE VALORES - USE OBJETOS OU MAPS ( DESSA FORMA VOCÊ PODE DESCREVER OS VALORES ATRAVÉS DA KEY)



  ---------------------------------------------------ARRAY VS SET----------------------------------------------------------------
  USAR ARRAYS QUANDO: 
    1 - QUNADO VOCÊ QUER DADOS ARMAZENADOS EM ORDEM
    2 - QUANDO PODE CONTER DUPLICATAS 
    3 - QUADO QUISER MANIPULAR DADOS

  USAR SETS QUANDO:
    1 - VALOIRES UNICOS
    2 - ALTA PERFORMANCE
    3 - REMOVER DUPLICATAS

    ---------------------------------------------------OBJECTS VS MAPS----------------------------------------------------------------
  USAR OBJECTS QUANDO: 
    1 - TRADICIONAL
    2 - FACIL DE ESCREVER PARA ACESSAR
    3 - QUNADO VOCE PRECISA INCLUIR FUNÇÕES
    4 - USAR QUANDO ESTIVER TRABALHANDO COM JSON, PODE SER CONVERTIFO PARA MAP

  USAR MAPS QUANDO:
    1 - MELHOR PERFORMANCE
    2 - KEYS PODEM SER DE QUALQUER TIPO DE DADO
    3 - FACIL DE INTERAR
    4 - FACIL DE COMPUTAR O TAMNHO
    5 - USAR QUNADO VC PRECISAR  MAPEAR UMA KEY PARA SEUS VALORES
    6 - QUNADO VC PRECISA QUE AS KEYS NÃO SEJAM STRINGS
*/

function codyChallenge3() {
  const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔄 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔄 Substitution'],
    [64, '🟨 Yellow card'],
    [69, '🟥 Red card'],
    [70, '🔄 Substitution'],
    [72, '🔄 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🟨 Yellow card'],
  ]);

  //1
  const events = [...new Set([...gameEvents.values()])];
  console.log(events);

  //2
  gameEvents.delete(64);
  console.log(gameEvents);

  //3
  const time = [...gameEvents.keys()].pop();

  console.log(
    `An event happened, on average, every ${
      time / [...gameEvents.values()].length
    } minutes`
  );

  //4
  for (const [key, value] of gameEvents) {
    const eventStr =
      key <= 45
        ? `[FIRST HALF]${key}:${value}`
        : `[SECOND HALF]${key}:${value}`;
    console.log(eventStr);
  }
}
//codyChallenge3();

function strings1() {
  const airline = `TAP Air Portugal`;
  const plane = 'A320';

  console.log(plane[0]);
  console.log(plane[1]);
  console.log(plane[2]);

  console.log(airline.length);
  console.log(`B737`[0]);
  console.log(`B737`.length);

  console.log(airline.indexOf(`r`));
  console.log(airline.lastIndexOf(`r`));
  console.log(airline.indexOf(`Portugal`));
  console.log(airline.slice(4));
  console.log(airline.slice(4, 7));

  console.log(airline.slice(0, airline.indexOf(` `)));
  console.log(airline.slice(airline.lastIndexOf(` `) + 1));

  console.log(airline.slice(-2));
  console.log(airline.slice(1, -1));

  const checkMiddleSeat = function (seat) {
    //B AND E ARE THE MIDDLE SEATS
    const s = seat.slice(-1);

    console.log(
      s === `B` || s === `E` ? `You got the middle seat 😅` : `You got lucky 😎`
    );
  };
  checkMiddleSeat(`11B`);
  checkMiddleSeat(`23C`);
  checkMiddleSeat(`3E`);
  checkMiddleSeat(`20A`);
}
//strings1();

function strings2() {
  const airline = `TAP Air Portugal`;

  console.log(airline.toLowerCase());
  console.log(airline.toUpperCase());

  //Fix capitalization in name
  const passenger = `jONaS`; //Jonas
  const passengerLowerCase = passenger.toLowerCase();
  const passengerCorrect =
    passengerLowerCase[0].toUpperCase() + passengerLowerCase.slice(1);
  console.log(passengerCorrect);

  // Comparing email
  const email = `hello@jonas.io`;
  const loginEmail = ` Hello@Jonas.Io \n`;
  const lowerLoginEmail = loginEmail.toLowerCase();
  const trimmedLoginEmail = lowerLoginEmail.trim(); //exclui espaços em branco
  console.log(trimmedLoginEmail);

  const normalizeLoginEmail = loginEmail.toLowerCase().trim();
  console.log(normalizeLoginEmail);
  console.log(normalizeLoginEmail === email);

  // replacing4
  const priceGB = `288,97$`;
  const priceUS = priceGB.replace(`$`, `#`).replace(`,`, `.`);
  console.log(priceUS);

  const announcement = `All passengers como to barding door 23. Boarding door 23`;
  const announcement2 = announcement.replace(/door/g, `gate`);
  const announcementCorrect = announcement.replaceAll(`door`, `gate`); //usar esse
  console.log(announcement);
  console.log(announcementCorrect);

  //Booleans
  const plane = `Airbus A320neo`;
  console.log(plane.includes(`A320`));
  console.log(plane.includes(`Boeing`));
  console.log(plane.includes(`Air`));
  console.log(plane.includes(`Aib`));

  if (plane.startsWith(`Airbus`) && plane.endsWith(`neo`))
    console.log(`part of the NEW Airbus family`);

  //Pratice Exercise
  const checkBagagge = function (items) {
    const bagagge = items.toLowerCase();
    if (bagagge.includes(`knife`) || bagagge.includes(`gun`)) {
      console.log(`You are  NOT allowed on board`);
    } else {
      console.log(`Welcome aboard!`);
    }
  };
  checkBagagge(`I have a Laptop, some Food and pocket Knife`);
  checkBagagge(`Socks and Camera`);
  checkBagagge(`Got some snacks and a gun for protection`);
}

function strings3() {
  //Split and Join
  console.log(`a+very+nice+string`.split(`+`));
  console.log(`Jonas Schmedtmann`.split(` `));

  const [firstName, lastName] = `Jonas Schmedtmann`.split(` `);
  const newName = [`Mr.`, firstName, lastName.toUpperCase()].join(` `);
  console.log(newName);

  const capitalizaeName = function (name) {
    const names = name.split(` `); //faz um array
    const namesUppercase = [];
    for (const n of names) {
      namesUppercase.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUppercase.join(` `));
  };

  capitalizaeName(`Jessica ann smith davs`);
  capitalizaeName(`jonas schmedtmann`);

  //padding
  const message = `Go to gate 23`;
  console.log(message.padStart(25, `+`).padEnd(35, `+`));

  const maskCreditCard = function (number) {
    const str = number + ``;
    const last = str.slice(-4);
    return last.padStart(str.length, `*`);
  };
  console.log(maskCreditCard(64321665419974));
  console.log(maskCreditCard(`5165164631687432817`));
  console.log(maskCreditCard(7624627614817194));

  //repeat
  const message2 = `bad warther... All Derpartues Delayed...`;
  console.log(message2.repeat(3));

  const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${`✈`.repeat(n)}`);
  };

  planesInLine(5);
  planesInLine(20);
}
//strings3()

function codyChallenge4() {
  document.body.append(document.createElement('textarea'));
  document.body.append(document.createElement('button'));

  function camelCaseConvert(strings) {
    let wordSplit = [];
    for (const [i, word] of strings.entries()) {
      wordSplit = word.toLowerCase().trim().split(`_`);
      wordSplit[1] = wordSplit[1].replace(
        wordSplit[1][0],
        wordSplit[1][0].toUpperCase()
      );
      console.log(
        `${wordSplit.join(``).padEnd(30, ` `)} ${`✅`.repeat(i + 1)}`
      );
    }
  }

  document.querySelector(`button`).addEventListener(`click`, function () {
    const text = document.querySelector(`textarea`).value;
    const rows = text.split(`\n`);
    console.log(rows);
    camelCaseConvert(rows);
  });

  // camelCaseConvert(
  //   `underscore_case`,
  //   `  first_name`,
  //   `Some_Variable`,
  //   `  calculate_AGE`,
  //   `delayed_departure`
  // );
}
//codyChallenge4();

const x = ` passaro`;

console.log(x.slice(1));
