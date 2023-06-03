class Door extends Entity {
    constructor(doorX, doorY, keyX, keyY) {
        super(doorX, doorY);

        this.u = keyX + 1;
        this.v = keyY + 1;

        this.open = false;
        this.openedSince = -1;
        
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.oscillation = 0;

        this.stoppedBlocks = [];
        this.lastInputDirectionX = 0;
        this.lastInputDirectionY = 0;
    }

    render(context, width, height) {
        if (this.open) {
            return;
        }
        
        this.renderDoor(context, width, height);
        this.renderKey(context, width, height);
    }

    renderDoor(context, width, height){
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
    }

    renderKey(context, width, height){
        context.save();

        context.strokeStyle = this.color;
        context.lineWidth = ENTITY_STROKE_WIDTH;
        context.lineJoin = "round";
        context.lineCap = "round";

        context.translate(
            (this.u + ENTITY_STROKE_WIDTH / 2) * width,
            (this.v + ENTITY_STROKE_WIDTH / 2) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH) * width,
            (1 - ENTITY_STROKE_WIDTH) * height
        );

        context.beginPath();
        context.arc(0.65, 0.5, 0.2, -Math.PI, Math.PI);
        context.lineTo(0.2, 0.5);
        context.lineTo(0.2, 0.65);
        context.stroke();

        context.restore();
    }

    update(deltaTime) {
        this.oscillation += deltaTime / 2000;
    }

    interactEntity(entity) {
        if(this.open){
            return;
        }

        if (entity instanceof MovingEntity) {
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
                this.stoppedBlocks.push(entity);
            }
        }

        if (entity instanceof Player) {
            if (Math.abs(entity.x - this.u) < 1 && Math.abs(entity.y - this.v) < 1 && !this.open) {
                this.open = true;
                this.openedSince = 0;

                for(let stoppedBlock of this.stoppedBlocks){
                    stoppedBlock.inputDirection(this.lastInputDirectionX, this.lastInputDirectionY, false);
                }
            }
        }
    }

    inputDirection(xDirection, yDirection, isPlayerInput) {
        this.openedSince++;
        this.stoppedBlocks = [];
        this.lastInputDirectionX = xDirection;
        this.lastInputDirectionY = yDirection;
    }

    undo() {
        this.openedSince = Math.max(this.openedSince - 1, -1);

        if (this.openedSince === -1) {
            this.open = false;
        }
    }
}
