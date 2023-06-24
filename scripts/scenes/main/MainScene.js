class MainScene extends Scene {
    constructor() {
        super("main");

        this.level = new Level(-1);

        this.levelIcon = this.uiContainer.querySelector("p");
        [
            this.undoButton,
            this.resetButton,
            this.pauseButton
        ] = this.uiContainer.querySelectorAll("button");
        [
            this.pauseModal,
            this.completedModal
        ] = this.uiContainer.querySelectorAll("dialog");

        this.pauseQuitButton = this.pauseModal.children[0].children[1];
        this.pauseResumeButton = this.pauseModal.children[0].children[2];

        this.completedQuitButton = this.completedModal.children[0].children[1];
        this.completedResetButton = this.completedModal.children[0].children[2];
        this.completedNextButton = this.completedModal.children[0].children[3];

        this.undoButton.onclick = () => {
            this.playButtonAudio();
            this.undo();
        }
        this.pauseButton.onclick = () => {
            this.playButtonAudio();
            this.pause();
        }
        this.pauseResumeButton.onclick = () => {
            this.playButtonAudio();
            this.unpause();
        }
        this.pauseModal.onclick = e => {
            let rect = this.pauseModal.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                this.unpause();
            }
        }
        this.pauseQuitButton.onclick = () => {
            this.playButtonAudio();
            this.quit();
        }
        this.resetButton.onclick = () => {
            this.playButtonAudio();
            this.reset();
        }

        this.completedQuitButton.onclick = () => {
            this.playButtonAudio();
            this.quit();
        }
        this.completedResetButton.onclick = () => {
            this.playButtonAudio();
            this.reset();
        }
        this.completedNextButton.onclick = () => {
            this.playButtonAudio();
            this.next();
        }
    }

    loadLevel(levelIndex) {
        this.level.dismount();
        this.level = new Level(levelIndex);
        this.level.mount();
        this.levelIcon.innerText = `${levelIndex + 1}`;
    }

    pause() {
        this.level.pause();
        this.pauseModal.showModal();
        this.pauseResumeButton.focus();
    }

    unpause() {
        this.pauseModal.close();
        this.level.unpause();
    }

    reset() {
        this.level.dismount();
        this.completedModal.close();
        this.level.mount();
        this.level.reset();
    }

    quit() {
        game.sceneManager.toScene(LEVEL_SELECT_SCENE);
    }

    undo() {
        this.level.undo();
    }

    next() {
        this.completedModal.close();
        this.loadLevel(this.level.getLevelIndex() + 1);
    }

    completeLevel() {
        this.level.pause();
        this.completedModal.showModal();
        this.completedNextButton.focus();
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
