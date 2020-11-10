import { canvasElem } from "/physics-sandbox/scripts/app.js";
import { PhysicsWorld } from "/physics-sandbox/scripts/PhysicsWorld.js";

class QuadTree {
    constructor(children) {
        this.boundary = { x1: 0, y1: 0, x2: canvasElem.width, y2: canvasElem.height };
        this.maxDepth = 8;
        this.maxElements = 8;
        this.root = {"width": canvasElem.width, "height": canvasElem.height, "x": 0, "y": 0 }
        this.elements = children;
        this.sectors = {}
    }

    manageTree() {
        
        this.add();
        this.divide();
        
        this.prune();
        this.merge();
        
    }

    divide() {
        let elements = this.elements;
        let root = this.root;

        let sectors = Object.keys(this.sectors);
        let groups = Object.keys(this.elements);

        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            
        }
        
    }


}