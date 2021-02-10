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
                        "parentNode": undefined,
                        "childNodes": [
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


        for (let i = 0; i < grid.length; i++) {
            if (isPointOnTile(cursorX, grid, i, tileWidth, cursorY, tileHeight)) {
                if (keyArr.includes("Control")) {
                    if (nodes.length === 1 && nodes.includes(grid[i])) { // remove first node
                        this.removeNode(grid, i, nodes, 0);
                    } else if (nodes.includes(grid[i])) {
                        this.removeNode(grid, i, nodes, 0);

                    }
                } else if (!(keyArr.includes("Control"))) {
                    if (this.startNode === undefined && grid[i].startNode === false && nodes.length === 0) { // create first node
                        this.addNode(grid, i, nodes);
                    } else if (this.startNode !== grid[i] && !(nodes.includes(grid[i])) && arePointsOnCoordinateLines(this.startNode, grid, i)) {
                        this.addIfFreeChildNode(grid, i, nodes);
                    } else if (nodes.includes(grid[i])) {

                        grid[i].startNode = true;
                        this.startNode = grid[i];
                        this.removePrevStartNode(grid, i);
                    }
                }
            }
        }
        console.log(nodes);

    }

    addIfFreeChildNode(grid, i, nodes) {
        if (grid[i].y < this.startNode.y && this.startNode.childNodes[0] === undefined) {
            this.addNode(grid, i, nodes);
        } else if (grid[i].x > this.startNode.x && this.startNode.childNodes[1] === undefined) {
            this.addNode(grid, i, nodes);
        } else if (grid[i].y > this.startNode.y && this.startNode.childNodes[2] === undefined) {
            this.addNode(grid, i, nodes);
        } else if (grid[i].x < this.startNode.x && this.startNode.childNodes[3] === undefined) {
            this.addNode(grid, i, nodes);
        }
    }

    removePrevStartNode(grid, i) {
        for (let j = 0; j < grid[i].childNodes.length; j++) {
            const element = grid[i].childNodes[j];
            if (element !== undefined && this.checkForchildNodes(grid, grid.indexOf(element))) {
                element.startNode = false;
            }


        }
    }

    addNode(grid, i, nodes) {
        let tile = grid[i];
        let parent = tile.parentNode;
        parent = this.startNode;
        if (this.startNode === undefined) {
            tile.startNode = true;
            this.startNode = grid[i];
        }

        this.flipNode(grid, i);
        nodes.push(tile);
        tile.parentNode = parent;
        if (tile.parentNode !== undefined) {
            this.appendChildNode(grid, i, this.startNode);
        }

    }

    removeNode(grid, i, nodes, depth) {
        console.log(depth)

        if (this.checkNumberOfCnNodes(grid, i) === 0 && depth === 0) {
            grid[i].traversable = false;
            grid[i].node = false;
            grid[i].startNode = false;
            if (grid[i].parentNode === undefined) {
                console.log("removing startnode")
                this.startNode = undefined;
            } else {
                this.startNode = grid[i].parentNode;
            }

            return nodes.splice(nodes.indexOf(grid[i]), 1);
        }

        if (this.checkNumberOfCnNodes(grid, i) === 0 && depth > 0) {
            let parent = grid[i].parentNode
            this.startNode = parent;
            this.deleteChildNode(grid, i, grid[i].parentNode);
            grid[i].startNode = false;
            if (grid[i].node) {
                nodes.splice(nodes.indexOf(grid[i]), 1);
                grid[i].traversable = false;
                grid[i].node = false;
            }

            return this.removeNode(grid, grid.indexOf(parent), nodes, depth -= 1);
        }

        if (this.checkNumberOfCnNodes(grid, i) > 0) {
            let cNode = grid[i].childNodes;
            if (cNode[0] !== undefined) {
                this.removeNode(grid, grid.indexOf(cNode[0]), nodes, depth += 1);
            }
            if (cNode[1] !== undefined) {
                this.removeNode(grid, grid.indexOf(cNode[1]), nodes, depth += 1);
            }
            if (cNode[2] !== undefined) {
                this.removeNode(grid, grid.indexOf(cNode[2]), nodes, depth += 1);
            }
            if (cNode[3] !== undefined) {
                this.removeNode(grid, grid.indexOf(cNode[3]), nodes, depth += 1);
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
                return startNode.childNodes[north] = tile;
            } else if (tile.x > startNode.x) {
                return startNode.childNodes[east] = tile;
            } else if (tile.y > startNode.y) {
                return startNode.childNodes[south] = tile;
            } else {
                return startNode.childNodes[west] = tile;
            }
        }

    }

    deleteChildNode(grid, i, parent) {
        let tile = grid[i];

        return parent.childNodes[parent.childNodes.indexOf(tile)] = undefined;
    }

    isConnected(node1, grid, i) {
        let lsnLength = node1.length;
        return (
            node1[lsnLength - 1].childNodes[0] === grid[i] ||
            node1[lsnLength - 1].childNodes[1] === grid[i] ||
            node1[lsnLength - 1].childNodes[2] === grid[i] ||
            node1[lsnLength - 1].childNodes[3] === grid[i]
        );
    }

    placeConnectingNodes(grid, i, startNode, cN, nodes) {
        let North = 0;
        let South = 1;
        let East = 2;
        let West = 3;
        if (grid[i].y < startNode.y && cN[North] === undefined) {
            startNode.childNodes[North] = grid[i];
            grid[i].childNodes[South] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        } else if (grid[i].y > startNode.y && cN[South] === undefined) {
            startNode.childNodes[South] = grid[i];
            grid[i].childNodes[North] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        } else if (grid[i].x < startNode.x && cN[West] === undefined) {
            startNode.childNodes[West] = grid[i];
            grid[i].childNodes[East] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        } else if (grid[i].x > startNode.x && cN[East] === undefined) {
            startNode.childNodes[East] = grid[i];
            grid[i].childNodes[West] = startNode;
            this.flipNode(grid, i);
            nodes.push(grid[i]);
        }
    }

    removePath(i, grid, direction, tiles) {
        let north = 0;
        let east = 1;
        let south = 2;
        let west = 3;
        let increment = getIncrement(direction);

        function getIncrement(direction) {
            return (direction === north) ? -Math.sqrt(tiles) : (direction === east) ? Math.sqrt(tiles) : (direction === west) ? -1 : 1;
        }

        function getCondition(direction, j) {
            return (direction === east || direction === south) ? j < grid.indexOf(grid[i].childNodes[direction]) : j > grid.indexOf(grid[i].childNodes[direction]);
        }
        for (let j = i; getCondition(direction, j); j += increment) {
            grid[j].traversable = false;
        }
    }

    checkForchildNodes(grid, i) {
        let north = 0;
        let east = 1;
        let south = 2;
        let west = 3;
        return grid[i].childNodes[north] === undefined && grid[i].childNodes[east] === undefined && grid[i].childNodes[south] === undefined && grid[i].childNodes[west] === undefined;
    }

    checkNumberOfCnNodes(grid, i) {

        let count = 0;
        for (let j = 0; j < grid[i].childNodes.length; j++) {
            if (grid[i].childNodes[j] !== undefined) {
                count++;
            }

        }
        return count;
    }

    setStartNode(grid, i) {
        let StNode = this.startNode;
        let tile = grid[i];

        if (StNode === tile && tile.startNode === false) {
            tile.startNode = true;
        } else if (tile.startNode === true) {
            StNode = undefined;
            tile.startNode = false;
        }
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
        let north = 0;
        let east = 1;
        let south = 2;
        let west = 3;
        if (nodes.length > 1) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].startNode) {
                    for (let j = 0; j < nodes[i].childNodes.length; j++) {
                        if (nodes[i].childNodes[j] !== undefined) {
                            createPath(j, grid, nodes, i, tiles, north, south, east, west);
                        }
                    }
                }
            }
        }
    }
}



