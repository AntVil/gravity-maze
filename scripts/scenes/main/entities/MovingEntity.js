class MovingEntity extends Entity {
    constructor(x, y) {
        super(x, y);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.xAcceleration = 0;
        this.yAcceleration = 0;

        this.positionHistory = [];

        this.distanceMoved = 0;
    }

    update(deltaTime) {
        this.xSpeed = Math.sign(this.xAcceleration) * Math.min(Math.abs(this.xSpeed + this.xAcceleration), ENTITY_MAX_SPEED);
        this.ySpeed = Math.sign(this.yAcceleration) * Math.min(Math.abs(this.ySpeed + this.yAcceleration), ENTITY_MAX_SPEED);

        this.x += deltaTime * this.xSpeed;
        this.y += deltaTime * this.ySpeed;

        this.distanceMoved += Math.abs(deltaTime * this.xSpeed) + Math.abs(deltaTime * this.ySpeed);
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

    inputDirection(xDirection, yDirection, isPlayerInput) {
        this.xAcceleration = xDirection * ENTITY_ACCELERATION;
        this.yAcceleration = yDirection * ENTITY_ACCELERATION;

        if(isPlayerInput){
            this.positionHistory.push([this.x, this.y]);
        }
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
        
        if(this.distanceMoved > 0.9){
            this.playStopAudio();
        }
        this.distanceMoved = 0;
    }

    undo() {
        if (this.positionHistory.length > 0) {
            [this.x, this.y] = this.positionHistory.pop();
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.xAcceleration = 0;
            this.yAcceleration = 0;
            this.distanceMoved = 0;
        }
    }

    playStopAudio(){
        let context = game.audioManager.getAudioContext();

        let oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(220, context.currentTime);
        
        let volume = context.createGain();
        volume.gain.setValueAtTime(0, context.currentTime);
        
        oscillator.connect(volume);
        volume.connect(context.destination);

        
        volume.gain.linearRampToValueAtTime(VOLUME_MAX, context.currentTime + 0.02);
        
        oscillator.start();
        
        setTimeout(() => {
            volume.gain.linearRampToValueAtTime(0, context.currentTime + 0.03);
            oscillator.stop(context.currentTime + 0.03);
        }, 20);
    }
}
