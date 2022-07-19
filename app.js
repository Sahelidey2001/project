require('dotenv').config();
const express = require("express");
const https = require("https");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let s_City,
  s_Temp,
  s_FeelsLike,
  s_humidity,
  s_uvIndex,
  s_windSpeed,
  s_description,
  s_imageURL,
  s_forecastArray,
  s_currentDay,
  s_statusCode;
let getGeoLocation = false;
let cur_city, cur_temp, cur_feelsLike, cur_humidity, cur_uvi, cur_wind, cur_desc, cur_image, cur_forecast, cur_day; 

app.get("/", (req, res) => {
  res.render("home", {});
});

app.get("/index", (req, res) => {
  if(getGeoLocation === true){
    res.render("index", {
      city: cur_city,
      currentTemp: cur_temp,
      feelsLike: cur_feelsLike,
      humidity: cur_humidity,
      uvIndex: cur_uvi,
      windSpeed: cur_wind,
      description: cur_desc,
      imageURL: cur_image,
      forecastArray: cur_forecast,
      currentDay: cur_day,
      s_City: s_City,
      s_Temp: s_Temp,
      s_FeelsLike: s_FeelsLike,
      s_currentDay: s_currentDay,
      s_description: s_description,
      s_forecastArray: s_forecastArray,
      s_humidity: s_humidity,
      s_imageURL: s_imageURL,
      s_uvIndex: s_uvIndex,
      s_windSpeed: s_windSpeed,
      s_statusCode: s_statusCode,
    });
  } else {
    res.redirect("/");
  }

});

app.post("/", (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  getGeoLocation = true;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const urlOne =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  const urlTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=${unit}`;

  https.get(urlOne, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data); //Convert Hexadecimal code ito javascript object
      const stsCode = weatherData.cod;

      if (stsCode === 200) {
        const city = weatherData.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        https.get(urlTwo, (response) => {
          response.on("data", (data) => {
            let weekDay = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const forecastData = JSON.parse(data);
            const temp = forecastData.current.temp;
            const feelsLike = forecastData.current.feels_like;
            const humidity = forecastData.current.humidity;
            const uvIndex = forecastData.current.uvi;
            const windSpeed = forecastData.current.wind_speed;
            const weatherDesc = forecastData.current.weather[0].description;
            const icon = forecastData.current.weather[0].icon;
            const currentDay =
              weekDay[new Date(forecastData.current.dt * 1000).getDay()];
            const imageURL =
              " http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const forecastArray = [];

            for (i = 0; i < 5; i++) {
              let forecast = {
                date: weekDay[
                  new Date(forecastData.daily[i].dt * 1000).getDay()
                ],
                maxTemp: forecastData.daily[i].temp.max,
                minTemp: forecastData.daily[i].temp.min,
                forecastHumidity: forecastData.daily[i].humidity,
                description: forecastData.daily[i].weather[0].description,
                image: `http://openweathermap.org/img/wn/${forecastData.daily[i].weather[0].icon}@2x.png`,
                humidity: forecastData.daily[i].humidity,
                windSpeed: forecastData.daily[i].wind_speed,
              };
              forecastArray.push(forecast);
            }
            // console.log(forecastArray);
            cur_city = city;
            cur_temp = temp;
            cur_feelsLike = feelsLike;
            cur_desc = weatherDesc;
            cur_humidity = humidity,
            cur_uvi = uvIndex;
            cur_wind = windSpeed;
            cur_day = currentDay;
            cur_image = imageURL;
            cur_forecast = forecastArray;
            res.redirect("/index");
          });
        });
      }
    });
  });
});

// search portion

app.post("/search", (req, res) => {
  const city = req.body.search;
  const apiKey = "645299be1b730cf665cb8a833ae8f8b7";
  const unit = "metric";
  const urlOne = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  https.get(urlOne, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const stsCode = weatherData.cod;

      if (stsCode === 200) {
        const city = weatherData.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        const urlTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=${unit}`;
        https.get(urlTwo, (response) => {
          response.on("data", (data) => {
            let weekDay = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const forecastData = JSON.parse(data);
            const temp = forecastData.current.temp;
            const feelsLike = forecastData.current.feels_like;
            const humidity = forecastData.current.humidity;
            const uvIndex = forecastData.current.uvi;
            const windSpeed = forecastData.current.wind_speed;
            const weatherDesc = forecastData.current.weather[0].description;
            const icon = forecastData.current.weather[0].icon;
            const currentDay =
              weekDay[new Date(forecastData.current.dt * 1000).getDay()];
            const imageURL =
              " http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const forecastArray = [];

            for (i = 0; i < 5; i++) {
              let forecast = {
                date: weekDay[
                  new Date(forecastData.daily[i].dt * 1000).getDay()
                ],
                maxTemp: forecastData.daily[i].temp.max,
                minTemp: forecastData.daily[i].temp.min,
                forecastHumidity: forecastData.daily[i].humidity,
                description: forecastData.daily[i].weather[0].description,
                image: `http://openweathermap.org/img/wn/${forecastData.daily[i].weather[0].icon}@2x.png`,
                humidity: forecastData.daily[i].humidity,
                windSpeed: forecastData.daily[i].wind_speed,
              };
              forecastArray.push(forecast);
            }
            // console.log(forecastArray);
            s_City = city;
            s_Temp = temp;
            s_FeelsLike = feelsLike;
            s_humidity = humidity;
            s_uvIndex = uvIndex;
            s_windSpeed = windSpeed;
            s_description = weatherDesc;
            s_currentDay = currentDay;
            s_imageURL = imageURL;
            s_forecastArray = forecastArray;
            s_statusCode = stsCode;
            res.redirect("/index");
          });
        });
      } else {
        s_City = "";
        s_Temp = "";
        s_FeelsLike = "";
        s_humidity = "";
        s_uvIndex = "";
        s_windSpeed = "";
        s_description = "";
        s_currentDay = "";
        s_imageURL = "";
        s_forecastArray = [];
        s_statusCode = stsCode;
        res.redirect("/index");
      }
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
