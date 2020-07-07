const WebSocket = require('ws');

class Hub {
    constructor(clients) {
        this.clients = clients;
    }

    sendDisconnectEvent(id) {
        const array = new Int32Array(2);
        array[0] = 2;
        array[1] = id;
        console.log(array);
        this.clients.forEach(c => {
            c.ws.send(array);
        });
    }

    sendState(wss) {
        const array = new Float32Array(5);

        for (var i = 0; i < array.length; ++i) {
            array[i] = i / 2;
        }

        if (this.clients != null) {
            var state = new Float32Array(new ArrayBuffer(this.clients.length * 16));

            var index = 0;
            for (i = this.clients.length - 1; i >= 0; --i) {
                var c = this.clients[i]
                if (!c.alive) {
                    this.clients.splice(i, 1)
                }
                state.set(c.state, index);
                index += 4;
            }

            this.clients.forEach(c => {
                c.ws.send(state);
            });
        }
    }
}



module.exports = {
    Hub: Hub
}