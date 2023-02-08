

// Background Image


// fetches image from Unsplash API
async function fetchImage(city) {
   
    try {
        const response = await fetch( 
            `https://api.unsplash.com/search/photos?query=${city}&orientation=landscape&content_filter=high&per_page=5&page=1&client_id=tQ562nah0auLYfU46x_ZOMrVv9r_zPZgf1Wcna7C2b4`
            )
        if (response.ok) {
            const data = await response.json();
            displayImage(data);
        } else {
            throw new Error ('image request failed');
        }
    } catch(error) {
        console.log(error);
        errorMsg.innerHTML = error;
        errorMsg.style.opacity = '1';
    } 
}

// displays background image
async function displayImage(data) {
    
    console.log(data)

    let random = Math.floor(Math.random()*5);
    let background = document.querySelector('body');
    let lowRes = data.results[random].urls.small;
    let highRes = data.results[random].urls.full;

    background.style.backgroundImage = `url(${highRes}), url(${lowRes})`;
    // loads low-res first while waiting for high-res to load
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
async function displayWeather(data) {
    temp.innerHTML = `${toFahrenheit(data.main.temp)}°F`;
    weatherConditions.innerHTML = data.weather[0].description;
    //we can add more if we want
    console.log(data)
}



