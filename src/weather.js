export class Weather {

    constructor(weatherAPI) {
        this.weatherAPI = weatherAPI
    }

    async getCurrentWeather(lat, lon) {
        let data = await this.weatherAPI.getCurrentWeatherData(lat,lon)
        console.log(data)
        this.createWeather(data);

    }

    createWeather(data) {

        document.querySelector('.avg_temp_c').innerHTML = `${data.current.temp_c}`;
        document.querySelector('.feelsLike_c').innerHTML = `${data.current.feelslike_c}`;
        document.querySelector('.weatherConditionText').innerHTML = `${data.current.condition.text}`;
        document.querySelector('.weatherIcon').src = `${data.current.condition.icon}`;

    }

}

