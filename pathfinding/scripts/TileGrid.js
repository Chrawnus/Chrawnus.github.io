import { canvasElem } from "./app.js";
import { keyArr } from "./app.js"

import { HelperFunctions } from "./helperFunctions.js";



export class TileGrid {
    constructor(tiles) {
        this.world = [];
        this.tiles = tiles;
        this.tileGrid = [];
        this.tileSize = {
            width: canvasElem.width / (Math.sqrt(this.tiles)),
            height: canvasElem.height / (Math.sqrt(this.tiles))
        }

        this.startNode;
        this.lastStartNode = [];
        this.nodes = [];
        this.helper = new HelperFunctions();
    }

    addWorld(obj) {
        this.world.push(obj);
    }

    createTileGrid() {
        const world = this.world[0]
        let x = 0;
        let y = 0;
        for (let i = 0; i < Math.sqrt(this.tiles); i++) {
            for (let j = 0; j < Math.sqrt(this.tiles); j++) {
                y = i * this.tileSize.width;
                x = j * this.tileSize.width;
                this.tileGrid.push(
                    {
                        "width": this.tileSize.width,
                        "height": this.tileSize.height,
                        "x": x,
                        "y": y,
                        "traversable": false,
                        "node": false,
                        "startNode": false,
                        "connectedNode": [
                            undefined,
                            undefined,
                            undefined,
                            undefined
                        ],
                    });
            }
        }



    }

