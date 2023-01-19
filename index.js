
// Search

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('#query');

function updateCards() {
    fetchWeather();
    //we can add more API functions when we have them
}

searchBtn.addEventListener('click', updateCards);




// Weather Card

const weatherCity = document.querySelector('#weather-city');
const temp = document.querySelector('#temp');
const weatherConditions = document.querySelector('#conditions');


function toFahrenheit(kelvin) {
    return Math.floor((kelvin - 273.15) * (9/5) + 32);
}

function fetchWeather() {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=2555dd5ec5eeb17d78543d5987a555ff`
    )
        .then((response) => response.json())
        .then((data) => displayWeather(data))

    function displayWeather(data) {
        weatherCity.innerHTML = `Weather in ${data.name}`;
        temp.innerHTML = `${toFahrenheit(data.main.temp)}°F`;
        weatherConditions.innerHTML = data.weather[0].description;
        //we can add more if we want
        console.log(data)
    }
}









