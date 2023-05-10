class HomeScene extends Scene {
    constructor() {
        super("header");

        this.playButton = this.uiContainer.children[1];
        this.settingsButton = this.uiContainer.children[2];
        this.builderButton = this.uiContainer.children[3];

        this.playButton.onclick = () => game.sceneManager.toScene(LEVEL_SELECT_SCENE);
        this.builderButton.onclick = () => game.sceneManager.toScene(BUILDER_SCENE);
    }
}
