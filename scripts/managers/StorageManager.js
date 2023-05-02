class StorageManager extends GameManager {
    constructor() {
        super();

        this.storagePrefix = "gravity-puzzle";
    }

    getLevelInfos() {
        return [
            true,
            true
        ];
    }
}
