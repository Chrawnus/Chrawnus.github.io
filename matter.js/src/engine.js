import { Helper } from "../HelperFunctions.js";
import { getKey, keyCodes } from "../input.js";




const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

const engine = Engine.create();

const render = Render.create({
    element: document.body,
    engine: engine
})


let ground = Bodies.rectangle(400, 610, 81000, 60, { isStatic: true });
let box1 = Bodies.trapezoid(450, 200, 60, 60, 0.5);
let circle1 = Bodies.circle(450, 50, 15);
let circle2 = Bodies.circle(450, 50, 15);
let circle3 = Bodies.circle(450, 50, 15);
let circle4 = Bodies.circle(450, 50, 15);
let circle5 = Bodies.circle(450, 50, 15);
let circle6 = Bodies.circle(450, 50, 15);

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
const canvas = document.querySelector('canvas')


let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {visible: false}
  }
});
render.mouse = mouse;

World.add(engine.world, [box1, ground, circle1, circle2, circle3, circle4, circle5, circle6, mouseConstraint]);
Render.run(render);

function gameLoop() {
    playerUpdate();
    Engine.update(engine);
    requestAnimationFrame(gameLoop);
}




requestAnimationFrame(gameLoop);




window.addEventListener('keydown', function (e) {

});
