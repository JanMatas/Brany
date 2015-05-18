var request = require('request');
var fs = require('fs');

var dataObj = {};

var port = process.argv[2];

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: port });

console.log("New server, listening on port " + port);
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};
wss.on('error', function(a, b) {console.error("ERROR - ", a, b);})
wss.on('connection', function connection(ws) {

    console.log("new client: " + ws)
    ws.on('message', function incoming(message) {
        console.log(message);

    });



});