const apikey = "f3ec760f890de6d7966c728c8a3b019b";

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");

const searchBtn = document.querySelector(".search button");

const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else {

    var data = await response.json();
    const weatherData = {
       city : data.name,
       temperature : data.main.temp,
       humidity : data.main.humidity,
       wind : data.wind.speed

    }
   
    // const dbResponse = await fetch(`http://localhost:8080/insertData`);
    fetch(`https://backendweatherapp-production.up.railway.app/insertData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
           
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during Saving Data');
        });



    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; 

    if(data.weather[0].main=="Clouds"){
        weathericon.src = "./weather-app-img/images/clouds.png";
    }
    else if(data.weather[0].main == "Rain"){
        weathericon.src = "./weather-app-img/images/rain.png";
    }

    else if(data.weather[0].main == "Drizzle"){
        weathericon.src = "./weather-app-img/images/drizzle.png";
    }

    else if(data.weather[0].main == "Mist"){
        weathericon.src = "./weather-app-img/images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
}


searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})


