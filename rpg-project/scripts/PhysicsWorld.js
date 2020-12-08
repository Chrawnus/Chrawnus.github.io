import { canvasElem } from "/rpg-project/scripts/app.js";
import { keyArr } from "/rpg-project/scripts/app.js";
import { Player } from "/rpg-project/scripts/Player.js"
import { Platform } from "/rpg-project/scripts/Platform.js"


export class PhysicsWorld {
    constructor() {
        this.player = [];

        this.staticGeometry = [];

        this.tileGrid = [];
        this.tileSize = {
            width: canvasElem.width / 32,
            height: canvasElem.height / 32
        }

        this.grid = [
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": 0 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": 0 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": 0 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": 0 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) * 2 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) * 2 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) * 2 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) * 2 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) * 3 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) * 3 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) * 3 },
            { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) * 3 },
        ]

        this.collisionSectors = {
            "sector1": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": 0 },
            "sector2": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": 0 },
            "sector3": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": 0 },
            "sector4": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": 0 },
            "sector5": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) },
            "sector6": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) },
            "sector7": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) },
            "sector8": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) },
            "sector9": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) * 2 },
            "sector10": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) * 2 },
            "sector11": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) * 2 },
            "sector12": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) * 2 },
            "sector13": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) * 3 },
            "sector14": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) * 3 },
            "sector15": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) * 3 },
            "sector16": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) * 3 },
        }

        this.collisionGroups = {
            "sector1": [],
            "sector2": [],
            "sector3": [],
            "sector4": [],
            "sector5": [],
            "sector6": [],
            "sector7": [],
            "sector8": [],
            "sector9": [],
            "sector10": [],
            "sector11": [],
            "sector12": [],
            "sector13": [],
            "sector14": [],
            "sector15": [],
            "sector16": [],
        }

        this.playerSectors = [];
    }

    createTileGrid() {
        let x = 0;
        let y = 0;
        for (let i = 0; i < 1024; i++) {
            if (!(i % 32) && !(i === 0)) {
                y += this.tileSize.height;
                x = 0;
            } else {
                x += this.tileSize.width;
            }

            this.tileGrid.push({ "width": this.tileSize.width, "height": this.tileSize.height, "x": x, "y": y, "traversable": this.getRandomInt(0, 2) })

            if (this.tileGrid[i].traversable > 0) {
                this.staticGeometry.push(this.tileGrid[i]);
            }
            this.staticGeometryCheck();
        }

        console.log(this.tileGrid);
    }

    drawTileGrid(ctx) {
        const grid = this.tileGrid;
        for (let i = 0; i < grid.length; i++) {

            if (grid[i].traversable < 1) {
                ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
            } else {
                ctx.fillStyle = "red";
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
            }
        }

    }

    drawCollisionSectors(ctx) {
        const grid = this.grid;
        for (let i = 0; i < grid.length; i++) {
                ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
        }

    }


    add(obj) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i] instanceof Player) {
                this.player.push(obj[i]);
            } else if (obj[i] instanceof Platform) {
                this.staticGeometry.push(obj[i]);
                this.staticGeometryCheck();

            }
        }
    }

    physics(delta, dt) {
        this.playerSectorCheck();
        this.collisionHandler(delta, dt);
        this.canvasEdgeCollision();
    }

    canvasEdgeCollision() {
        if (this.player[0].pos.y >= canvasElem.height - this.player[0].rad) {
            this.player[0].pos.y = canvasElem.height - this.player[0].rad;
        }
        if (this.player[0].pos.x > canvasElem.width - this.player[0].rad) {
            this.player[0].pos.x = canvasElem.width - this.player[0].rad;
        }
        if (this.player[0].pos.x < this.player[0].rad) {
            this.player[0].pos.x = this.player[0].rad;
        }

        if (this.player[0].pos.y < this.player[0].rad) {
            this.player[0].pos.y = this.player[0].rad;
        }
        //this.children[i].vx *= 1 - delta * this.children[i].drag;

    }

    RectCircleColliding(circle, rect) {
        const distX = Math.abs(circle.pos.x - rect.x - rect.width / 2);
        const distY = Math.abs(circle.pos.y - rect.y - rect.height / 2);

        if (distX > (rect.width / 2 + circle.rad)) { return false; }
        if (distY > (rect.height / 2 + circle.rad)) { return false; }

        if (distX <= (rect.width / 2)) { return true; }
        if (distY <= (rect.height / 2)) { return true; }

        const dx = distX - rect.width / 2;
        const dy = distY - rect.height / 2;
        return (dx * dx + dy * dy <= (circle.rad * circle.rad));
    }

    collisionHandler(delta, dt) {
        const player = this.player[0];
        const tiles = this.tileGrid;
        const playerSectors = this.playerSectors;
        const groups = this.collisionGroups;
        for (let i = 0; i < playerSectors.length; i++) {
            for (let j = 0; j < groups[playerSectors[i]].length; j++) {
                const rectangle = groups[playerSectors[i]][j];
                if (rectangle !== player.target && rectangle !== player) {

                    //initial collision testing
                    if (this.RectCircleColliding(player, rectangle)) {

                        this.collision(rectangle, player);

                        /*                         if (this.RectCircleCollidingY(player, rectangle)) {
                                                    player.pos.y = player.prevPos.y;
                                                }
                                                if (this.RectCircleCollidingX(player, rectangle)) {
                                                    player.pos.x = player.prevPos.x;
                                                } */


                        rectangle.color = "green";
                    } else {


                        rectangle.color = "red";
                    }
                }
            }

        }
        

    }

    playerSectorCheck() {
        const player = this.player;
        const target = this.player[0].target;
        const sectors = Object.keys(this.collisionSectors);
        const groups = Object.keys(this.collisionGroups);
        let playerSectors = this.playerSectors;
        sectors.forEach((key) => {
            for (let i = 0; i < player.length; i++) {
                if (!(this.collisionGroups[key].includes(player[0]))) {

                    if (this.RectCircleColliding(player[0], this.collisionSectors[key])) {
                        this.collisionGroups[key].push(player[0]);
                        console.log(`player added to ${key}`);
                        this.playerSectors.push(key);


                    }
                } else if (!(this.RectCircleColliding(player[0], this.collisionSectors[key]))) {
                    this.collisionGroups[key].splice(this.collisionGroups[key].indexOf(player[0]), 1);
                    console.log(`player removed from ${key}`);
                    playerSectors.splice(playerSectors.indexOf(key), 1);

                }

                

            }

            for (let i = 0; i < player.length; i++) {
                if (!(this.collisionGroups[key].includes(target))) {

                    if (this.RectCircleColliding(this.player[0].target, this.collisionSectors[key])) {
                        this.collisionGroups[key].push(target);
                        console.log(`player added to ${key}`);
                        this.playerSectors.push(key);


                    }
                } else if (!(this.RectCircleColliding(this.player[0].target, this.collisionSectors[key]))) {
                    this.collisionGroups[key].splice(this.collisionGroups[key].indexOf(target), 1);
                    console.log(`player removed from ${key}`);
                    playerSectors.splice(playerSectors.indexOf(key), 1);

                }

                

            }
        });

    }

    staticGeometryCheck() {
        let staticGeometry = this.staticGeometry;

        let sectors = Object.keys(this.collisionSectors);
        let groups = Object.keys(this.collisionGroups);

        sectors.forEach((key) => {
            for (let i = 0; i < staticGeometry.length; i++) {
                if (!(this.collisionGroups[key].includes(staticGeometry[i]))) {

                    if (this.rectRectColliding(staticGeometry[i], this.collisionSectors[key])) {
                        this.collisionGroups[key].push(staticGeometry[i]);
                        console.log(`platform added to ${key}`);
                    }
                } else if (!(this.rectRectColliding(staticGeometry[i], this.collisionSectors[key]))) {
                    this.collisionGroups[key].splice(this.collisionGroups[key].indexOf(staticGeometry[i]), 1);
                    console.log(`platform removed from ${key}`);
                }

            }
        });
        return groups;
    }

    normalize(x, y, length) {
        return {
            x: x / length,
            y: y / length
        };
    }



    RectCircleCollidingX(circle, rect) {

        const circleRight = () => circle.pos.x + (circle.rad + 1);
        const circleLeft = () => circle.pos.x - (circle.rad + 1);

        const rectLeft = rect.x;
        const rectRight = rect.x + rect.width;


        //collision with left edge or right edge
        return ((circleRight() > rectLeft
            && !(circleLeft() > rectLeft))) || ((circleLeft() < rectRight
                && !(circleRight() < rectRight)));
    }

    RectCircleCollidingY(circle, rect) {

        const circleTop = () => circle.pos.y - (circle.rad + 1);
        const circleBottom = () => circle.pos.y + (circle.rad + 1);

        const rectTop = rect.y;
        const rectBottom = rect.y + rect.height;

        //collision with upper edge or bottom edge
        return ((circleBottom() > rectTop
            && !(circleTop() > rectTop))) || ((circleTop() < rectBottom
                && !(circleBottom() < rectBottom)));
    }

    rectRectColliding(rect1, rect2) {
        return (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y)

    }

    collision(rect, circle) {
        var NearestX = Math.max(rect.x, Math.min(circle.pos.x, rect.x + rect.width));
        var NearestY = Math.max(rect.y, Math.min(circle.pos.y, rect.y + rect.height));
        var dist = { x: circle.pos.x - NearestX, y: circle.pos.y - NearestY };

        /*
        if (circle.vel.dot(dist) < 0) { //if circle is moving toward the rect
          //update circle.vel using one of the above methods
        }
        */

        const mag = Math.sqrt(dist.x * dist.x + dist.y * dist.y);
        var penetrationDepth = circle.rad - mag;
        dist.x /= mag;
        dist.y /= mag;
        var penetrationVector = {
            x: dist.x * penetrationDepth,
            y: dist.y * penetrationDepth
        }
        circle.pos.x += penetrationVector.x;
        circle.pos.y += penetrationVector.y;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

