# SkyCast — Real-Time Weather Dashboard

A responsive weather dashboard built with HTML, CSS, and vanilla JavaScript.

## Features
- Search weather by city name.
- Uses Fetch API and async/await.
- Resolves city names to coordinates with Open-Meteo Geocoding.
- Displays current temperature, feels-like temperature, humidity, wind speed, wind direction, and conditions.
- Handles invalid city names, HTTP errors, missing API data, and network failures.
- Responsive layout for desktop and mobile.

## Run locally
1. Extract the project folder.
2. Open it in Visual Studio Code.
3. Run `index.html` with the Live Server extension (recommended), or serve the folder with a local web server.
4. Search for a city such as Chennai, Mumbai, London, or Tokyo.

## APIs
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Current weather: `https://api.open-meteo.com/v1/forecast`

No API key is required for non-commercial use. See the [Open-Meteo documentation](https://open-meteo.com/en/docs).

## Concepts demonstrated
- `fetch()` and `async/await`
- `try/catch/finally`
- HTTP response validation with `response.ok`
- JSON parsing with `response.json()`
- Nested object access (`data.current.temperature_2m`)
- DOM manipulation and form event handling
