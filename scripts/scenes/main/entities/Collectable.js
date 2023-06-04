class Collectable extends Entity {
    constructor(x, y) {
        super(x, y);

        this.collected = false;
        this.collectedSince = -1;

        this.rotation = 0;
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
