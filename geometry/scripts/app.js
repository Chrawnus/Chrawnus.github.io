import { Helper } from "./helperFunctions.js";
import { Point2d } from "./Point2d.js";
import { Geometry } from "./geometry.js";
import { RegularPolygon} from "./regularPolygon.js"

const canvasElem = document.getElementById('canvas');
const sRangeElem = document.getElementById('sides');
const sLenSlider = document.getElementById("length");

const sInfo = document.getElementById("sides-info");
const slInfo = document.getElementById("length-info");

const sText = "number of sides: ";
const slText = "side length: ";


//let start = new Point2d(canvasElem.width/2, canvasElem.height/2);
//let points = [start];

//let geom = new Geometry(start.x, start.y, points);

let prevTime;

let polygon = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, 3, 500, 0);

resizeGeom();

requestAnimationFrame(gameLoop);

canvasElem.addEventListener("mousemove", function(e) {
    if (Helper.isMouseDown) {
        let {x, y} = 0;
        ({ x, y } = Helper.getCursorPos(canvasElem, e, x, y));
        [polygon.x, polygon.y] = [x, y]; 
    } 
});

document.addEventListener('input', event => {
    if (event.target === sRangeElem || event.target === sLenSlider) {
        resizeGeom();
    } 

});

function resizeGeom() {
    const sQuant = sRangeElem.value;
    const sLen = sLenSlider.value;

    polygon.sideNumber = sQuant;
    polygon.sideLength = sLen/sQuant;

    polygon.internalAngle = (polygon.determineAngle(polygon.sideNumber));
    
    sInfo.textContent = `${sText} ${sQuant}`;
    slInfo.textContent = `${slText} ${parseFloat(sLen/sQuant).toFixed(2)}`;
}

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