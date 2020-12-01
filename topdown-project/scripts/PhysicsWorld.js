import { canvasElem } from "/topdown-project/scripts/app.js";
import { keyArr } from "/topdown-project/scripts/app.js";
import { Player } from "/topdown-project/scripts/Player.js"
import { Platform } from "/topdown-project/scripts/Platform.js"


export class PhysicsWorld {
    constructor() {
        this.player = [];
        this.staticGeometry = [];
        this.g = 9.81;
        this.drag = 0.1;
        this.rho = 1.22;
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



    physics(delta) {
        this.playerSectorCheck();
        this.canvasEdgeCollision();

        this.collisionHandler(delta);

    }

    canvasEdgeCollision() {
        if (this.player[0].y >= canvasElem.height - this.player[0].rad) {
            this.player[0].y = canvasElem.height - this.player[0].rad;
        }
        if (this.player[0].x > canvasElem.width - this.player[0].rad) {
            this.player[0].x = canvasElem.width - this.player[0].rad;
        }
        if (this.player[0].x < this.player[0].rad) {
            this.player[0].x = this.player[0].rad;
        }

        if (this.player[0].y < this.player[0].rad) {
            this.player[0].y = this.player[0].rad;
        }
        //this.children[i].vx *= 1 - delta * this.children[i].drag;

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

    rectRectColliding(rect1, rect2) {
        return (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y)


    }

    collisionHandler(delta) {
        const player = this.player[0];
        const playerSectors = this.playerSectors;
        const groups = this.collisionGroups;
        for (let i = 0; i < playerSectors.length; i++) {
            for (let j = 0; j < groups[playerSectors[i]].length; j++) {
                const rectangle = groups[playerSectors[i]][j];
                if (rectangle !== player) {
                    if (this.RectCircleColliding(player, rectangle)) {
                        rectangle.color = "green";
                        const deepestPoint = this.deepestPoint(player, rectangle);
           

                        console.log(this.deepestPoint(player, rectangle));
                    } else {
                        rectangle.color = "red";
                    }
                }
            }

        }
    }

    playerSectorCheck() {
        const player = this.player;
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
                    for (let i = 0; i < this.collisionSectors[key].length; i++) {
                        this.collisionSectors[key][i].color = "red";

                    }
                    this.collisionGroups[key].splice(this.collisionGroups[key].indexOf(player[0]), 1);
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

    deepestPoint(circle, rect) {
        const slope = (circle.y - rect.y) / (circle.x - rect.y);
        const intercept = circle.y - (slope * circle.x);

        return {
            lineSlope: slope,
            lineIntercept: intercept,
            x: circle.x + circle.rad,
            y: (circle.x * slope) + intercept
        }
    }

    

/*     clamp(x, lower, upper) {
        return Math.max(lower, Math.min(upper, x))
    }



    getNearestPointInPerimeter(rect.x, rect.y, rect.width, rect.height, x, y) {
        const r = l + w;
        
        const b = t + h;

        const x = this.clamp(x, l, r);
        
        clamp(y, t, b)

        local dl, dr, dt, db = abs(x - l), abs(x - r), abs(y - t), abs(y - b)
        local m = min(dl, dr, dt, db)

        if m == dt then return x, t end
        if m == db then return x, b end
        if m == dl then return l, y end
        return r, y

    } */



}

