class Scene extends MountableGameManager {
    constructor(uiContainerQuery) {
        super();

        this.uiContainer = document.querySelector(uiContainerQuery);
    }

    mount() {
        this.uiContainer.classList.add("mounted");
    }

    dismount() {
        this.uiContainer.classList.remove("mounted");
    }

    inputDirection(xDirection, yDirection) {

    }

    inputPoint(x, y){

    }

    playButtonAudio() {
        let context = game.audioManager.getAudioContext();

        let oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(440, context.currentTime);

        let volume = context.createGain();
        volume.gain.setValueAtTime(0, context.currentTime);

        oscillator.connect(volume);
        volume.connect(context.destination);


        volume.gain.linearRampToValueAtTime(VOLUME_MAX, context.currentTime + 0.02);

        oscillator.start();

        setTimeout(() => {
            volume.gain.linearRampToValueAtTime(0, context.currentTime + 0.03);
            oscillator.stop(context.currentTime + 0.03);
        }, 20);
    }
}
