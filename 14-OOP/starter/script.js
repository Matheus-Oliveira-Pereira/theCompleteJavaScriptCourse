'use strict';

function constructorFunction() {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    //Never to this
    //   this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    //   };
  };

  const jonas = new Person(`Jonas`, 1991);
  console.log(jonas);

  // 1 - new object is created
  // 2 - function is called, this = {}
  // 3 - {} is linked to prototype
  // 4 - function automatically return {}

  const matilda = new Person(`Matilda`, 2017);
  const jack = new Person(`Jack`, 1975);
  console.log(matilda, jack);

  console.log(jonas instanceof Person);

  //prototypes
  Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
  };

  jonas.calcAge();
  matilda.calcAge();
  jack.calcAge();

  console.log(jonas.__proto__);
  console.log(jonas.__proto__ === Person.prototype);

  console.log(Person.prototype.isPrototypeOf(jonas));

  Person.prototype.species = `Homo Sapiens`;
  console.log(jonas.species, matilda.species);

  console.log(jonas.hasOwnProperty(`firstName`));
  console.log(jonas.hasOwnProperty(`species`));

  console.log(jonas.__proto__);
  console.log(jonas.__proto__.__proto__);
  console.log(jonas.__proto__.__proto__.__proto__);
}
//constructorFunction()

function codyChalenge1() {
  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  };

  const bmw = new Car(`BMW`, 120);
  const mercedes = new Car(`Mercedes`, 95);

  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
  };

  Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(this.speed);
  };

  bmw.accelerate();
  bmw.accelerate();
  bmw.brake();
  bmw.brake();
  bmw.brake();
  bmw.brake();
  bmw.brake();
  bmw.brake();
  bmw.brake();
  bmw.brake();

  console.log(`MERCEDES ----------------------`);
  mercedes.accelerate();
  mercedes.accelerate();
  mercedes.brake();
  mercedes.brake();
  mercedes.brake();
}
//codyChalenge1()

function es6Class() {
  //calss expression
  //const PersonCl = class {};

  //class declaration
  class PersonCl {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }

    //methods will be added to .prototype property
    calcAge() {
      console.log(2037 - this.birthYear);
    }
  }

  const jessica = new PersonCl(`Jessica`, 1996);
  console.log(jessica);
  jessica.calcAge();

  PersonCl.prototype.greet = function () {
    console.log(`Hey ${this.firstName}`);
  };

  jessica.greet();
}
//es6Class()

function setterGetters() {
  const account = {
    owner: `Jonas`,
    movements: [200, 530, 120, 300],

    get latest() {
      return this.movements.slice(-1).pop();
    },

    set latest(mov) {
      this.movements.push(mov);
    },
  };

  console.log(account.latest);

  account.latest = 50;
  console.log(account.movements);
}

function staticMethod() {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  const jonas = new Person(`Jonas`, 1991);
  console.log(jonas);

  Person.hey = function () {
    console.log(`Hey there`);
  };

  Person.hey();
}

function objectCreate() {
  const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },

    init(name, birthYear) {
      this.name = name;
      this.birthYear = birthYear;
    },
  };

  const steven = Object.create(PersonProto);
  steven.name = `Steven`;
  steven.birthYear = 2002;
  steven.calcAge();

  const sarah = Object.create(PersonProto);
  sarah.init(`Sarah`, 1979);
  sarah.calcAge;
}

function codyChalenge2() {
  class CarCl {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }

    accelerate() {
      this.speed += 10;
      console.log(this.speed);
    }

    brake() {
      this.speed -= 5;
      console.log(this.speed);
    }

    get speedUS() {
      return this.speed / 1.6;
    }

    set speedUS(speed) {
      this.speed = speed * 1.6;
    }
  }

  const ford = new CarCl(`Ford`, 120);

  console.log(ford.speedUS);
  ford.accelerate();
  ford.accelerate();
  ford.accelerate();
  ford.brake();
  ford.brake();
  ford.speedUS = 50;
  console.log(ford);
}

function prototypeLinkAndClassLink() {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
  };

  const Stundent = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
  };

  Stundent.prototype = Object.create(Person.prototype); //linking prototypes

  Stundent.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and i study ${this.course}`);
  };

  const mike = new Stundent(`Mike`, 2020, `Computer Science`);
  console.log(mike);
  mike.introduce();
  mike.calcAge();
}

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV(`Tesla`, 120, 23);

tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.brake();
tesla.brake();
tesla.brake();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
