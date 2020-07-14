class RenderSystem {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.renderer = new Renderer();
        this.renderer.init();
    }

    init(stateMachine) {
        this.stateMachine = stateMachine;
    }

    update(deltaTime) {
        this.renderer.drawScene(this.entityManager.entities["render"], this.entityManager.entities["camera"][0], this.entityManager.entities["octree"]);
    }
}