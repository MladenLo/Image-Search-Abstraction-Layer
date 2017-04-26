//Importing modules
var express = require("express");

//Importing routes
var indexRoute = require('./app/routes/index');

var app = express();

//Set static files path
app.use(express.static(__dirname + '/public'));

//Set view directory
app.set('view engine', 'pug');
app.set('views', './app/views');

app.use('/', indexRoute);

//Handle error
app.use(function(req, res){
    res.send("This page don't exist.");
});

app.listen(process.env.PORT || 8000);
