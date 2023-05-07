class SolidBlock extends GridBlock {
    constructor(x, y) {
        super(x, y);
    }

    render(context, width, height) {
        context.save();

        context.fillStyle = "#333";
        context.fillRect(this.x * width, this.y * height, width, height);

        context.restore();
    }

    interactEntity(entity) {
        if (entity instanceof MovingEntity){
            entity.stopMoving();
        }
    }
}
