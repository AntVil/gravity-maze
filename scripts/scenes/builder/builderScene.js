class BuilderScene extends Scene {
    constructor() {
        super("aside");

        this.backButton = this.uiContainer.children[0];
        this.editButton = this.uiContainer.children[1];

        this.editOptions = this.uiContainer.children[2];

        this.backButton.onclick = () => game.sceneManager.toScene(HOME_SCENE);
        this.editButton.onclick = () => this.openEditOptions();

        this.editOptions.onclick = e => {
            let rect = this.editOptions.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                this.closeEditOptions();
            }
        }

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.levelString = "                         &&";

        this.level = new Level(-1);
        this.level.reset(this.levelString);
    }

    openEditOptions() {
        this.editOptions.showModal()
    }

    closeEditOptions() {
        this.editOptions.close();
    }

    inputPoint(x, y) {
        let size = Math.min(this.width, this.height) * 0.8;

        let offsetX = (this.width - size) / 2;
        let offsetY = (this.height - size) / 2;

        x = Math.max(Math.min((x - offsetX) / size, 1), 0);
        y = Math.max(Math.min((y - offsetY) / size, 1), 0);

        console.log(x, y)
    }

    render(context, width, height) {
        this.width = width;
        this.height = height;

        let size = Math.min(width, height) * 0.8;

        context.save();
        context.translate((width - size) / 2, (height - size) / 2);

        this.level.render(context, size, size);

        context.restore();
    }
}
