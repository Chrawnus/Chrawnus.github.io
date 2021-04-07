import { Helper } from "./HelperFunctions.js";



let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

let engine = Engine.create();

let render = Render.create({
    element: document.body,
    engine: engine
})


let circle1 = Bodies.circle(450, 50, 60);
let ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
let box1 = Bodies.rectangle(450, 200, 60, 60);

World.add(engine.world, [box1, ground, circle1]);

Engine.run(engine);
Render.run(render);

document.querySelector('canvas').addEventListener('pointermove', function(e){
    const isMouseDown = Helper.isMouseDown;
    if (isMouseDown) {
        let {x, y} = 0;
        ({x, y} = Helper.getCursorPos(e, x, y));
        const mousePos = {x, y};
        Body.setPosition(box1, mousePos);
    }


});