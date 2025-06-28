document.addEventListener("DOMContentLoaded", () => {
    const fetchWeather = async (city = 'delhi') => {
        const url = 'https://open-weather13.p.rapidapi.com/city/lafhdthjtfjndon/EN';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '234cd620c1msh7665a58b01a3e38p14a2dbjsne4b98b159c27',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            // Update weather details dynamically
            document.getElementById('temp').innerHTML = result.main.temp;
            document.getElementById('feels_like').innerHTML = result.main.feels_like;
            document.getElementById('temp_min').innerHTML = result.main.temp_min;
            document.getElementById('temp_max').innerHTML = result.main.temp_max;
            document.getElementById('pressure').innerHTML = result.main.pressure;
            document.getElementById('humidity').innerHTML = result.main.humidity;
            document.getElementById('sea_level').innerHTML = result.main.sea_level || "N/A";
            document.getElementById('grnd_level').innerHTML = result.main.grnd_level || "N/A";
            document.getElementById('visibility').innerHTML = result.visibility;
            document.getElementById('speed').innerHTML = result.wind.speed;

            // Update heading with city name
            document.querySelector('h1.text-center').innerHTML = `Weather of ${city.charAt(0).toUpperCase() + city.slice(1)}`;
        } catch (error) {
            console.error(error);
            alert("Failed to fetch weather data. Please check the city name.");
        }
    };

    const fetchCityWeather = async (city) => {
        const url = 'https://open-weatherhvhjvhjvhjv13.p.rapidapi.com/city/landon/EN';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '234cd620c1msh7665a58b01a3e38p14a2dbjsne4b98b159c27',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
	}
};

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return {
                city: city,
                cloud: result.clouds.all + '%',
                feels_like: result.main.feels_like + '°C',
                humidity: result.main.humidity + '%'
            };
        } catch (error) {
            console.error(`Error fetching data for ${city}:`, error);
            return null;
        }
    };

    const populateCityTable = async () => {
        const weatherTableBody = document.querySelector("#weatherTable tbody");
        const cities = ['Delhi', 'Bangalore'];
        const cityWeatherData = await Promise.all(cities.map(fetchCityWeather));

        cityWeatherData.forEach((data) => {
            if (data) {
                const row = `<tr>
                                <td>${data.city}</td>
                                <td>${data.cloud}</td>
                                <td>${data.feels_like}</td>
                                <td>${data.humidity}</td>
                            </tr>`;
                weatherTableBody.innerHTML += row;
            }
        });
    };

    // Search functionality
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        const searchInput = document.querySelector("input[type='search']");
        const city = searchInput.value.trim().toLowerCase();

        if (city) {
            fetchWeather(city);
            searchInput.value = ""; // Clear search input
        } else {
            alert("Please enter a city name!");
        }
    });

    // Initial fetch for default city
    fetchWeather();
    populateCityTable();
});
