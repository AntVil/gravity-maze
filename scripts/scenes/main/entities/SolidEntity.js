class SolidEntity extends Entity {
    constructor(x, y) {
        super(x, y);

        this.stoppedMovingEntities = [];
    }

    interactEntity(entity) {
        if (!(entity instanceof MovingEntity)) {
            return;
        }

        let x = entity.x;
        let y = entity.y;

        if (entity.xSpeed < 0) {
            x = Math.floor(x - 0.5);
        } else if (entity.xSpeed > 0) {
            x = Math.ceil(x + 0.5);
        } else if (entity.ySpeed < 0) {
            y = Math.floor(y - 0.5);
        } else if (entity.ySpeed > 0) {
            y = Math.ceil(y + 0.5);
        } else {
            return;
        }

        if (this.x === x && this.y === y) {
            entity.stopMoving();
            this.stoppedMovingEntities.push(entity);
        }
    }

    inputDirection(xDirection, yDirection, isPlayerInput) {
        this.stoppedMovingEntities = [];
    }
}
