const superagent = require('superagent');
require('dotenv').config();

const MOVIE_DB_API_URL = process.env.MOVIE_DB_API_URL;
const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY;


class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.img = data.poster_path;
    this.description = data.overview
  }
}

const handleMovie = (req, res) => {
  try {
    const movieDbURL = `${MOVIE_DB_API_URL}?api_key=${MOVIE_DB_API_KEY}&query=${req.query.query}&limit=10`;
    superagent.get(movieDbURL).then(movieDbData => {
      const formatData = movieDbData.body.results.map(data=> new Movie(data));
      res.send(formatData);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleMovie;


