class MainMenuState {
    constructor() {
        $("#start-game-action").on("click", () => {
            console.log("Starting")
            document.body.requestPointer(); 
            this.stateMachine.changeState("game");
        });
    }

    update() {

    }

    onLeave() {
        $("#main-menu").css("display", "none");
    }

    onEnter(stateMachine) {
        this.stateMachine = stateMachine;
        $("#main-menu").css("display", "block");

 
    }
}