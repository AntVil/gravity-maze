let game;

window.onload = () => {
    game = new Game();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }
}
