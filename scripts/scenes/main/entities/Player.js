class Player extends MovingEntity {
    constructor(x, y) {
        super(x, y);
    }

    render(context, width, height) {
        context.save();
        context.translate(
            (this.x + ENTITY_STROKE_WIDTH / 2 + GRID_PADDING) * width,
            (this.y + ENTITY_STROKE_WIDTH / 2 + GRID_PADDING) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH - 2 * GRID_PADDING) * width,
            (1 - ENTITY_STROKE_WIDTH - 2 * GRID_PADDING) * height
        );

        context.fillStyle = "#b4ccfc";
        context.lineWidth = ENTITY_STROKE_WIDTH;
        context.strokeStyle = "#000";
        context.lineJoin = "round";

        context.fillRect(0, 0, 1, 1);
        context.strokeRect(0, 0, 1, 1);

        context.beginPath();
        if (this.yDirection < 0) {
            context.fillStyle = "#9F0";
        } else if (this.xDirection > 0) {
            context.fillStyle = "#0F9";
            context.transform(0, -1, -1, 0, 1, 1);
        } else if (this.yDirection > 0) {
            context.fillStyle = "#F09";
            context.transform(1, 0, 0, -1, 0, 1);
        } else {
            context.fillStyle = "#F90";
            context.transform(0, 1, 1, 0, 0, 0);
        }

        context.moveTo(0.5, ENTITY_STROKE_WIDTH / 2);
        context.lineTo(1 - ENTITY_STROKE_WIDTH / 2, 0.5);
        context.lineTo(0.75, 0.5);
        context.lineTo(0.75, 1);
        context.lineTo(0.25, 1);
        context.lineTo(0.25, 0.5);
        context.lineTo(ENTITY_STROKE_WIDTH / 2, 0.5);
        context.closePath();

        context.fill();
        context.stroke();

        context.restore();
    }
}
