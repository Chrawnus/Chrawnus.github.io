import { Geometry } from "./geometry.js";
import { RegularPolygon} from "./regularPolygon.js"
const canvasElem = document.getElementById('canvas');
const sRangeElem = document.getElementById('sides');
const sLenSlider = document.getElementById("length");
const aSlider = document.getElementById("angle");

const sInfo = document.getElementById("sides-info");
const slInfo = document.getElementById("length-info");
const aInfo = document.getElementById("angle-info");

const sText = "number of sides: ";
const slText = "side length: ";
const aText = "angle: ";

let prevTime;
let mBtnState = false;

let sQuant = 3;
let sLen = 500;

let geom = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, sQuant, sLen/sQuant, 0);
sLenSlider.value = geom.sideLength;
sLen = sLenSlider.value;

sInfo.textContent = `${sText} ${geom.sideNumber}`
slInfo.textContent = `${slText} ${geom.sideLength}`
aInfo.textContent = `${aText} ${geom.rotationAngle}`

aSlider.step = `${1 * Math.PI/180}`
aSlider.max = `${Math.PI * 2}`;
aSlider.addEventListener("input", () => {
    geom.rotationAngle = aSlider.value;
    aInfo.textContent = `${aText} ${geom.rotationAngle}`
});


sRangeElem.addEventListener("input", () => {
    resizeGeom();
});

sLenSlider.addEventListener("input", () => {
    resizeGeom();
});

canvasElem.addEventListener("mousemove", function(e) {
    if (mBtnState) {
        getCursorPos(canvasElem, e)
    } 
});

mPressedFunction();

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

function draw(dt) {
    const ctx = canvasElem.getContext('2d');
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    geom.draw(ctx, dt);

}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

function mPressedFunction() {
    window.addEventListener("mousedown", () => {
        mBtnState = true;
    });

    window.addEventListener("mouseup", () => {
        mBtnState = false;
    });
}

function resizeGeom() {
    sQuant = sRangeElem.value;
    sLen = sLenSlider.value;
    geom.sideNumber = sQuant;
    geom.internalAngle = (geom.determineAngle(geom.sideNumber));
    geom.sideLength = sLenSlider.value / sQuant;
    sInfo.textContent = `${sText} ${sQuant}`;
    slInfo.textContent = `${slText} ${sLen/sQuant}`;
}

function getCursorPos(canvasElem, event) {
    const rect = canvasElem.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    geom.x = x;
    geom.y = y;
}


