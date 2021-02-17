import { Geometry } from "./geometry.js";
import { RegularPolygon} from "./regularPolygon.js"
const canvasElem = document.getElementById('canvas');
const sidesRangeElem = document.getElementById('sides');
const sideLengthSlider = document.getElementById("length");
const angleSlider = document.getElementById("angle");

const sidesInfo = document.getElementById("sides-info");
const sideLengthInfo = document.getElementById("length-info");
const angleInfo = document.getElementById("angle-info");
let prevTime;

let angle = angleSlider.value;
let sideAmount = sidesRangeElem.value;
let sideLength = sideLengthSlider.value;

let geometry = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, sideAmount, sideLength/sideAmount, angle);


const angleText = "angle: ";
const sidesText = "number of sides: ";
const sideLengthText = "side length: ";

let mouseState = false;


sideLengthSlider.value = geometry.sLen;

sidesInfo.textContent = `${sidesText} ${geometry.s}`
sideLengthInfo.textContent = `${sideLengthText} ${geometry.sLen}`
angleInfo.textContent = `${angleText} ${geometry.sAngle}`

sidesRangeElem.addEventListener("input", () => {
    resizeGeometry();
});

sideLengthSlider.addEventListener("input", () => {
    resizeGeometry();

});

angleSlider.addEventListener("input", () => {
    geometry.sAngle = angleSlider.value;
    angleInfo.textContent = `${angleText} ${geometry.sAngle}`

})

canvasElem.addEventListener("mousemove", function(e) {
    if (mouseState) {
        getCursorPosition(canvasElem, e)
    }
    
    
})

window.addEventListener("mousedown", () => {
    mouseState = true;
});

window.addEventListener("mouseup", () => {
    mouseState = false;
});

function resizeGeometry() {
    sideAmount = sidesRangeElem.value;
    sideLength = sideLengthSlider.value;
    geometry.s = sideAmount;
    geometry.intAngle = (geometry.determineAngle(geometry.s));
    geometry.sLen = sideLengthSlider.value / sideAmount;
    sidesInfo.textContent = `${sidesText} ${sideAmount}`;
    sideLengthInfo.textContent = `${sideLengthText} ${sideLength/sideAmount}`;
}

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


