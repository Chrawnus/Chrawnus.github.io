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
        this.nodes = [];
        this.paths = [];
        this.helper = new HelperFunctions();
    }

    addWorld(obj) {
        this.world.push(obj);
    }

    createTileGrid() {
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
                        "connectingNodes": [
                            undefined,
                            undefined,
                            undefined,
                            undefined
                        ]
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
            if (grid[i].node === true) {
                this.drawTile(ctx, grid, i, `black`);
            }
            if (this.startNode === grid[i]) {
                this.drawTile(ctx, grid, i, `red`);
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
        for (let i = 0; i < grid.length; i++) {
            if (isPointOnTile(cursorX, grid, i, tileWidth, cursorY, tileHeight)) {
                if (keyArr.includes("Control")) {
                    if (nodes.length === 1 && nodes.includes(grid[i])) { // remove first node
                        this.removeNode(grid, i, nodes, 0);
                    } else if (nodes.includes(grid[i])) {
                        this.removeNode(grid, i, nodes, 0);
                    }
                } else if (!(keyArr.includes("Control"))) {
                    if (nodes.length === 0) { // create first node
                        this.addNode(grid, i, nodes);
                    } else if (this.startNode !== grid[i] && !(nodes.includes(grid[i])) && arePointsOnCoordinateLines(this.startNode, grid, i)) {
                        this.addIfFreeChildNode(grid, i, nodes);
                    } else if (nodes.includes(grid[i])) {
                        if (keyArr.includes("Shift")) {
                            this.connectNodes(grid, i);
                        } else {
                            this.startNode = grid[i];
                        }
                    }
                }
                this.updatePath();
            }
        }
        console.log(nodes);
    }

    connectNodes(grid, i) {
        if (this.startNode.y > grid[i].y && grid[i].connectingNodes[2] === undefined && this.startNode.connectingNodes[0] === undefined) {
            this.startNode.connectingNodes[0] = grid[i];
            grid[i].connectingNodes[2] = this.startNode;
        }
        if (this.startNode.x < grid[i].x && grid[i].connectingNodes[3] === undefined && this.startNode.connectingNodes[1] === undefined) {
            this.startNode.connectingNodes[1] = grid[i];
            grid[i].connectingNodes[3] = this.startNode;
        }
        if (this.startNode.y < grid[i].y && grid[i].connectingNodes[0] === undefined && this.startNode.connectingNodes[2] === undefined) {
            this.startNode.connectingNodes[2] = grid[i];
            grid[i].connectingNodes[0] = this.startNode;
        }
        if (this.startNode.x > grid[i].x && grid[i].connectingNodes[1] === undefined && this.startNode.connectingNodes[3] === undefined) {
            this.startNode.connectingNodes[3] = grid[i];
            grid[i].connectingNodes[1] = this.startNode;
        }
    }

    addIfFreeChildNode(grid, i, nodes) {
        if (grid[i].y < this.startNode.y && this.startNode.connectingNodes[0] === undefined) {
            this.addNode(grid, i, nodes);
        } else if (grid[i].x > this.startNode.x && this.startNode.connectingNodes[1] === undefined) {
            this.addNode(grid, i, nodes);
        } else if (grid[i].y > this.startNode.y && this.startNode.connectingNodes[2] === undefined) {
            this.addNode(grid, i, nodes);
        } else if (grid[i].x < this.startNode.x && this.startNode.connectingNodes[3] === undefined) {
            this.addNode(grid, i, nodes);
        }
    }

    addNode(grid, i, nodes) {
        let tile = grid[i];
        if (this.startNode === undefined) {
            this.startNode = grid[i];
        }
        this.flipNode(grid, i);
        nodes.push(tile);
        this.appendChildNode(grid, i, this.startNode);
    }

    removeNode(grid, i, nodes) {
        let tile = grid[i];
        let paths = this.paths;
        tile.node = false;
        tile.traversable = false;
        this.clearConnectingNodes(tile, nodes)
        nodes.splice(nodes.indexOf(tile), 1);
        if (this.startNode === tile) {
            this.startNode = nodes[nodes.length - 1];
        }
        for (let k = 0; k < paths.length; k++) {
            const path = paths[k];
            if (path.includes(tile)) {
                for (let l = 0; l < path.length; l++) {
                    path[l].traversable = false;
                }
            }
        }
    }

    clearConnectingNodes(tile, nodes) {
        for (let i = 0; i < tile.connectingNodes.length; i++) {
            let connectedNode = tile.connectingNodes[i];
            if (connectedNode !== undefined) {
                tile.connectingNodes[i] = undefined;
                for (let j = 0; j < connectedNode.connectingNodes.length; j++) {
                    if (connectedNode.connectingNodes[j] === tile) {
                        connectedNode.connectingNodes[j] = undefined;
                        if (this.checkForConnectingNodes(connectedNode)) {
                            console.log("removing: ", connectedNode)
                            connectedNode.node = false;
                            connectedNode.traversable = false;
                            nodes.splice(nodes.indexOf(connectedNode), 1);
                        }
                    }
                }
            }
        }
    }

    appendChildNode(grid, i, startNode) {
        let tile = grid[i];
        let north = 0;
        let east = 1;
        let south = 2;
        let west = 3;
        if (tile !== startNode) {
            if (tile.y < startNode.y) {
                startNode.connectingNodes[north] = tile;
                tile.connectingNodes[south] = startNode;
            } else if (tile.x > startNode.x) {
                startNode.connectingNodes[east] = tile;
                tile.connectingNodes[west] = startNode;
            } else if (tile.y > startNode.y) {
                startNode.connectingNodes[south] = tile;
                tile.connectingNodes[north] = startNode;
            } else if (tile.x < startNode.x) {
                startNode.connectingNodes[west] = tile;
                tile.connectingNodes[east] = startNode;
            }
        }
    }

    isConnected(node1, grid, i) {
        let lsnLength = node1.length;
        return (
            node1[lsnLength - 1].connectingNodes[0] === grid[i] ||
            node1[lsnLength - 1].connectingNodes[1] === grid[i] ||
            node1[lsnLength - 1].connectingNodes[2] === grid[i] ||
            node1[lsnLength - 1].connectingNodes[3] === grid[i]
        );
    }


    checkForConnectingNodes(tile) {
        console.log(this.startNode)
        let north = 0;
        let east = 1;
        let south = 2;
        let west = 3;
        return (tile.connectingNodes[north] === undefined && tile.connectingNodes[east] === undefined && tile.connectingNodes[south] === undefined && tile.connectingNodes[west] === undefined && this.startNode !== tile);
    }

    checkNumberOfCnNodes(grid, i) {
        let count = 0;
        for (let j = 0; j < grid[i].connectingNodes.length; j++) {
            if (grid[i].connectingNodes[j] !== undefined) {
                count++;
            }
        }
        return count;
    }

    flipNode(grid, i) {
        let tile = grid[i];
        tile.node = !(tile.node);
        tile.traversable = !(tile.traversable);
    }

    updatePath() {
        let tiles = this.tiles;
        let grid = this.tileGrid;
        let nodes = this.nodes;
        let paths = this.paths;
        let north = 0;
        let east = 1;
        let south = 2;
        let west = 3;
        if (nodes.length > 1) {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = 0; j < nodes[i].connectingNodes.length; j++) {
                    if (nodes[i].connectingNodes[j] !== undefined) {
                        createPath(j, grid, nodes, i, tiles, north, south, east, west, paths);
                    }
                }
            }
        }
    }
}

