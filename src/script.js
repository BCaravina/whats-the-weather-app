function refreshForecastData(response) {
  const forecastArray = document.querySelectorAll("#forecast-list .days");

  const startDate = new Date(response.data.daily[0].time * 1000);
  const startDayIndex = (startDate.getDay() + 1) % 7;

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  forecastArray.forEach((liElement, index) => {
    if (response.data.daily[index]) {
      const forecastItem = response.data.daily[index];
      const currentDayIndex = (startDayIndex + index) % 7;
      const weekday = weekDays[currentDayIndex];
      liElement.innerHTML = `
        <div class="forecast-day">${weekday}</div>
        <img class="forecast-icon" src="${
          forecastItem.condition.icon_url
        }" alt="Weather Icon" />
        <div class="forecast-temp">
          ${Math.round(forecastItem.temperature.minimum)}°C / 
          <span>${Math.round(forecastItem.temperature.maximum)}°C</span>
        </div>
        <div class="forecast-humidity">Humidity: <strong>${
          forecastItem.temperature.humidity
        }%</strong></div>
        <div class="forecast-wind-speed">
          Wind: <strong>${forecastItem.wind.speed.toFixed(1)}km/h</strong>
        </div>
      `;
    }
  });
}

function refreshWeatherData(response) {
  let cityName = document.querySelector(".city-name");
  let temperatureValue = document.querySelector(".temperature-value");
  let currentConditions = document.querySelector("#current-condition");
  let currentConditionsData = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let dateTime = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector(".temperature-icon");

  cityName.innerHTML = response.data.city;
  temperatureValue.innerHTML = Math.round(response.data.temperature.current);
  currentConditions.innerHTML =
    currentConditionsData[0].toUpperCase() + currentConditionsData.slice(1);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed.toFixed(1)}km/h`;
  dateTime.innerHTML = formatDate(date);
  iconElement.src = response.data.condition.icon_url;
}

function formatDate(date) {
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
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `<strong>${weekDays[date.getDay()]}</strong>, ${hours}:${minutes}`;
}

function searchCity(city) {
  const apiKey = "c49ed490tce5aa3a51c741aaobee84ef";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);

  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiForecastUrl).then(refreshForecastData);
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchFormSubmit);

searchCity("Lisbon");
