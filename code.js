document.getElementById('btn').addEventListener('click', getWeather)

async function getWeather() {
    const location = document.getElementById('location').value;
console.log(location)
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e9f08abcfcc165af817638fb402da2a3`, {mode: 'cors'}); 

    const weather = await response.json();
    
    console.log(weather);
    getInfo(weather)
}


// getWeather();




function getInfo(weather) {
const windspeed = weather.wind.speed;
const cel = convertC(weather.main.temp);
const fer = convertF(cel);
const highC = convertC(weather.main.temp_max);
const highF = convertF(highC);
const lowC = convertC(weather.main.temp_min);
const lowF = convertF(lowC);
const feelsLikeC = convertC(weather.main.feels_like);
const feelsLikeF = convertF(feelsLikeC);
const humidity = weather.main.humidity;
const location = weather.name;

const myWeather = createWeatherObject(location, windspeed, cel, fer, highC, highF, lowC, lowF, feelsLikeC, feelsLikeF, humidity);

console.log(myWeather);
displayWeather(myWeather);
}

function convertC(n){
    const cel = Math.round((n - 273.15) * 10) / 10;
    return cel;
}

function convertF(n){
    const fer = Math.round((n * (9/5) + 32) * 10) / 10;
    return fer;
}

function createWeatherObject(location, windspeed, cel, fer, highC, highF, lowC, lowF, feelsLikeC, feelsLikeF, humidity) {
const weatherObject = {
    location: location,
    wind: windspeed,
    celTemp: cel,
    ferTemp: fer,
    highC: highC,
    highF: highF,
    lowC: lowC, 
    lowF: lowF,
    feelsLikeC: feelsLikeC,
    feelsLikeF: feelsLikeF,
    humidity: humidity
}
return weatherObject;
}

function displayWeather(myWeather){
    
    if (document.getElementById('container')) {
        document.getElementById('container').remove()  
    }

    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    const header = document.createElement('h1');
    const temp = document.createElement('div');
    const high = document.createElement('div');
    const low = document.createElement('div');
    const feelsLike = document.createElement('div');
    const humidity = document.createElement('div');
    
    header.innerHTML = myWeather.location
    temp.innerHTML = ` Temperature: ${myWeather.celTemp}\u00B0C`;
    high.innerHTML = `High: ${myWeather.highC}\u00B0C`;
    low.innerHTML = `Low: ${myWeather.lowC}\u00B0C`;
    feelsLike.innerHTML = `Feels like: ${myWeather.feelsLikeC}\u00B0C`;
    humidity.innerHTML = `Humidity: ${myWeather.humidity}%`;

    container.appendChild(header)
    container.appendChild(temp)
    container.appendChild(high)
    container.appendChild(low)
    container.appendChild(feelsLike)
    container.appendChild(humidity)
    document.body.appendChild(container)
}