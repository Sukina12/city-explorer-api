const superagent = require('superagent');
require('dotenv').config();

// cache
// const cache = require('./cache');
const cache ={};

// env
const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY;

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.img = data.poster_path;
    this.releasedDate = data.release_date;
    this.description = data.overview
  }
}

const handleMovie = (req, res) => {
  try {
    const movieURL = `https://api.themoviedb.org/3/search/movie`;
    const key = req.query.query;
    const queryParams = {
      api_key: MOVIE_DB_API_KEY,
      query: req.query.query
    };
    if (cache[key]) {
      console.log('cache hit');
      res.send(cache[req.query.query]);

    } else {
      superagent.get(movieURL).query(queryParams).then(movieData => {
        const formatData = movieData.body.results.map(result => new Movie(result));
        console.log(' we got the movie from the api');
        cache[key] = formatData;
        res.send(formatData);
      });
    }
    }catch(error)
    {
      res.send (error);
    }
  };

  module.exports = handleMovie;


