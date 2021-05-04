const express = require('express')
const cors = require('cors')
const weather = require('./assets/weather.json')
const { json } = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3030;
const app = express()
app.use(cors())
app.get('/', function (req, res) {
  res.send('Hello World')
});
app.get('/weather', function (req, res) {
  res.send(weather)
})
app.listen(PORT)
