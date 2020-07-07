var express = require('express');
var app = express();
var http = require('http').createServer(app);
const WebSocket = require('ws');

var netcodeClient = require('./netcode/client')
var netcodeState = require('./netcode/state')

const wss = new WebSocket.Server({ port: 8000 });

var clients = [];

wss.on('connection', function connection(ws) {
  console.log("New connection")
  clients.push(new netcodeClient.Client(ws));
});


setInterval(function() {
  if(clients.length == 0) {
    return;
  }
  netcodeState.sendState(clients, wss);
}, 9);

app.use(express.static('www'))

http.listen(8080, () => {
  console.log('listening on *:8080');
});