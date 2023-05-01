class Level extends MountableGameManager {
    constructor(levelIndex) {
        super();

        this.levelIndex = levelIndex;

        this.reset();

        this.paused = true;
    }

    mount() {
        this.paused = false;
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
    }

    dismount() {
        this.paused = true;
    }

    reset() {
        let [gridString, movablesString] = (LEVEL_STRINGS[this.levelIndex] || "&").split("&");

        this.grid = new Grid(gridString);

        let entityElements = {
            "p": Player,
            "*": Star
        }

        this.entities = [];

        for (let [_, entityChar, parametersString] of movablesString.matchAll(/([^0-9])([0-9,]+)/g)) {
            let parameters = parametersString.split(",").map((a) => parseInt(a));

            this.entities.push(new entityElements[entityChar](...parameters));
        }
    }

    render(context, width, height) {
        this.grid.render(context, width, height);

        let cellSize = this.grid.getCellSize(width, height);

        for (let entity of this.entities) {
            entity.render(context, cellSize, cellSize);
        }
    }

    update(deltaTime) {
        if (this.paused) {
            return;
        }

        for (let entity of this.entities) {
            entity.update(deltaTime);
            entity.interactGrid(this.grid);
            for (let otherEntity of this.entities) {
                if (entity !== otherEntity) {
                    entity.interactEntity(otherEntity);
                }
            }
        }
    }

    inputDirection(xDirection, yDirection) {
        for (let entity of this.entities) {
            if (!entity.inputIsPossible()) {
                return;
            }
        }

        for (let entity of this.entities) {
            entity.inputDirection(xDirection, yDirection);
        }

        this.entities = [...this.entities].sort((a, b) => b.xSpeed - a.xSpeed || b.ySpeed - a.ySpeed || b.x - a.x || b.y - b.y);
    }
}
