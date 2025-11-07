// server.js

// set up ======================================================================
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var configDB = require('./config/database.js');

var db

// configuration ===============================================================

mongoose.connect(configDB.url, (err) => {
  if (err) return console.log(err)
  db = mongoose.connection.db
  require('./app/routes.js')(app, db);
});

// set up our express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs');

// launch ======================================================================
app.listen(port);
console.log('GigTrack app running on port ' + port);

