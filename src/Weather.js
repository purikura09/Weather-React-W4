import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Weather(props) {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});
  //let [message, setMessage] = useState();
  function displayWeather(response) {
    console.log(response.data);
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ee1b96c1f77d3aae1b3b86327285b0f8&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayWeather);
    //setMessage(`${city}`);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="input-search"
        type="search"
        onChange={updateCity}
        placeholder="Search city..."
      />
      <input className="search-button" type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <br />
        <br />
        <div class="row">
          <div className="main col-8">
            <h1>{city}</h1>

            <p> Description: {weather.description}</p>
            <p>
              Humidity: {weather.humidity} %, Wind: {weather.wind} km/h
            </p>
          </div>
          <div className="main col-2">
            <h2>{Math.round(weather.temperature)}</h2>
          </div>
          <div className="weather-temperature col-2">
            °C
            <br />
            <img src={weather.icon} alt="Clear" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Weather">
        {form}
        <br />
        <br />
        <div class="row">
          <div className="main col-8">
            <h1>Zurich</h1>

            <p> Description: </p>
            <p>Humidity: %, Wind: km/h</p>
          </div>
          <div className="main col-2">
            <h2>30</h2>
          </div>
          <div className="weather-temperature col-2">
            °C
            <br />
          </div>
        </div>
      </div>
    );
  }
}
