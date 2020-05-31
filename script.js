import mapboxgl from './node_modules/mapbox-gl/dist/mapbox-gl.js';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA';
var map = new mapboxgl.Map({
    container: 'map',
    center: [0,0],
    zoom: 8,
    style: 'mapbox://styles/mapbox/streets-v11'
});

document.querySelector('.switchBackground').addEventListener('click',changeBackgroundImg)
getcurrentPosition()

function changeBackgroundImg(){

    let currentStyle =  document.querySelector('.content').className 

    switch(currentStyle){

        case 'wrapper content defaultPage':
            document.querySelector('.content').classList.add('secondPage') ;
            document.querySelector('.content').classList.remove('defaultPage') ;
            break;
        case 'wrapper content secondPage':
            document.querySelector('.content').classList.add('thirdPage')  ;
            document.querySelector('.content').classList.remove('secondPage') ;
            break;   
        case 'wrapper content thirdPage':
            document.querySelector('.content').classList.add('defaultPage')  ;
            document.querySelector('.content').classList.remove('thirdPage') ;
            break;  
                        
    }
    
}

async function getcurrentPosition(){
     
        let url = `https://ipinfo.io/json?token=3bd29cca703424` 
        let response = await fetch(url) 
        let data = await response.json()
        let arr = data.loc.split(',').reverse()
        let Longitude   = arr[0]
        let  Latitude = arr[1]
        console.log(`latiPosi ${Latitude}`)
        createLocation(Latitude ,Longitude)
        getcurrentWeather(Latitude ,Longitude)

}



document.querySelector('.searchButton').addEventListener('click',getPosition)

async function getPosition(){

    document.querySelector('.Latitude').remove()
    document.querySelector('.Longitude').remove()
    let city = document.querySelector('.citySearch').value
    console.log(city)
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`
    let response = await fetch(url) 
    let data = await response.json()
    let arr = data.features[0].center
    let Latitude = arr[0]
    let Longitude = arr[1]
    createLocation(Longitude , Latitude)
    getcurrentWeather(Longitude , Latitude)

}

function createLocation(Latitude , Longitude){

    let LatitudeField = document.createElement('p') 
    let LongitudeField = document.createElement('p') 
    LongitudeField.classList.add('Latitude') 
    LatitudeField.classList.add('Longitude') 
    LatitudeField.innerHTML = `Latitude:${Latitude}`
    LongitudeField.innerHTML = `Longitude:${Longitude}`
    document.querySelector('.locationData').appendChild(LatitudeField)
    document.querySelector('.locationData').appendChild(LongitudeField)

    map.flyTo({
        center: [Longitude, Latitude],
        zoom: 8,
        essential: true 
    });  

}

async function getcurrentWeather(lat,lon){


    let url = `http://api.weatherapi.com/v1/forecast.json?key=0c6ecd00b4c34857933173038203105&q=${lat},${lon}&days=3` 
    let response = await fetch(url) 
    let data = await response.json()
    console.log(data)
    let condition = data.current.condition
    let feelslike_c = data.current.feelslike_c
    let feelslike_f = data.current.feelslike_f
    let temp_c = data.current.temp_c
    let temp_f = data.current.temp_f
    createWeather(data)
}


function createWeather(data){

    document.querySelector('.weatherOnToday').innerHTML = ''
    let currentWeather = document.createElement('div') 
    let nextDaysWether = document.createElement('div') 
    currentWeather.classList.add('currentWeather') 
    nextDaysWether.classList.add('nextDaysWether') 
    currentWeather.innerHTML = ' '
    currentWeather.innerHTML = `<p class='avg_temp_c'>${data.current.temp_c}°С</p>
    <p>${data.current.feelslike_c} </p>
    <p>${data.current.condition.text}</p>
    <img src="${data.current.condition.icon}" alt="">`
 
    document.querySelector('.weatherOnToday').appendChild(currentWeather)
    

}