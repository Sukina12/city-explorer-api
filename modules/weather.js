'use strict';
const superagent = require('superagent');
require('dotenv').config();

// data from json file
const weather = require('../assets/weather.json');

// env
const WEATHER_API_KEY = process.env.WEATHER_BIT_API_KEY;

// cache 
let cache = require('./cache');

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

const handleWeather = (req, res) => {
  try {
    const weatherURL =`https://api.weatherbit.io/v2.0/forecast/daily`;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const queryParams = {
    key: WEATHER_API_KEY,
    lat: req.query.lat,
    lon: req.query.lon
    };
    if (cache[[lat,lon]]) {
      console.log('cache hit, get weather from cache');
      res.send(cache[key]);
    } else {
      superagent.get(weatherURL).query(queryParams).then(weatherBitData => {
        const formatData = weatherBitData.body.data.map(result=> new Weather(result));
        cache[[lat,lon]] = formatData;
        res.send(formatData);
        console.log('sent data from the API');
      })
    }
  }catch (err ){
    const formatData = weather.data.map(result => new Weather(result));
    res.send(formatData);
    console.log('hi sukina');
  }
};

module.exports = handleWeather;