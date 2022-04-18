import { Engine } from "./Engine.js"
import { Update } from "./Update.js";

const asteroidAmount = 10;
const physics = new Update(2);
export const engine = new Engine(physics);

Engine.Spawner.spawnPlayer(engine);
Engine.Spawner.spawnAsteroids(engine, asteroidAmount);
engine.start();


