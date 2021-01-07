import {BaseAPI} from './baseAPI.js'
export class LocationMapAPI extends BaseAPI{
    constructor() {
        super()
    }
    async parseForGetPosition(city){
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`;

        let data = await this.parsedData(url);
        return data
    }

    async parseForAutocomplete(cityInput){
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityInput}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`;

        let data = await this.parsedData(url);
        return data
    }
}