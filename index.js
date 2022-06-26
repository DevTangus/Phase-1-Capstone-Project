const setAPIKey = "33bdb448f27cb420996ffe4512c31214";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const timeProperty = document.getElementById("time");
const dateProperty = document.getElementById("date");
const currentWeatherItems = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const country = document.getElementById("country");
const weatherForecast = document.getElementById("weather-forecast");
const currentTemp = document.getElementById("current-temp");

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const timeIn12Hr = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const amPm = hour >= 12 ? "PM" : "AM";

  timeProperty.innerHTML =
    (timeIn12Hr < 10 ? "0" + timeIn12Hr : timeIn12Hr) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateProperty.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

retrieveWeatherData();
function retrieveWeatherData() {
  navigator.geolocation.getCurrentPosition((successful) => {
    let { latitude, longitude } = successful.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${setAPIKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayWeatherData(data);
      });
  });
}
function displayWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timezone.innerHTML = data.timezone;
  countryProperty.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherItems.innerHTML = `<div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
  </div>
  <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure}</div>
  </div>
  <div class="weather-item">
      <div>Wind Speed</div>
      <div>${wind_speed}</div>
  </div>
  <div class="weather-item">
      <div>Sunrise</div>
      <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
  </div>
  <div class="weather-item">
      <div>Sunset</div>
      <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
  </div> 
  `;

  let otherDayForecast = "";
  data.daily.forEach((day, index) => {
    if (index == 0) {
      currentTemp.innerHTML = `
          <img src="http://openweathermap.org/img/wn//${
            day.weather[0].icon
          }@4x.png" alt="weather icon" class="w-icon">
          <div class="other">
              <div class="day">${window
                .moment(day.dt * 1000)
                .format("dddd")}</div>
              <div class="temp">Night - ${day.temp.night}&#176;C</div>
              <div class="temp">Day - ${day.temp.day}&#176;C</div>
          </div>
          
          `;
    } else {
      otherDayForecast += `
          <div class="weather-forecast-item">
              <div class="day">${window
                .moment(day.dt * 1000)
                .format("ddd")}</div>
              <img src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" alt="weather icon" class="w-icon">
              <div class="temp">Night - ${day.temp.night}&#176;C</div>
              <div class="temp">Day - ${day.temp.day}&#176;C</div>
          </div>
          
          `;
    }
  });

  weatherForecast.innerHTML = otherDayForecast;
}
