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
        this.nodes = [],
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
                this.tileGrid.push({
                    "width": this.tileSize.width,
                    "height": this.tileSize.height,
                    "x": x,
                    "y": y,
                    "index": j + Math.sqrt(this.tiles) * i,
                    "traversable": false,
                    "node": false,
                    "connectingNodes": [
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    ],
                    draw: function (ctx, startNode) {
                        let color = !(this.traversable) ? 'gray' : !(this.node) ? 'white' : !(this === startNode) ? 'black' : 'red';

                        ctx.fillStyle = color;
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                        ctx.strokeRect(this.x, this.y, this.width, this.height);
                    },

                    checkState: function (nodes, startNode) {
                        const isNode = this.node;
                        const isInNodes = nodes.includes(this);
                        const isStartNode = (startNode !== undefined && this === startNode);
                        if (isNode) {
                            if (isInNodes) {
                                return;
                            } else {
                                nodes.push(this);
                            }
                        } else {
                            if (isInNodes) {
                                nodes.splice(nodes.indexOf(this), 1);
                                if (isStartNode && nodes.length > 0) {
                                    startNode = nodes[nodes.length - 1];
                                } else {
                                    startNode = undefined;
                                }
                            }
                        }
                    },
                });
            }
        }
    }

    drawTileGrid(ctx) {
        const grid = this.tileGrid;
        for (let i = 0; i < grid.length; i++) {
            grid[i].draw(ctx, this.startNode);
        }
    }

    updateTiles() {
        const grid = this.tileGrid;
            for (let i = 0; i < grid.length; i++) {
                let tile = grid[i];
                tile.checkState(this.nodes, this.startNode);
            }
    }

    createNode(cursorX, cursorY) {
        const grid = this.tileGrid;
        const tileWidth = this.tileSize.width;
        const tileHeight = this.tileSize.height;
        const nodes = this.nodes;
        for (let i = 0; i < grid.length; i++) {
            if (isPointOnTile(cursorX, grid, i, tileWidth, cursorY, tileHeight)) {
                if (keyArr.includes("Control")) {
                    if (nodes.includes(grid[i])) {
                        this.removeNode(grid, i, this.nodes);
                        let test = [];
                        for (let i = 0; i < grid.length; i++) {
                            const tile = grid[i];
                            for (let j = 0; j < tile.connectingNodes.length; j++) {
                                const connNode = tile.connectingNodes[j];
                                if (connNode !== undefined) {
                                    test.push(tile)
                                }
                            }
                        }
                        console.log(test)
                    }
                } else if (!(keyArr.includes("Control"))) {
                    if (nodes.length === 0) { // create first node
                        this.addNode(grid, i, nodes);
                    } else if (this.startNode !== grid[i] && !(nodes.includes(grid[i])) && arePointsOnCoordinateLines(this.startNode, grid, i)) {
                        this.addIfFreeChildNode(grid, i);
                    } else if (nodes.includes(grid[i])) {
                        if (keyArr.includes("Shift")) {
                            this.connectNodes(grid, i, nodes);
                        }
                        this.startNode = grid[i];
                        console.log(grid[i])
                    }

                }
            }
        }  
    }

    connectNodes(grid, i, nodes) {
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

        this.updatePath(grid, i, nodes, true);
    }

    addIfFreeChildNode(grid, i) {
        const nodes = this.nodes;
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
        grid[i].traversable = true;
        grid[i].node = true;
        if (this.startNode !== undefined) {
            this.appendChildNode(grid, i, this.startNode);
        }
        this.startNode = grid[i];
        this.updatePath(grid, i, nodes, true);
    }

    removeNode(grid, i, nodes) {
        this.updatePath(grid, i, nodes, false);
        let tile = grid[i];
        tile.node = false;
        tile.traversable = false;
        if (this.startNode === tile) {
            console.log("hi")
            this.startNode = nodes[nodes.length - 1];
        }
        this.clearConnectingNodes(tile)
    }

    updatePath(grid, i, nodes, add) {
        const tiles = this.tiles;
        const tile = grid[i];
        if (nodes.length > 0) {
            for (let i = 0; i < tile.connectingNodes.length; i++) {
                const connectedNode = tile.connectingNodes[i];
                const direction = !(i) && connectedNode !== undefined ? "north" : i === 1 ? "east" : i === 2 ? "south" : "west";
                const increment = ({
                    "north": -Math.sqrt(tiles),
                    "east": 1,
                    "south": Math.sqrt(tiles),
                    "west": -1,
                })[direction];
                if (connectedNode !== undefined) {
                    const conditional = ({
                        "north": () => {
                            for (let k = grid.indexOf(tile); k > grid.indexOf(connectedNode); k += increment) {
                                if (add) {
                                    grid[k].traversable = true;
                                } else {
                                    grid[k].traversable = false;
                                }
                            }
                        },
                        "east": () => {
                            for (let k = grid.indexOf(tile); k < grid.indexOf(connectedNode); k += increment) {
                                if (add) {
                                    grid[k].traversable = true;
                                } else {
                                    grid[k].traversable = false;
                                }
                            }
                        },
                        "south": () => {
                            for (let k = grid.indexOf(tile); k < grid.indexOf(connectedNode); k += increment) {
                                if (add) {
                                    grid[k].traversable = true;
                                } else {
                                    grid[k].traversable = false;
                                }
                            }
                        },
                        "west": () => {
                            for (let k = grid.indexOf(tile); k > grid.indexOf(connectedNode); k += increment) {
                                if (add) {
                                    grid[k].traversable = true;
                                } else {
                                    grid[k].traversable = false;
                                }
                            }
                        },
                    })[direction];

                    conditional();
                }
            }
        }
    }

    clearConnectingNodes(tile) {

        for (let i = 0; i < tile.connectingNodes.length; i++) {
            let connectedNode = tile.connectingNodes[i];
            const direction = ({
                0: "north",
                1: "east",
                2: "south",
                3: "west"
            })[i];

            const complementaryDirection = ({
                "north": 2,
                "east": 3,
                "south": 0,
                "west": 1
            })[direction];

            if (connectedNode !== undefined) {
                connectedNode.connectingNodes[complementaryDirection] = undefined;
                tile.connectingNodes[i] = undefined;
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
}

function arePointsOnCoordinateLines(startNode, grid, i) {
    return startNode.x === grid[i].x || startNode.y === grid[i].y;
}

function isPointOnTile(x, grid, i, tileWidth, y, tileHeight) {
    return (x >= grid[i].x && x < grid[i].x + tileWidth) && (y >= grid[i].y && y < grid[i].y + tileHeight);
}

