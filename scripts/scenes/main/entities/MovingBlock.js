class MovingBlock extends MovingEntity {
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

        context.fillStyle = "#FD0";

        context.beginPath();
        context.moveTo(0, 0);
        context.arc(0, 0, MOVING_BLOCK_CORNER_RADIUS, 0, Math.PI / 2);
        context.closePath();
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(1, 0);
        context.arc(1, 0, MOVING_BLOCK_CORNER_RADIUS, Math.PI / 2, Math.PI);
        context.closePath();
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(1, 1);
        context.arc(1, 1, MOVING_BLOCK_CORNER_RADIUS, Math.PI, Math.PI * 3 / 2);
        context.closePath();
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(0, 1);
        context.arc(0, 1, MOVING_BLOCK_CORNER_RADIUS, 3 * Math.PI / 2, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();

        context.restore();
    }
}
