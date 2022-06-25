const API = "33bdb448f27cb420996ffe4512c31214";
window.addEventListener("load", () => {});

window.addEventListener("load", () => {
  let long;
  let lat;
  // Accessing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const baseAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}&units=metric`;

      // Using fetch to get data
      fetch(baseAPI)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { morning, evening } = data.sys;

          const urlOfIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const morningGMT = new Date(morning * 1000);
          const eveningGMT = new Date(evening * 1000);

        });
    });
  }
});

const timeInGMT = new Date(epochTime * 1000);

const iconImg = document.getElementById("weather-icon");
const loc = document.querySelector("#location");
const tempC = document.querySelector(".c");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");
const sunriseDOM = document.querySelector(".sunrise");
const sunsetDOM = document.querySelector(".sunset");

loc.textContent = `${place}`;
desc.textContent = `${description}`;
tempC.textContent = `${temp.toFixed(2)} °C`;
tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
sunriseDOM.textContent = `${morningGMT.toLocaleDateString()}, ${morningGMT.toLocaleTimeString()}`;
sunsetDOM.textContent = `${eveningGMT.toLocaleDateString()}, ${eveningGMT.toLocaleTimeString()}`;