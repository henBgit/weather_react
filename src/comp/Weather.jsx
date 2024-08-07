import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Content from './Content';
import { apiAutoComplete, apiLocationWeatherDaily, apilocationWeatherFiveDays } from '../api/ServiceApi';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [weatherData, setWeatherData] = useState({
    Temperature: null,
    WeatherText: null,
  });
  const [weatherDataFive, setWeatherDataFive] = useState([]);
  const location = useLocation();

  const handleInputChange = async (value) => {
    const inputCityName = value;
    if (value === '') return;
    const response = await apiAutoComplete(inputCityName);
    if (!response || !response.key || !response.name) {
      alert('Invalid response from autocomplete API:', JSON.stringify(response));
      return;
    }
    setCityCode(response.key);
    setCityName(response.name);

    try {
      const weather = await apiLocationWeatherDaily(response.key);
      setWeatherData({
        Temperature: weather.Temperature,
        WeatherText: weather.WeatherText,
        icon: weather.WeatherIcon,
      });
      const weatherFiveDays = await apilocationWeatherFiveDays(response.key);
      setWeatherDataFive(weatherFiveDays);
      localStorage.setItem(response.name, JSON.stringify({
        cityCode: response.key,
        cityName: response.name,
        weatherData: {
          Temperature: weather.Temperature,
          WeatherText: weather.WeatherText,
          icon: weather.WeatherIcon,
        },
        weatherDataFive: weatherFiveDays,
      }));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleAddToFavorites = () => {
    if (cityCode && cityName) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isCityInFavorites = favorites.some(favorite => favorite.key === cityCode);
      if (!isCityInFavorites) {
        localStorage.setItem('favorites', JSON.stringify([...favorites, { key: cityCode, name: cityName, temperature: weatherData.Temperature, icon: weatherData.icon }]));
        alert("City Has Been Added To Favorites");
      } else {
        alert("City is Already in Favorites");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const selectedCity = location.state?.selectedCity || 'Tel Aviv';
      if (selectedCity) {
        try {
          const cachedWeatherData = JSON.parse(localStorage.getItem(selectedCity));
          if (cachedWeatherData) {
            setCityCode(cachedWeatherData.cityCode);
            setCityName(cachedWeatherData.cityName);
            setWeatherData(cachedWeatherData.weatherData);
            setWeatherDataFive(cachedWeatherData.weatherDataFive);
          } else {
            setCityCode('');
            setCityName('');
            const autoCompleteResponse = await apiAutoComplete(selectedCity);
            setCityCode(autoCompleteResponse.key);
            setCityName(autoCompleteResponse.name);

            const weather = await apiLocationWeatherDaily(autoCompleteResponse.key);
            setWeatherData(weather);

            const weatherFiveDays = await apilocationWeatherFiveDays(autoCompleteResponse.key);
            setWeatherDataFive(weatherFiveDays);
            
            localStorage.setItem(selectedCity, JSON.stringify({
              cityCode: autoCompleteResponse.key,
              cityName: autoCompleteResponse.name,
              weatherData: weather,
              weatherDataFive: weatherFiveDays,
            }));
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchData();

  }, [location.state?.selectedCity]);

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city name"
        onBlur={(e) => handleInputChange(e.target.value)}
        defaultValue="Tel Aviv"
        className="input-field"
      />
      {weatherData && (
        <div className="weather-card">
          <Content
            cityName={cityName}
            temperature={weatherData.Temperature}
            dayscraft={weatherDataFive}
            weatherText={weatherData.WeatherText}
            weatherIcon={weatherData.icon}
          />
        </div>
      )}
      <button
        onClick={handleAddToFavorites}
        className="favorite-button"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default Weather;
