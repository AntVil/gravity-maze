class StorageManager extends GameManager {
    constructor() {
        super();

        this.storagePrefix = "gravity-puzzle";
    }

    getLevelInfos() {
        return LEVEL_STRINGS.map(_ => true);
    }
}
