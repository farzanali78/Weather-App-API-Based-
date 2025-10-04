const cityInput = document.getElementById("city-Input")
const getWeatherBtn = document.getElementById("getWeather")
const displayWeatherDetails = document.getElementById("weatherDetails")
const API_KEY = '13845b9b3decc25eaa9cba5bd4afc27b' // env variables
const errorMessage = document.getElementById("error")

getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim()
    cityInput.value = ""
    if (!city) {
        loadingMessage.style.display = "none"
    }
  
    displayWeatherDetails.innerHTML = ""
    errorMessage.innerHTML = ""
    const loadingMessage = document.createElement('p')
    loadingMessage.textContent = "fetching data..."
    loadingMessage.style.color = "#1C1C1C"
    loadingMessage.style.textAlign = "center"
    displayWeatherDetails.appendChild(loadingMessage)

    try {
        const weatherData = await fetchWeatherDetails(city)
        displayData(weatherData)
    }
    catch (e) {
        console.log(e)
    }
})

cityInput.addEventListener('keypress' , async (event)=>{
if(event.key === "Enter"){
    const city = cityInput.value.trim()
    cityInput.value = ""
    if (!city) {
        loadingMessage.style.display = "none"
    }
  
    displayWeatherDetails.innerHTML = ""
    errorMessage.innerHTML = ""
    const loadingMessage = document.createElement('p')
    loadingMessage.textContent = "fetching data..."
    loadingMessage.style.color = "#1C1C1C"
    loadingMessage.style.textAlign = "center"
    displayWeatherDetails.appendChild(loadingMessage)

    try {
        const weatherData = await fetchWeatherDetails(city)
        displayData(weatherData)
    }
    catch (e) {
        console.log(e)
    }
}
})

async function fetchWeatherDetails(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url)
    console.log(typeof response)
    console.log("Response: ", response)
    if (!response.ok) {
        const errorData = document.createElement('p')
        errorData.innerText = "City not found"
        errorData.style.color = "red"
        errorData.style.textAlign = "center"
        errorData.style.marginTop = "10px"
        errorMessage.appendChild(errorData)
    }
    const data = await response.json();
    return data;
}

function displayData(weatherInfo) {
    displayWeatherDetails.innerHTML = ""
    console.log(weatherInfo)
    const { name, main, weather } = weatherInfo;
    const cityName = document.createElement('h2')
    const cityTemp = document.createElement('p')
    const cityDescription = document.createElement('p')
    const fahrenhiet = ((main.temp * 9/5) + 32).toFixed(2)
    cityName.style.borderRadius = "3px"
    cityName.style.border = "none"
    // cityName.textContent = name
    cityName.textContent = name
    cityName.style.textAlign = "center"
    cityName.style.color = "#1C1C1C"
    cityTemp.style.color = "#1C1C1C"
    cityTemp.innerHTML = `<p>Tempreture: ${main.temp}°C / ${fahrenhiet}°F</p>`
    cityTemp.style.textAlign = "center"
    cityDescription.style.color = "#1C1C1C"
    cityDescription.innerHTML = `<p>Description: ${weather[0].description}</p>`
    cityDescription.style.textAlign = "center"
    displayWeatherDetails.appendChild(cityName)
    displayWeatherDetails.appendChild(cityTemp)
    displayWeatherDetails.appendChild(cityDescription)
    displayWeatherDetails.style.marginTop = "25px"
}