'use strict';
const env = process.env.NODE_ENV || 'development';
const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const apiKey = 'AIzaSyBUcxMTR644jrjC100EMQQbFbTVeEHxOac';

const app = express();

if (env === 'development') {
  app.use(require('morgan')('dev'));
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/places', (req, res, next) => {

  const result = [];
  const promises = [];
  let url,
      parsed;

  req.body.places.forEach(placeId => {
    url = 'https://maps.googleapis.com/maps/api/place/details/json?' +
          `placeid=${placeId}&key=${apiKey}`;
    promises.push(rp(url));
  });

  Promise.all(promises).then(data => {
    data.forEach(datum => {
      parsed = JSON.parse(datum);

      if (parsed.error) {
        res.json({parsed: parsed});
        const error = new Error(parsed.error.message);
        error.status = parsed.error.code;
        next(error);
      }

      if (parsed.result.website) {
        result.push(parsed.result.website);
      } else  {
        result.push(null);
      }

    });

    res.json({result: result});

  }).catch(error => {
    res.json({message: error});
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({message: err.message});
});

module.exports = app;
