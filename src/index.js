function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let apiKey = "5fob4d70t464d3dd9fbffb3b3b705a8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  if (response.data && response.data.temperature) {
    let temperature = Math.round(response.data.temperature.current);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = temperature;
  } else {
    console.error("Unexpected API response:", response.data);
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
