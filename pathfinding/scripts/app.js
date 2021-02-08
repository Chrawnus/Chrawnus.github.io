import { TileGrid } from "./TileGrid.js";
import { HelperFunctions } from "./helperFunctions.js";

export const canvasElem = document.getElementById('canvas');

function getCursorPosition(canvasElem, event) {
    const rect = canvasElem.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.clear();
    tileGrid.createNode(x, y);
    
}



canvasElem.addEventListener('mousedown', function(e) {
    getCursorPosition(canvasElem, e)
})


let prevTime;

const tileGrid = new TileGrid(1024);

tileGrid.createTileGrid();

requestAnimationFrame(gameLoop);


function gameLoop(now) {
    let dt = getDelta(now);

    update(dt);
    draw(dt);

    requestAnimationFrame(gameLoop);
}


function update(dt) {

}

function physics(dt) {
    getPhysicsDelta(dt);
}

function draw() {
    const ctx = canvasElem.getContext('2d');

    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

    tileGrid.drawTileGrid(ctx);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

