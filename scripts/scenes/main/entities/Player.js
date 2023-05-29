class Player extends MovingEntity {
    constructor(x, y) {
        super(x, y);

        this.currentDirection = DIRECTION_UP;
        this.directionHistory = [];
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
        if (this.currentDirection === DIRECTION_UP) {
            context.fillStyle = "#9F0";
        } else if (this.currentDirection === DIRECTION_RIGHT) {
            context.fillStyle = "#0F9";
            context.transform(0, -1, -1, 0, 1, 1);
        } else if (this.currentDirection === DIRECTION_DOWN) {
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

    inputDirection(xDirection, yDirection, isPlayerInput) {
        super.inputDirection(xDirection, yDirection, isPlayerInput);

        if(isPlayerInput){
            this.directionHistory.push(this.currentDirection);
        }

        if (xDirection < 0) {
            this.currentDirection = DIRECTION_LEFT;
        } else if (xDirection > 0) {
            this.currentDirection = DIRECTION_RIGHT;
        } else if (yDirection < 0) {
            this.currentDirection = DIRECTION_UP;
        } else {
            this.currentDirection = DIRECTION_DOWN;
        }
    }

    undo() {
        super.undo();

        if (this.directionHistory.length > 0) {
            this.currentDirection = this.directionHistory.pop();
        }
    }
}
