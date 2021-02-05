export class Sorter {
    constructor() {

    }

    quickSort(array, sortedArr) {
        //terminating case, push to sortedArr;
        if (array.length < 4) {
            if (array.length === 3) {
                this.insertionSort(array);
                return sortedArr.push(...array);
            }
            if (array.length === 2) {
                if (array[0] > array[1]) {
                    array.reverse();
                }
                return sortedArr.push(...array);
            }
            if (array.length === 1) {
                return sortedArr.push(...array);
            } else {
                return 0;
            }
        }
        
        let length = array.length;

        //Choose the median of array as pivot
        let medianArr = [array[0], array[Math.ceil((length - 1) / 2)], array[length - 1]];

        let medianMin = medianArr.splice(medianArr.indexOf(this.arrayMin(medianArr)), 1)[0];
        let medianMax = medianArr.splice(medianArr.indexOf(this.arrayMax(medianArr)), 1)[0];

        medianArr.splice(0, 0, medianMin);
        medianArr.splice(medianArr.length - 1, 0, medianMax);

        let pivot = medianArr[1];
        let pivotIndex = array.indexOf(pivot);

        //move every item in the array greater than pivot to the right of the pivot, and every item smaller to the left of the pivot
        for (let i = 0; i < array.length; i++) {
            if (i !== pivotIndex) {
                if (i < pivotIndex && array[i] > pivot) {
                    array.splice(pivotIndex + 1, 0, array.splice(i, 1)[0]);
                    pivotIndex--;
                    i = 0;
                } else if (i > pivotIndex && ((array[i] < pivot) || (array)[i] === pivot)) {
                    array.splice(pivotIndex - 1, 0, array.splice(i, 1)[0]);
                    pivotIndex++;
                    i = 0;
                }
            }
        }

        //divide the array into two sub arrays
        let subArrLesser = array.splice(0, pivotIndex);
        let subArrGreater = array.splice(1);

        //call the function recursively on the two sub arrays
        if (subArrLesser.length > 0) {
            this.quickSort(subArrLesser, sortedArr);
        } else {
            return 0;
        }
        sortedArr.push(pivot);
        if (subArrGreater.length > 0) {
            this.quickSort(subArrGreater, sortedArr);
        } else {
            return 0;
        }
    }

    experimentalSort(array, arraySize, sortedArr, quicksort){
        
        let radiiArr = [];
        let sortedRadiiArr = [];
        let maxDigit = this.numDigits(arraySize);
        
        // create as many empty arrays as there are digits in the largest number in array,
        // and push them to radiiArr and sortedRadiiArr.
        for (let i = 0; i < maxDigit ; i++) {
            radiiArr.push([]);  
            sortedRadiiArr.push([]);
        }

        // loop through array and push array[i] to its corresponding array inside radiiArr,
        // so numbers with the same amount of digits are grouped together
        for (let i = 0; i < array.length; i++) {
            radiiArr[this.numDigits(array[i])-1].push(array[i]);   
        }

        if (!quicksort || quicksort === undefined) {
            console.log("performing radix sort")
            for (let i = 0; i < radiiArr.length; i++) {
                this.arraySort(radiiArr[i], this.numDigits(radiiArr[i][0]), sortedRadiiArr[i]);
            }
            return sortedArr = sortedRadiiArr.flat(Infinity);
        } else {
            console.log("performing quicksort")
            for (let i = 0; i < radiiArr.length; i++) {
                this.quickSort(radiiArr[i], sortedRadiiArr[i]);
            }
            return sortedArr = sortedRadiiArr.flat(Infinity);
        }
    }

    threeItemSort(array) {
        let interm;
        if (array[0] > array[1]) {
            interm = array[0];
            array[0] = array[1];
            array[1] = interm;
        }
        if (array[1] > array[2]) {
            interm = array[1];
            array[1] = array[2];
            array[2] = interm;
        }
        if (array[0] > array[1]) {
            interm = array[0];
            array[0] = array[1];
            array[1] = interm;
        };
    }

    insertionSort(array) {
        let n = array.length;
        for (let i = 0; i < array.length; i++) {
            let current = array[i];
            let j = i - 1;
            while ((j > -1) && array[j] > current) {
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = current;
        }

        return array;
    }

    arraySort(array, n, sortedArr) {
        //terminal condition, empty array, do nothing
        if (n < 1) { 
            console.log("hi")
            return 0; 
        }
        // n = place value to check
        
        let digits = 10;
        let radiiArr = [];
        
        // create digit[0-9] arrays and push to radiiArr
        for (let i = 0; i < digits ; i++) {
            radiiArr.push([]);  
        }

        // loop through array and push array[i] to the digit array
        // that corresponds to the value of of the digit in the nth place of array[i]
        for (let i = 0; i < array.length; i++) {
            radiiArr[Math.floor((array[i]/10**(n-1))%10)].push(array[i]);   
        }
        
        // remove any digit arrays that are empty
        for (let i = 0; i < radiiArr.length; i++) {
            if (radiiArr[i].length === 0) {
                radiiArr.splice(i, 1);
                i = 0;
            }
        }

        // terminal case, every number in initial array has been sorted 
        // according to least significant digit, push radiiArr to sortedArr
        if (n < 2) {
            return sortedArr.push(radiiArr) ; 
        }
        
        // if least significant digit has not been reached, 
        //call this function recursively
        for (let i = 0; i < radiiArr.length; i++) {
            radiiArr[i] = this.arraySort(radiiArr[i], n-1, sortedArr);
        } 
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    arrayMax(arr) {
        let len = arr.length, max = -Infinity;
        while (len--) {
            if (arr[len] > max) {
                max = arr[len];
            }
        }
        return max;
    };

    arrayMaxIndex(arr) {
        let len = arr.length, max = -Infinity;
        while (len--) {
            if (arr[len] > arr[max]) {
                max = len;
            }
        }
        return max;
    };



    arrayMin(arr) {
        let len = arr.length, min = Infinity;
        while (len--) {
            if (arr[len] < min) {
                min = arr[len];
            }
        }
        return min;
    };

    arrayMinIndex(arr) {
        let len = arr.length, min = Infinity;
        while (len--) {
            if (arr[len] < arr[min]) {
                min = len;
            }
        }
        return min;
    };

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    checkSorted(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                console.log("not sorted", i);
                break;
            } else if (i === arr.length - 1) {
                console.log("sorted");
            }
        }
    }

    numDigits(x) {
        if (x > 2147483647) {
            return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
        } else {
            return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
        }
    }

    getNthPlaceDigit(x, n) {
        return Math.floor((x/10**(n-1))%10)
    }

    decimalPlaces(num) {
        let match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) { return 0; }
        return Math.max(
             0,
             // Number of digits right of decimal point.
             (match[1] ? match[1].length : 0)
             // Adjust for scientific notation.
             - (match[2] ? +match[2] : 0));
      }
}