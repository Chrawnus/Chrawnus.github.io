export class HelperFunctions {
    constructor() {
        this.prevTime;
        this.accumulator = 0;
        this.world = []
    }

    add(obj) {
        this.world.push(obj);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    getDelta(now) {
        if (!this.prevTime) { this.prevTime = now; }
        let dt = (now - this.prevTime) / 1000;
        this.prevTime = now;
        return dt;
    }
    
    getPhysicsDelta(dt) {
        let pdt = 0.01;
        this.accumulator += dt;
        const world = this.world[0];
    
        while (this.accumulator >= pdt) {
    
            world.physics(pdt, dt);
            this.accumulator -= pdt;
    
        }
    }

    keyDownEventsHandler(e) {
        if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === " ") {
            if (!(keyArr.includes(e.key))) {
                keyArr.push(e.key);
                console.log(keyArr)
            }
        }
    }
    
    
    keyUpEventsHandler(e) {
        if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === " " ) {
            if ((keyArr.includes(e.key))) {
                keyArr.splice(keyArr.indexOf(e.key), 1);
            }
        }
    }

}
    

