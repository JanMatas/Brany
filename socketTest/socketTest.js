/**
 * Created by Sam on 18/05/15.
 */

    var port = process.argv[2];
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: port});

var fs = require('fs');
function log(msg) {
    console.log(msg);
    fs.appendFile("serverLog.txt", msg+"\n\n", function(err) {
        if(err) {
            return console.log(err);
        }


    });
}


wss.on('connection', function connection(ws) {
    log('Client connected at ' + getDateTime());

    var intvl = setInterval(function(){ws.send('ping', function(err) {
        if(err) {


        log('Ping failed at ' + getDateTime());
        clearInterval(intvl);
        ws.close();
        }
    })}, 5000);
    //log("new client: " + ws);
    ws.on('message', function incoming(message) {


    });

    ws.on('close', function () {
       log('Disconnected at ' + getDateTime());
    });


});



function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}