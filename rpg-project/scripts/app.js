import { PhysicsWorld } from "/rpg-project/scripts/PhysicsWorld.js";
import { Player } from "/rpg-project/scripts/Player.js";
import { Platform } from "/rpg-project/scripts/Platform.js";
import { NoiseGenerator } from "/rpg-project/scripts/NoiseGenerator.js";
import { TileGrid} from "/rpg-project/scripts/TileGrid.js";
import { HelperFunctions } from "/rpg-project/scripts/helperFunctions.js";

export const canvasElem = document.getElementById('canvas');
export const canvasElemRect = canvasElem.getBoundingClientRect();




export const mousecoords = {
    x: 0,
    y: 0
};

const helper = new HelperFunctions();





let player = [];

let staticObjects = [];


    player.push(new Player(helper.getRandomInt(15, canvasElem.width - 15), helper.getRandomInt(15, canvasElem.height - 15), (canvasElem.height/64)));


 /* for (let i = 0; i < 25; i++) {
    staticObjects.push(new Platform(helper.getRandomInt(15, canvasElem.width - 15), helper.getRandomInt(15, canvasElem.height - 15), helper.getRandomInt(20, 60), helper.getRandomInt(20, 60)));
} */ 
 
const world = new PhysicsWorld();

const tileGrid = new TileGrid(1024);

tileGrid.addWorld(world);
tileGrid.createTileGrid();

helper.add(world);


world.add(player);
//world.add(staticObjects);


world.addTileGrid(tileGrid.tileGrid);

requestAnimationFrame(gameLoop);

export let keyArr = [];

window.addEventListener("keydown", helper.keyDownEventsHandler);
window.addEventListener("keyup", helper.keyUpEventsHandler);

function gameLoop(now) {
    let dt = helper.getDelta(now);

    update(dt);
    physics(dt);
    draw(dt);

    requestAnimationFrame(gameLoop);
}


function update(dt) {
    for (let i = 0; i < player.length; i++) {
        
        player[i].update(dt);
    }
}

function physics(dt) {
    helper.getPhysicsDelta(dt);
}

function draw() {
    /** @type CanvasRenderingContext2D */
    const ctx = canvasElem.getContext('2d');

    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "black";
    
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    
    ctx.save();
/*     let clippingPath = new Path2D();
    clippingPath = player[0].getClippingPath(ctx);
    void ctx.clip(clippingPath); */
    ctx.fillStyle = "gray";
    
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    
    
    
    tileGrid.drawTileGrid(ctx);

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    world.drawCollisionSectors(ctx);
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = "black";
    for (let i = 0; i < staticObjects.length; i++) {
        staticObjects[i].draw(ctx);
    }

    

    for (let i = 0; i < player.length; i++) {
        player[0].draw(ctx);
    }
    ctx.restore();

}