function createPath(j, grid, nodes, i, tiles, north, south, east, west) {
    switch (j) {
        case (north):
            for (let k = grid.indexOf(nodes[i]); k > grid.indexOf(nodes[i].childNodes[j]); k -= Math.sqrt(tiles)) {
                grid[k].traversable = true;
            }
            break;

        case (south):
            for (let k = grid.indexOf(nodes[i]); k < grid.indexOf(nodes[i].childNodes[j]); k += Math.sqrt(tiles)) {
                grid[k].traversable = true;
            }
            break;
        case (east):
            for (let k = grid.indexOf(nodes[i]); k < grid.indexOf(nodes[i].childNodes[j]); k++) {
                grid[k].traversable = true;
            }
            break;
        case (west):
            for (let k = grid.indexOf(nodes[i]); k > grid.indexOf(nodes[i].childNodes[j]); k--) {
                grid[k].traversable = true;
            }
            break;
        default:
            break;
    }
}

function arePointsOnCoordinateLines(startNode, grid, i) {
    return startNode.x === grid[i].x || startNode.y === grid[i].y;
}

function isPointOnTile(x, grid, i, tileWidth, y, tileHeight) {
    return (x >= grid[i].x && x < grid[i].x + tileWidth) && (y >= grid[i].y && y < grid[i].y + tileHeight);
}

