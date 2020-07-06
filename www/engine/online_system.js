class OnlineSystem {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.id = Math.floor(Math.random() * Math.floor(200));

        this.conn = new WebSocket("ws://" + document.location.host + "/ws");
        this.conn.onclose = function (evt) {
            console.log("Connection closed");
        };
        var id = this.id;
        var self = this;

        this.interval = 100;
        this.wait = 0;

        this.conn.onmessage = function (evt) {
            var update = JSON.parse(evt.data);
            console.log(update);
            if (update.id != id) {
                if (self.entityManager.entities["player"] == null) {
                    var player = loadModel('my_cube.obj');
                    player.components.push('player');
                    player.id = update.id;
                    player.position = glMatrix.vec3.fromValues(0, 2, 0);
                    player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
                    entityManager.add(player);
                }
                self.entityManager.entities["player"].forEach(p => {
                    if (p.id == update.id) {
                        console.log("updating")
                        p.position[0] = update.x;
                        p.position[1] = update.y;
                        p.position[2] = update.z;
                        return;
                    }

                    var player = loadModel('my_cube.obj');
                    player.components.push('player');
                    player.id = update.id;
                    player.position = glMatrix.vec3.fromValues(0, 2, 0);
                    player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
                    entityManager.add(player);
                })
            }
        };
    }

    update(deltaTime) {

        this.wait -= deltaTime;

        if (this.wait < 0) {
            this.wait = this.interval;
            console.log("Sending");

            if (this.conn.readyState == WebSocket.OPEN) {
                var msg = JSON.stringify({
                    id: this.id,
                    x: this.entityManager.entities["camera"][0].position[0],
                    y: this.entityManager.entities["camera"][0].position[1],
                    z: this.entityManager.entities["camera"][0].position[2],
                    rx: this.entityManager.entities["camera"][0].rotation[0],
                    ry: this.entityManager.entities["camera"][0].rotation[1],
                    rz: this.entityManager.entities["camera"][0].rotation[2],
                });
                this.conn.send(msg);
            }
        }
    }
}