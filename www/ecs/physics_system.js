class PhysicsSystem {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.drag = 0.8;
    }

    init(stateMachine) {
        this.stateMachine = stateMachine;
    }

    update(deltaTime) {
        this.entityManager.entities["drag"].forEach(e => {
            e.timeSinceJump += deltaTime;

            if(e.timeSinceJump > 500) {
                e.canJump = true;
            }

            var delta = glMatrix.vec3.create();
            glMatrix.vec3.rotateX(delta, e.delta, [0, 0, 0], -e.rotation[1]);
            glMatrix.vec3.rotateY(delta, e.delta, [0, 0, 0], -e.rotation[0]);

            e.position[0] += delta[0];
            e.position[1] += delta[1];

            if (e.position[1] < 0) {
                e.position[1] = 0;
            }

            e.position[2] += delta[2];
            e.boundingBox.setPosition(e.position);

            e.delta[0] *= this.drag;
            e.delta[2] *= this.drag;

            if (e.delta[0] > -0.01 && e.delta[0] < 0.01) {
                e.delta[0] = 0;
            }

            e.delta[1] -= 0.02;

            if (e.wallRiding) {
                if (e.delta[1] < -0.01) {
                    e.delta[1] = -0.01;
                }
            }

            if (e.delta[1] <= -0.4) {
                e.delta[1] = -0.4;
            }
            if (e.delta[2] > -0.01 && e.delta[2] < 0.01) {
                e.delta[2] = 0;
            }
        });

        if (this.entityManager.entities["octree"]) {
            this.entityManager.entities["octree"][0].octree.update();
            this.entityManager.entities["octree"][0].octree.checkCollisions([], []);
        }

        this.entityManager.entities["drag"].forEach(e => {
            e.wallRiding = false;
            if (e.collided) {
                if (Math.abs(e.xDepth) < Math.abs(e.zDepth) && Math.abs(e.xDepth) < Math.abs(e.yDepth)) {
                    e.delta[0] = 0;
                    e.position[0] += e.xDepth;
                    e.wallRiding = true;
                    console.log(e.wallRiding);
                } else if (Math.abs(e.zDepth) < Math.abs(e.yDepth) && Math.abs(e.zDepth) < Math.abs(e.xDepth)) {
                    e.delta[2] = 0;
                    e.position[2] += e.zDepth;
                    e.wallRiding = true;
                    console.log(e.wallRiding);
                } else {
                    if (e.yDepth < 0) {
                        e.delta[1] = 0;
                    } else {
                        e.canJump = true;
                    }
                    e.position[1] += e.yDepth;
                }

                e.collided = false;
                e.boundingBox.setPosition(e.position);
            }
        });


    }
}