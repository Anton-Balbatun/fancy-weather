import mapboxgl from '../node_modules/mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA';
let map = new mapboxgl.Map({
    container: 'map',
    center: [0, 0],
    zoom: 8,
    style: 'mapbox://styles/mapbox/streets-v11'
});


export class Location {

    constructor(weather, LocationGetCurrentIpAPI, locationMapAPI) {
        this.weather = weather;
        this.locationGetCurrentIpAPI = LocationGetCurrentIpAPI
        this.locationMapAPI = locationMapAPI
    }

    suggestArrowSwitcher(e) {

        if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {

            let listOfSuggestions = document.querySelectorAll('#autocomplete-results li');
            let listChanged = false;
            for (let i = 0; i < listOfSuggestions.length; i++) {

                if (listOfSuggestions[i].classList.contains('autocomplete-active')) {

                    listOfSuggestions[i].classList.remove('autocomplete-active');

                    if (e.key == 'ArrowUp') {

                        listOfSuggestions[i - 1].classList.add('autocomplete-active');
                        listChanged = true;
                        break;

                    } else {

                        listOfSuggestions[i + 1].classList.add('autocomplete-active');
                        listChanged = true;
                        break;

                    }

                }

            }

            if (!listChanged && e.key == 'ArrowDown') {
                listOfSuggestions[0].classList.add('autocomplete-active');

            } else if (!listChanged && e.key == 'ArrowUp') {
                listOfSuggestions[listOfSuggestions.length - 1].classList.add('autocomplete-active');

            }

        }

    }

    createLocation(Latitude, Longitude) {

        document.querySelector('#Lattitude').innerHTML = `Latitude:${Latitude}`
        document.querySelector('#Longitude').innerHTML = `Latitude:${Longitude}`

        map.flyTo({
            center: [Longitude, Latitude],
            zoom: 8,
            essential: true
        });

    }

    async getCurrentPosition() {

        let arr = await this.locationGetCurrentIpAPI.getLocationCordinates()
        console.log(arr)
        let Longitude = arr[0];
        let Latitude = arr[1];
        this.createLocation(Latitude, Longitude);
        this.weather.getCurrentWeather(Latitude, Longitude);

    }

    async getPosition() {

        let city = document.querySelector('.citySearch').value;

        let data = await this.locationMapAPI.parseForGetPosition(city)

        let arr = data.features[0].center;

        if (data.features[0] === undefined) {
            alert(`несуществуещие место`);
        }

        let Latitude = arr[0];
        let Longitude = arr[1];

        this.createLocation(Longitude, Latitude);
        this.weather.getCurrentWeather(Longitude, Latitude);

    }

    async autocomplete(e) {

        if (e.key != 'ArrowUp' && e.key != "ArrowDown" && e.key != 'Enter') {

            let cityInput = document.querySelector('.citySearch').value;
            let data = await this.locationMapAPI.parseForAutocomplete(cityInput)
            let featuresArr = data.features;
            let cityArrToShow = [];

            featuresArr = featuresArr.filter(item => {
                if (item.place_type[0] == 'place') {
                    return true;
                }
            })

            for (let i = 0; i < featuresArr.length; i++) {

                cityArrToShow.push(featuresArr[i].text);

            }

            if (cityInput.length > 0) {

                let autocomplete_results = document.querySelector("#autocomplete-results");
                autocomplete_results.innerHTML = '';

                for (let i = 0; i < cityArrToShow.length; i++) {

                    autocomplete_results.innerHTML += '<li>' + cityArrToShow[i] + '</li>';

                }
                autocomplete_results.style.display = 'block';

            } else {

                autocomplete_results.innerHTML = '';

            }

            document.querySelectorAll('#autocomplete-results li').forEach(el => {
                el.onclick = this.onclickList.bind(this)});

        }

    }

    onclickList(e) {

        document.querySelector('.citySearch').value = e.target.textContent;
        document.querySelector('#autocomplete-results').style.display = 'none';
        this.getPosition()

    }

}

  