const util = require('util');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;


// read JSON file and convert to javascript-code
let info = fs.readFileSync('./data/info.json');
let processed = JSON.parse(info);



const expressJSONOptions = { 
    limit: '1mb'};

const expressURLEncodedOptions = {
    extended: false 
}

app.use(express.static('public'));
app.use(express.json(expressJSONOptions));
app.use(express.urlencoded(expressURLEncodedOptions));

app.listen(port, () => console.log(`listening at port ${port}`));

app.post('/api', (req, res) => {
    console.log(req.body);
    const data = req.body;
    res.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    }); 
});

// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
    console.log(res)
  })


let processedJSON = JSON.stringify(processed, null, 4);

fs.writeFile('./data/info.json', processedJSON, err => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});