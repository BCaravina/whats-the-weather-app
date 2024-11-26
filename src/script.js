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

  if (hour < 10) {
    hour = `0${hour}`;
  } else {
    hour = hour;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }

  weekDay.innerHTML = `${weekDays[now.getDay()]}`;
  hoursMinutes.innerHTML = `${hours}:${minutes}`;
}

function updateCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector(".search-field").value.trim();
  let formattedInput =
    searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase();

  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = formattedInput;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

setHour();
