const superagent = require('superagent');
require('dotenv').config();

const weather = require('../assets/weather.json');

const WEATHER_BIT_API_KEY = process.env.WEATHER_BIT_API_KEY;
const WEATHER_BIT_API_URL = process.env.WEATHER_BIT_API_URL;

let inCache= require ('./cache');
module.exports = getWeather;

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

function getWeather (lati,long){
  const key= 'weather-' + lati + long;
  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams ={
    key:WEATHER_BIT_API_KEY,
    lang:'en',
    lat:lat,
    lon:lon,
    dayd:5
  };

  if(cache[key]{
    console.log('cache hit');
  }else{
    console.log()
  }
  })
}
const handleWeather = (req, res) => {

  try {
    // console.log(req.query);
    const weatherBitURL = `${WEATHER_BIT_API_URL}?key=${WEATHER_BIT_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(weatherBitURL).then(weatherBitData => {
      const formatData = weatherBitData.body.data.map(result => new Weather(result));
      res.send(formatData);
    });
  } catch (err) {
    const formatData = weather.data.map(result => new Weather(result));
    res.send(formatData);
  }
};

module.exports = handleWeather;
