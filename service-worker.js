const cacheName = "gravity-maze";
const filesToCache = [
    "/gravity-maze/",
    "/gravity-maze/index.html",
    "/gravity-maze/styles/index.css",
    "/gravity-maze/styles/theme.css",
    "/gravity-maze/styles/homeScreen.css",
    "/gravity-maze/styles/levelSelectScreen.css",
    "/gravity-maze/styles/mainScreen.css",
    "/gravity-maze/styles/builderScreen.css",
    "/gravity-maze/styles/images/back.svg",
    "/gravity-maze/styles/images/pause.svg",
    "/gravity-maze/styles/images/reset.svg",
    "/gravity-maze/styles/images/revert.svg",
    "/gravity-maze/scripts/index.js",
    "/gravity-maze/scripts/Game.js",
    "/gravity-maze/scripts/constants.js",
    "/gravity-maze/scripts/managers/GameManager.js",
    "/gravity-maze/scripts/managers/AudioManager.js",
    "/gravity-maze/scripts/managers/CanvasManager.js",
    "/gravity-maze/scripts/managers/InputManager.js",
    "/gravity-maze/scripts/managers/SceneManager.js",
    "/gravity-maze/scripts/managers/StorageManager.js",
    "/gravity-maze/scripts/managers/MountableGameManager.js",
    "/gravity-maze/scripts/managers/Scene.js",
    "/gravity-maze/scripts/scenes/home/HomeScene.js",
    "/gravity-maze/scripts/scenes/levelSelect/LevelSelectScene.js",
    "/gravity-maze/scripts/scenes/main/MainScene.js",
    "/gravity-maze/scripts/scenes/builder/builderScene.js",
    "/gravity-maze/scripts/scenes/main/Level.js",
    "/gravity-maze/scripts/scenes/main/Grid.js",
    "/gravity-maze/scripts/scenes/main/blocks/GridBlock.js",
    "/gravity-maze/scripts/scenes/main/blocks/AirBlock.js",
    "/gravity-maze/scripts/scenes/main/blocks/SolidBlock.js",
    "/gravity-maze/scripts/scenes/main/blocks/SemiSolidBlock.js",
    "/gravity-maze/scripts/scenes/main/blocks/SemiSolidBlockTop.js",
    "/gravity-maze/scripts/scenes/main/blocks/SemiSolidBlockRight.js",
    "/gravity-maze/scripts/scenes/main/blocks/SemiSolidBlockBottom.js",
    "/gravity-maze/scripts/scenes/main/blocks/SemiSolidBlockLeft.js",
    "/gravity-maze/scripts/scenes/main/entities/Entity.js",
    "/gravity-maze/scripts/scenes/main/entities/Star.js",
    "/gravity-maze/scripts/scenes/main/entities/Goal.js",
    "/gravity-maze/scripts/scenes/main/entities/MovingEntity.js",
    "/gravity-maze/scripts/scenes/main/entities/Player.js",
    "/gravity-maze/scripts/scenes/main/entities/MovingBlock.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(filesToCache)));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            let copy = response.clone();
            caches.open(cacheName).then((cache) => {
                cache.put(event.request, copy);
            });
            return response;
        }).catch(() => {
            return caches.match(event.request).then((response) => {
                return response;
            })
        })
    );
});
