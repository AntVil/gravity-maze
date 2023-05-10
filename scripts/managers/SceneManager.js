class SceneManager extends GameManager {
    constructor() {
        super();

        this.scenes = {
            [HOME_SCENE]: new HomeScene(),
            [LEVEL_SELECT_SCENE]: new LevelSelectScene(),
            [MAIN_SCENE]: new MainScene(),
            [BUILDER_SCENE]: new BuilderScene()
        };
        this.currentScene = this.scenes[HOME_SCENE];
        this.currentScene.mount();
    }

    render(context, width, height) {
        this.currentScene.render(context, width, height);
    }

    update(deltaTime) {
        this.currentScene.update(deltaTime);
    }

    toScene(sceneIdentifier) {
        this.currentScene.dismount();
        this.currentScene = this.scenes[sceneIdentifier];
        this.currentScene.mount();
    }

    getCurrentScene() {
        return this.currentScene;
    }
}
