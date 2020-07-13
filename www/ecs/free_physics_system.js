class FreePhysicsSystem {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.drag = 0.8;
    }

    init(stateMachine) {
        this.stateMachine = stateMachine;
    }

    update(deltaTime) {
        this.entityManager.entities["drag"].forEach(e => {
            if(e.collided) {
                e.position[2] -= e.delta[0];
                e.position[1] -= e.delta[1];
                e.position[2] -= e.delta[2];

                e.delta[0] = 0;
                e.delta[1] = 0;
                e.delta[2] = 0;
                e.collided = false;
                return;
            }

            e.delta[0] *= this.drag;
            e.delta[1] *= this.drag;
            e.delta[2] *= this.drag;
            if (e.delta[0] > -0.01 && e.delta[0] < 0.01) {
                e.delta[0] = 0;
            }

            if (e.delta[1] > -0.01 && e.delta[1] < 0.01) {
                e.delta[1] = 0;
            }

            if (e.delta[2] > -0.01 && e.delta[2] < 0.01) {
                e.delta[2] = 0;
            }
        });
    }
}