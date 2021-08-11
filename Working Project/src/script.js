// Challenge 1
function composeTime(time) {
  let minutes = time.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = time.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return ` ${days[day]} ${hours}:${minutes}`;
}

let date = document.querySelector("#date");
let timeRightNow = new Date();
date.innerHTML = composeTime(timeRightNow);

//Challenge 2
//function search(event) {
//event.preventDefault();
//let search = document.querySelector("#Location");
//let searchInput = document.querySelector("#search-input");
//search.innerHTML = searchInput.value;
//}

// Temp Changes
//Temp Cels to Fahr
function celsToFahr(event) {
  event.preventDefault();
  let tempE1 = document.querySelector("#todayTemp");
  let temp1 = tempE1.innerHTML;
  tempE1.innerHTML = Math.round((temp1 * 9) / 5 + 32);
}
let fahr = document.querySelector("#tempUnitF");
fahr.addEventListener("click", celsToFahr);
//Temp Fahr to Cels
function fahrToCels(event) {
  let tempE2 = document.querySelector("#todayTemp");
  let temp2 = tempE2.innerHTML;
  tempE2.innerHTML = Math.round((temp2 - 32) * (5 / 9));
}
let cels = document.querySelector("#tempUnitC");
cels.addEventListener("click", fahrToCels);

//Show temps
function showTemperature(response) {
  document.querySelector("#Location").innerHTML = response.data.name;
  document.querySelector("#todayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
}

//search for cities
function searchedCity(city) {
  let apiKey = "ee5487a7be65de8d31de587d4d02ac57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchedCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

searchedCity("London");

//
function coordinates(position) {
  let apiKey = "ee5487a7be65de8d31de587d4d02ac57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(coordinates);
}

let button = document.querySelector("#weatherButton");
button.addEventListener("click", getCurrentPosition);
