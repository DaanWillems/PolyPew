let renderSystem
let now;
let last;

function main() {


    entityManager = new EntityManager();
    renderSystem = new RenderSystem(entityManager);
    inputSystem = new InputSystem(entityManager);

    systemManager = new SystemManager(entityManager);
    systemManager.add(renderSystem);
    systemManager.add(inputSystem);
    systemManager.add(new PhysicsSystem(entityManager));
    systemManager.add(new OnlineSystem(entityManager));

    var player = new Entity();
    player.components = ['camera', 'input', 'position', 'velocity', 'drag']
    player.position = glMatrix.vec3.fromValues(0, 20, 0);
    player.delta = glMatrix.vec3.fromValues(0, 0, 0);
    player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
    player.jumping = 0;
    player.dashCooldown = 0;
    player.id = 0;

    var map = new Map();
    map.objects.forEach(e => {
        entityManager.add(e);
        e.id = 0;
    })
    entityManager.add(player);

    last = 0;

    requestAnimationFrame(mainLoop);
}

function mainLoop(now) {
    var deltaTime = now - last;
    last = now;
    this.systemManager.update(deltaTime);
    requestAnimationFrame(mainLoop);
}

window.onload = main;
