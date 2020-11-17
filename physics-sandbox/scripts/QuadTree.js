import { canvasElem } from "/physics-sandbox/scripts/app.js";


export class QuadTree {
    constructor(children) {
        this.boundary = { x1: 0, y1: 0, x2: canvasElem.width, y2: canvasElem.height };
        this.maxDepth = 8;
        this.maxElements = 8;
        this.root = {"width": canvasElem.width, "height": canvasElem.height, "x": 0, "y": 0 }
        this.children = children;
        this.collisionSectors = {"width": canvasElem.width, "height": canvasElem.height, "x": 0, "y": 0 }
        this.collisionGroups = {
            "group0" : this.children
        }
        
    }

    manageTree() {
        
        
        this.divide();
        //this.add();
        
        //this.prune();
        //this.merge();
        
    }

    divide() {
        let children = this.children;
        let root = this.root;

        let sectors = Object.keys(this.collisionSectors);
        let groups = Object.keys(this.collisionGroups);

        console.log(this.children)
        groups.forEach(key => {
            
        });
    }

    collisionGroupChecker() {
        let children = this.children;
        let sectors = Object.keys(this.collisionSectors);
        let groups = Object.keys(this.collisionGroups);

        sectors.forEach((key) => {
            for (let i = 0; i < children.length; i++) {
                if (!(this.collisionGroups[key].includes(children[i]))) {
                    if (this.RectCircleColliding(children[i], this.collisionSectors[key])) {
                        this.collisionGroups[key].push(children[i]);
                    }
                } else if (!(this.RectCircleColliding(children[i], this.collisionSectors[key]))) {
                    this.collisionGroups[key].splice(this.collisionGroups[key].indexOf(children[i]), 1);
                }

            }
        });
        return groups;
    }

    RectCircleColliding(circle, rect) {
        const distX = Math.abs(circle.x - rect.x - rect.width / 2);
        const distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > (rect.width / 2 + circle.rad)) { return false; }
        if (distY > (rect.height / 2 + circle.rad)) { return false; }

        if (distX <= (rect.width / 2)) { return true; }
        if (distY <= (rect.height / 2)) { return true; }

        const dx = distX - rect.width / 2;
        const dy = distY - rect.height / 2;
        return (dx * dx + dy * dy <= (circle.rad * circle.rad));
    }


}