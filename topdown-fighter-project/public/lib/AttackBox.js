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
    }

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

    create(direction, entity) {
        this.direction = direction;
        if (direction === 'Up' || direction === 'Down') {
            this.x = entity.x;
            if (direction === 'Up') {
                this.y = entity.y - entity.height * 2.8;
                this.width = entity.width;
                this.height = entity.height * 2.8;
            } else {
                this.y = entity.y + entity.height;
                this.width = entity.width;
                this.height = entity.height * 2.8;
            }
        }

        if (direction === 'Left' || direction === 'Right') {
            this.y = entity.y;
            if (direction === 'Right') {
                this.x = entity.x + entity.width;
                this.width = entity.width * 2.8;
                this.height = entity.height;
            } else {
                this.x = entity.x - 2.8 * entity.width;
                this.width = entity.width * 2.8;
                this.height = entity.height;
            }

        }

        this.isActive = true;
    }

    update(dt, entity) {
        if (this.delay > 0) {
            this.delay -= 1000 * dt;
        } else {
            if (this.isActive && this.lifetime > 0) {
                if (this.direction === 'Up' || this.direction === 'Down') {
                    this.x = entity.x;
                    if (this.direction === 'Up') {
                        this.y = entity.y - entity.height * 2.8;

                    } else {
                        this.y = entity.y + entity.height;

                    }
                }

                if (this.direction === 'Left' || this.direction === 'Right') {
                    this.y = entity.y;
                    if (this.direction === 'Right') {
                        this.x = entity.x + entity.width;

                    } else {
                        this.x = entity.x - 2.8 * entity.width;

                    }

                }
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
            this.delay = this.originalDelay;
            // }
        }
    }
};



