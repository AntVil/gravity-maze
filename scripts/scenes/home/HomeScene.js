class HomeScene extends Scene {
    constructor() {
        super("header");

        this.playButton = this.uiContainer.children[1];
        this.settingsButton = this.uiContainer.children[2];

        this.playButton.onclick = () => game.sceneManager.toScene(LEVEL_SELECT_SCENE);
    }
}
