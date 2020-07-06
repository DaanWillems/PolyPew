class RenderSystem {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.renderer = new Renderer();
        this.renderer.init();
    }

    update(deltaTime) {
        this.renderer.drawScene(this.entityManager.entities["render"], this.entityManager.entities["camera"][0]);
    }
}