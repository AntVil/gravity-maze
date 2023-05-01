class SolidBlock extends GridBlock {
    constructor(x, y) {
        super(x, y);
    }

    render(context, width, height) {
        context.fillStyle = "#000";
        context.fillRect(this.x * width, this.y * height, width, height);
    }

    interactEntity(entity){
        entity.x = Math.round(entity.x);
        entity.y = Math.round(entity.y);

        entity.xSpeed = 0;
        entity.ySpeed = 0;
    }
}
