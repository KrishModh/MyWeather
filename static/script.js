document.addEventListener("DOMContentLoaded", () => {

    // Search Weather
    document.getElementById("searchForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const city = document.getElementById("city").value;
        const res = await fetch("/weather", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `city=${city}`
        });
        const data = await res.json();
        if (data.cod !== 200) {
            document.getElementById("weatherResult").innerHTML = `<p>City not found</p>`;
            return;
        }
        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <p>🌡 ${data.main.temp} °C | 💧 ${data.main.humidity}% | 💨 ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
        `;
    });

    // Current Location Weather
    document.getElementById("currentLocationBtn").addEventListener("click", () => {
        if (!navigator.geolocation) return alert("Geolocation is not supported by your browser.");
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const res = await fetch("/weather", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `lat=${lat}&lon=${lon}`
            });
            const data = await res.json();
            if (data.cod === 200) {
                document.getElementById("weatherResult").innerHTML = `
                    <h2>Current Location: ${data.name}, ${data.sys.country}</h2>
                    <p>${data.weather[0].description}</p>
                    <p>🌡 ${data.main.temp} °C | 💧 ${data.main.humidity}% | 💨 ${(data.wind.speed * 5).toFixed(1)} km/h</p>
                `;
            } else {
                document.getElementById("weatherResult").innerHTML = `<p>Unable to fetch location weather</p>`;
            }
        });
    });

    // Quotes Section
    async function fetchQuote() {
        try {
            const res = await fetch("https://api.quotable.io/random");
            const data = await res.json();
            document.getElementById("quoteText").innerText = `"${data.content}" — ${data.author}`;
        } catch {
            document.getElementById("quoteText").innerText = "The only limit to our realization of tomorrow will be our doubts of today";
        }
    }

    // Active Cities Weather
    const activeCities = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai"];
    async function fetchActiveCitiesWeather() {
        const container = document.getElementById("citiesWeather");
        container.innerHTML = "";
        for (let city of activeCities) {
            try {
                const res = await fetch("/weather", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `city=${city}`
                });
                const data = await res.json();
                if (data.cod === 200) {
                    const card = document.createElement("div");
                    card.className = "city-card";
                    card.innerHTML = `
                        <h4>${data.name}</h4>
                        <p>${data.weather[0].main}</p>
                        <p>🌡 ${data.main.temp} °C</p>
                        <p>💧 ${data.main.humidity}% | 💨 ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
                    `;
                    container.appendChild(card);
                }
            } catch (err) {
                console.log(`Error fetching ${city}:`, err);
            }
        }
    }

    // Initial fetch
    fetchQuote();
    fetchActiveCitiesWeather();

    // Refresh quotes & active cities every 10 mins
    setInterval(() => {
        fetchQuote();
        fetchActiveCitiesWeather();
    }, 600000);

    // clock logic
    function updateClock() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const date = now.toLocaleDateString([], options);

        document.getElementById("clock").innerHTML = `
        <div>${time}</div>
        <div style="font-size:1rem; opacity:0.8;">${date}</div>
      `;
    }
    setInterval(updateClock, 1000);
    updateClock();
});

