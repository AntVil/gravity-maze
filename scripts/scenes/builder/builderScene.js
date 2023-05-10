class BuilderScene extends Scene {
    constructor() {
        super("aside");

        this.backButton = this.uiContainer.children[0];

        this.backButton.onclick = () => game.sceneManager.toScene(HOME_SCENE);
    }
}
