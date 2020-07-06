let renderSystem

function main() {


    entityManager = new EntityManager();
    renderSystem = new RenderSystem(entityManager);
    inputSystem = new InputSystem(entityManager);

    systemManager = new SystemManager(entityManager);
    systemManager.add(renderSystem);
    systemManager.add(inputSystem);
    systemManager.add(new PhysicsSystem(entityManager));

    var player = new Entity();
    player.components = ['camera', 'input', 'position', 'velocity', 'drag']
    player.position = glMatrix.vec3.fromValues(0, 2, 0);
    player.delta = glMatrix.vec3.fromValues(0, 0, 0);
    player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
    player.jumping = 0;
    player.dashCooldown = 0;

    var map = new Map();
    map.objects.forEach(e => {
        entityManager.add(e);
    })
    entityManager.add(player);

    requestAnimationFrame(mainLoop);
}


function mainLoop(now) {
    this.systemManager.update();
    requestAnimationFrame(mainLoop);
}

window.onload = main;
