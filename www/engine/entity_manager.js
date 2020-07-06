class EntityManager {
    constructor() {
        this.entities = {}
    }

    add(entity) {
        entity.components.forEach(c => {
            if(this.entities[c] == null) {
                this.entities[c] = [];
            }
            this.entities[c].push(entity);
        })
    }

    remove() {

    }
}