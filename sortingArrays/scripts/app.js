import { Sorter } from "./sorting.js";

let sorter = new Sorter();
let numberOfArrays = 10;
let arraySize = 100000;
let maxValue = 100000;
let arrOfArr = [];
let sortedArrOfArr = [];

for (let i = 0; i < numberOfArrays; i++) {
    arrOfArr.push([...Array(arraySize)].map(() => Math.floor(sorter.randomIntFromInterval(0, maxValue))));
    sortedArrOfArr.push([]);
}

//let randomArr = [...Array(arraySize)].map(() => Math.floor(sorter.randomIntFromInterval(0, maxValue)));



console.log(arrOfArr);


const t0 = performance.now();
for (let i = 0; i < numberOfArrays; i++) {
    sortedArrOfArr[i] = sorter.experimentalSort(arrOfArr[i], maxValue, sortedArrOfArr[i], false);
}

//sorter.quickSort(randomArr, sortedArray);
//sortedArray = sorter.insertionSort(randomArr);

var t1 = performance.now();
console.log('Took average of', ((t1 - t0) / numberOfArrays).toFixed(4), 'milliseconds to sort', numberOfArrays, "array(s)" );

console.log(sortedArrOfArr);

for (let i = 0; i < numberOfArrays; i++) {
    sorter.checkSorted(sortedArrOfArr[i]);
    
}


let number = sorter.randomIntFromInterval(0, maxValue);
let n = Math.floor(sorter.randomIntFromInterval(-sorter.decimalPlaces(number), sorter.numDigits(number)));


let result = sorter.getNthPlaceDigit(number, n);
console.log(`digit in ${n}th place of ${number} is ${result}`);