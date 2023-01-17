const loc=document.getElementById("location");
const tempValue=document.getElementById("temp-value");
const tempIcon=document.getElementById("temp-icon");
const climate=document.getElementById("climate");
const searchInput=document.getElementById("search");
const searchButton=document.getElementById("btn");



searchButton.addEventListener("click",(event)=>
{
    event.preventDefault();
    getWeather(searchInput.value);
    searchInput.value="";
});

    const getWeather= async (city)=>
    {
        try{
                const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35cd2f337c1aa13f788b75835d33d22f`,
                    {mode: "cors"} 
                );
            
                const weatherData=await response.json();
                

                const{name}= weatherData;
                const{feels_like}= weatherData.main;
                const{id,main}= weatherData.weather[0];

                loc.textContent = name;
                climate.textContent = main;
                tempValue.textContent = Math.round(feels_like-273);
                
                if(id<300 && id>200){
                    tempIcon.src="./icons/winter.png";
                }
                else if(id<400 && id>300){
                    tempIcon.src="./icons/cloudy-rain.png";
                }

                else if(id<600 && id>500){
                    tempIcon.src="./icons/rain.png";
                }

                else if(id<700 && id>600){
                    tempIcon.src="./icons/snow-storm.png";
                }
                else if(id<800 && id>700){
                    tempIcon.src="./icons/storm.png";
                }
                else (id===800)
                {
                    tempIcon.src="./icons/thunderstorm.png";
                }
            }
            catch(err){
                alert("city cant found");
            }


    };

window.addEventListener("load",()=>{
    let long;
    let lat;

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{

            long=position.coords.longitude;
            lat=position.coords.latitude;
            
            const Proxy ="https://cors-anywhere.herokuapp.com/";
                const api=`${Proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=35cd2f337c1aa13f788b75835d33d22f`;

            fetch (api).then((response) =>
            {
                return response.json();
            })
            .then((data) =>
            {
                    const{name}= data;
                    const{feels_like}= data.main;
                    const{id,main}= data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempValue.textContent = Math.round(feels_like-273);
                    if(id<300 && id>200){
                        tempIcon.src="./icons/winter.png";
                    }
                    else if(id<400 && id>300){
                        tempIcon.src="./icons/cloudy-rain.png";
                    }

                    else if(id<600 && id>500){
                        tempIcon.src="./icons/rain.png";
                    }

                    else if(id<700 && id>600){
                        tempIcon.src="./icons/snow-storm.png";
                    }
                    else if(id<800 && id>700){
                        tempIcon.src="./icons/storm.png";
                    }
                    else(id===800)
                    {
                        tempIcon.src="./icons/thunderstorm.png";
                    }

            })
        })
    }
})
