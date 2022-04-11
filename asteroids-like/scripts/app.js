import { Engine } from "./Engine.js"
import { Drawer } from "./Drawer.js";
import { Physics } from "./Physics.js";
import { Player } from "./Player.js";
import { Helper } from "./helperFunctions.js";
import { canvas } from "./Elements.js";
import { Asteroid } from "./Asteroid.js";
// helper object for storing mouse position on canvas

export const helper = new Helper();

// checks position of mouse on canvas.
window.addEventListener("mousemove", function(e) {
    helper.getMousePos(canvas, e);

});


const drawer = new Drawer()
export const physics = new Physics(false, 0, 90, true, 0.01);



export const engine = new Engine(drawer, physics);


const player = new Player(canvas.width/2, canvas.height/2, 15)


for (let i = 0; i < 10; i++) {
    const asteroid = new Asteroid();
    engine.addEntity(asteroid);
}


engine.addEntity(player);
engine.start();

