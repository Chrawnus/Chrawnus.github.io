export class NoiseGenerator {
    constructor(seed) {
        this.seed = seed;

    }

    generateNoise(i, array, ) {
        let initialVal = Math.sin(90);
        //let prevValue;
        let currVal;
        if (!(i)) {
            
            return initialVal;
        } else {
            currVal = initialVal * ((array[i].x + array[i - 1].x) * (array[i].y + array[i - 1].y)/1000);
            
            
            return currVal;
        }


    }


}