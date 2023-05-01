class Player extends MovingEntity {
    constructor(x, y) {
        super(x, y);
    }

    render(context, width, height) {
        context.fillStyle = "#09F";
        context.fillRect(this.x * width, this.y * height, width, height);
    }
}
