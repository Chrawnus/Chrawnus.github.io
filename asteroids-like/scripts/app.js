import { Engine } from "./Engine.js"
import { Update } from "./Update.js";

const asteroidAmount = 20;
const physics = new Update(6);
export const engine = new Engine(physics);

Engine.Spawner.spawnPlayer(engine);
Engine.Spawner.spawnAsteroids(engine, asteroidAmount);

engine.start();




