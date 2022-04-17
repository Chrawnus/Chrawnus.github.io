import { Engine } from "./Engine.js"
import { Update } from "./Update.js";
import { Input } from "./Input.js";

const physics = new Update(3, false, 2, Math.PI, false, 0.01);
export const engine = new Engine(physics);

const amount = 5;

Engine.Spawner.spawnPlayer(engine);
Engine.Spawner.spawnAsteroids(engine, amount);

engine.start();


