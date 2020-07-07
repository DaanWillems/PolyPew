var express = require('express');
var app = express();
var http = require('http').createServer(app);
const WebSocket = require('ws');

var netcodeClient = require('./netcode/client')
var hub = require('./netcode/hub')

const wss = new WebSocket.Server({ port: 8000 });

var clients = [];

var hub = new hub.Hub(clients);

wss.on('connection', function connection(ws) {
  console.log("New connection")
  clients.push(new netcodeClient.Client(ws, hub));
});


setInterval(function() {
  if(clients.length == 0) {
    return;
  }
  hub.sendState(clients, wss);
}, 9);

app.use(express.static('www'))

http.listen(8080, () => {
  console.log('listening on *:8080');
});