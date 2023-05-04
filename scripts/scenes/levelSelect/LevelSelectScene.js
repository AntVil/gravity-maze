class LevelSelectScene extends Scene {
    constructor() {
        super("nav");

        this.backButton = this.uiContainer.children[0];
        this.levelContainer = this.uiContainer.children[1];

        this.backButton.onclick = () => game.sceneManager.toScene(HOME_SCENE);
    }

    mount() {
        super.mount();

        let levelInfos = game.storageManager.getLevelInfos();

        for (let i = 0; i < levelInfos.length; i++) {
            let button = document.createElement("button");
            button.innerText = `${i}`;
            button.onclick = () => {
                game.sceneManager.toScene(MAIN_SCENE);
                let mainScene = game.sceneManager.getCurrentScene();
                mainScene.loadLevel(i);
            }

            this.levelContainer.appendChild(button);
        }
    }

    dismount() {
        super.dismount();

        while (this.levelContainer.firstChild) {
            this.levelContainer.removeChild(this.levelContainer.firstChild);
        }
    }
}
