import mapboxgl from '../node_modules/mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA';
let map = new mapboxgl.Map({
    container: 'map',
    center: [0, 0],
    zoom: 8,
    style: 'mapbox://styles/mapbox/streets-v11'
});


export class Location {


    apisResultObject = {}

    suggestArrowSwitcher(e) {

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

    removeOldApis() {

        this.apisResultObject = JSON.parse(localStorage.getItem('APIs'))
        for (let key in this.apisResultObject) {
            if (Date.now() - this.apisResultObject[key].timestamp > 3600000) {
                delete this.apisResultObject[key]

            }
        }
        localStorage.setItem('APIs', JSON.stringify(this.apisResultObject))
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

    async parsedData(url) {

        if (localStorage.APIs) {

            this.apisResultObject = JSON.parse(localStorage.getItem('APIs'))

        }
        if (url in this.apisResultObject) {
            data = this.apisResultObject[url]

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
                this.apisResultObject[url] = data
                localStorage.setItem('APIs', JSON.stringify(this.apisResultObject))


            } catch (e) {

                alert(` Извините,произошла ошибка, Name: ${e.name} Message: ${e.message} `);

            }
        }
        return data
    }

    async getCurrentPosition() {

        let url = `https://ipinfo.io/json?token=3bd29cca703424`

        let data = await this.parsedData(url)

        let arr = data.loc.split(',').reverse()
        let Longitude = arr[0]
        let Latitude = arr[1]
        this.createLocation(Latitude, Longitude)
        //getCurrentWeather(Latitude, Longitude)


    }

    async getPosition() {

        let city = document.querySelector('.citySearch').value
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`

        let data = await this.parsedData(url)
        let arr = data.features[0].center

        if (data.features[0] === undefined) {
            alert(`несуществуещие место`)
        }

        let Latitude = arr[0]
        let Longitude = arr[1]

        this.createLocation(Longitude, Latitude)
        //getCurrentWeather(Longitude, Latitude)

    }

    async autocomplete(e) {

        if (e.key != 'ArrowUp' && e.key != "ArrowDown" && e.key != 'Enter') {

            let cityInput = document.querySelector('.citySearch').value
            let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityInput}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`

            let data = await this.parsedData(url)
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
                el.onclick = this.onclickList.bind(this)})


        }

    }

    onclickList(e) {
        console.log(this)

        document.querySelector('.citySearch').value = e.textContent
        document.querySelector('#autocomplete-results').style.display = 'none'
        console.log(e)
        this.getPosition()

    }

}

  