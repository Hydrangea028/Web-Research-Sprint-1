'use strict';
const	express = require('express'),
		app = express(),
		server = require('http').Server(app),
		io = require('socket.io')(server),
		port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/pages'));

server.listen(port);
console.log("On port " + port);