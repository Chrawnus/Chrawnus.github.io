const fs = require('fs');
const util = require('util');

let info = fs.readFileSync('./data/info.json');
let processed = JSON.parse(info);

let obj6 = {
    "val0": 6,
    "val1": "string",
    "val2": 32,
    "val3": [75, 23, 65, 5],
    "val4": true
}

console.log(isObjInArr(processed, obj6))

function isObjInArr(arrayOfObj, obj) {
    for (let i = 0; i < arrayOfObj.length; i++) {
        const obj1 = arrayOfObj[i];
        if(util.isDeepStrictEqual(obj1, obj)) {
            return true;
        }
    }
    return false;
    
}

if (!(isObjInArr(processed, obj6))) {
    processed.push(obj6);
} else {
    processed.pop();
}

let processedJSON = JSON.stringify(processed, null, 4);

console.log(processedJSON); 


fs.writeFile('./data/info.json', processedJSON, err => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});



