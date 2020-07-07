class InputSystem {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.key = {
            _pressed: {},

            LEFT: 65,
            UP: 87,
            RIGHT: 68,
            DOWN: 83,
            SPACE: 32,
            Q: 81,

            isDown: function (keyCode) {
                return this._pressed[keyCode];
            },

            onKeydown: function (event) {
                this._pressed[event.keyCode] = true;
            },

            onKeyup: function (event) {
                delete this._pressed[event.keyCode];
            }
        };

        this.rotation = {
            dx: 0,
            dy: 0,
        }

        var Key = this.key;
        var rotation = this.rotation;

        window.addEventListener('keyup', function (event) { Key.onKeyup(event); }, false);
        window.addEventListener('keydown', function (event) { Key.onKeydown(event); }, false);
        document.onmousemove = function (e) {
            rotation.dx += (e.movementX / 500);
            rotation.dy += (e.movementY / 500);
        }
        document.body.onclick = document.body.requestPointerLock ||
            document.body.mozRequestPointerLock ||
            document.body.webkitRequestPointerLock;

    }

    update() {
        this.entityManager.entities["camera"].forEach(e => {
            if (e.position[1] <= 0) {
                e.jumping = 0;
            }

            if (this.key._pressed[this.key.SPACE] && e.jumping < 2) {
                e.delta[1] = 0.25;
                e.delta[2] *= 1.5;
                e.delta[0] *= 1.5;
                e.jumping++;
            }

            e.dashCooldown -= 0.1;
            if(e.dashCooldown < 0) {
                e.dashCooldown = 0;
            }
            if (this.key._pressed[this.key.Q] && e.dashCooldown <= 0) {
                e.delta[2] *= 12;
                e.delta[0] *= 12;
                e.dashCooldown = 10;
            }

            if (this.key._pressed[this.key.LEFT]) {
                if (e.delta[0] > -0.3) {
                    e.delta[0] -= 0.05;
                }
            }
            if (this.key._pressed[this.key.UP]) {
                if (e.delta[2] > -0.3) {
                    e.delta[2] -= 0.05;
                }
            }
            if (this.key._pressed[this.key.RIGHT]) {
                if (e.delta[0] < 0.3) {
                    e.delta[0] += 0.05;
                }
            }
            if (this.key._pressed[this.key.DOWN]) {
                if (e.delta[2] < 0.3) {
                    e.delta[2] += 0.05;
                }
            }

            var delta = glMatrix.vec3.create();
            glMatrix.vec3.rotateX(delta, e.delta, [0, 0, 0], -this.rotation.dy);
            glMatrix.vec3.rotateY(delta, e.delta, [0, 0, 0], -this.rotation.dx);

            e.position[0] += delta[0];
            e.position[1] += delta[1];
            if (e.position[1] < 0) {
                e.position[1] = 0;
                if(e.delta[1] < -0.02) {
                    e.delta[1] = -e.delta[1]*0.9;
                }
            }

            e.position[2] += delta[2];


            e.rotation[0] = this.rotation.dx;
            e.rotation[1] = this.rotation.dy;

        });

    }
}