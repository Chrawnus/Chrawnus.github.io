const fs = require('fs');
const util = require('util');

// read JSON file and convert to javascript-code
let info = fs.readFileSync('./data/info.json');
let processed = JSON.parse(info);


let obj6 = {
    "val0": 6,
    "val1": "string",
    "val2": 32,
    "val3": [75, 23, 65, 5],
    "val4": true
}

//function that loops through an array of objects and checks every obj in array for equality with compObj
function isObjInArr(arrayOfObj, compObj) {
    for (let i = 0; i < arrayOfObj.length; i++) {
        const obj1 = arrayOfObj[i];
        if(util.isDeepStrictEqual(obj1, compObj)) {
            return true;
        }
    }
    return false;   
}

//get index of compObj in arrayOfObj
function getIndexOfObj(arrayOfObj, compObj) {
    for (let i = 0; i < arrayOfObj.length; i++) {
        const obj1 = arrayOfObj[i];
        if(util.isDeepStrictEqual(obj1, compObj)) {
            return i;
        }
    }  
}

if (!(isObjInArr(processed, obj6))) {
    processed.push(obj6);
} else {
    const index = getIndexOfObj(processed, obj6); 
    processed.splice(index, 1);
}

let processedJSON = JSON.stringify(processed, null, 4);

fs.writeFile('./data/info.json', processedJSON, err => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});



