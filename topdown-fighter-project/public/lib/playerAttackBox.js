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
        this.lifetime = 20;
        this.originalDelay = 10;
        this.delay = 10;
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
        if (direction === 'arrowUp' || direction === 'arrowDown') {
            this.x = entity.x - 1.6 * entity.width;
            if (direction === 'arrowUp') {
                this.y = entity.y - entity.height * 2.8;
                this.width = entity.width * 4.2;
                this.height = entity.height * 2.8;
            } else {
                this.y = entity.y + entity.height;
                this.width = entity.width * 4.2;
                this.height = entity.height * 2.8;
            }
        }

        if (direction === 'arrowLeft' || direction === 'arrowRight') {
            if (direction === 'arrowRight') {
                this.x = entity.x + entity.width;
                this.width = entity.width * 2.8;
                this.height = entity.height * 4.2;
            } else {
                this.x = entity.x - 2.8 * entity.width;
                this.width = entity.width * 2.8;
                this.height = entity.height * 4.2;
            }

            this.y = entity.y - 1.6 * entity.height;
        }

        this.isActive = true;
    }

    update(dt, entity) {
        if (this.delay > 0) {
            this.delay -= 1000 * dt;
        } else {
            if (this.isActive && this.lifetime > 0) {
                if (this.direction === 'arrowUp' || this.direction === 'arrowDown') {
                    this.x = entity.x - 1.6 * entity.width;
                    if (this.direction === 'arrowUp') {
                        this.y = entity.y - entity.height * 2.8;
                    } else {
                        this.y = entity.y + entity.height;
                    }
                }

                if (this.direction === 'arrowLeft' || this.direction === 'arrowRight') {
                    this.y = entity.y - 1.6 * entity.height;
                    if (this.direction === 'arrowRight') {
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
        }
    }
};



