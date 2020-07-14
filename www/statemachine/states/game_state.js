class GameState {
    constructor() {
        this.entityManager = new EntityManager();
    
        this.systemManager = new SystemManager(this.entityManager);
        this.systemManager.add(new PhysicsSystem(this.entityManager));
        this.systemManager.add(new InputSystem(this.entityManager));
        this.systemManager.add(new OnlineSystem(this.entityManager));
        this.systemManager.add(new RenderSystem(this.entityManager));
        
        var test = loadModel("cube1x1x1.obj");
        var player = new Entity();
        player.components = ['camera', 'input', 'position', 'velocity', 'drag']
        player.position = glMatrix.vec3.fromValues(0, 2, 0);
        player.delta = glMatrix.vec3.fromValues(0, 0, 0);
        player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
        player.boundingBox = BoundingBox.fromVertices(test.mesh.vertices);
        player.boundingBox.setPosition(player.position);
        player.jumping = 0;
        player.dashCooldown = 0;
        player.id = 0;
    
        this.octree = new Octree(null, new BoundingBox(glMatrix.vec3.fromValues(-25, -25, -25), glMatrix.vec3.fromValues(25, 25, 25)));
        var map = new Map(this.octree);
        map.objects.forEach(e => {
            this.entityManager.add(e);
            e.id = 0;
        })

        this.entityManager.add(player);
        this.octree.addObject(player);
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