// Class to handle creation and updating of AttackBoxes. 

export class AttackBox {
    constructor() {
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.direction = undefined;
        this.color = 'red';
        this.isActive = false;
        this.originalLifetime = 10;
        this.lifetime = 10;
        this.originalDelay = 50;
        this.delay = 50;
        this.scale = 2.8;
    }


    // draws the attack box
    draw(ctx) {
        if (!this.isActive) {
            return;
        }
        ctx.strokeStyle = this.color;
        ctx.strokeRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    // Set the dimensions and coordinates of the attackBox 
    // based on the given attack direction, and attacking entity. 
    create(direction, entity) {
        this.direction = direction;
        if (direction === 'Up' || direction === 'Down') {
            this.x = entity.x;
            if (direction === 'Up') {
                this.y = entity.y - entity.height * this.scale;
                this.width = entity.width;
                this.height = entity.height * this.scale;
            } else {
                this.y = entity.y + entity.height;
                this.width = entity.width;
                this.height = entity.height * this.scale;
            }
        }
        if (direction === 'Left' || direction === 'Right') {
            this.y = entity.y;
            if (direction === 'Right') {
                this.x = entity.x + entity.width;
                this.width = entity.width * this.scale;
                this.height = entity.height;
            } else {
                this.x = entity.x - this.scale * entity.width;
                this.width = entity.width * this.scale;
                this.height = entity.height;
            }

        }
        this.isActive = true;
    }

    // If delay is > 0, this function decrements attackBox delay until it hits 0, 
    // after which it updates the AttackBox according to the
    // position of the attacking entity until the lifetime of the
    // AttackBox hits 0. When the AttackBox lifetime hits zero, it's 
    // properties are set back to it's default values. 

    update(dt, entity) {
        if (this.delay > 0) {
            this.delay -= 1000 * dt;
        } else {
            if (this.isActive && this.lifetime > 0) {
                if (this.direction === 'Up' || this.direction === 'Down') {
                    this.x = entity.x;
                    if (this.direction === 'Up') {
                        this.y = entity.y - entity.height * this.scale;

                    } else {
                        this.y = entity.y + entity.height;

                    }
                }

                if (this.direction === 'Left' || this.direction === 'Right') {
                    this.y = entity.y;
                    if (this.direction === 'Right') {
                        this.x = entity.x + entity.width;

                    } else {
                        this.x = entity.x - this.scale * entity.width;

                    }

                }
                this.delay = this.originalDelay;
                this.lifetime -= 1000 * dt;
            } else if (this.isActive && this.lifetime <= 0) {
                this.isActive = false;
                this.lifetime = this.originalLifetime;
                this.delay = this.originalDelay;
                this.x = undefined;
                this.y = undefined;
                this.width = undefined;
                this.height = undefined;
            }
        }
    }
};



