class SolidBlock extends GridBlock {
    constructor(x, y) {
        super(x, y);
    }

    render(context, width, height) {
        context.save();
        context.translate(
            (this.x + GRID_PADDING) * width,
            (this.y + GRID_PADDING) * height
        );
        context.scale(
            (1 - 2 * GRID_PADDING) * width,
            (1 - 2 * GRID_PADDING) * height
        );

        context.fillStyle = "#85a5e5";
        context.fillRect(0, 0, 1, 1);

        context.restore();
    }

    interactEntity(entity) {
        if (entity instanceof MovingEntity) {
            entity.stopMoving();
        }
    }
}
