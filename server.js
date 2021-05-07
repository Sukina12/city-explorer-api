const express = require('express');
const cors = require('cors');
require('dotenv').config();
const handleWeather = require('./components/weather');
const handleMovie = require('./components/movie');
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello From Sukina');
})

app.get('/weather', handleWeather);
app.get('/movie', handleMovie);
app.listen(PORT);

