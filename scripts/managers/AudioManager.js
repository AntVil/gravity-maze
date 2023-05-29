class AudioManager extends GameManager {
    constructor() {
        super();

        this.context = new (window.AudioContext || window.webkitAudioContext)();
    }

    getAudioContext(){
        return this.context;
    }
}
