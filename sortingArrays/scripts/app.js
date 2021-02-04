import { Sorter } from "./sorting.js";

let sorter = new Sorter();

let arraySize = 10000;
let randomArr = [...Array(arraySize)].map(() => Math.floor(sorter.randomIntFromInterval(0, arraySize)));
let sortedArray = [];

console.log(randomArr);
sorter.experimentalSort(randomArr, arraySize, sortedArray);
sorter.checkSorted(sortedArray);

