class ConstrainedMovingBlock extends MovingBlock {
    constructor(x, y, ...pathOffsets) {
        super(x, y);
        
        x += 1;
        y += 1;

        let currentX = x;
        let currentY = y;

        this.constrainLookup = {
            [currentY]: {
                [currentX]: [false, false, false, false]
            }
        };

        let path = [[currentX, currentY]];
        this.paths = [];

        for (let i = 0; i < pathOffsets.length / 2; i++) {
            let offsetX = pathOffsets[2 * i];
            let offsetY = pathOffsets[2 * i + 1];

            if (offsetX === 0 && offsetY === 0) {
                currentX = x;
                currentY = y;
                
                this.paths.push(path);
                path = [[currentX, currentY]];

                continue;
            } else {
                currentX += offsetX;
                currentY += offsetY;

                path.push([currentX, currentY]);
            }

            console.log(currentX, currentY)

            if (!(currentY in this.constrainLookup)) {
                this.constrainLookup[currentY] = {};
            }
            if (!(currentX in this.constrainLookup[currentY])) {
                this.constrainLookup[currentY][currentX] = [false, false, false, false];
            }

            if (offsetX < 0) {
                this.constrainLookup[currentY][currentX][DIRECTION_RIGHT] = true;
                this.constrainLookup[currentY][currentX + 1][DIRECTION_LEFT] = true;
            } else if (offsetX > 0) {
                this.constrainLookup[currentY][currentX][DIRECTION_LEFT] = true;
                this.constrainLookup[currentY][currentX - 1][DIRECTION_RIGHT] = true;
            } else if (offsetY < 0) {
                this.constrainLookup[currentY][currentX][DIRECTION_DOWN] = true;
                this.constrainLookup[currentY + 1][currentX][DIRECTION_UP] = true;
            } else if (offsetY > 0) {
                this.constrainLookup[currentY][currentX][DIRECTION_UP] = true;
                this.constrainLookup[currentY - 1][currentX][DIRECTION_DOWN] = true;
            }
        }

        if(path.length > 0){
            this.paths.push(path);
        }
    }

    prerender(context, width, height){
        context.strokeStyle = "#AAA";
        context.lineWidth = width * ENTITY_STROKE_WIDTH;
        context.lineCap = "round";

        for(let path of this.paths){
            context.beginPath();
            for(let [x, y] of path){
                context.lineTo((x + 0.5) * width, (y + 0.5) * height);
            }
            context.stroke();
        }
    }

    update(deltaTime) {
        super.update(deltaTime);

        let x = Math.round(this.x);
        let y = Math.round(this.y);

        if (this.xSpeed < 0) {
            x = Math.ceil(this.x);
        } else if (this.xSpeed > 0) {
            x = Math.floor(this.x);
        } else if (this.ySpeed < 0) {
            y = Math.ceil(this.y);
        } else if (this.ySpeed > 0) {
            y = Math.floor(this.y);
        } else {
            return;
        }

        let direction = this.getDirection(this.xSpeed, this.ySpeed);

        if (!this.constrainLookup[y][x][direction]) {
            this.stopMoving();
        }
    }

    inputDirection(xDirection, yDirection) {
        if (this.constrainLookup[this.y][this.x][this.getDirection(xDirection, yDirection)]) {
            super.inputDirection(xDirection, yDirection);
        }
    }

    getDirection(xDirection, yDirection) {
        if (xDirection < 0) {
            return DIRECTION_LEFT;
        } else if (xDirection > 0) {
            return DIRECTION_RIGHT;
        } else if (yDirection < 0) {
            return DIRECTION_UP;
        } else {
            return DIRECTION_DOWN;
        }
    }
}
