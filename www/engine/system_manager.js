class SystemManager {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.systems = []
    }

    add(system) {
        this.systems.push(system);
    }

    remove() {

    }

    update(dt) {
        this.systems.forEach(s => s.update(dt));
    }
}