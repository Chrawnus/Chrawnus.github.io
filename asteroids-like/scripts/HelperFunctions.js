export class Helper {

    static Math = class {
        static Random = class {
            static getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }
            static getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
            }

            // Takes two min and max values, and returns a random number between either
            // of the two ranges.
            static getRandomOfTwoRanges(firstRangeMin, firstRangeMax, secondRangeMin, secondRangeMax) {
                const randSelector = Math.random();

                if (randSelector >= 0.5) {
                    return Helper.Math.Random.getRandomArbitrary(firstRangeMin, firstRangeMax);
                } else if (randSelector < 0.5) {
                    return Helper.Math.Random.getRandomArbitrary(secondRangeMin, secondRangeMax);
                }

            }
        }
    }
}




