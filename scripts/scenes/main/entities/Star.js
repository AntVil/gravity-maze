class Star extends Entity {
    constructor(x, y) {
        super(x, y);

        this.collected = false;
        this.collectedSince = -1;

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

    interactEntity(entity) {
        if (!(entity instanceof Player)) {
            return;
        }

        if (Math.abs(entity.x - this.x) < 1 && Math.abs(entity.y - this.y) < 1 && !this.collected) {
            this.collected = true;
            this.collectedSince = 0;
        }
    }

    inputDirection(xDirection, yDirection, isPlayerInput) {
        this.collectedSince++;
    }

    undo() {
        this.collectedSince = Math.max(this.collectedSince - 1, -1);

        if (this.collectedSince === -1) {
            this.collected = false;
        }
    }
}
