const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const apiKey = "1d7449f9d13c273e0e2514e226c4fc01"; // Replace

// Fetch Forecast + Display
async function fetchForecast(url) {
    const res = await fetch(url);
    const data = await res.json();
    const summary = document.getElementById("currentSummary");
    const grid = document.getElementById("forecastGrid");
    grid.innerHTML = "";

    if (!data.list) {
        summary.textContent = "No data found.";
        return;
    }

    // Current conditions: take first item
    const current = data.list[0];
    const cityName = data.city.name;
    const temp = Math.round(current.main.temp);
    const condition = current.weather[0].description;
    const feels = Math.round(current.main.feels_like);

    // Calculate today's high/low from first 8 entries (~24h)
    const todayTemps = data.list.slice(0, 8).map(i => i.main.temp);
    const high = Math.round(Math.max(...todayTemps));
    const low = Math.round(Math.min(...todayTemps));

    summary.innerHTML = `
    <h1 style="font-size:3rem;margin:0;">${temp}°C</h1>
    <h2 style="margin:5px 0;text-transform:capitalize;">${condition}</h2>
    <p style="font-size:1.2rem;">${high}/${low}°C • Feels like ${feels}°C</p>
    <p>${cityName}</p>
  `;

    // Group forecast by day
    const days = {};
    data.list.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString(undefined, { weekday: "short" });
        if (!days[day]) days[day] = [];
        days[day].push(item);
    });

    const fiveDays = Object.keys(days).slice(0, 7);
    fiveDays.forEach(day => {
        const temps = days[day].map(i => i.main.temp);
        const maxT = Math.round(Math.max(...temps));
        const minT = Math.round(Math.min(...temps));
        const icon = days[day][0].weather[0].description;
        const rain = day.pop ? Math.round(day.pop * 100) : 0; // <-- Added rain %


        const card = document.createElement("div");
        card.className = "hour-card";
        card.innerHTML = `
        <div style="font-weight:bold; font-size: 20px;">${day}</div>
        <br>
        <div style="font-size: 18px;">${icon}</div>
        <div style="font-size: 18px;">${maxT}/${minT}°C</div>
        <div style="font-size: 18px;">Rain: ${rain}%</div>
    `;
        grid.appendChild(card);
    });

    // Hourly Forecast for next 24 hours
    const hourlyContainer = document.getElementById('hourlyContainer');
    hourlyContainer.innerHTML = '';
    data.list.slice(0, 8).forEach(item => {
        const time = new Date(item.dt * 1000).getHours();
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;
        const rain = item.pop ? Math.round(item.pop * 100) : 0;

        const card = document.createElement('div');
        // card.style.padding = '10px';
        // card.style.textAlign = 'center';
        // card.style.minWidth = '80px';
        // card.style.borderRadius = '10px';
        // card.style.background = '#ffffffff';
        card.innerHTML = `
      <div>${time}:00</div>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${item.weather[0].description}">
      <div>${temp}°C</div>
      <div>Rain: ${rain}%</div>
      <div id="aqi-${time}">AQI: --</div>
    `;
        hourlyContainer.appendChild(card);

        // AQI Fetch for each time slot (using city coordinates once)
        const { lat, lon } = data.city.coord;
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1d7449f9d13c273e0e2514e226c4fc01`)
            .then(res => res.json())
            .then(aqiData => {
                const aqi = aqiData.list[0].main.aqi;
                const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
                document.getElementById(`aqi-${time}`).textContent = `AQI: ${levels[aqi - 1]} (${aqi})`;
            })
            .catch(() => {
                document.getElementById(`aqi-${time}`).textContent = 'AQI: N/A';
            });
    });

    // === Separate Div for extra details ===
    const extraInfo = document.getElementById('extraInfo');
    extraInfo.innerHTML = '';

    const { lat, lon } = data.city.coord;

    // Sunrise & Sunset
    const sunrise = new Date(data.city.sunrise * 1000);
    const sunset = new Date(data.city.sunset * 1000);
    const formatTime = d => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const sunDiv = document.createElement('div');
    sunDiv.innerHTML = `🌅 Sunrise: ${formatTime(sunrise)} <br> 🌇 Sunset: ${formatTime(sunset)}`;
    extraInfo.appendChild(sunDiv);

    // UV Index
    const uvDiv = document.createElement('div');
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=1d7449f9d13c273e0e2514e226c4fc01`)
        .then(res => res.json())
        .then(uvData => {
            uvDiv.textContent = `UV Index: ${uvData.value}`;
            extraInfo.appendChild(uvDiv);
        })
        .catch(() => {
            uvDiv.textContent = 'UV Index: N/A';
            extraInfo.appendChild(uvDiv);
        });

    // Additional Features: Humidity, Dew Point, Wind Speed, Visibility, Pressure
    const mainData = data.list[0].main;
    const windData = data.list[0].wind;

    const humidityDiv = document.createElement('div');
    humidityDiv.textContent = `Humidity: ${mainData.humidity}%`;
    extraInfo.appendChild(humidityDiv);

    const dewPointDiv = document.createElement('div');
    const T = mainData.temp; // °C
    const RH = mainData.humidity; // %
    const dewPoint = Math.round(T - ((100 - RH) / 5));
    dewPointDiv.textContent = `Dew Point: ${dewPoint}°C`;
    extraInfo.appendChild(dewPointDiv);

    const windDiv = document.createElement('div');
    windDiv.textContent = `Wind Speed: ${((windData.speed) * 5).toFixed(1)} km/h`;
    extraInfo.appendChild(windDiv);

    const visibilityDiv = document.createElement('div');
    const visibilityMeters = data.list[0].visibility;
    const visibilityKm = (visibilityMeters / 1000).toFixed(1);
    visibilityDiv.textContent = `Visibility: ${visibilityKm} km`;
    extraInfo.appendChild(visibilityDiv);

    const pressureDiv = document.createElement('div');
    pressureDiv.textContent = `Pressure: ${mainData.pressure} mb`;
    extraInfo.appendChild(pressureDiv);



}

// City Search
document.getElementById("forecastForm").addEventListener("submit", e => {
    e.preventDefault();
    const city = document.getElementById("forecastCity").value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetchForecast(url);
});

// Current Location Button
document.getElementById("forecastLocationBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchForecast(url);
        }, err => alert("Location error: " + err.message));
    } else {
        alert("Geolocation not supported.");
    }
});

