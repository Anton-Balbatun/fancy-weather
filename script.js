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

        try {

            let response = await fetch(url) 
            var data = await response.json()
            
        } catch (e) {

            alert( ` Извините,произошла ошибка, Name: ${e.name} Message: ${e.message} ` );

        }
        
        let arr = data.loc.split(',').reverse()
        let Longitude  = arr[0]
        let Latitude = arr[1]
        createLocation(Latitude ,Longitude)
        getCurrentWeather(Latitude ,Longitude)

}


document.querySelector('.searchButton').addEventListener('click',getPosition)
document.querySelector('.citySearch').addEventListener('keyup', (event)=>{ if(event.key === "Enter"){
    getPosition()
}} )

async function getPosition(){

    console.log( document.querySelector('#Lattitude'))
    let city = document.querySelector('.citySearch').value
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`
    try {

        let response = await fetch(url) 
        var data = await response.json()
        
    } catch (e) {

        alert( ` Извините,произошла ошибка, Name: ${e.name} Message: ${e.message} ` );
        
    }

    let arr = data.features[0].center
    let Latitude = arr[0]
    let Longitude = arr[1]
    createLocation(Longitude , Latitude)
    getCurrentWeather(Longitude , Latitude)

}


 function createLocation(Latitude , Longitude){

    console.log( document.querySelector('#Lattitude'))

   document.querySelector('#Lattitude').innerHTML =`Latitude:${Latitude}` 
   document.querySelector('#Longitude').innerHTML =`Latitude:${Longitude}`

    map.flyTo({
        center: [Longitude, Latitude],
        zoom: 8,
        essential: true 
    });  

}

async function getCurrentWeather(lat,lon){

    let url = `https://api.weatherapi.com/v1/forecast.json?key=0c6ecd00b4c34857933173038203105&q=${lat},${lon}&days=3` 

    try {

        let response = await fetch(url) 
        var data = await response.json()
        
    } catch (e) {
        
        alert( ` Извините,произошла ошибка, Name: ${e.name} Message: ${e.message} ` );
        
    }
    createWeather(data)

}


function createWeather(data){

    

    document.querySelector('.avg_temp_c').innerHTML= `${data.current.temp_c}`
    document.querySelector('.feelsLike_c').innerHTML= `${data.current.feelslike_c}`
    document.querySelector('.weatherConditionText').innerHTML= `${data.current.condition.text}`
    document.querySelector('.weatherIcon').src= `${data.current.condition.icon}`
    

}