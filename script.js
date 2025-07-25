const apiKey = "c5258391cd0d9f4cb4e39bdb9de9dc0f";

// keyborad peromance
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeatherByCity();
    }
})

// main functionality
async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

function getWeatherByLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            fetchWeather(url);
        },
        (error) => {
            alert("Location access denied or unavailable.");
        }
    );
}

async function fetchWeather(url) {
    const weatherDiv = document.getElementById("weatherInfo");
    weatherDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            weatherDiv.innerHTML = `
  <div class="weather-card">
    <h2>${data.name}, ${data.sys.country}</h2>
    <div class="date-time">${new Date().toLocaleString()}</div>
    <div class="weather-main">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" class="weather-icon" />
      <div class="temp-ring">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path class="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path class="circle"
            stroke-dasharray="${Math.min((data.main.temp / 50) * 100, 100)}, 100"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <text x="18" y="20.35" class="percentage">${data.main.temp}°C</text>
        </svg>
      </div>
    </div>
    <div class="description">${data.weather[0].description}</div>
    <div class="weather-details">
        <div>💧 Humidity: ${data.main.humidity}%</div>
        <div>🌬 Wind: ${data.wind.speed} m/s</div>
        <div>🌡 Feels Like: ${(data.main.feels_like)}°C</div>
        <div>🔽 Pressure: ${data.main.pressure} mb</div>
        <div>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</div>
        <div>🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</div>
    </div>
  </div>
`;
            showSmartTip(data.main.temp);

        } else {
            weatherDiv.innerHTML = `<p>${data.message}</p>`;
            showSmartTip(null); // clear or default tip
        }
    } catch (error) {
        weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}


// more citys 
const majorIndianCities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Pune", "Jaipur"];

async function updateMajorCitiesWeather() {
    for (const city of majorIndianCities) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.cod === 200) {
                // Find the city div by matching text (simple way)
                const cityDivs = document.querySelectorAll(".india-cities .city");
                cityDivs.forEach(div => {
                    if (div.textContent.includes(city)) {
                        const tempSpan = div.querySelector(".temp");
                        if (tempSpan) tempSpan.textContent = `${Math.round(data.main.temp)}°C`;
                    }
                });
            }
        } catch (e) {
            console.warn(`Failed to fetch weather for ${city}:`, e);
        }
    }
}

window.addEventListener("load", () => {
    updateMajorCitiesWeather();
});


// more tip of wether
function showSmartTip(temp) {
    const tip = document.getElementById("tipMessage");
    if (!tip) return;

    if (temp === null || temp === undefined) {
        tip.innerText = "Analyzing weather...";
        return;
    }

    if (temp < 10) {
        tip.innerText = "Brrr... It's cold! Grab a hoodie and a hot chocolate ☕";
    } else if (temp >= 10 && temp <= 25) {
        tip.innerText = "Perfect weather for a walk 🚶‍♂️";
    } else if (temp > 25 && temp <= 35) {
        tip.innerText = "A bit hot! Stay hydrated 💧";
    } else {
        tip.innerText = "🔥 Extreme heat! Avoid going out at noon!";
    }
}

// humbergr
function toggleMenu() {
    const menu = document.getElementById("navLinks");
    menu.classList.toggle("show");
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const menu = document.getElementById("navLinks");
    const hamburger = document.querySelector(".hamburger");
    const isClickInsideMenu = menu.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInsideMenu && menu.classList.contains("show")) {
        menu.classList.remove("show");
    }
});