var express = require("express");
var http = require("http");
var websocket = require("ws");

var server = http.createServer();
var wss = new wsserver({server:server});
var app = express();

server.on('request', app);

function broadcastWS(message){
	wss.clients.forEach(function(client){
		if(client.readyState === client.OPEN){
			client.send(message);
		}
	})
}

function respondWS(ws){
	ws.on('message', broadcastWS);
}

app.get('/', function(req,res){
	res.sendFile('pages/index.html', {root:__dirname});
})

wss.on('connection', respondWS);

app.listen(8080);