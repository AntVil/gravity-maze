class Star extends Collectable {
    constructor(x, y) {
        super(x, y);

        this.rotation = 0;
    }

    render(context, width, height) {
        if (this.collected) {
            return;
        }

        context.save();
        context.translate(
            (this.x + ENTITY_STROKE_WIDTH / 2) * width,
            (this.y + ENTITY_STROKE_WIDTH / 2) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH) * width,
            (1 - ENTITY_STROKE_WIDTH) * height
        );

        context.fillStyle = "#FD0";
        context.strokeStyle = "#000";
        context.lineWidth = ENTITY_STROKE_WIDTH;
        context.lineJoin = "round";

        context.beginPath();
        for (let i = 0; i < 10; i++) {
            let angle = this.rotation + 2 * Math.PI * i / 10;
            let length;
            if (i % 2 === 0) {
                length = 0.35;
            } else {
                length = 0.2;
            }
            context.lineTo(
                0.5 + length * Math.cos(angle),
                0.5 + length * Math.sin(angle)
            );
        }
        context.closePath();

        context.fill();
        context.stroke();

        context.restore();
    }

    update(deltaTime) {
        this.rotation += deltaTime / 2000;
    }
}