    drawTileGrid(ctx) {
        const grid = this.tileGrid;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i].traversable === false && grid[i].node === false) {
                this.drawTile(ctx, grid, i, `gray`);
            } else if (grid[i].traversable === true && grid[i].node === false) {
                this.drawTile(ctx, grid, i, `white`);
            }
            if (grid[i].node === true && !(grid[i].startNode)) {
                this.drawTile(ctx, grid, i, `black`);
            }
            if (grid[i].startNode && this.startNode === grid[i]) {
                this.drawTile(ctx, grid, i, `red`);
            } else if (grid[i].startNode && this.startNode !== grid[i]) {
                this.drawTile(ctx, grid, i, `pink`);
            }
        }
    }

    drawTile(ctx, grid, i, color) {
        ctx.fillStyle = color;
        ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
        ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
    }

    createNode(cursorX, cursorY) {

        const grid = this.tileGrid;
        const tileWidth = this.tileSize.width;
        const tileHeight = this.tileSize.height;
        const nodes = this.nodes;
        const lsnLength = this.lastStartNode.length;
        for (let i = 0; i < grid.length; i++) {
            if (isPointOnTile(cursorX, grid, i, tileWidth, cursorY, tileHeight)) {
                if (keyArr.includes("Control")) {
                    if (!(nodes.length)) { // create first node
                        this.startNode = grid[i];
                        this.setStartNode(grid, i);
                        this.flipNode(grid, i);
                        nodes.push(grid[i]);
                    } else if (nodes.length < 2 && nodes.includes(grid[i])) { // remove first node
                        this.setStartNode(grid, i);
                        this.flipNode(grid, i);
                        nodes.splice(nodes.indexOf(grid[i]), 1);
                    } else if (nodes.includes(grid[i])) {
                        if (grid[i].startNode === false) { // convert normal node to start node
                            this.lastStartNode.push(this.startNode);
                            this.startNode = grid[i];
                            grid[i].startNode = true;
                        } else if (grid[i].startNode === true && this.startNode !== grid[i] && this.checkNumberOfCnNodes(grid, i) < 2) { // switch between start nodes
                            if (nodes.length < 3) {
                                let intermediate = this.startNode;
                                this.startNode = this.lastStartNode[0];
                                this.lastStartNode[0] = intermediate;
                            }
                            this.startNode = grid[i];
                        } else if (this.startNode === grid[i]) {
                            if (nodes.length < 3) {
                                let intermediate = this.startNode;
                                if (this.lastStartNode.includes(grid[i])) {
                                    this.startNode = this.lastStartNode[0];
                                    this.lastStartNode[0] = intermediate;
                                } else if (lsnLength > 0) {
                                    this.startNode = this.lastStartNode[0];
                                }
                            }
                            if (this.lastStartNode.length > 0) {
                                if (this.checkNumberOfCnNodes(grid, i) < 2) {
                                    grid[i].startNode = false;
                                    this.startNode = this.lastStartNode[lsnLength - 1]
                                    if (lsnLength > 0) {
                                        if (lsnLength < 2) {
                                            this.startNode = this.lastStartNode[0]
                                        }
                                        this.lastStartNode.splice(lsnLength - 1, 1);
                                    }
                                }
                            }
                        }
                    }
                } else if (this.startNode && this.startNode !== grid[i] && grid[i].startNode === false && !(keyArr.includes("Control"))) {
                    let cN = this.startNode.connectedNode;
                    if (arePointsOnCoordinateLines(this.startNode, grid, i)) {
                        if (grid[i].node === false) {
                            this.placeConnectingNodes(grid, i, this.startNode, cN, nodes);
                        } else {
                            this.removeConnectingNodes(grid, i, this.startNode, cN, nodes);
                        }

                    }
                }
            }
        }
        console.log(this.lastStartNode);
        console.log(nodes);

    }

    isConnected(node1, grid, i) {
        let lsnLength = node1.length;
        return (
            node1[lsnLength - 1].connectedNode[0] === grid[i] ||
            node1[lsnLength - 1].connectedNode[1] === grid[i] ||
            node1[lsnLength - 1].connectedNode[2] === grid[i] ||
            node1[lsnLength - 1].connectedNode[3] === grid[i]
        );
    }

    placeConnectingNodes(grid, i, startNode, cN, nodes) {
        let North = 0;
        let South = 1;
        let East = 2;
        let West = 3;
        if (grid[i].y < startNode.y && cN[North] === undefined) {
            startNode.connectedNode[North] = grid[i];
            grid[i].connectedNode[South] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        } else if (grid[i].y > startNode.y && cN[South] === undefined) {
            startNode.connectedNode[South] = grid[i];
            grid[i].connectedNode[North] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        } else if (grid[i].x < startNode.x && cN[West] === undefined) {
            startNode.connectedNode[West] = grid[i];
            grid[i].connectedNode[East] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        } else if (grid[i].x > startNode.x && cN[East] === undefined) {
            startNode.connectedNode[East] = grid[i];
            grid[i].connectedNode[West] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        }
    }

    removeConnectingNodes(grid, i, startNode, cN, nodes) {
        let North = 0;
        let South = 1;
        let East = 2;
        let West = 3;

        if (grid[i].y < startNode.y && cN[North] === grid[i]) {
            startNode.connectedNode[North] = undefined;
            grid[i].connectedNode[South] = undefined;
            this.flipNode(grid, i);
            nodes.splice(nodes.indexOf(grid[i]), 1);
        } else if (grid[i].y > startNode.y && cN[South] === grid[i]) {
            startNode.connectedNode[South] = undefined;
            grid[i].connectedNode[North] = undefined;
            this.flipNode(grid, i);
            nodes.splice(nodes.indexOf(grid[i]), 1);
        } else if (grid[i].x < startNode.x && cN[West] === grid[i]) {
            startNode.connectedNode[West] = undefined;
            grid[i].connectedNode[East] = undefined;
            this.flipNode(grid, i);
            nodes.splice(nodes.indexOf(grid[i]), 1);
        } else if (grid[i].x > startNode.x && cN[East] === grid[i]) {
            startNode.connectedNode[East] = undefined;
            grid[i].connectedNode[West] = undefined;
            this.flipNode(grid, i);
            nodes.splice(nodes.indexOf(grid[i]), 1);
        }
    }

    checkForConnectedNodes(grid, i) {
        let North = 0;
        let South = 1;
        let East = 2;
        let West = 3;
        return grid[i].connectedNode[North] === undefined && grid[i].connectedNode[South] === undefined && grid[i].connectedNode[East] === undefined && grid[i].connectedNode[West] === undefined;
    }

    checkNumberOfCnNodes(grid, i) {
        let count = 0;
        for (let j = 0; j < grid[i].connectedNode.length; j++) {
            if (grid[i].connectedNode[i]) {
                count++;
            }

        }
        return count;
    }

    setStartNode(grid, i) {
        if (this.startNode === grid[i] && grid[i].startNode === false) {
            grid[i].startNode = true;
        } else if (grid[i].startNode === true) {
            this.startNode = undefined;
            grid[i].startNode = false;
        }
    }

    flipNode(grid, i) {


        grid[i].node = !(grid[i].node);
        grid[i].traversable = !(grid[i].traversable);
    }

    updatePath() {
        let grid = this.tileGrid;

    }
}



function arePointsOnCoordinateLines(startNode, grid, i) {
    return startNode.x === grid[i].x || startNode.y === grid[i].y;
}

function isPointOnTile(x, grid, i, tileWidth, y, tileHeight) {
    return (x >= grid[i].x && x < grid[i].x + tileWidth) && (y >= grid[i].y && y < grid[i].y + tileHeight);
}

