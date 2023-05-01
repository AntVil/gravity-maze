class Star extends Entity {
    constructor(x, y) {
        super(x, y);

        this.collected = false;
    }

    render(context, width, height) {
        if (this.collected) {
            return;
        }

        context.fillStyle = "#FF0";
        context.fillRect(this.x * width, this.y * height, width, height);
    }

    interactEntity(entity) {
        if (!(entity instanceof Player)) {
            return;
        }

        if (Math.abs(entity.x - this.x) < 1 && Math.abs(entity.y - this.y) < 1) {
            this.collected = true;
        }
    }
}
