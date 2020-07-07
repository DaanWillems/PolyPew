
class Client {
    constructor(ws, hub) {
        this.hub = hub;
        this.ws = ws;
        this.id = 0;

        ws.on('message', msg => {
            this.receiveUpdate(msg);
        });

        ws.on('close', msg => {
            this.alive = false;
            setTimeout(() => {
                this.hub.sendDisconnectEvent(this.id);
            }, 50)
        });

        this.alive = true;
        this.state = new Float32Array(new ArrayBuffer(12));
    }

    receiveUpdate(msg) {
        var buf = new Uint8Array(msg).buffer;
        var commandCode = new Int32Array(buf);
        if (commandCode[0] == 0) {
            this.id = new Int32Array(buf)[1];
        }
        if (commandCode[0] == 1) {
            this.state = new Float32Array(buf.slice(4, 20));
        }
    }
}

module.exports = {
    Client: Client
}