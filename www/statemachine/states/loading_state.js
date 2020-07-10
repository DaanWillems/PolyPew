class LoadingState {
    constructor() {

    }

    update() {
    }

    onLeave() {

    }

    onEnter(stateMachine) {
        this.stateMachine = stateMachine;
        setTimeout(() => {
            this.stateMachine.changeState("mainMenu");
        }, 1000);
    }
}