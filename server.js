/*var express = require("express");
var http = require("http").Server(app);
var app = express();
var io = require("socket.io")(http);

app.get('/', function(req,res){
	res.sendFile('pages/index.html', {root:__dirname});
});

io.on('connection', function(socket){
	console.log('User connected.');
});

app.listen(8080);*/

var express = require("express");
var app = express();
var http = require("http").Server(app);
var socket = require("socket.io");

app.get('/', function(req,res){
	res.sendFile(__dirname+"/pages/index.html");
})

var io = socket.listen(app.listen(8080));

io.on('connection', function(socket){
	console.log("connection on", socket.id);
})