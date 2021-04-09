import { Composite, engine, context, canvas } from "./engine.js";

export function createCanvas(height, width) {
    const wrapperExists = document.querySelector('canvas');
    if (!wrapperExists) {
        console.log('hi');
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        document.body.prepend(wrapper);
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const wrapper = document.querySelector('.wrapper');
    wrapper.appendChild(canvas);
}
export function render() {
    const bodies = Composite.allBodies(engine.world);
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    for (let i = 0; i < bodies.length; i += 1) {
        const vertices = bodies[i].vertices;
        context.moveTo(vertices[0].x, vertices[0].y);
        for (var j = 1; j < vertices.length; j += 1) {
            context.lineTo(vertices[j].x, vertices[j].y);
        }
        context.lineTo(vertices[0].x, vertices[0].y);
    }
    context.lineWidth = 1;
    context.strokeStyle = '#999';

    context.fillStyle = `red`;
    context.fill();
    context.stroke();
}
;
