class MovingEntity extends Entity {
    constructor(x, y) {
        super(x, y);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.xAcceleration = 0;
        this.yAcceleration = 0;
    }

    update(deltaTime) {
        this.xSpeed = Math.sign(this.xAcceleration) * Math.min(Math.abs(this.xSpeed + this.xAcceleration), ENTITY_MAX_SPEED);
        this.ySpeed = Math.sign(this.yAcceleration) * Math.min(Math.abs(this.ySpeed + this.yAcceleration), ENTITY_MAX_SPEED);

        this.x += deltaTime * this.xSpeed;
        this.y += deltaTime * this.ySpeed;
    }

    interactGrid(grid) {
        let x = this.x;
        let y = this.y;

        if (this.xSpeed < 0) {
            x = Math.floor(x - 0.5);
        } else if (this.xSpeed > 0) {
            x = Math.ceil(x + 0.5);
        } else if (this.ySpeed < 0) {
            y = Math.floor(y - 0.5);
        } else if (this.ySpeed > 0) {
            y = Math.ceil(y + 0.5);
        } else {
            return;
        }

        grid.getCell(x, y).interactEntity(this);
    }

    interactEntity(entity) {
        if (!(entity instanceof MovingEntity)) {
            return;
        }

        if (Math.abs(entity.x - this.x) < 1 && Math.abs(entity.y - this.y) < 1 && this.isMoving() !== entity.isMoving()) {
            this.stopMoving();
        }
    }

    inputDirection(xDirection, yDirection) {
        this.xAcceleration = xDirection * ENTITY_ACCELERATION;
        this.yAcceleration = yDirection * ENTITY_ACCELERATION;
    }

    inputIsPossible() {
        return this.isMoving();
    }

    isMoving() {
        return this.xSpeed === 0 && this.ySpeed === 0;
    }

    stopMoving() {
        if (this.xSpeed > 0) {
            this.x = Math.floor(this.x);
        } else {
            this.x = Math.round(this.x);
        }
        if (this.ySpeed > 0) {
            this.y = Math.floor(this.y);
        } else {
            this.y = Math.round(this.y);
        }

        this.xSpeed = 0;
        this.ySpeed = 0;
        this.xAcceleration = 0;
        this.yAcceleration = 0;
    }
}
