var express = require("express");
var app = express();
var http = require("http").Server(app);

app.get('/', function(req,res){
	res.sendFile(__dirname+"/pages/index.html");
})

app.listen(8080);