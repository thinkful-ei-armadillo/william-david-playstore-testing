const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const playstore = require('./playstore')

const app = express();

app.use(morgan('dev'));
app.use(cors())

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query;

  if(sort){
    if(!['Rating', 'App'].includes(sort)){
      res.status(400).send('Sort must be either Rating or App')
    }
  } else 

  if(genres){
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
      res.status(400).send("Genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'")
    }
  } else {

  let results = playstore.filter(app => app.App.toLowerCase());

  if(sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
    });
  }

  if(genres) {
    results = results.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()))
  }
  res.send(results)
  }
})

module.exports = app