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

    delete(id) {
        for(let key in this.entities) {
            for (var i = this.entities[key].length - 1; i >= 0; i--) {
                if (this.entities[key][i].id == id) {
                    console.log("Deleting: "+this.entities[key][i].id + " in: "+key);
                    this.entities[key].splice(i, 1)
                    continue;
                }
            }
        }
    }
}