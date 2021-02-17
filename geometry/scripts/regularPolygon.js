import { Geometry } from "./geometry.js";

export class RegularPolygon extends Geometry {
    constructor(x, y, s, sLen, sAngle) {
        super(x, y)

        console.log(this.location)
        this.sLen = sLen;                                   //side length
        this.s = s;                                         //number of sides
        this.sAngle = sAngle;                               //...
        this.intAngle = (this.determineAngle(this.s));      //internal angle of vertices
    }

    determineCentroid(x, y, s, sLen, intAngle) {
        let coords = new Array(s);
        let turnAngle = (180 - intAngle);
        let endP = this.getCoordinateFromAngle(x, y, sLen, turnAngle)
        let c = [0, 0];

        // determine coordinate points of shape based on turnAngle
        for (let i = 0; i < s; i++) {
            coords[i] = endP;
            endP = this.getCoordinateFromAngle(endP[0], endP[1], sLen, turnAngle * (i + 2))

        }

        for (let i = 0; i < coords.length; i++) {
            c[0] += coords[i][0];
            c[1] += coords[i][1];
        }

        c[0] = c[0] / s;
        c[1] = c[1] / s;
        return c;
    }

    drawShape(ctx) {
        let len = this.sLen;
        let s = this.s;
        let x = this.x;
        let y = this.y;

        let c = this.determineCentroid(x, y, s, len, this.intAngle);

        ({ x, y } = this.centerShape(x, c, y));

        let tAngle = (180 - this.intAngle) + (this.sAngle);

        let endP = this.getCoordinateFromAngle(x, y, len, tAngle);

        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let i = 0; i < s; i++) {
            ctx.lineTo(endP[0], endP[1]);
            endP = this.getCoordinateFromAngle(endP[0], endP[1], len, tAngle * (i + 2));
        }
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }

    centerShape(x, c, y) {
        x = x - Math.abs(x - c[0]);
        y = y + Math.abs(y - c[1]);
        return { x, y };
    }

    //Function to determine where the endpoint of a line will be given an angle 
    //and a starting point [x, y]
    getCoordinateFromAngle(x, y, sLen, a) {
        const aRad = a * (Math.PI / 180);

        let x2 = sLen * Math.sin(aRad);
        let y2 = Math.sqrt((sLen) ** 2 - (x2 ** 2));

        if (a > 90 && a < 180) {
            return [x + x2, y - y2];
        } else if (a >= 180 && a < 270) {
            return [x + x2, y - y2];
        } else if (a > 270 && a < 360) {
            return [x + x2, y + y2];
        } else {
            return [x + x2, y + y2];
        }
    }
    
    //function to determine what the angle at each intersection between two lines need to be 
    //so that the endpoint of the last line connects with the beginning point of the first line,
    //keeping all angles are equal;
    determineAngle = (s) => 180 * (s - 2) / s;

    draw(ctx) {
        this.drawShape(ctx);
    }
    update(dt) {
        if (this.sAngle <= 0) {
            this.sAngle = 0;
        } if (this.sAngle >= 360) {
            this.sAngle = 0;
        }
        //this.startingAngle += Math.sqrt(dt**2/dt);
    }
}