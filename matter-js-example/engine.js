const Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

const engine = Engine.create();

const render = Render.create({
    element: document.body,
    engine: engine
});


let ground = Bodies.rectangle(400,610, 810, 60, {isStatic: true});
let box1 = Bodies.rectangle(450, 200, 60, 60);

World.add(engine.world, [box1, ground]);

Engine.run(engine);
Render.run(render);