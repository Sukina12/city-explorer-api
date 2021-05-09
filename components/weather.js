const superagent = require('superagent');
require('dotenv').config();

const weather = require('../assets/weather.json');

const WEATHER_BIT_API_KEY = process.env.WEATHER_BIT_API_KEY;

const inMemory = require('./cache')

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

const handleWeather = (req, res) => {
  try {
    const WEATHER_BIT_API_URL = process.env.WEATHER_BIT_API_URL;
    const querParams = {
    key: WEATHER_BIT_API_KEY,
    lat: req.query.lat,
    lon: req.query.lon
    };
    if (inMemory[[lat, lon]]) {
      console.log('cache hit, get weather from cavhe');
      res.send(inMemory[[lat, lon]]);
    } else {
      superagent.get(WEATHER_BIT_API_URL).get(querParams).then(weatherBitData => {
        const formatData = weatherBitData.body.data.map(result => new Weather(result));
        inMemory[[lat,lon]] = formatData;
        res.send(formatData);
      })
    }
  } catch (err) {
    const formatData = weather.data.map(result => new Weather(result));
    res.send(formatData);
  }
};

module.exports = handleWeather;