class MovingEntity extends Entity {
    constructor(x, y) {
        super(x, y);
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    update(deltaTime) {
        this.x += deltaTime * this.xSpeed;
        this.y += deltaTime * this.ySpeed;
    }

    interactGrid(grid) {
        let x = this.x;
        let y = this.y;

        if (this.xSpeed < 0) {
            x = Math.floor(x);
        } else if (this.xSpeed > 0) {
            x = Math.ceil(x);
        } else if (this.ySpeed < 0) {
            y = Math.floor(y);
        } else if (this.ySpeed > 0) {
            y = Math.ceil(y);
        } else {
            return;
        }

        grid.getCell(x, y).interactEntity(this);
    }

    inputDirection(xDirection, yDirection) {
        this.xSpeed = xDirection * ENTITY_SPEED;
        this.ySpeed = yDirection * ENTITY_SPEED;
    }

    inputIsPossible() {
        return this.xSpeed === 0 && this.ySpeed === 0;
    }
}
