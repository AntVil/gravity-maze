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

        context.translate(
            (this.x + ENTITY_STROKE_WIDTH / 2) * width,
            (this.y + ENTITY_STROKE_WIDTH / 2) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH) * width,
            (1 - ENTITY_STROKE_WIDTH) * height
        );

        context.translate(0, Math.sin(this.oscillation) / 15);

        context.strokeStyle = "#000";
        context.lineWidth = 3 * ENTITY_STROKE_WIDTH;
        context.lineJoin = "round";
        context.lineCap = "round";

        this.strokeKeyShape(context);

        context.strokeStyle = this.color;
        context.lineWidth = ENTITY_STROKE_WIDTH;

        this.strokeKeyShape(context);

        context.restore();
    }

    strokeKeyShape(context){
        context.beginPath();
        context.ellipse(0.65, 0.5, 0.15, 0.2, 0, -Math.PI, Math.PI)
        context.lineTo(0.2, 0.5);
        context.lineTo(0.2, 0.65);
        context.lineTo(0.2, 0.65);
        context.lineTo(0.25, 0.65);
        context.lineTo(0.25, 0.5);
        context.stroke();
    }

    update(deltaTime) {
        this.oscillation += deltaTime / 400;
    }
}
