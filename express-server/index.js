const util = require('util');
const fs = require('fs');
const express = require('express');
const { urlencoded } = require('express');
const app = express();
const port = 3000;

const expressJSONOptions = {
    limit: '1mb'
};

const expressURLEncodedOptions = {
    extended: false
}

app.use(express.static('public'));
app.use(express.json(expressJSONOptions));
app.use(express.urlencoded(expressURLEncodedOptions));


// read JSON file and convert to javascript-code
let info = fs.readFileSync('./data/info.json');
let processed = JSON.parse(info);

app.listen(port, () => console.log(`listening at port ${port}`));

// POST method route
app.post('/', (req, res) => {
    const imgInfo = req.body;
    if (!(isObjInArr(processed, imgInfo))) {
        processed.push(imgInfo);
    }
    console.log(processed);
    const processedJSON = JSON.stringify(processed, null, 4);
    fs.writeFile('./data/info.json', processedJSON, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
    //res.end();
});
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





