class Teleporter extends Entity {
    constructor(x1, y1, x2, y2) {
        super(x1, y1);

        this.u = x2 + 1;
        this.v = y2 + 1;

        this.teleportedEntities = [];
        
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.oscillation = 0;
    }

    render(context, width, height) {
        if (this.collected) {
            return;
        }

        context.save();

        context.strokeStyle = this.color;
        context.lineWidth = ENTITY_STROKE_WIDTH;
        
        this.renderPortal(context, this.x, this.y, width, height);
        this.renderPortal(context, this.u, this.v, width, height);

        context.restore();
    }

    renderPortal(context, x, y, width, height){
        context.save();

        context.translate(
            (x + ENTITY_STROKE_WIDTH / 2) * width,
            (y + ENTITY_STROKE_WIDTH / 2) * height
        );
        context.scale(
            (1 - ENTITY_STROKE_WIDTH) * width,
            (1 - ENTITY_STROKE_WIDTH) * height
        );

        for(let i=0;i<3;i++){
            let size = (this.oscillation + i / 3) % 1;
            context.globalAlpha = 1 - size;
            context.beginPath();
            context.arc(0.5, 0.5, size / 3, 0, 2 * Math.PI);
            context.stroke()
        }

        context.restore();
    }

    update(deltaTime) {
        this.oscillation += deltaTime / 2000;
    }

    interactEntity(entity) {
        if (entity instanceof MovingEntity && !this.teleportedEntities.includes(entity)) {
            if (
                Math.abs(entity.x - this.x) < 1 &&
                Math.abs(entity.y - this.y) < 1
            ) {
                entity.x = entity.x - this.x + this.u;
                entity.y = entity.y - this.y + this.v;

                this.teleportedEntities.push(entity);
            }else if (
                Math.abs(entity.x - this.u) < 1 &&
                Math.abs(entity.y - this.v) < 1
            ) {
                entity.x = entity.x - this.u + this.x;
                entity.y = entity.y - this.v + this.y;

                this.teleportedEntities.push(entity);
            }
        }
    }

    inputDirection(directionX, directionY){
        this.teleportedEntities = [];
    }
}
