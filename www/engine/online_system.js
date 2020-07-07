class OnlineSystem {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.id = Math.floor(Math.random() * Math.floor(200));

        this.conn = new WebSocket("ws://localhost:8000");
        this.conn.binaryType = 'arraybuffer';
        this.conn.onclose = function (evt) {
            console.log("Connection closed");
        };
        var id = this.id;
        console.log("My ID: " + id);
        var self = this;
        this.entityManager.entities["player"] = [];
        this.interval = 16;
        this.wait = 0;

        this.conn.onmessage = function (evt) {
            var position = new Float32Array(evt.data);
            var id = new Int32Array(evt.data);

            for (var i = 0; i < position.length; i += 4) {
                var found = false;
                if (id[i] == self.id) {
                    continue;
                }
                self.entityManager.entities["player"].forEach(p => {
                    if (p.id == id[i]) {
                        p.position[0] = position[i + 1];
                        p.position[1] = position[i + 2];
                        p.position[2] = position[i + 3];
                        found = true;
                        return;
                    }
                })
                if (!found) {
                    var player = loadModel('my_cube.obj');
                    player.components.push('player');
                    player.id = id[i];
                    player.position = glMatrix.vec3.fromValues(0, 2, 0);
                    player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
                    entityManager.add(player);
                    console.log(id[i] + ": " + position[i + 1])
                }
            }
        };
        this.x = 0;
        this.buffer = new ArrayBuffer(20);
        this.contentBuffer = new Float32Array(this.buffer);
        this.prefixBuffer = new Int32Array(this.buffer);
        this.prefixBuffer[1] = this.id;
    }

    update(deltaTime) {
        this.wait -= deltaTime;

        if (this.wait < 0) {
            this.wait = this.interval;
            var player = this.entityManager.entities["camera"][0]
            this.prefixBuffer[0] = 1;
            this.contentBuffer[2] = player.position[0];
            this.contentBuffer[3] = player.position[1];
            this.contentBuffer[4] = player.position[2];

            if (this.conn.readyState == WebSocket.OPEN) {
                this.conn.send(this.buffer);
            }
        }
    }
}