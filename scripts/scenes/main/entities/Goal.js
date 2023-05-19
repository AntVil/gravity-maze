class Goal extends Entity {
    constructor(x, y) {
        super(x, y);

        this.open = false;
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
        context.lineWidth = ENTITY_STROKE_WIDTH;
        context.lineJoin = "round";

        context.beginPath();

        let size = this.open ? 0.1 : 0.45;

        context.lineTo(0.5, size);
        context.lineTo(1 - size, 0.5);
        context.lineTo(0.5, 1 - size);
        context.lineTo(size, 0.5);
        context.closePath();

        context.fill();
        context.stroke();

        context.restore();
    }

    update(deltaTime) {
        this.open = true;
    }

    interactEntity(entity) {
        if (entity instanceof Star) {
            this.open &= entity.collected;
        } else if (entity instanceof Player) {
            if (
                this.open &&
                Math.abs(entity.x - this.x) < 2 * ENTITY_MAX_SPEED &&
                Math.abs(entity.y - this.y) < 2 * ENTITY_MAX_SPEED
            ) {
                entity.stopMoving();

                let mainScene = game.sceneManager.getCurrentScene()
                mainScene.completeLevel();
            }
        }
    }
}
