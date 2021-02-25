import { Point2d } from "./Point2d.js";
import { Geometry } from "./Geometry.js";
import { RegularPolygon} from "./RegularPolygon.js"
import { Circle } from "./Circle.js";
import { canvasElem } from "./DOMElements.js";
import { Helper } from "./HelperFunctions.js";

let start = new Point2d(canvasElem.width / 2, canvasElem.height / 2);
let points = [start];

export let geom = new Geometry(start.x, start.y, points);
export let polygon = new RegularPolygon(canvasElem.width/2, canvasElem.height/2, 3, 500, 0);
export let circle = new Circle(250, 300, 100, "red", "black", 2);

geom.createRandomPolygon(Helper.getRandomInt(3, 12));



