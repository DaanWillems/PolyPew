const WebSocket = require('ws');

function sendState(clients, wss) {
    const array = new Float32Array(5);

    for (var i = 0; i < array.length; ++i) {
        array[i] = i / 2;
    }

    if(clients != null) {
        var state = new Float32Array(new ArrayBuffer(clients.length*16));
        var index = 0;
        clients.forEach(c => {
          state.set(c.state, index);
          index += 4;
        });

        console.log(state.length);

        clients.forEach(c => {
            c.ws.send(state);
        });
    }
}

module.exports = {
    sendState: sendState
}