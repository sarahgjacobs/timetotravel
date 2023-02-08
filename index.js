
// City Search

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('#query');

const errorMsg = document.querySelector('#error');
const sectionTitle = document.querySelector('#destination');

searchBtn.addEventListener('click', () => setTimeout(fetchCityByPrefix, 500));

// (Used by Search Button)
// Gets City Info by search bar input
async function fetchCityByPrefix() {
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


// (Used by Auto-fill)
// Gets City Info by ID of selected auto-fill option
async function fetchCityById(id) {
    resetPage();
    console.log(searchBar.value)
    try {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '499351b43dmsh00207893645a230p198f9ejsncc09ea58eb86',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}`, options)

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            updateCards(data.data);
        } else {
            throw new Error ('city request failed');
        }
    } catch(error) {
        console.log(error);
        errorMsg.innerHTML = error;
        errorMsg.style.opacity = '1';
    }
}




// Updates Cards using data from GeoDB
// used by both fetchCityByPrefix and fetchCityById
async function updateCards(data) {
    console.log(data);
    if (data !== undefined) {
        let lat = data.latitude;
        let lon = data.longitude;
        sectionTitle.innerHTML = `Travel to ${data.city}, ${region(data)}`;
        // list of cards
        fetchImage(data.city);
        fetchWeather(lat, lon);
        //we can add more API functions when we have them
    } else {
        errorMsg.style.opacity = '1';
    }

}

// Additional Functions used by UpdateCards + FetchCityByPrefix/Id

// returns state if US, country if else
function region(data) {
    if (data.country === "United States of America") {
        return data.region;
    } else {
        return data.country;
    }
}

// resets any CSS styles when button is clicked
function resetPage() {
    errorMsg.style.opacity = '0';
    while (datalist.firstChild) {
        datalist.firstChild.remove();
    }
}








// Auto-fill

/*
Basically every time the search bar value changes ("input") an API call is made and the autofill list updates. The problem is that if an API call is made too quickly after the last one, it fails. 

I tried to fix it by setting a timer, but it still fails sometimes. 
*/



// auto-fill options list
const datalist = document.querySelector('#cities');


searchBar.addEventListener('input', startAutofillTimer)


let typingTimer;

function startAutofillTimer() {
    
    clearTimeout(typingTimer);
    if (searchBar.value) {
        typingTimer = setTimeout(autofill, 500);
    } else {
        setTimeout(() => {
            while (datalist.firstChild) {
            datalist.firstChild.remove();
            }
        }, 300)
    }
}

async function autofill() {
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
            populateAutofill(data);
        } else {
            throw new Error ('city request failed');
        }
    } catch(error) {
        console.log(error);
    }
}




function populateAutofill(data) {
    
    while (datalist.firstChild) {
        datalist.firstChild.remove();
    }

    for (let i = 0; i < 5; i++) {
        let city = data.data[i].city;
        let region = data.data[i].region;
        let country = data.data[i].country;
        let optionText = `${city}, ${region}, ${country}`;
        if (data.data[i].population > 0) {
            let option = document.createElement('li')
            option.classList.add('option')
            //option.value = data.data[i].id;
            option.innerHTML = optionText;
            datalist.appendChild(option)
            option.addEventListener('click', stopInput)
        }
    
        function stopInput() {
            searchBar.value = city;
            while (datalist.firstChild) {
                datalist.firstChild.remove();
            }
            fetchCityById(data.data[i].id)
        }
    }
}













