function setHour() {
  let hoursMinutes = document.querySelector(".date-time");
  let weekDay = document.querySelector(".week-day");
  let now = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = now.getHours();
  let minutes = now.getMinutes();

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

  weekDay.innerHTML = `${weekDays[now.getDay()]}`;
  hoursMinutes.innerHTML = `${hours}:${minutes}`;
}

function refreshWeatherData(response) {
  console.log(response.data);
  console.log(response.data.temperature.current);
  console.log(response.data.condition.description);
  console.log(response.data.temperature.humidity);
  console.log(response.data.wind.speed);

  let cityName = document.querySelector(".city-name");
  let temperatureValue = document.querySelector(".temperature-value");
  let currentConditions = document.querySelector("#current-condition");
  // let humidity = document.querySelector();
  // let windSpeed = document.querySelector();

  cityName.innerHTML = response.data.city;
  temperatureValue.innerHTML = Math.round(response.data.temperature.current);
  currentConditions.innerHTML = response.data.condition.description;
}

function searchCity(city) {
  const apiKey = "c49ed490tce5aa3a51c741aaobee84ef";
  // let unit = "metric"
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

setHour();
searchCity("Lisbon");
