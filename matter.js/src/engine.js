import { Helper } from "../HelperFunctions.js";
import { getKey, keyCodes } from "../input.js";
import { createCanvas, render } from "./renderer.js";


createCanvas(600, 800);
export const context = document.querySelector('canvas').getContext('2d');

export const Engine = Matter.Engine,
/*     Render = Matter.Render, */
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse;
    
export const engine = Engine.create();

let start;


/* const render = Render.create({
    element: document.body,
    engine: engine
}) */


export let ground = Bodies.rectangle(400, 610, 81000, 60, { isStatic: true }),
box1 = Bodies.trapezoid(450, 200, 60, 60, 0.5),
circle1 = Bodies.circle(450, 10, 15),
circle2 = Bodies.circle(450, 20, 15),
circle3 = Bodies.circle(450, 30, 15),
circle4 = Bodies.circle(450, 40, 15),
circle5 = Bodies.circle(450, 50, 15),
circle6 = Bodies.circle(450, 60, 15);

const camera = {
    x: 0,
    y: 0
}


function playerUpdate() {
    if (circle1.velocity.x > -3) {
        getKey(keyCodes.leftArrow) ? Body.applyForce(circle1, circle1.position, { x: -0.005, y: 0 }) : 0;
    }
    if (circle1.velocity.x < 3) {
        getKey(keyCodes.rightArrow) ? Body.applyForce(circle1, circle1.position, { x: 0.005, y: 0 }) : 0;
    }
    if (circle1.velocity.y > -4) {
        getKey(keyCodes.upArrow) ? Body.applyForce(circle1, circle1.position, { x: 0, y: -0.005 }) : 0;
    }
}

const bodyArr = [circle1, box1];

export const canvas = document.querySelector('canvas')


let mouse = Matter.Mouse.create(canvas); 
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {visible: false}
  }
});
//render.mouse = mouse;

World.add(engine.world, [box1, ground, circle1, circle2, circle3, circle4, circle5, circle6, mouseConstraint]);
//Render.run(render);

function gameLoop(timestamp) {
/*     if (start === undefined)
        start = timestamp;
    const elapsed = Math.floor(timestamp - start); */
    Mouse.setOffset(mouse, camera)
    camera.x = circle1.position.x - canvas.width / 4;
    playerUpdate();
    Engine.update(engine);
    render(camera);

    
    

    requestAnimationFrame(gameLoop);
}




requestAnimationFrame(gameLoop);
