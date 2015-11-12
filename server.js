// Set up =================================
var express = require("express");
var app = express(); //Create app with express
var mongoose = require("mongoose"); // Mongoose for MongoDb
var morgan = require("morgan"); // log requests to console
var bodyParser = require("body-parser"); //pull info from html post
var methodOverride = require("method-override");
var database = require("./config/database")
require('./app/routes')(app);
//config

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
