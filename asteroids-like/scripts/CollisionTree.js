import { Helper } from "./helperFunctions.js";
import { Point2d } from "./Point2d.js";


export class CollisionTree {
    constructor(maxDepth, maxEntities, pos, height, width, parentNode) {
        this.maxDepth = maxDepth
        this.maxEntities = maxEntities;
        this.pos = pos;
        this.height = height;
        this.width = width;
        this.container = [];
        this.childNodes = [];
        this.parentNode = parentNode || null;
        this.maxNodes = 4;
    }

    initialize(entities) {
        this.populateContainer(entities);
    }

    createChildNodes() {
        if (this.childNodes.length >= this.maxNodes) {
            return;
        }
        const upperLeft = new Point2d(this.pos.x, this.pos.y);
        const upperRight = new Point2d(this.width/2, this.pos.y);
        const lowerLeft = new Point2d(this.pos.x, this.height/2);
        const lowerRight = new Point2d(this.width/2, this.height/2);
        const posArray = [upperLeft, upperRight, lowerLeft, lowerRight];
        const maxDepth = this.maxDepth - 1;
        const height = this.height/2;
        const width = this.width/2;

        if (this.childNodes.length === 0) {
            for (let i = 0; i < 4; i++) {
                this.createChildNode(maxDepth, this.maxEntities, posArray[i], height, width);
            }
        } else {
            for (let i = posArray.length - 1; i >= 0; i--) {
                const position = posArray[i];
                for (let i = 0; i < this.childNodes.length; i++) {
                    const childNode = this.childNodes[i];
                    if (childNode.pos.x === position.x && childNode.pos.y === position.y) {
                        continue
                    }
                    this.createChildNode(maxDepth, this.maxEntities, position, height, width)
                }
            }
        }

        
    }

    createChildNode(maxDepth, maxEntities, pos, height, width) {
        const cNode = new CollisionTree(maxDepth, maxEntities, pos, height, width, this)
        this.childNodes.push(cNode);
        cNode.initialize(this.container)
    }

    deleteNode() {
        // if this is the root node, deleting self is not allowed
        // so terminate function.
        if (this.parentNode === null) {
            return 0;
        }

        // if node has childNodes, they need to be removed first
        if (this.childNodes.length > 0) {
            for (let i = this.childNodes.length - 1; i >= 0; i--) {
                const childNode = this.childNodes[i];
                childNode.deleteNode();
            }
        }
        
        // move entities back up to parent node
        for (let i = this.container.length - 1; i >= 0; i--) {
            this.parentNode.container.push();
            this.container.pop();
        }

        // remove self from parent node
        const pCNodes = this.parentNode.childNodes
        const IdxInParent = pCNodes.indexOf(this);
        this.parentNode.childNodes = Helper.ArrayFunctions.remove(IdxInParent, pCNodes);
    }

    split() {
        if (this.maxDepth === 0) {
            return 0;
        }

        if (this.childNodes.length > 0) {
            for (let i = this.childNodes.length - 1; i >= 0; i--) {
                const childNode = this.childNodes[i];
                childNode.split();
            }
        }

        if (this.container.length > this.maxEntities) {
            this.createChildNodes();

        }
    }

    prune() {
        if (this.childNodes.length) {
            for (let i = this.childNodes.length - 1; i >= 0; i--) {
                const childNode = this.childNodes[i];
                childNode.prune();
            }
        }
        if (this.container.length <= 2) {

            this.deleteNode();
        }
    }

    
    populateContainer(entities) {
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            if (this.parentNode === null) {
                this.container.push(entity);
            } else {
                
                if (Helper.Math.Geometry.RectCircleIntersects(entity, this)) {
                    let entityIsNotInSibling = true;
                    for (let j = this.parentNode.childNodes.length - 1; j >= 0; j--) {
                        if (this.parentNode.childNodes.indexOf(this) === j) {
                            continue
                        }
                        if (Helper.Math.Geometry.RectCircleIntersects(entity, this.parentNode.childNodes[j])) {
                            entityIsNotInSibling = false;
                            break;
                        }
                    }

                    if (entityIsNotInSibling) {
                        const pIdx = this.parentNode.container.indexOf(entity);
                        this.container.push(entity);
                        this.parentNode.container = Helper.ArrayFunctions.remove(pIdx, this.parentNode.container);
                    }
                }
            }
        }
    }

    draw(ctx) {
        if (this.maxDepth === 0) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);

            return 0;
        }
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
        for (let i = this.childNodes.length - 1; i >= 0; i--) {
            this.childNodes[i].draw(ctx);
        }








    }
}