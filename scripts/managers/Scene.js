class Scene extends MountableGameManager {
    constructor(uiContainerQuery) {
        super();

        this.uiContainer = document.querySelector(uiContainerQuery);
    }

    mount() {
        this.uiContainer.classList.add("mounted");
    }

    dismount() {
        this.uiContainer.classList.remove("mounted");
    }

    inputDirection(xDirection, yDirection) {

    }

    inputPoint(x, y){

    }
}
