//Challenge 1//

let now = new Date();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDay = now.getDay();
let date = document.querySelector(".date");
date.innerHTML = daysOfWeek[weekDay];

let time = document.querySelector(".time");
time.innerHTML = `${hour}:${minutes}`;

//Challenge 2//

function handleCurrentLocation(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("h2");
  let currentTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemperature}°C`;
  let feelsLike = document.querySelector(".feels-like");
  let feelsLikeInput = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like: ${feelsLikeInput}°C`;
  let humidity = document.querySelector(".humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c2e28ba57f5a3f1f87a46c6cd9a4d13f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
`;
  axios.get(apiUrl).then(handleCurrentLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handleTemperature(response) {
  let temperature = document.querySelector("h2");
  let currentTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemperature}°C`;
  let feelsLike = document.querySelector(".feels-like");
  let feelsLikeInput = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like: ${feelsLikeInput}°C`;
  let humidity = document.querySelector(".humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let city = document.querySelector("h1");

  if (input.value) {
    city.innerHTML = input.value;
    let apiKey = "c2e28ba57f5a3f1f87a46c6cd9a4d13f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric
`;
    axios.get(apiUrl).then(handleTemperature);
  }
}

let searchEngineCity = document.querySelector("#search-engine");
searchEngineCity.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);
