/**
 * Created by Sam on 18/05/15.
 */
var addr = 'http://localhost:3000'; // Sam IP
var fs = require('fs');
function log(msg) {
    console.log(msg);
    fs.appendFile("clientLog.txt", msg+"\n\n", function(err) {
        if(err) {
            return console.log(err);
        }


    });
}

var WebSocket= require('ws');
var ws;

function connect() {
    if (ws) {
        ws.close();
    }
    ws = new WebSocket(addr);
    ws.on('open', onOpen);
    ws.on('close', onClose);
    ws.on('message', onMessage);
    ws.on('error', onError);




}

connect();
setTimeout(initPoll, 1000);


function initPoll() {
    setInterval(function() {
        if (ws) {
            switch (ws.readyState) {
                case 0:
                    // CONNECTING
                    //Give it some more time
                    break;

                case 1:
                    // OPEN - we are done!
                    // Do nothing because we are finally connected
                    break;

                case 2:
                    // CLOSING
                    // Try and reconnect
                    connect();
                    break;

                case 3:
                    // CLOSED
                    // Try and reconnect
                    connect();
                    break;

            }
        }


    }, 2000);
}



function onError(err) {
    log(err);
}

function onMessage(data) {
    log('message ' + data + ', received at: ' + getDateTime());
}

function onOpen() {
    log('connected at: ' + getDateTime());
}

function onClose() {
    log('disconnected at: ' + getDateTime() + '...trying to reconnect...');

    connect();
}


connect();



function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

