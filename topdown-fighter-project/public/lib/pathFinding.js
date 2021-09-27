import { MinHeap } from "./minHeap.js";

export class Pathfinding {
    constructor() {

    }

    update(start, goal) {
        const openList = new MinHeap();
        const closedList = [];
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();
        const cost = 1;

        gScore.set(start, 0);
        fScore.set(start, gScore.get(start) + this.heuristic(start, goal));
  
        openList.push(start, fScore);

        while (openList.heap.length > 0) {

            //  current = remove lowest rank item from OPEN
            //add current to CLOSED
            let current = openList.heap[0].value;
            closedList.push(openList.pop());

            if (closedList[closedList.length - 1].value === goal) {
                const totalPath = this.reconstructPath(cameFrom, current);
                return totalPath;
            }


            //for neighbors of current:
            for (let i = 0; i < current.nodes.length; i++) {

                const tile = current.nodes[i];
                const isTraversable = tile !== undefined ? tile.traversable : 0;
                if (isTraversable < 0.33 || closedList.filter(e => e.index === tile.index).length > 0) {
                    continue;
                }

                const initialGScore = gScore.get(current) + cost;

                if (gScore.get(tile) === undefined) {

                    gScore.set(tile, tile.gScore);
                    cameFrom.set(tile, current);
                    if (initialGScore < gScore.get(tile)) {
                        cameFrom.set(tile, current);
                        gScore.set(tile, initialGScore);
                        let h = this.heuristic(tile, goal);
                        let fudgeFactor = this.tieBreaker(start, tile, goal);
                        h += fudgeFactor * 0.001
                        fScore.set(tile, gScore.get(tile) + h);

                        if (!openList.exists(tile)) {

                            openList.push(tile, fScore.get(tile));
                        }
                    }
                }
            }
        }

        return;
    }

    tieBreaker(start, current, goal) {
        const dx1 = current.x - goal.x
        const dy1 = current.y - goal.y
        const dx2 = start.x - goal.x
        const dy2 = start.y - goal.y
        const cross = Math.abs(dx1 * dy2 - dx2 * dy1)
        return cross;
    }

    heuristic(nodeToExplore, goalTile) {
        const nodeX = nodeToExplore.x + nodeToExplore.width / 2;
        const nodeY = nodeToExplore.y + nodeToExplore.height / 2;
    
        const goalX = goalTile.x + goalTile.width / 2;
        const goalY = goalTile.y + goalTile.height / 2;
    
        const dx = Math.abs(nodeX - goalX);
        const dy = Math.abs(nodeY - goalY);
    
        const D = 1;
        const D2 = 1.4;
        //return D * (dx + dy);
        return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)
    }

    reconstructPath(cameFrom, current) {
        const totalPath = [current]
        while (cameFrom.get(current) !== undefined) {
            current = cameFrom.get(current);
            totalPath.push(current);
        }
        return totalPath;
    }
}







