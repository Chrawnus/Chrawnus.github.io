import { TileGrid } from "./TileGrid.js";
import { InputHelper } from "./inputHelper.js";
import { HelperFunctions } from "./helperFunctions.js";

export const canvasElem = document.getElementById('canvas');
const tileGrid = new TileGrid(1024);
const inputHelper = new InputHelper();

let prevTime;
export let keyArr = [];

tileGrid.createTileGrid();

window.addEventListener("keydown", inputHelper.keyDownEventsHandler);
window.addEventListener("keyup", inputHelper.keyUpEventsHandler);
canvasElem.addEventListener('mousedown', function(e) {
    getCursorPosition(canvasElem, e)
})

function getCursorPosition(canvasElem, event) {
    const rect = canvasElem.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.clear();
    tileGrid.createNode(x, y);
}

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    let dt = getDelta(now);
    update(dt);
    draw(dt);
    requestAnimationFrame(gameLoop);
}

function update(dt) {
    tileGrid.updateTiles();
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

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

