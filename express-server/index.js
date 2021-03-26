const express = require('express');
const app = express();
const port = 3000;

const expressJSONOptions = { 
    limit: '1mb'};

const expressURLEncodedOptions = {
    extended: false 
}

app.use(express.static('public'));
app.use(express.json(expressJSONOptions));
app.use(express.urlencoded(expressURLEncodedOptions));

app.listen(port, () => console.log(`listening at port ${port}`));

app.get('/api', (req, res) => {
    console.log(req.body);
    const data = req.body;
    res.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    }); 
});