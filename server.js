var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/poiModel'),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  HTTPStatus = require('http-status');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Pois');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

var routes = require('./api/routes/poiRoutes');
routes(app);

app.listen(port);

console.log('API server started on: ' + port);