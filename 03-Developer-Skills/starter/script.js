// Remember, we're gonna use strict mode in all scripts now!
'use strict';

function temperaturesAmplitude() {
  const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

  function calcAmplitude(arr) {
    let biggerTemperature = 0;

    let smallerTemperature = 0;

    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== `number`) continue;

      if (arr[i] > biggerTemperature) biggerTemperature = arr[i];

      if (arr[i] < smallerTemperature) smallerTemperature = arr[i];
    }

    return biggerTemperature - smallerTemperature;
  }

  console.log(calcAmplitude(temperatures));
}

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

let temperaturesInDays = `...`;

function printForecast(arr) {
  for (let i = 0; i < arr.length; i++) {
    temperaturesInDays += `${arr[i]}°C in ${i + 1} days...`;
  }

  return temperaturesInDays;
}

console.log(printForecast(data2));
