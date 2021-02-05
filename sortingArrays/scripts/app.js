import { Sorter } from "./sorting.js";

let sorter = new Sorter();

let arraySize = 1000000;
let maxValue = 1000000;
let randomArr = [...Array(arraySize)].map(() => Math.floor(sorter.randomIntFromInterval(0, maxValue)));
let sortedArray = [];

console.log(randomArr);


const t0 = performance.now();
sortedArray = sorter.experimentalSort(randomArr, maxValue, sortedArray);
//sorter.quickSort(randomArr, sortedArray);
//sortedArray = sorter.insertionSort(randomArr);

var t1 = performance.now();
console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to sort' );

//console.log(sortedArray);
//sorter.checkSorted(sortedArray);


let number = sorter.randomIntFromInterval(0, maxValue);
let n = Math.floor(sorter.randomIntFromInterval(-sorter.decimalPlaces(number), sorter.numDigits(number)));


let result = sorter.getNthPlaceDigit(number, n);
console.log(`digit in ${n}th place of ${number} is ${result}`);