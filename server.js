require('newrelic');
console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd();

var compression = require('compression');
var express = require("express");

var app = express();

app.use(compression());

var oneDay = 86400000;

app.use(express.static(__dirname + '/images', { maxAge: oneDay }));

app.use(express.static(process.env.PWD)); 
app.get("/", function(request, response) {
    response.send("Hello SVS!");
});

app.listen(port);