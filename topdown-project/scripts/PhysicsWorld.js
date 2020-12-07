import { canvasElem } from "/topdown-project/scripts/app.js";
import { keyArr } from "/topdown-project/scripts/app.js";
import { Player } from "/topdown-project/scripts/Player.js"
import { Platform } from "/topdown-project/scripts/Platform.js"


export class PhysicsWorld {
    constructor() {
        this.player = [];
        this.staticGeometry = [];


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
        this.collisionHandler(delta);
        this.canvasEdgeCollision();



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

    collisionHandler(delta) {
        const player = this.player[0];
        const playerSectors = this.playerSectors;
        const groups = this.collisionGroups;
        for (let i = 0; i < playerSectors.length; i++) {
            for (let j = 0; j < groups[playerSectors[i]].length; j++) {
                const rectangle = groups[playerSectors[i]][j];
                if (rectangle !== player) {
                    if (this.RectCircleColliding(player, rectangle)) {

                        this.RectCircleCollidingDirectionY(player, rectangle)

                        this.RectCircleCollidingDirectionX(player, rectangle)

                        rectangle.color = "green";
                    } else {
                        player.collidingY = false;
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






    RectCircleCollidingDirectionX(circle, rect) {
        
        const circleRight = () => circle.x + (circle.rad + 1);
        const circleLeft = () => circle.x - (circle.rad + 1);

        const rectLeft = rect.x;
        const rectRight = rect.x + rect.width;


        //collision with left edge
        if (circleRight() > rectLeft
            && !(circleLeft() > rectLeft)
            && !(circle.collidingY)) {
                circle.x -= 2.5;
        } 
        if (circleLeft() < rectRight
            && !(circleRight() < rectRight)
            && !(circle.collidingY)) {
                circle.x += 2.5;
        }
        //rectRight() + circle.rad + 
    }

    RectCircleCollidingDirectionY(circle, rect) {

        const circleTop = () => circle.y - (circle.rad + 1);
        const circleBottom = () => circle.y + (circle.rad + 1);

        const rectTop = rect.y;
        const rectBottom = rect.y + rect.height;

        //collision with upper edge
        if (circleBottom() > rectTop
            && !(circleTop() > rectTop)) {
                circle.collidingY = true;
                circle.y -= 2.5;
        } else {
            circle.collidingY = false;
        }

        if (circleTop() < rectBottom
            && !(circleBottom() < rectBottom)) {
                circle.collidingY = true;
                circle.y += 2.5;
        } else {
            circle.collidingY = false;
        }

    }

    rectRectColliding(rect1, rect2) {
        return (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y)

    }
}

