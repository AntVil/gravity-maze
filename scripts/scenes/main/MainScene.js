class MainScene extends Scene {
    constructor() {
        super("main");

        this.level = new Level(-1);

        this.undoButton = this.uiContainer.children[0];
        this.pauseButton = this.uiContainer.children[1];
        this.pauseBackground = this.uiContainer.children[2];
        this.backButton = this.pauseBackground.children[0].children[1];
        this.unpauseButton = this.pauseBackground.children[0].children[2];

        this.pauseButton.onclick = () => {
            this.pause();
        }

        this.unpauseButton.onclick = () => {
            this.unpause();
        }

        this.pauseBackground.onclick = () => {
            this.unpause();
        }

        this.backButton.onclick = () => {
            game.sceneManager.toScene(LEVEL_SELECT_SCENE);
        }
    }

    loadLevel(levelIndex) {
        this.level.dismount();
        this.level = new Level(levelIndex);
        this.level.mount();
    }

    pause() {
        this.level.pause();
        this.pauseBackground.classList.add("mounted");
    }

    unpause() {
        this.pauseBackground.classList.remove("mounted");
        this.level.unpause();
    }

    render(context, width, height) {
        let size = Math.min(width, height) * 0.8;

        context.save();
        context.translate((width - size) / 2, (height - size) / 2);

        this.level.render(context, size, size);

        context.restore();
    }

    update(deltaTime) {
        this.level.update(deltaTime);
    }

    inputDirection(xDirection, yDirection) {
        this.level.inputDirection(xDirection, yDirection);
    }
}
