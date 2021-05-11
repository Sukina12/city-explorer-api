const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Modules
const handleWeather = require('./modules/weather');
const handleMovie = require('./modules/movie');

// env
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.get('/', (req, res)=> {
  res.send('Hello From Sukina');
});
app.get('/weather', handleWeather);
app.get('/movie', handleMovie);
app.listen(PORT);

