export class Weather {



      async  getCurrentWeather(lat, lon) {

        let url = `https://api.weatherapi.com/v1/forecast.json?key=0c6ecd00b4c34857933173038203105&q=${lat},${lon}&days=3`
        let data = await parsedData(url)
        createWeather(data)
    
    }
    
     createWeather(data) {
    
        document.querySelector('.avg_temp_c').innerHTML = `${data.current.temp_c}`
        document.querySelector('.feelsLike_c').innerHTML = `${data.current.feelslike_c}`
        document.querySelector('.weatherConditionText').innerHTML = `${data.current.condition.text}`
        document.querySelector('.weatherIcon').src = `${data.current.condition.icon}`
    
    }

}

