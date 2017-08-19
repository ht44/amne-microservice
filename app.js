'use strict';
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const request = require('request');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const apiKey = 'AIzaSyB87efOaaHv_mu2guTvd7CdrvWixFd1ooA';
// const apiKey = 'AIzaSyAt57aFTIxEQWj8DZyWSbWBlQ4KHHSXsk8';
const app = express();
if (env === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  res.send('hello world');
});

app.post('/places', (req, res, next) => {
  const promises = [];
  const result = [];
  let url;
  req.body.places.forEach(placeId => {
    url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
    promises.push(rp(url));
  });
  Promise.all(promises).then(data => {
    data.forEach(datum => {
      let parsed = JSON.parse(datum);
      if (parsed.result.website) {
        result.push(parsed.result.website);
      } else  {
        result.push(null);
      }
    });
    console.log(result);
    res.json({result: result});
  }).catch(error => {
    console.error(error);
    res.json({error: error});
  })
});

app.listen(port, () => {
  console.log('Running on port: ', port);
});
