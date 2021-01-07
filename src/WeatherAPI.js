import {BaseAPI} from './baseAPI.js'
export class WeatherAPI extends BaseAPI{
    constructor() {
        super()
    }
    async getCurrentWeatherData(lat,lon){
        let url = `https://api.weatherapi.com/v1/forecast.json?key=0c6ecd00b4c34857933173038203105&q=${lat},${lon}&days=3`;
        let data = await this.parsedData(url);
        return data;
    }
}