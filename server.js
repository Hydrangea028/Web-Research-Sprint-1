var express = require("express");
var http = require("http");
var websocket = require("ws");
var app = express();
var server = http.createServer(app);
var wss = new websocket.Server({server});

/*wss.on('connection', (ws : WebSocket) => {
	ws.on('message', (message : string) =>{
		ws.send("Hi");
	});
});*/

app.get('/', function(req,res){
	res.sendFile('pages/index.html', {root:__dirname});
})

app.listen(3000);