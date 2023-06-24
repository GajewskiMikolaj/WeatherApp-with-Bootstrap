
let lat
let long
const apiKey = "5b0d2805f33f14889f467aa297506d52"
function startApp() {
    

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude
                long = position.coords.longitude
                getWeatherData()
            }
        )
    }
}

function getWeatherData() {
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`

    fetch(geoUrl).then( function(response) {
        response.json().then( function(data) {
            uploadWeatherData(data)
            
        })
    })
}

function uploadWeatherData(data) {
    const temp = data.main.temp
    document.getElementById("temp").innerHTML = temp + " °C"

    const humidity = data.main.humidity
    document.getElementById("humidity").innerHTML = humidity + " %"

    const pressure = data.main.pressure
    document.getElementById("pressure").innerHTML = pressure + " hPa"

    const cloudiness = data.clouds.all
    document.getElementById("cloudiness").innerHTML = cloudiness + " %"

    const windSpeed = data.wind.speed
    document.getElementById("windSpeed").innerHTML = windSpeed + " km/h"

    const sunrise = new Date(data.sys.sunrise * 1000)
    document.getElementById("sunrise").innerHTML = sunrise.getHours() + ":" + sunrise.getMinutes()

    const sunset = new Date(data.sys.sunset * 1000)
    document.getElementById("sunset").innerHTML = sunset.getHours() + ":" + sunset.getMinutes()

    let imgUrl = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    document.getElementById("currentWeather").setAttribute("src", imgUrl)

    const locationLink = document.getElementById("locationLink")
    locationLink.innerHTML = data.name  
    locationLink.href = `https://openstreetmap.org/#map=12/${lat}/${long}`
}