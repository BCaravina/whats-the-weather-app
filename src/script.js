function refreshWeatherData(response) {
  let cityName = document.querySelector(".city-name");
  let temperatureValue = document.querySelector(".temperature-value");
  let currentConditions = document.querySelector("#current-condition");
  let currentConditionsData = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let dateTime = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);

  cityName.innerHTML = response.data.city;
  temperatureValue.innerHTML = Math.round(response.data.temperature.current);
  currentConditions.innerHTML =
    currentConditionsData[0].toUpperCase() + currentConditionsData.slice(1);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed.toFixed(1)}km/h`;

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  } else {
    hours = hours;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }

  dateTime.innerHTML = `<strong>${
    weekDays[date.getDay()]
  }</strong> ${date.getHours()}:${date.getMinutes()}`;
}

function searchCity(city) {
  const apiKey = "c49ed490tce5aa3a51c741aaobee84ef";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchFormSubmit);

searchCity("Lisbon");
