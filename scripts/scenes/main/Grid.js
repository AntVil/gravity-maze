class Grid extends GameManager {
    constructor(gridString) {
        super();

        let size = Math.round(Math.sqrt(gridString.length));

        let gridElements = {
            " ": AirBlock,
            "b": SolidBlock
        }

        this.grid = [];
        for (let y = 0; y < size + 2; y++) {
            let row = [];
            for (let x = 0; x < size + 2; x++) {
                if (x === 0 || x === size + 1 || y === 0 || y === size + 1) {
                    row.push(new SolidBlock(x, y));
                } else {
                    let fieldChar = gridString[(y - 1) * size + (x - 1)];
                    row.push(new gridElements[fieldChar](x, y));
                }
            }
            this.grid.push(row);
        }
    }

    getCellSize(width, height) {
        return width / this.grid.length;
    }

    getCell(x, y) {
        return this.grid[y][x];
    }

    render(context, width, height) {
        let cellSize = this.getCellSize(width, height);
        for (let row of this.grid) {
            for (let item of row) {
                item.render(context, cellSize, cellSize);
            }
        }
    }
}
