import { Geometry } from "./geometry.js";

const canvasElem = document.getElementById('canvas');
const sidesRangeElem = document.getElementById('sides');
const sidesInfo = document.getElementById("sides-info");
const sideLengthSlider = document.getElementById("length");
const sideLengthInfo = document.getElementById("length-info");

const sidesText = "Number of sides: ";
const lengthText = "side length: ";

let sideAmount = sidesRangeElem.value;
let sideLength = sideLengthSlider.value;
let prevTime;
let geometry = new Geometry(canvasElem.width/2, canvasElem.height/2, 3, 20, 60);



sidesInfo.textContent = `${sidesText} ${geometry.sides}`
sideLengthSlider.value = geometry.sideLengths;
sideLengthInfo.textContent = `${lengthText} ${geometry.sideLengths}`


sidesRangeElem.addEventListener("input", () => {
    sideAmount = sidesRangeElem.value;
    geometry.sides = sideAmount;
    geometry.internalAngle = (geometry.determineAngle(geometry.sides));
    
    sidesInfo.textContent = `${sidesText} ${sideAmount}`;
});

sideLengthSlider.addEventListener("input", () => {
    sideLength = sideLengthSlider.value;
    geometry.sideLengths = sideLength;
    
    
    sideLengthInfo.textContent = `${lengthText} ${sideLength}`;
});

canvasElem.addEventListener("mousedown", function(e) {
    getCursorPosition(canvasElem, e)
    
})



function getCursorPosition(canvasElem, event) {
    const rect = canvasElem.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    geometry.x = x;
    geometry.y = y;
}

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    let dt = getDelta(now);
    update(dt);
    draw(dt);
    requestAnimationFrame(gameLoop);
}

function update(dt) {

    geometry.update(dt);
}

function physics(dt) {
    getPhysicsDelta(dt);
}

function draw() {
    const ctx = canvasElem.getContext('2d');
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    
    geometry.draw(ctx);
}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}


