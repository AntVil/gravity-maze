class MainScene extends Scene {
    constructor() {
        super("main");

        this.level = new Level(-1);

        this.undoButton = this.uiContainer.children[0];
        this.pauseButton = this.uiContainer.children[1];
        this.pauseModal = this.uiContainer.children[2];
        this.completedModal = this.uiContainer.children[3];

        this.pauseQuitButton = this.pauseModal.children[0].children[1];
        this.pauseResumeButton = this.pauseModal.children[0].children[2];

        this.completedQuitButton = this.completedModal.children[0].children[1];
        this.completedResetButton = this.completedModal.children[0].children[2];
        this.completedNextButton = this.completedModal.children[0].children[3];

        this.pauseButton.onclick = () => this.pause();
        this.pauseResumeButton.onclick = () => this.unpause();
        //this.pauseBackground.onclick = () => this.unpause();
        this.pauseQuitButton.onclick = () => this.quit();

        this.completedQuitButton.onclick = () => this.quit();
        this.completedResetButton.onclick = () => this.reset();
        this.completedNextButton.onclick = () => this.next();
    }

    loadLevel(levelIndex) {
        this.level.dismount();
        this.level = new Level(levelIndex);
        this.level.mount();
    }

    pause() {
        this.level.pause();
        this.pauseModal.showModal();
    }

    unpause() {
        this.pauseModal.close();
        this.level.unpause();
    }

    reset() {
        this.level.dismount();
        this.completedModal.close();
        this.level.reset();
        this.level.mount();
    }

    quit() {
        game.sceneManager.toScene(LEVEL_SELECT_SCENE);
    }

    next() {
        this.completedModal.close();
        this.loadLevel(this.level.getLevelIndex() + 1);
    }

    completeLevel() {
        this.level.pause();
        this.completedModal.showModal();
    }

    dismount() {
        this.completedModal.close();
        this.pauseModal.close();
        super.dismount();
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
