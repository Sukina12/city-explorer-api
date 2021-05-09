const superagent = require('superagent');
require('dotenv').config();
const { query } = require('express');
const inMemory = require('./cache')

const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY;


class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.img = data.poster_path;
    this.description = data.overview
  }
}

const handleMovie = (req, res) => {
  const MOVIE_DB_API_URL = process.env.WEATHER_BIT_API_URL;
  const querParams = {
    key: MOVIE_DB_API_KEY,
    query: req.query.query
  };
  if (inMemory[query]) {
    console.log('cache hit, get movie from cache');
    res.status(200).send(inMemory[query]);
  } else {
    superagent.get(MOVIE_DB_API_URL).query(querParams).then(movieData => {
      const formatData = movieData.body.results.map(result => new Movie(result));
      console.log(' we got the movie from the api');
      inMemory[query] = formatData;
      res.send(formatData);
    }).catch(err => res.send(err));
  }
};

module.exports = handleMovie;


