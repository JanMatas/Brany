/**
 * Created by Sam on 18/05/15.
 */
var ws;
var port = 3000;
function setStatus(status) {
    document.getElementById('status').innerHTML = status;
}
function connect() {
    ws = new WebSocket('ws://129.31.186.187:' + port);
    ws.addEventListener('open', onConnect);
    ws.addEventListener('close', onClose);
}

function onConnect() {
    setStatus('connected');
    ws.addEventListener('message', onMessage);
    ws.send(JSON.stringify({type:'HANDSHAKE', id:1}));
}

function onMessage(msg) {
    console.log(msg.data);
}

function onClose() {
    setStatus('closed');
}

function disconnect() {
    ws.close();
}
