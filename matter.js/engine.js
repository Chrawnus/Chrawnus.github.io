import { Helper } from "./HelperFunctions.js";
import { getKey, keyCodes } from "./input.js";


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

const bodyArr = [circle1, box1];

World.add(engine.world, [box1, ground, circle1]);

Engine.run(engine);
Render.run(render);

const canvas = document.querySelector('canvas')

let isMouseDown = false;

window.addEventListener('pointerdown', () => {
    isMouseDown = true;
})
window.addEventListener('pointerup', () => {
    isMouseDown = false;
})

window.addEventListener('keydown', function(e){
    getKey(keyCodes.leftArrow) ?  Body.setVelocity(box1, {x: -5, y: 0}) : 0;
    getKey(keyCodes.rightArrow) ? Body.setVelocity(box1, {x: 5, y: 0}) : 0;
    getKey(keyCodes.upArrow) ? Body.setVelocity(box1, {x: 0, y: -5}) : 0;
});
