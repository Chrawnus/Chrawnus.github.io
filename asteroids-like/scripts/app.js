import { Engine } from "./Engine.js"
import { Update } from "./Update.js";
import { Helper } from "./helperFunctions.js";
import { canvas } from "./Elements.js";
const physics = new Update(false, 2, Math.PI, false, 0.01);

export const engine = new Engine(physics);

Engine.Spawner.spawnPlayer(engine);

const amount = 5;

Engine.Spawner.spawnAsteroids(engine, amount);
engine.start();

