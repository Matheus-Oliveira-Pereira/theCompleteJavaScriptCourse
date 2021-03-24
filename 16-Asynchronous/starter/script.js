'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function ajax() {
  // const getCountryData = function (country) {
  //   const request = new XMLHttpRequest();
  //   request.open(`GET`, `https://restcountries.eu/rest/v2/name/${country}`);
  //   request.send();

  //   request.addEventListener(`load`, function () {
  //     const [data] = JSON.parse(this.responseText);
  //     console.log(data);

  //     const html = `
  //   <article class="country">
  //   <img class="country__img" src='${data.flag}' />
  //   <div class="country__data">
  //     <h3 class="country__name"> ${data.name}</h3>
  //     <h4 class="country__region">${data.region}</h4>
  //     <p class="country__row"><span>👫 </span> ${(
  //       data.population / 1000000
  //     ).toFixed(1)} people</p>
  //     <p class="country__row"><span>🗣️</span> ${data.languages[0].name}</p>
  //     <p class="country__row"><span>💰</span> ${data.currencies[0].name}</p>
  //   </div>
  // </article>`;

  //     countriesContainer.insertAdjacentHTML(`beforeend`, html);

  //     countriesContainer.style.opacity = 1;
  //   });
  // };
  const renderCountry = function (data, classname = ``) {
    const html = `
    <article class="country ${classname}">
    <img class="country__img" src='${data.flag}' />
    <div class="country__data">
      <h3 class="country__name"> ${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫 </span> ${(
        data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span> ${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span> ${data.currencies[0].name}</p>
    </div>
  </article>`;

    countriesContainer.insertAdjacentHTML(`beforeend`, html);

    countriesContainer.style.opacity = 1;
  };

  const getCountryAndNeighbour = function (country) {
    //AJAX call
    const request = new XMLHttpRequest();
    request.open(`GET`, `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener(`load`, function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

      //render country
      renderCountry(data);

      //get neighbour
      const [neighbour] = data.borders;
      if (!neighbour) return;

      //AJAX call neighbour
      const request2 = new XMLHttpRequest();
      request2.open(
        `GET`,
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`
      );
      request2.send();

      request2.addEventListener(`load`, function () {
        const data2 = JSON.parse(this.responseText);

        //render country
        renderCountry(data2, `neighbour`);
      });
    });
  };
  getCountryAndNeighbour(`Brasil`);
  getCountryAndNeighbour(`Canada`);
}

function promises() {
  const renderCountry = function (data, classname = ``) {
    const html = `
    <article class="country ${classname}">
    <img class="country__img" src='${data.flag}' />
    <div class="country__data">
      <h3 class="country__name"> ${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫 </span> ${(
        data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span> ${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span> ${data.currencies[0].name}</p>
    </div>
  </article>`;

    countriesContainer.insertAdjacentHTML(`beforeend`, html);

    countriesContainer.style.opacity = 1;
  };

  // const request = fetch(`https://restcountries.eu/rest/v2/name/${`brasil`}`);
  // console.log(request);

  const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Country not found ${response.status}`);
        }
        response.json();
      })
      .then(function (data) {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];

        if (!neighbour) return;

        return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Country not found ${response.status}`);
        }
        return response.json();
      })
      .then(data => renderCountry(data, `neighbour`))
      .catch(err => alert(err))
      .finally(() =>
        console.log(`faz algo independe se der erro ou renderizar`)
      );
  };

  btn.addEventListener(`click`, function () {
    getCountryData(`brasil`);
  });
}

const renderCountry = function (data, classname = ``) {
  const html = `
  <article class="country ${classname}">
  <img class="country__img" src='${data.flag}' />
  <div class="country__data">
    <h3 class="country__name"> ${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫 </span> ${(
      data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span> ${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span> ${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML(`beforeend`, html);

  countriesContainer.style.opacity = 1;
};

function codyChallange1() {
  const whereIAm = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Problem with geocoding ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        `You are in ${data.state}, ${data.country}`;
        console.log(data.country);
        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Country not found ${res.status}`);
        }
        return res.json();
      })
      .then(data => renderCountry(data[0]))
      .catch(err => console.error(`${err.message} !!`));
  };

  whereIAm(52.508, 13.381);
  // whereIAm(19.037, 72.873);
  // whereIAm(-33.933, 18.474);
}

function buildingPromise() {
  // const lotteryPromise = new Promise(function (resolve, reject) {
  //   console.log(`Lotter drwan is happening`);
  //   setTimeout(function () {
  //     if (Math.random() >= 0.5) {
  //       resolve(`You win`);
  //     } else {
  //       reject(new Error(`You lose`));
  //     }
  //   }, 2000);
  // });

  // lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

  wait(2)
    .then(() => {
      console.log(`I wait 2 seconds`);
      return wait(1);
    })
    .then(() => console.log(`I wait 1 seconds`));
}

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

function codyChallange2() {
  // getPosition().then(pos => console.log(pos));

  function promisifyingGeolocationAPI() {
    const whereIAm = function (lat, lng) {
      getPosition()
        .then(pos => {
          const { latitude: lat, longitude: lng } = pos.coords;
          return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Problem with geocoding ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          `You are in ${data.state}, ${data.country}`;
          return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
        })
        .then(res => res.json())
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message} !!`));
    };

    btn.addEventListener(`click`, whereIAm);
  }

  const imgContainer = document.querySelector(`.images`);

  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
  const createImg = function (imgPath) {
    return new Promise((resolve, reject) => {
      const img = document.createElement(`img`);
      img.src = imgPath;

      img.addEventListener(`load`, function () {
        imgContainer.append(img);
        resolve(img);
      });

      img.addEventListener(`error`, function () {
        reject(new Error(`Image not found`));
      });
    });
  };

  let currentImg;

  createImg(`img/img-1.jpg`)
    .then(img => {
      currentImg = img;
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = `none`;
      return createImg(`img/img-2.jpg`);
    })
    .then(img => {
      currentImg = img;
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = `none`;
    })
    .catch(err => console.error(err));
}

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    throw err;
  }
};

console.log(`1`);

const city = whereAmI();

console.log(`2`);

console.log(`First`);
