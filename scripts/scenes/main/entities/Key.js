class Key extends Collectable {
    constructor(x, y, color) {
        super(x, y);

        this.color = color;

        this.oscillation = 0;
    }

    render(context, width, height) {
        if (this.collected) {
            return;
        }

        context.save();

        context.strokeStyle = this.color;
        context.lineWidth = ENTITY_STROKE_WIDTH;
        context.lineJoin = "round";
        context.lineCap = "round";

        context.translate(
            (this.x + ENTITY_STROKE_WIDTH / 2) * width,
            (this.y + ENTITY_STROKE_WIDTH / 2) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH) * width,
            (1 - ENTITY_STROKE_WIDTH) * height
        );

        let verticalOffset = Math.sin(this.oscillation) / 15;

        context.beginPath();
        context.arc(0.65, 0.5 + verticalOffset, 0.2, -Math.PI, Math.PI);
        context.lineTo(0.2, 0.5 + verticalOffset);
        context.lineTo(0.2, 0.65 + verticalOffset);
        context.stroke();

        context.restore();
    }

    update(deltaTime) {
        this.oscillation += deltaTime / 400;
    }
}
