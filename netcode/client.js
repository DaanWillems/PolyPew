
class Client {
    constructor(ws) {
        this.ws = ws;
        ws.on('message', msg => {
            this.receiveUpdate(msg);
        });
        this.state = new Float32Array(new ArrayBuffer(12));
    }

    receiveUpdate(msg) {
        var buf = new Uint8Array(msg).buffer;
        var commandCode = new Int32Array(buf, 0, 4);
        if (commandCode[0] == 1) {
            this.state = new Float32Array(buf.slice(4, 20));
        }
    }
}

module.exports = {
    Client: Client
}