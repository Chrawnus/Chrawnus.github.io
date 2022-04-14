import { Engine } from "./Engine.js"
import { Update } from "./Update.js";


const physics = new Update(false, 0, 90, true, 0.01);

export const engine = new Engine(physics);

Engine.Spawner.spawnPlayer(engine);
Engine.Spawner.spawnAsteroids(engine, 10);

engine.start();

