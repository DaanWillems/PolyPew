let renderSystem
let now;
let last;

function main() {
    document.body.requestPointer = document.body.requestPointerLock ||
    document.body.mozRequestPointerLock ||
    document.body.webkitRequestPointerLock;

    last = 0;
    this.stateMachine = new StateMachine();
    this.stateMachine.addState("mainMenu", new MainMenuState());
    this.stateMachine.addState("game", new GameState());
    this.stateMachine.changeState("mainMenu");
    requestAnimationFrame(mainLoop);
}

function mainLoop(now) {
    var deltaTime = now - last;
    last = now;
    this.stateMachine.update(deltaTime);
    requestAnimationFrame(mainLoop);
}

window.onload = main;
