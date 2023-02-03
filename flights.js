const flightCity = document.querySelector('#flight-city');


function fetchFlight() {
    apiKey = "ke3sULQ5S5p8GGRE80b8jpp0yrolXCAz"
    fetch(
        `https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create`
    )
        .then((response) => response.json())
        .then((data) => displayFlights(data))
        console.log(displayFlights)

    function displayFlights(data) {
        weatherCity.innerHTML = `Flights in ${data.name}`;
        temp.innerHTML = `${toFahrenheit(data.main.temp)}°F`;
        weatherConditions.innerHTML = data.weather[0].description;
        //we can add more if we want
        console.log(data)
    }
}