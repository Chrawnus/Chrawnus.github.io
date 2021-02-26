import { Helper } from "./HelperFunctions.js";
import { GeomHelper } from "./geomHelpers.js";
import { keyArr } from "./KeyArr.js";
import { canvasElem } from "./DOMElements.js";
import { Point2d } from "./Point2d.js";
import { Geometry } from "./geometry.js"

let prevTime;

let point = new Geometry("black", "red", "2", true, true);

requestAnimationFrame(gameLoop);

canvasElem.addEventListener("click", function(e) {
    let {x, y} = 0;
    ({ x, y } = Helper.getCursorPos(canvasElem, e, x, y));
    const mouseC = new Point2d(x, y);

    if (keyArr.includes('Shift')) {


    } else {
        
        if (keyArr.includes('Control') && point.points.length !== 0) {
            const delPoint = GeomHelper.findClosestPointToMouse(x, y, point);
            point.removePoint(delPoint);
        } else if (!(keyArr.includes('Control'))) {
           point.addPoint(mouseC);
        }
    }
});

canvasElem.addEventListener("mousemove", function (e) {
    let { x, y } = 0;
    ({ x, y } = Helper.getCursorPos(canvasElem, e, x, y));
    let mouseC = new Point2d(x, y);
    if (keyArr.includes('Shift')) {

    } else {

        if (Helper.isMouseDown) {
            
        }
    }

});


function gameLoop(now) {
    let dt = getDelta(now);
    update(dt);
    draw(dt);
    requestAnimationFrame(gameLoop);
}

function update(dt) {

}

function physics(dt) {
    getPhysicsDelta(dt);
}


function draw(dt) {
    const ctx = canvasElem.getContext('2d');

    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    point.draw(ctx);
}


function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}
