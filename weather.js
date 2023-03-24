const loc=document.querySelector(".location");
const tempValue=document.querySelector(".temp-value");
const tempIcon=document.querySelector(".temp-icon");
const climate=document.querySelector(".climate");

const searchInput=document.getElementById("search");
const searchButton=document.getElementById("btn");

const weather={};

weather.temperature={
    unit:"celsius"
}
const kelvin=273;
const key= "35cd2f337c1aa13f788b75835d33d22f";

searchButton.addEventListener("click",(event)=>
{
    event.preventDefault();
    getWeather(searchInput.value);
    searchInput.value="";
});

if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(setPosition);
}
function setPosition(position){
    let long=position.coords.longitude;
    let lat=position.coords.latitude;

}

function getWeather(city){
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(api)
    .then(function(response){
        const data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.description=data.weather[0].description;
    })
    .then(function(){
        displayWeather();

    })
    .catch(function(error)
    {
        return alert("city cant found");
    })
    
}

function displayWeather(){
    loc.innerHTML=`${weather.city}`;
    tempIcon.innerHTML=`<img src ="./icons/${weather.iconId}.png"/>`;
    tempValue.innerHTML=`${weather.temperature.value}<span>&#176c</span>`;
    climate.innerHTML=`${weather.description}`;
}

