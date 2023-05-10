class InputManager extends GameManager {
    constructor(canvas) {
        super();

        window.addEventListener("keydown", (e) => {
            this.handleKey(e.key);
        });

        this.canvas = canvas;

        this.canvas.addEventListener("mousedown", (e) => {
            this.handleMouseDown(e);
        });
        this.canvas.addEventListener("touchstart", (e) => {
            this.handleMouseDown(e);
        }, { passive: true });
        this.canvas.addEventListener("mousemove", (e) => {
            this.handleMouseMove(e);
        });
        this.canvas.addEventListener("touchmove", (e) => {
            this.handleMouseMove(e);
        }, { passive: true });
        this.canvas.addEventListener("mouseup", (e) => {
            this.handleMouseUp(e);
        });
        this.canvas.addEventListener("touchend", (e) => {
            this.handleMouseUp(e);
        }, { passive: true });
        this.canvas.addEventListener("mouseleave", (e) => {
            this.handleCancel(e);
        });
        this.canvas.addEventListener("touchcancel", (e) => {
            this.handleCancel(e);
        }, { passive: true });

        this.startX = undefined;
        this.startY = undefined;
    }

    handleKey(key) {
        if (["ArrowUp", "W", "w"].includes(key)) {
            this.inputDirectionUp();
        } else if (["ArrowRight", "D", "d"].includes(key)) {
            this.inputDirectionRight();
        } else if (["ArrowDown", "S", "s"].includes(key)) {
            this.inputDirectionDown();
        } else if (["ArrowLeft", "A", "a"].includes(key)) {
            this.inputDirectionLeft();
        }
    }

    handleMouseDown(e) {
        e.preventDefault();
        e = e.touches?.[0] || e;

        this.startX = e.clientX;
        this.startY = e.clientY;
        this.currentX = undefined;
        this.currentY = undefined;
    }

    handleMouseMove(e) {
        e.preventDefault();
        e = e.touches?.[0] || e;

        this.currentX = e.clientX;
        this.currentY = e.clientY;
    }

    handleMouseUp(e) {
        e.preventDefault();

        if (this.startX === undefined || this.currentX === undefined) {
            return;
        }

        let xDistance = this.startX - this.currentX;
        let yDistance = this.startY - this.currentY;
        if (Math.hypot(yDistance, xDistance) > INPUT_TRIGGER_DISTANCE) {
            if (Math.abs(xDistance) > Math.abs(yDistance)) {
                if (xDistance < 0) {
                    this.inputDirectionRight();
                } else {
                    this.inputDirectionLeft();
                }
            } else {
                if (yDistance < 0) {
                    this.inputDirectionDown();
                } else {
                    this.inputDirectionUp();
                }
            }
        }

        this.startX = undefined;
        this.startY = undefined;
    }

    handleCancel(e) {
        e.preventDefault();

        this.startX = undefined;
        this.startY = undefined;
    }

    inputDirectionUp() {
        game.sceneManager.getCurrentScene().inputDirection(0, -1);
    }

    inputDirectionRight() {
        game.sceneManager.getCurrentScene().inputDirection(1, 0);
    }

    inputDirectionDown() {
        game.sceneManager.getCurrentScene().inputDirection(0, 1);
    }

    inputDirectionLeft() {
        game.sceneManager.getCurrentScene().inputDirection(-1, 0);
    }
}
