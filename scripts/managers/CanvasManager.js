class CanvasManager {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.resize();

        window.addEventListener("resize", () => this.resize());
    }

    getCanvas() {
        return this.canvas;
    }

    getRenderComponents() {
        return [this.context, this.canvas.width, this.canvas.height];
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
    }
}
