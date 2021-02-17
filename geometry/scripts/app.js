import { Point2d } from "./Point2d.js";
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

let numPoints = getRandomInt(3, 13);
let points = [];

for (let i = 0; i < numPoints; i++) {
    const point = new Point2d(getRandomInt(30, canvasElem.width-30), getRandomInt(30, canvasElem.height-30))
    
    points.push(point);
}
console.log(points);

//let geom = new Geometry(points[0].x, points[0].y, points);



let prevTime;
let mBtnState = false;

let sQuant = 3;
let sLen = 500;

let polygon = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, sQuant, sLen/sQuant, 0);
sLenSlider.value = polygon.sideLength;
sLen = sLenSlider.value;

sInfo.textContent = `${sText} ${polygon.sideNumber}`
slInfo.textContent = `${slText} ${polygon.sideLength}`
aInfo.textContent = `${aText} ${polygon.rotationAngle}`

aSlider.step = `${1 * Math.PI/180}`
aSlider.max = `${Math.PI * 2}`;
aSlider.addEventListener("input", () => {
    polygon.rotationAngle = aSlider.value;
    aInfo.textContent = `${aText} ${polygon.rotationAngle}`
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
    polygon.update(dt);
}

function physics(dt) {
    getPhysicsDelta(dt);
}

function draw(dt) {
    const ctx = canvasElem.getContext('2d');
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    polygon.draw(ctx, dt);
    //geom.drawShape(ctx, geom.points);
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
    polygon.sideNumber = sQuant;
    polygon.internalAngle = (polygon.determineAngle(polygon.sideNumber));
    polygon.sideLength = sLenSlider.value / sQuant;
    sInfo.textContent = `${sText} ${sQuant}`;
    slInfo.textContent = `${slText} ${sLen/sQuant}`;
}

function getCursorPos(canvasElem, event) {
    const rect = canvasElem.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    polygon.x = x;
    polygon.y = y;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

