import { Engine } from "./Engine.js"
import { Update } from "./Update.js";


const physics = new Update(false, 2, Math.PI, false, 0.01);

export const engine = new Engine(physics);

Engine.Spawner.spawnPlayer(engine);
Engine.Spawner.spawnAsteroids(engine, 15);

engine.start();

