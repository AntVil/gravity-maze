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

    finishLevel() {

    }

    getLevelIndex() {
        return this.levelIndex;
    }

    reset() {
        let [gridString, entitiesString, metaString] = (LEVEL_STRINGS[this.levelIndex] || "&&").split("&");

        this.resetGrid(gridString);
        this.resetEntities(entitiesString);
        this.resetMeta(metaString);
    }

    resetGrid(gridString) {
        this.grid = new Grid(gridString);
    }

    resetEntities(entitiesString) {
        let entityElements = {
            "p": Player,
            "*": Star,
            "g": Goal
        }

        this.entities = [];

        for (let [_, entityChar, parametersString] of entitiesString.matchAll(/([^0-9])([0-9,]+)/g)) {
            let parameters = parametersString.split(",").map((a) => parseInt(a));

            this.entities.push(new entityElements[entityChar](...parameters));
        }
    }

    resetMeta(metaString) {
        let metaElements = {
            "d": (direction) => {
                if (direction === "0") {
                    this.inputDirection(0, -1);
                } else if (direction === "1") {
                    this.inputDirection(1, 0);
                } else if (direction === "2") {
                    this.inputDirection(0, 1);
                } else if (direction === "3") {
                    this.inputDirection(-1, 0);
                }
            }
        }

        for (let [_, metaChar, metaCode] of metaString.matchAll(/([^0-9])([0-9,]+)/g)) {
            metaElements[metaChar](metaCode);
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
        if (this.paused) {
            return;
        }

        for (let entity of this.entities) {
            if (!entity.inputIsPossible()) {
                return;
            }
        }

        for (let entity of this.entities) {
            entity.inputDirection(xDirection, yDirection);
        }

        this.entities = [...this.entities].sort(
            (a, b) =>
                (Math.abs(a.xSpeed || 0) + Math.abs(a.ySpeed || 0) - (Math.abs(b.xSpeed || 0) + Math.abs(b.ySpeed || 0))) ||
                b.xSpeed - a.xSpeed ||
                b.ySpeed - a.ySpeed ||
                b.x - a.x ||
                b.y - b.y
        );
    }
}
