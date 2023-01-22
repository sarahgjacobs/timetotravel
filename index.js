
// City Search

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('#query');

const errorMsg = document.querySelector('#error');
const sectionTitle = document.querySelector('#destination');

searchBtn.addEventListener('click', fetchCity);

// Gets City data from GeoDB API
async function fetchCity() {
    resetPage();
    try {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '499351b43dmsh00207893645a230p198f9ejsncc09ea58eb86',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchBar.value}&sort=-population&types=CITY`, options)

        if (response.ok) {
            const data = await response.json();
            updateCards(data.data[0]);
        } else {
            throw new Error ('city request failed');
        }
    } catch(error) {
        console.log(error);
        errorMsg.innerHTML = error;
        errorMsg.style.opacity = '1';
    }
}

// returns state if US, country if else
function countryRegion(data) {
    if (data.country === "United States of America") {
        return data.region;
    } else {
        return data.country;
    }
}

// Updates Cards using data from GeoDB
function updateCards(data) {
    console.log(data);
    if (data !== undefined) {
        let lat = data.latitude;
        let lon = data.longitude;
        let region = countryRegion(data);
        sectionTitle.innerHTML = `Travel to ${data.city}, ${region}`;
        // list of cards
        fetchWeather(lat, lon);
        //we can add more API functions when we have them
    } else {
        errorMsg.style.opacity = '1';
    }

}

// resets any CSS styles when button is clicked
function resetPage() {
    errorMsg.style.opacity = '0';
}





// Weather Card

const temp = document.querySelector('#temp');
const weatherConditions = document.querySelector('#conditions');

// converts Kelvin to Fahrenheit
function toFahrenheit(kelvin) {
    return Math.floor((kelvin - 273.15) * (9/5) + 32);
}

// fetches weather from Open Weather API
async function fetchWeather(lat, lon) {
    try {
        const response = await fetch( 
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2555dd5ec5eeb17d78543d5987a555ff`
            )
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error ('weather request failed');
        }
    } catch(error) {
        console.log(error);
        errorMsg.innerHTML = error;
        errorMsg.style.opacity = '1';
    }
}

// displays weather data on card
function displayWeather(data) {
    temp.innerHTML = `${toFahrenheit(data.main.temp)}°F`;
    weatherConditions.innerHTML = data.weather[0].description;
    //we can add more if we want
    console.log(data)
}







