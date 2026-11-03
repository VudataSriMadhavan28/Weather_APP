
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weatherDisplay = document.getElementById("weatherDisplay");

const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const updatedTime = document.getElementById("updatedTime");

weatherForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading weather...";
    weatherDisplay.classList.add("hidden");

    try {
        // Get city coordinates
        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();

        if (!geoResponse.ok) {
            throw new Error("Unable to search for city.");
        }

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Try another city.");
        }

        const location = geoData.results[0];

        // Get weather data
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            throw new Error("Unable to get weather data.");
        }

        if (!weatherData.current) {
            throw new Error("Weather data is unavailable.");
        }

        const current = weatherData.current;

        // Display city
        cityName.textContent = `${location.name}, ${location.country}`;

        // Display temperature
        temperature.textContent = current.temperature_2m;

        // Display humidity
        humidity.textContent = `${current.relative_humidity_2m}%`;

        // Display wind speed
        windSpeed.textContent = `${current.wind_speed_10m} km/h`;

        // Display weather description and icon
        weatherDescription.textContent =
            getWeatherDescription(current.weather_code);

        weatherIcon.textContent =
            getWeatherEmoji(current.weather_code);

        // Display update time
        updatedTime.textContent = current.time;

        // Show the weather card
        weatherDisplay.classList.remove("hidden");

        // Clear loading message
        message.textContent = "";

        console.log("Weather successfully displayed:", weatherData);

    } catch (error) {
        message.textContent = error.message;
        console.error("Weather dashboard error:", error);
    }
});

function getWeatherDescription(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code === 45 || code === 48) return "Fog";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 85 && code <= 86) return "Snow showers";
    if (code >= 95) return "Thunderstorm";

    return "Weather unavailable";
}

function getWeatherEmoji(code) {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 85 && code <= 86) return "🌨️";
    if (code >= 95) return "⛈️";

    return "🌡️";
}
