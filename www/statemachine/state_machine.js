class StateMachine {
    constructor() {
        this.states = {};
        this.currentState = null;
    }

    addState(name, state) {
        this.states[name] = state;
    }

    changeState(stateName) {
        if(this.currentState != null) {
            this.currentState.onLeave();
        }
        this.currentState = this.states[stateName];
        this.currentState.onEnter(this);
    }

    update(deltaTime) {
        this.currentState.update(deltaTime);
    }
}