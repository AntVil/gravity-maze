class BuilderScene extends Scene {
    constructor() {
        super("aside");

        this.backButton = this.uiContainer.children[0];
        this.editButton = this.uiContainer.children[1];

        this.editOptions = this.uiContainer.children[2];

        [
            this.smallLevelButton,
            this.mediumLevelButton,
            this.largeLevelButton,
            this.extraLargeLevelButton
        ] = this.editOptions.querySelectorAll(`[name="builderSize"]`);

        this.smallLevelButton.onchange = () => this.setLevelSize(5);
        this.mediumLevelButton.onchange = () => this.setLevelSize(7);
        this.largeLevelButton.onchange = () => this.setLevelSize(9);
        this.extraLargeLevelButton.onchange = () => this.setLevelSize(11);

        [
            this.deleteButton,
            this.rotateButton
        ] = this.editOptions.children[1].querySelectorAll(`[type="radio"]`);

        [
            this.solidBlockButton,
            this.semiSolidBlockButton
        ] = this.editOptions.children[2].querySelectorAll(`[type="radio"]`);

        [
            this.playerButton,
            this.movingBlockButton,
            this.starButton,
            this.goalButton
        ] = this.editOptions.children[3].querySelectorAll(`[type="radio"]`);

        this.backButton.onclick = () => game.sceneManager.toScene(HOME_SCENE);
        this.editButton.onclick = () => this.openEditOptions();

        this.editOptions.onclick = e => {
            let rect = this.editOptions.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                this.closeEditOptions();
            }
        }

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.level = new Level(-1);

        this.smallLevelButton.click();
        this.solidBlockButton.click();
    }

    openEditOptions() {
        this.editOptions.showModal()
    }

    closeEditOptions() {
        this.editOptions.close();
    }

    resetLevel() {
        this.level.reset(this.levelString);
    }

    setLevelSize(levelSize) {
        this.levelString = `${" ".repeat(levelSize * levelSize)}&&`;
        this.resetLevel();
    }

    inputPoint(x, y) {
        let size = Math.min(this.width, this.height) * 0.8;

        let offsetX = (this.width - size) / 2;
        let offsetY = (this.height - size) / 2;

        x = (x - offsetX) / size;
        y = (y - offsetY) / size;

        let levelSize = Math.round(Math.sqrt(this.levelString.split("&")[0].length));

        let indexX = Math.floor(x * (levelSize + 2)) - 1;
        let indexY = Math.floor(y * (levelSize + 2)) - 1;

        if (indexX < 0 || indexY < 0 || indexX >= levelSize || indexY >= levelSize) {
            return;
        }

        let index = indexX + indexY * levelSize;
        this.handleInput(indexX, indexY, index);

        this.resetLevel();
    }

    handleInput(indexX, indexY, index) {
        if (this.rotateButton.checked) {
            this.handleRotate(indexX, indexY, index);
        } else if (this.deleteButton.checked) {
            this.handleDelete(indexX, indexY, index);
        } else if (this.solidBlockButton.checked) {
            this.handleBlock(index, "b");
        } else if (this.semiSolidBlockButton.checked) {
            this.handleBlock(index, ">");
        } else if (this.playerButton.checked) {
            this.handleEntity(indexX, indexY, "p");
        } else if (this.movingBlockButton.checked) {
            this.handleEntity(indexX, indexY, "m");
        } else if (this.starButton.checked) {
            this.handleEntity(indexX, indexY, "*");
        } else if (this.goalButton.checked) {
            this.handleEntity(indexX, indexY, "g");
        }
    }

    handleDelete(indexX, indexY, index) {
        this.levelString = this.levelString.replace(new RegExp(`[^,0-9]${indexX},${indexY}[,0-9]*`), "");
        this.levelString = this.levelString.substring(0, index) + " " + this.levelString.substring(index + 1);
    }

    handleRotate(indexX, indexY, index) {
        const rotations = {
            "<": "^",
            "^": ">",
            ">": "v",
            "v": "<"
        }

        let next = rotations[this.levelString[index]];
        
        if(next === undefined){
            return;
        }

        this.levelString = this.levelString.substring(0, index) + next + this.levelString.substring(index + 1);
    }

    handleBlock(index, char) {
        this.levelString = this.levelString.substring(0, index) + char + this.levelString.substring(index + 1);
    }

    handleEntity(indexX, indexY, char) {
        let parts = this.levelString.split("&")
        this.levelString = `${parts[0]}&${parts[1]}${char}${indexX},${indexY}&${parts[2]}`;
        console.log(this.levelString)
    }

    render(context, width, height) {
        this.width = width;
        this.height = height;

        let size = Math.min(width, height) * 0.8;

        context.save();
        context.translate((width - size) / 2, (height - size) / 2);

        this.level.reset(this.levelString);
        this.level.render(context, size, size);

        context.restore();
    }
}
