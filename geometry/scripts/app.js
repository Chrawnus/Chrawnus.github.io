import { Helper } from "./HelperFunctions.js";
import { keyArr } from "./KeyArr.js";
import { canvasElem, sRangeElem, sLenSlider, sInfo, sText, slInfo, slText } from "./DOMElements.js";
import { addNewPoint, closestPoint, findClosestPointToMouse, getNewPoint, getPolygonLines } from "./mGeomManip.js";
import { geom, circle, polygon } from "./geomObjects.js";
import { Point2d } from "./Point2d.js";

let prevTime;

resizeGeom();

requestAnimationFrame(gameLoop);

canvasElem.addEventListener("click", function(e) {
    let {x, y} = 0;
    ({ x, y } = Helper.getCursorPos(canvasElem, e, x, y));
    const mouseC = new Point2d(x, y);
    let point;
    if (keyArr.includes('Shift')) {
        closestPoint(geom, mouseC, true);
        geom.activePoint = undefined;
        geom.activePoint = closestPoint(geom, mouseC);
    } else {
        point = findClosestPointToMouse(x, y, geom);
        if (keyArr.includes('Control') && geom.points.length > 2) {
            geom.points.splice(geom.points.indexOf(point[0]), 1);
            point[0] = getNewPoint(point, x, y);
        } else {
            [point.x, point.y] = [x, y]; 
            point[0] = getNewPoint(point, x, y);
        }
    }

});

canvasElem.addEventListener("mousemove", function (e) {
    let { x, y } = 0;
    ({ x, y } = Helper.getCursorPos(canvasElem, e, x, y));
    let mouseC = new Point2d(x, y);
    if (keyArr.includes('Shift')) {
        geom.activePoint = undefined;
        geom.activePoint = closestPoint(geom, mouseC, false);

    } else {
        geom.activePoints = undefined;
        let point = findClosestPointToMouse(x, y, geom);
        geom.getSelectedPoint(point[0]);
        if (Helper.isMouseDown) {
            [point[0].x, point[0].y] = [x, y];
        }
    }

});

document.addEventListener('input', event => {
    if (event.target === sRangeElem || event.target === sLenSlider) {
        resizeGeom();
    } 

});

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
    geom.draw(ctx);
    circle.draw(ctx); 
}


function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

function resizeGeom() {
    const sQuant = sRangeElem.value;
    const sLen = sLenSlider.value;

    polygon.sideNumber = sQuant;
    polygon.sideLength = sLen/sQuant;

    polygon.internalAngle = (polygon.determineAngle(polygon.sideNumber));
    
    sInfo.textContent = `${sText} ${sQuant}`;
    slInfo.textContent = `${slText} ${parseFloat(sLen/sQuant).toFixed(2)}`;
}