import { Helper } from "./helperFunctions.js";
import { Point2d } from "./Point2d.js";
import { Geometry } from "./geometry.js";
import { RegularPolygon} from "./regularPolygon.js"


export const canvasElem = document.getElementById('canvas');
const sRangeElem = document.getElementById('sides');
const sLenSlider = document.getElementById("length");
const aSlider = document.getElementById("angle");

const sInfo = document.getElementById("sides-info");
const slInfo = document.getElementById("length-info");
const aInfo = document.getElementById("angle-info");

const sText = "number of sides: ";
const slText = "side length: ";

const aText = "angle: ";

let numPoints = Helper.getRandomInt(3, 13);
let start = new Point2d(250, 345);
let points = [start];

/* for (let i = 0; i < numPoints; i++) {
    const point = new Point2d(Helper.getRandomInt(30, canvasElem.width-30), Helper.getRandomInt(30, canvasElem.height-30))
    
    points.push(point);
} */
console.log(points);

let geom = new Geometry(start.x, start.y, points);

let prevTime;

let sQuant = 3;
let sLen = 500;
let angle = 0;

let polygon = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, sQuant, sLen/sQuant, 0);
sRangeElem.value = polygon.sideNumber;
sLenSlider.value = polygon.sideLength;
aSlider.value = polygon.rotationAngle;

sQuant = polygon.sideNumber;
sLen = polygon.sideLength;
angle = polygon.rotationAngle;

sInfo.textContent = `${sText} ${sQuant}`
slInfo.textContent = `${slText} ${sLen.toFixed(2)}`
aInfo.textContent = `${aText} ${angle.toFixed(2)}`

aSlider.step = `${1 * Math.PI/180}`
aSlider.max = `${Math.PI * 2}`;

aSlider.addEventListener("input", () => {
    resizeGeom();
});

sRangeElem.addEventListener("input", () => {
    resizeGeom();
});

sLenSlider.addEventListener("input", () => {
    resizeGeom();
});

canvasElem.addEventListener("mousemove", function(e) {
    if (Helper.isMouseDown) {
        let {x, y} = 0;
        ({ x, y } = Helper.getCursorPos(canvasElem, e, x, y));
        [polygon.x, polygon.y] = [x, y]; 
    } 
});

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
    geom.drawShape(ctx, geom.points);
}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

function resizeGeom() {
    sQuant = sRangeElem.value;
    sLen = sLenSlider.value;
    angle = aSlider.value;
    
    polygon.sideNumber = sQuant;
    polygon.sideLength = sLen/sQuant;
    polygon.rotationAngle = angle;
    
    polygon.internalAngle = (polygon.determineAngle(polygon.sideNumber));
    
    sInfo.textContent = `${sText} ${sQuant}`;
    slInfo.textContent = `${slText} ${parseFloat(sLen/sQuant).toFixed(2)}`;
    aInfo.textContent = `${aText} ${parseFloat(angle).toFixed(2)}`
}