function createPath(j, grid, nodes, i, tiles, north, south, east, west, paths) {
    let path = [];
    switch (j) {
        case (north):
            for (let k = grid.indexOf(nodes[i]); k >= grid.indexOf(nodes[i].connectingNodes[j]); k -= Math.sqrt(tiles)) {
                grid[k].traversable = true;
                path.push(grid[k]);
            }
            break;
        case (south):
            for (let k = grid.indexOf(nodes[i]); k <= grid.indexOf(nodes[i].connectingNodes[j]); k += Math.sqrt(tiles)) {
                grid[k].traversable = true;
                path.push(grid[k]);
            }
            break;
        case (east):
            for (let k = grid.indexOf(nodes[i]); k <= grid.indexOf(nodes[i].connectingNodes[j]); k++) {
                grid[k].traversable = true;
                path.push(grid[k]);
            }
            break;
        case (west):
            for (let k = grid.indexOf(nodes[i]); k >= grid.indexOf(nodes[i].connectingNodes[j]); k--) {
                grid[k].traversable = true;
                path.push(grid[k]);
            }
            break;
        default:
            break;
    }
    paths.push(path);
}

function arePointsOnCoordinateLines(startNode, grid, i) {
    return startNode.x === grid[i].x || startNode.y === grid[i].y;
}

function isPointOnTile(x, grid, i, tileWidth, y, tileHeight) {
    return (x >= grid[i].x && x < grid[i].x + tileWidth) && (y >= grid[i].y && y < grid[i].y + tileHeight);
}

