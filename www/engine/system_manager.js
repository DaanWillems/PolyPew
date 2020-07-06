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

    update() {
        this.systems.forEach(s => s.update());
    }
}