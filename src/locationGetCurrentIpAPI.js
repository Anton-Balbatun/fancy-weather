import {BaseAPI} from './baseAPI.js'
export class LocationGetCurrentIpAPI extends BaseAPI{
    constructor() {
        super()
    }
    async getCurrentLocationCordinates(){
        let url = `https://ipinfo.io/json?token=3bd29cca703424`;

        let data = await this.parsedData(url);

        let arr = data.loc.split(',').reverse();
        
        return {"latitude":arr[0], "longitude":arr[1]}
    }
}