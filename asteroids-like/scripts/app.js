import { Engine } from "./Engine.js"

export const engine = new Engine();

engine.initialize(6, 10);
engine.start();

window.addEventListener('keydown', e => {
    engine.switchPauseState(e);
});