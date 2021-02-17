import { Geometry } from "./geometry.js";
import { RegularPolygon} from "./regularPolygon.js"
const canvasElem = document.getElementById('canvas');
const sRangeElem = document.getElementById('sides');
const sLenSlider = document.getElementById("length");
const aSlider = document.getElementById("angle");

const sInfo = document.getElementById("sides-info");
const slInfo = document.getElementById("length-info");
const aInfo = document.getElementById("angle-info");
let prevTime;

let a = aSlider.value;
let sAmount = sRangeElem.value;
let sLen = sLenSlider.value;

let geom = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, sAmount, sLen/sAmount, a);


const aText = "angle: ";
const sText = "number of sides: ";
const slText = "side length: ";

let mBtnState = false;


sLenSlider.value = geom.sLen;

sInfo.textContent = `${sText} ${geom.s}`
slInfo.textContent = `${slText} ${geom.sLen}`
aInfo.textContent = `${aText} ${geom.sAngle}`

sRangeElem.addEventListener("input", () => {
    resizeGeom();
});

sLenSlider.addEventListener("input", () => {
    resizeGeom();

});

aSlider.addEventListener("input", () => {
    geom.sAngle = aSlider.value;
    aInfo.textContent = `${aText} ${geom.sAngle}`
});

canvasElem.addEventListener("mousemove", function(e) {
    if (mBtnState) {
        getCursorPos(canvasElem, e)
    } 
});

window.addEventListener("mousedown", () => {
    mBtnState = true;
});

window.addEventListener("mouseup", () => {
    mBtnState = false;
});

function resizeGeom() {
    sAmount = sRangeElem.value;
    sLen = sLenSlider.value;
    geom.s = sAmount;
    geom.iAngle = (geom.determineAngle(geom.s));
    geom.sLen = sLenSlider.value / sAmount;
    sInfo.textContent = `${sText} ${sAmount}`;
    slInfo.textContent = `${slText} ${sLen/sAmount}`;
}

function getCursorPos(canvasElem, event) {
    const rect = canvasElem.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    geom.x = x;
    geom.y = y;
}

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    let dt = getDelta(now);
    update(dt);
    draw(dt);
    requestAnimationFrame(gameLoop);
}

function update(dt) {
    geom.update(dt);
}

function physics(dt) {
    getPhysicsDelta(dt);
}

function draw() {
    const ctx = canvasElem.getContext('2d');
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    geom.draw(ctx);
}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}


