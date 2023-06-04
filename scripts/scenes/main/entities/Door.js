class Door extends SolidEntity {
    constructor(doorX, doorY, keyX, keyY) {
        super(doorX, doorY);

        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;

        this.key = new Key(keyX, keyY, this.color);
    }

    render(context, width, height) {
        if (this.key.collected) {
            return;
        }

        context.save();

        context.strokeStyle = "#000";
        context.fillStyle = this.color;
        context.lineWidth = ENTITY_STROKE_WIDTH;
        context.lineJoin = "round";
        context.lineCap = "round";

        context.translate(
            (this.x + ENTITY_STROKE_WIDTH / 2 + GRID_PADDING) * width,
            (this.y + ENTITY_STROKE_WIDTH / 2 + GRID_PADDING) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH - 2 * GRID_PADDING) * width,
            (1 - ENTITY_STROKE_WIDTH - 2 * GRID_PADDING) * height
        );

        context.fillRect(0, 0, 1, 1);
        context.strokeRect(0, 0, 1, 1);

        context.fillStyle = "#000";

        context.beginPath();
        context.arc(0.5, 0.45, 0.1, 0, 2 * Math.PI);
        context.fill();

        context.beginPath();
        context.moveTo(0.5, 0.45);
        context.lineTo(0.5, 0.7);
        context.stroke();

        context.restore();

        this.key.render(context, width, height);
    }

    update(deltaTime) {
        this.key.update(deltaTime);
    }

    interactEntity(entity) {
        if (this.key.collected) {
            return;
        }

        super.interactEntity(entity);

        this.key.interactEntity(entity);

        if (this.key.collected) {
            for (let stoppedMovingEntity of this.stoppedMovingEntities) {
                stoppedMovingEntity.resumeMoving();
            }
        }
    }

    inputDirection(xDirection, yDirection, isPlayerInput) {
        super.inputDirection(xDirection, yDirection, isPlayerInput);
        this.key.inputDirection(xDirection, yDirection, isPlayerInput);
    }

    undo() {
        this.key.undo();
    }
}
