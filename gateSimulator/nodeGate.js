/**
 * Created by Sam on 18/05/15.
 */

var connectionInfo = require('../node_modules/connectionInfo');
var messages = require('../node_modules/messages');

var WebSocket = require('ws');
var ws;

function connect() {
    if (ws) {
        ws.close();
    }
        ws = new WebSocket(connectionInfo.websocketAddr);
        ws.on('open', onConnect);
        ws.on('close', onClose);
        ws.on('error', onError);

}

function onError(err) {
    console.log(err);
}

function onConnect() {
    setStatus('connected');
    ws.on('message', onMessage);
    ws.send(JSON.stringify(new messages.HandshakeMessage(1)));
}

function onMessage(msg) {
    console.log(msg);
}

function onClose() {
    setStatus('closed');
}

function disconnect() {
    ws.close();
}

function setStatus(status) {
    console.log(status);
}

function personPass(personID) {
    var request = require('request');

    request(connectionInfo.webAddr + '/personPass?personID=' + personID, function (error, response, body) {
        if (!error && response.statusCode === 201) {
            console.log(body)
        } else {
            console.log('Failure ' + error);
        }
    })
}


var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(function () {
    function prompt() {
        rl.question(">", function (cmd) {
            eval(cmd);

            prompt();


        });


    }

    prompt();
})();
