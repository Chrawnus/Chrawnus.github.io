import { Helper } from "./helperFunctions.js";
import { Point2d } from "./Point2d.js";
import { Geometry } from "./geometry.js";
import { RegularPolygon} from "./regularPolygon.js"
import { Circle } from "./circle.js";

const canvasElem = document.getElementById('canvas');

const sRangeElem = document.getElementById('sides');
const sLenSlider = document.getElementById("length");

const sInfo = document.getElementById("sides-info");
const slInfo = document.getElementById("length-info");

const sText = "number of sides: ";
const slText = "side length: ";

let prevTime;

let start = new Point2d(canvasElem.width/2, canvasElem.height/2);
let points = [start];


let geom = new Geometry(start.x, start.y, points);
geom.createRandomPolygon(Helper.getRandomInt(3, 12));

let polygon = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, 3, 500, 0);

let circle = new Circle(250, 250, 100, "red", "black", 2, 4);

resizeGeom();

requestAnimationFrame(gameLoop);

canvasElem.addEventListener("mousemove", function(e) {
    let {x, y} = 0;
    ({ x, y } = Helper.getCursorPos(canvasElem, e, x, y));
    let point = findClosestPointToMouse(x, y, geom);
    geom.getSelectedPoint(point);
    if (Helper.isMouseDown) {

        [point.x, point.y] = [x, y]; 
        
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
    geom.drawShape(dt, ctx, geom.points);
    geom.drawActivePoint(ctx);

    circle.draw(ctx);
    
}


function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

function findClosestPointToMouse(mouseX, mouseY, geom){
    let distance;
    let index;
    for (let i = 0; i < geom.points.length; i++) {
        let point = geom.points[i];
        if (distance === undefined) {
            distance = Math.sqrt((point.x-mouseX)**2+(point.y-mouseY)**2);
            index = i;point
        } else {
            if (Math.sqrt((point.x-mouseX)**2+(point.y-mouseY)**2) < distance) {
                distance = Math.sqrt((point.x-mouseX)**2+(point.y-mouseY)**2);
                index = i;
            }
        }
    }
    return geom.points[index];
}