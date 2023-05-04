class SemiSolidBlock extends SolidBlock {
    constructor(x, y, direction) {
        super(x, y);
        this.direction = direction;
    }

    render(context, width, height) {
        context.save();

        context.translate(
            (this.x + ENTITY_STROKE_WIDTH / 2) * width,
            (this.y + ENTITY_STROKE_WIDTH / 2) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH) * width,
            (1 - ENTITY_STROKE_WIDTH) * height
        );

        context.fillStyle = "#AAA";
        context.lineWidth = ENTITY_STROKE_WIDTH;
        context.strokeStyle = "#000";
        context.lineCap = "round";
        context.lineJoin = "round";

        context.beginPath();
        if (this.direction === DIRECTION_RIGHT) {
            context.transform(0, -1, -1, 0, 1, 1);
        } else if (this.direction === DIRECTION_DOWN) {
            context.transform(1, 0, 0, -1, 0, 1);
        } else if (this.direction === DIRECTION_LEFT) {
            context.transform(0, 1, 1, 0, 0, 0);
        }

        context.moveTo(0, 0);
        context.lineTo(1, 0);

        context.moveTo(0.5, 0.25);
        context.lineTo(0.25, 0.5);

        context.moveTo(0.5, 0.25);
        context.lineTo(0.75, 0.5);

        context.moveTo(0.5, 0.25);
        context.lineTo(0.5, 0.75);

        context.stroke();

        context.restore();
    }

    interactEntity(entity) {
        if (
            (this.direction === DIRECTION_UP && entity.ySpeed > 0) ||
            (this.direction === DIRECTION_RIGHT && entity.xSpeed < 0) ||
            (this.direction === DIRECTION_DOWN && entity.ySpeed < 0) ||
            (this.direction === DIRECTION_LEFT && entity.xSpeed > 0)
        ) {
            super.interactEntity(entity);
        }
    }
}
