class MainMenuState {
    constructor() {
        $("#start-game-action").on("click", () => {
            console.log("Starting")
            document.body.requestPointer(); 
            this.stateMachine.changeState("game");
        });

        this.entityManager = new EntityManager();
    
        this.systemManager = new SystemManager(this.entityManager);
        this.systemManager.add(new RenderSystem(this.entityManager));
    
        var player = new Entity();
        player.components = ['camera', 'position', 'velocity', 'drag']
        player.position = glMatrix.vec3.fromValues(0, 0, 0);
        player.delta = glMatrix.vec3.fromValues(0, 0, 0);
        player.rotation = glMatrix.vec3.fromValues(0, 0, 0)
        player.jumping = 0;
        player.dashCooldown = 0;
        player.id = 0;
    

        this.cube = loadModel('cube1x1x1.obj');
        this.cube.position[0] = 0;
        this.cube.position[1] = 0;
        this.cube.position[2] = -7;
        this.cube.color[0] = 0.2;
        this.cube.color[1] = 0.5;
        this.cube.color[2] = 0.3;

        this.entityManager.add(this.cube);
        this.entityManager.add(player);

        this.time = 0;
        this.rgb = glMatrix.vec3.fromValues(0.5, 0.8, 0.1);
        console.log(this.rgb);
        this.cube.color = this.rgb;

        this.rInc = 0.001;
        this.gInc = -0.003;
        this.bInc = 0.004;
    }

    update(dt) {
        this.systemManager.update(dt, this.stateMachine)

        this.time += dt/1000;
        this.cube.rotation[0] += 0.0001*dt;
        this.cube.rotation[1] += 0.0003*dt;
        this.cube.rotation[2] += 0.0002*dt;

    

        this.cube.color[0] += this.rInc;
        if(this.cube.color[0] > 1) {
            this.cube.color[0] = 1;
            this.rInc = -this.rInc;
        } else if( this.cube.color[0] < 0) {
            this.cube.color[0] = 0;
            this.rInc = -this.rInc;
        }
        this.cube.color[1] += this.gInc;
        if(this.cube.color[1] > 1) {
            this.cube.color[1] = 1;
            this.gInc = -this.gInc;
        } else if( this.cube.color[1] < 0) {
            this.cube.color[1] = 0;
            this.gInc = -this.gInc;
        }
        this.cube.color[2] += this.bInc;
        if(this.cube.color[2] > 1) {
            this.cube.color[2] = 1;
            this.bInc = -this.bInc;
        } else if( this.cube.color[2] < 0) {
            this.cube.color[2] = 0;
            this.bInc = -this.bInc;
        }
    }

    onLeave() {
        $("#main-menu").css("display", "none");
    }

    onEnter(stateMachine) {
        this.stateMachine = stateMachine;
        this.systemManager.initSystems(stateMachine);

        $("#main-menu").css("display", "block");
    }
}