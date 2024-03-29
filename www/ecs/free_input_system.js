class FreeInputSystem {
    constructor(entityManager) {
        const canvas = document.querySelector("#glCanvas");
        this.gl = canvas.getContext("webgl2");
        this.locked = true;
        this.entityManager = entityManager;
        this.key = {
            _pressed: {},

            LEFT: 65,
            UP: 87,
            RIGHT: 68,
            DOWN: 83,
            ASCEND: 32,
            DESCEND: 67,
            ESC: 27,
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
            rotation.dx += (e.movementX / 3000);
            rotation.dy += (e.movementY / 3000);
        }

        if ("onpointerlockchange" in document) {
            document.addEventListener('pointerlockchange', () => {
                this.lockChangeAlert();
            }, false);
        } else if ("onmozpointerlockchange" in document) {
            document.addEventListener('mozpointerlockchange', () => {
                this.lockChangeAlert();
            }, false);
        }
    }

    init(stateMachine) {
        this.stateMachine = stateMachine;
    }

    lockChangeAlert() {
        // if(document.pointerLockElement === document.body ||
        // document.mozPointerLockElement === document.body) {
        //     this.locked = true;
        // } else {
        //     if(this.locked && this.stateMachine.currentState.constructor.name == "GameState") {
        //         this.stateMachine.changeState("mainMenu");
        //     }
        //     this.locked = false;
        // }
    }

    update(deltaTime) {
        if (this.key._pressed[this.key.ESC]) {
            stateMachine.changeState("mainMenu");
            return;
        }

        if (!this.locked) {
            return;
        }

        this.entityManager.entities["camera"].forEach(e => {
            if (e.position[1] <= 0) {
                e.canJump = true;
            }

            if (this.key._pressed[this.key.ASCEND]) {
                if (e.delta[1] > -0.3) {
                    e.delta[1] += 0.05;
                }
            }

            if (this.key._pressed[this.key.Q]) {
                document.body.exitPointerLock ||
                    document.body.mozExitPointerLock;
            }

            if (this.key._pressed[this.key.DESCEND]) {
                if (e.delta[1] > -0.3) {
                    e.delta[1] -= 0.05;
                }
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


            if (e.delta[0] != 0 || e.delta[1] != 0 || e.delta[1] != 0) {
                e.needsUpdate = true;
            }

            e.rotation[0] = this.rotation.dx;
            e.rotation[1] = this.rotation.dy;

        });

    }
}