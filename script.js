import mapboxgl from './node_modules/mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA';
var map = new mapboxgl.Map({
    container: 'map',
    center: [0, 0],
    zoom: 8,
    style: 'mapbox://styles/mapbox/streets-v11'
});
localStorage.clear()

var currentBgNumber = 0;
var apisResultObject = {}

setInterval(removeOldApis,60000)



document.querySelector('.searchButton').addEventListener('click', getPosition)

window.onclick = function (event) {


    if (event.target.classList.contains("citySearch")) {
        document.querySelector('#autocomplete-results').style.display = 'block'
    } else {
        document.querySelector('#autocomplete-results').style.display = 'none'
    }

}

document.querySelector('.citySearch')
    .addEventListener('keyup', (event) => {

        let isListContainBlack = false
        document.querySelectorAll('#autocomplete-results li').forEach(e => {

            if (e.classList.contains('autocomplete-active')) {
                isListContainBlack = true
            }
        })

        if (event.key === "Enter" && isListContainBlack) {
            document.querySelector('.citySearch').value = document.querySelector('.autocomplete-active').textContent
            getPosition()
            document.querySelector('#autocomplete-results').style.display = 'none'
            document.querySelector('.citySearch').blur()
        } else if (event.key === "Enter") {
            getPosition()
        }

    })

document.querySelector('.switchBackground').addEventListener('click', changeBackgroundImg)

document.querySelector('#countrySearch').addEventListener('keyup', autocomplete)

document.querySelector('.citySearch').addEventListener('keydown', suggestArrowSwitcher)

getCurrentPosition()

async function getCurrentPosition() {

    let url = `https://ipinfo.io/json?token=3bd29cca703424`

    let data = await parsedData(url)

    let arr = data.loc.split(',').reverse()
    let Longitude = arr[0]
    let Latitude = arr[1]
    createLocation(Latitude, Longitude)
    getCurrentWeather(Latitude, Longitude)

}

function changeBackgroundImg() {

    let defaultPageDomSelector = document.querySelector('.defaultPage')
    let firstPagePath = `url(assets/Background1.jpg)`
    let secondPagePath = `url(assets/Background2.jpg)`
    let thirdPagePath = `url(assets/Background3.jpg)`

    let pageArray = [firstPagePath, secondPagePath, thirdPagePath]

    if (currentBgNumber < pageArray.length - 1) {
        defaultPageDomSelector.style.backgroundImage = pageArray[currentBgNumber + 1]
        currentBgNumber++
    } else {
        defaultPageDomSelector.style.backgroundImage = pageArray[0]
        currentBgNumber = 0
    }

}

function createLocation(Latitude, Longitude) {

    document.querySelector('#Lattitude').innerHTML = `Latitude:${Latitude}`
    document.querySelector('#Longitude').innerHTML = `Latitude:${Longitude}`

    map.flyTo({
        center: [Longitude, Latitude],
        zoom: 8,
        essential: true
    });

}

async function getCurrentWeather(lat, lon) {

    let url = `https://api.weatherapi.com/v1/forecast.json?key=0c6ecd00b4c34857933173038203105&q=${lat},${lon}&days=3`
    let data = await parsedData(url)
    createWeather(data)

}

function createWeather(data) {

    document.querySelector('.avg_temp_c').innerHTML = `${data.current.temp_c}`
    document.querySelector('.feelsLike_c').innerHTML = `${data.current.feelslike_c}`
    document.querySelector('.weatherConditionText').innerHTML = `${data.current.condition.text}`
    document.querySelector('.weatherIcon').src = `${data.current.condition.icon}`

}

async function getPosition() {

    let city = document.querySelector('.citySearch').value
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`

    let data = await parsedData(url)
    let arr = data.features[0].center

    if (data.features[0] === undefined) {
        alert(`несуществуещие место`)
    }

    let Latitude = arr[0]
    let Longitude = arr[1]

    createLocation(Longitude, Latitude)
    getCurrentWeather(Longitude, Latitude)

}

async function autocomplete(e) {


    if (e.key != 'ArrowUp' && e.key != "ArrowDown" && e.key != 'Enter') {

        let cityInput = document.querySelector('.citySearch').value
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityInput}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`

        let data = await parsedData(url)
        let featuresArr = data.features
        let cityArrToShow = []

        featuresArr = featuresArr.filter(item => {
            if (item.place_type[0] == 'place') {
                return true
            }
        })

        for (let i = 0; i < featuresArr.length; i++) {

            cityArrToShow.push(featuresArr[i].text)

        }

        if (cityInput.length > 0) {

            let autocomplete_results = document.querySelector("#autocomplete-results");
            autocomplete_results.innerHTML = '';

            for (let i = 0; i < cityArrToShow.length; i++) {

                autocomplete_results.innerHTML += '<li>' + cityArrToShow[i] + '</li>';

            }
            autocomplete_results.style.display = 'block';

        } else {

            cityArrToShow = [];
            autocomplete_results.innerHTML = '';

        }

        document.querySelectorAll('#autocomplete-results li').forEach(el => {
            el.onclick = function () {

                document.querySelector('.citySearch').value = el.textContent
                document.querySelector('#autocomplete-results').style.display = 'none'
                getPosition()

            }
        })
    }

}

function suggestArrowSwitcher(e) {

    if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {

        let listOfSuggestions = document.querySelectorAll('#autocomplete-results li')
        let listChanged = false;
        for (let i = 0; i < listOfSuggestions.length; i++) {

            if (listOfSuggestions[i].classList.contains('autocomplete-active')) {

                listOfSuggestions[i].classList.remove('autocomplete-active')

                if (e.key == 'ArrowUp') {

                    listOfSuggestions[i - 1].classList.add('autocomplete-active')
                    listChanged = true;
                    break;

                } else {

                    listOfSuggestions[i + 1].classList.add('autocomplete-active')
                    listChanged = true;
                    break;

                }

            }

        }

        if (!listChanged && e.key == 'ArrowDown') {
            listOfSuggestions[0].classList.add('autocomplete-active')

        } else if (!listChanged && e.key == 'ArrowUp') {
            listOfSuggestions[listOfSuggestions.length - 1].classList.add('autocomplete-active')
        }

    }

}

function removeOldApis(){

    apisResultObject = JSON.parse(localStorage.getItem('APIs'))
    for (let key in apisResultObject){
        if( Date.now() - apisResultObject[key].timestamp > 3600000){
            delete apisResultObject[key]

        }
    }
    localStorage.setItem('APIs', JSON.stringify(apisResultObject))
}

async function parsedData(url) {

    if (localStorage.APIs) {

        apisResultObject = JSON.parse(localStorage.getItem('APIs'))

    }
    if(url in apisResultObject){
        data = apisResultObject[url]

    } else {

        try {

            var time = performance.now();

            let response = await fetch(url)
            var data = await response.json()

            time = performance.now() - time;
            console.log('Время выполнения = ', time);
            console.log('!!!!!!!!', url, Date.now());

            data['timestamp'] = Date.now()
          //  apisResultObject[url] = {"data": data, "t": Date.now()}
            apisResultObject[url] = data
            localStorage.setItem('APIs', JSON.stringify(apisResultObject))


        } catch (e) {

            alert(` Извините,произошла ошибка, Name: ${e.name} Message: ${e.message} `);

        }
    }
    return data
}

