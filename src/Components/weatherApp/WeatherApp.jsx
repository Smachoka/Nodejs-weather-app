import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';
import searchIcon from '../Assets/images/search.png';
import windIcon from '../Assets/images/wind.png';
import cloudIcon from '../Assets/images/clouds.png';
import humidityIcon from '../Assets/images/humidity.png';
import clearIcon from '../Assets/images/clear.png';
import drizzleIcon from '../Assets/images/drizzle.png';
import mistIcon from '../Assets/images/mist.png';
import rainIcon from '../Assets/images/rain.png';
import snowIcon from '../Assets/images/snow.png';
//state variable using hooks
const WeatherApp = () => {
  const apiKey = "2acbb064d1d79391fd40ecd4ee692ae0"; //openwaether Api key
  const [wicon, setWicon] = useState(cloudIcon);
  const [selectedDate, setSelectedDate] = useState(null);
//utility function to format date
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return Math.floor(formattedDate.getTime() / 1000);
  };

  // Function to handle weather data fetching

  const search = async () => {
    //retreavingcity input
    const detail = document.getElementsByClassName("cityInput");
    //handling incase city is missing
    if (!detail || detail.length === 0 || !detail[0].value) {
      console.error("City input not found or empty.");
      return;
    }

    // Constructing the URL for weather data

    let url = `http://localhost:3300/weather/${detail[0].value}`;

//adding date if selected
    if (selectedDate) {
      url += `?dt=${formatDate(selectedDate)}`;
    }

    try {
      //fetch weather data using axios
      const response = await axios.get(url);
      const data = response.data.result;

      const humidity = document.getElementsByClassName("humidity-perc");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("temperature-rate");
      const city = document.getElementsByClassName("city-location");

      if (city.length > 0) {
        city[0].innerHTML = data.name;
      }

      if (humidity.length > 0) {
        humidity[0].innerHTML = data.main.humidity + "%";
      }

      if (wind.length > 0) {
        wind[0].innerHTML = data.wind.speed + "km/h";
      }

      if (temperature.length > 0) {
        temperature[0].innerHTML = (data.main.temp - 273.15).toFixed(1) + "°C";
      }

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clearIcon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloudIcon);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzleIcon);
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(mistIcon);
      } else if (data.weather[0].icon === "05d" || data.weather[0].icon === "05n") {
        setWicon(rainIcon);
      } else if (data.weather[0].icon === "06d" || data.weather[0].icon === "06n") {
        setWicon(snowIcon);
      } else {
        setWicon(clearIcon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
//function to handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='search' />
        <input type="date" onChange={handleDateChange}  />
        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="weather-content">
        <img src={wicon} alt="" />
        <h1 className="temperature-rate">20°C </h1>
        <h1 className="city-location">Nairobi</h1>
      </div>

      <div className="detail">
        <div className="col-1">
          <img src={humidityIcon} alt="" />
        </div>
        <div className="data">
          <p className="humidity-perc">50%</p>
          <p>humidity</p>
        </div>
      </div>
      <div className="detail">
        <div className="col-1">
          <img src={windIcon} alt="" />
        </div>
        <div className='data'>
          <p className="wind-rate">10km/h</p>
          <p>wind</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
