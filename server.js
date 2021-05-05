const express = require('express');
const cors = require('cors');
const weather = require('./assets/weather.json');
const superagent = require('superagent');
require('dotenv').config();
const PORT = process.env.PORT || 3090;
const WEATHER_BIT_API_KEY = process.env.WEATHER_BIT_KEY;
const WEATHER_BIT_API_URL = process.env.WEATHER_BIT_API_URL;
const MOVIE_DB_API_URL = process.env.THEMOVIE_DB_API_URL;
const MOVIE_DB_API_KEY = process.env.THEMOVIE_DB_API_KEY;


const app = express()
app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello From Sukina');
})
app.get('/weather', function (req, res) {

  try {
    const weatherBitURL = `${WEATHER_BIT_API_URL}?key=${WEATHER_BIT_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(weatherBitURL).then(weatherBitData => {
      const formatData = weatherBitData.body.data.map(result => new Weather(result));
      res.send(formatData);
    });
  } catch (err) {
    const formatData = weather.data.map(result => new Weather(result));
    res.send(formatData);
  }
});

app.get('./movie', function (req, res) {
  try {
    const movieDbURL = `${MOVIE_DB_API_URL}?api_key=${MOVIE_DB_API_KEY}&query=${req.query.city}&limit=10`;
    superagent.get( movieDbURL).then( movieDbData => {
      const formatData = movieDbData.body.results.map(result => new Movie(result));
      res.send(formatData);
    });
  } catch (err) {
    res.send(err);
  }
});

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}
class Movie {
  constructor(data){
    this.title = data.original_title;
    this.img = data.poster_path;
    this.releaseDate = data.releaseDate;
    this.description =data.overview
  }
}
app.listen(PORT);
