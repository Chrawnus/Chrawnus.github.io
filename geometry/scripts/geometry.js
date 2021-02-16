export class Geometry {
    constructor(x, y, sides, sideLengths, startingAngle) {
        this.x = x;
        this.y = y;
        this.location = [this.x, this.y]
        
        this.sideLengths = sideLengths;
        this.sides = sides;
        this.startingAngle = startingAngle;
        this.internalAngle = (this.determineAngle(this.sides));

        console.log(this.internalAngle)
    }
    
    //function to determine what the angle at each intersection between two lines need to be so that the endpoint of the last line connects with the
    //beginning point of the first line, while all angles are equal;
    determineAngle(sides) { 
            if (sides < 2) {
                sides = 3;
            }

            let sumOfAngles = 180 * (sides - 2);

            return sumOfAngles/sides;

    }

    drawShape(ctx) {
        let x = this.x;
        let y = this.y;
        let len = this.sideLengths;
        let sides = this.sides;
        let turnAngle = (180 - this.internalAngle);

        let endPoint = this.getCoordinateFromAngle(x, y, len, turnAngle);
        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 0; i < sides; i++) {
            ctx.lineTo(endPoint[0], endPoint[1]);
            endPoint = this.getCoordinateFromAngle(endPoint[0], endPoint[1], len, turnAngle * (i + 2));
        }
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

    }

    //Function to determine where the endpoint of a line will be given an angle and a starting point [x, y]
    getCoordinateFromAngle(x, y, sideLength, angle) {
        
        const angleRad = angle * (Math.PI/180)
        
        let x2 = sideLength * Math.sin(angleRad);
        let y2 = Math.sqrt((sideLength)**2 - (x2**2));
        
        if (angle > 90 && angle < 180) {
            return [x+x2, y-y2];   
        } else if (angle >= 180 && angle < 270) {
            return [x+x2, y-y2];
        } else if (angle > 270 && angle < 360) {
            return [x+x2, y+y2];
        } else {
            return [x+x2, y+y2];
        }
        
        
    }

    draw(ctx) {
        let x = this.x;
        let y = this.y;
        let len = this.sideLengths;
        let endPoint = this.getCoordinateFromAngle(x, y, len, this.startingAngle);
        this.drawShape(ctx);
/*         ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endPoint[0], endPoint[1]);
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.stroke(); */
    }
    update(dt) {
        if (this.startingAngle < 0) {
            this.startingAngle = 360; 
        } if (this.startingAngle > 360) {
            this.startingAngle = this.startingAngle%360;
        }
        this.startingAngle -= Math.PI*dt;
    }
}