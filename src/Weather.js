import React, { useState } from 'react';
import './Weather.css';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '431b2b12c549436bac3171017241109'; 

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.location.name}</h2>
          <p>{weather.current.condition.text}</p>
          <p>{weather.current.temp_c}°C</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
