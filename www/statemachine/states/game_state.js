class GameState {
    constructor() {
        this.entityManager = new EntityManager();
    
        this.systemManager = new SystemManager(this.entityManager);
        this.systemManager.add(new RenderSystem(this.entityManager));
        this.systemManager.add(new FreeInputSystem(this.entityManager));
        this.systemManager.add(new FreePhysicsSystem(this.entityManager));
        // this.systemManager.add(new OnlineSystem(this.entityManager));
    
        var player = new Entity();
        player.components = ['camera', 'input', 'position', 'velocity', 'drag']
        player.position = glMatrix.vec3.fromValues(0, 0, 0);
        player.delta = glMatrix.vec3.fromValues(0, 0, 0);
        player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
        player.jumping = 0;
        player.dashCooldown = 0;
        player.id = 0;
    
        var map = new Map();
        map.objects.forEach(e => {
            this.entityManager.add(e);
            e.id = 0;
        })
        this.entityManager.add(player);
    }

    update(deltaTime) {
        this.systemManager.update(deltaTime, this.stateMachine);
    }

    onLeave() {

    }

    onEnter(stateMachine) {
        this.stateMachine = stateMachine;
        this.systemManager.initSystems(stateMachine);
    }
}