import { Engine } from "./Engine.js"

export const engine = new Engine();

Engine.Spawner.spawnPlayer(engine);
Engine.Spawner.spawnAsteroids(engine, 10);

engine.start();

