class SystemManager {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.systems = []
        this.initialized = false;
    }

    add(system) {
        this.systems.push(system);
    }

    initSystems(stateMachine) {
        if(!this.initialized) {
            this.systems.forEach(s => {
                s.init(stateMachine)
            })
        }
    }

    remove() {

    }

    update(dt, stateMachine) {
        this.systems.forEach(s => s.update(dt, stateMachine));
    }
}