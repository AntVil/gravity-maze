class Game {
    constructor() {
        this.canvasManager = new CanvasManager();
        this.storageManager = new StorageManager();
        this.inputManager = new InputManager(this.canvasManager.getCanvas());
        this.audioManager = new AudioManager();
        this.sceneManager = new SceneManager();

        setInterval(
            () => this.update(),
            UPDATE_DELTA
        );
        requestAnimationFrame(
            () => this.render()
        );
    }

    render() {
        let [context, width, height] = this.canvasManager.getRenderComponents();

        context.clearRect(0, 0, width, height);

        this.inputManager.render(context, width, height);
        this.audioManager.render(context, width, height);
        this.sceneManager.render(context, width, height);

        requestAnimationFrame(
            () => this.render()
        );
    }

    update() {
        this.inputManager.update(UPDATE_DELTA);
        this.audioManager.update(UPDATE_DELTA);
        this.sceneManager.update(UPDATE_DELTA);
    }
}
