const { json } = require('express');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('saveprofiles.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.run('CREATE TABLE IF NOT EXISTS savedata (id INTEGER PRIMARY KEY, save TEXT);');

const app = express();

app.use(express.static('public'));
app.use(express.json({ extended: false })); //This is the line that you want to add

app.listen(3000);

app.post('/save', (req, res) => {
    const saveObj = JSON.stringify(req.body);
    const saveID = 1;

    res.status(200).send({ status: 'OK' });

    const sql = `INSERT OR REPLACE INTO savedata(id, save) VALUES(${saveID},'${saveObj}');`;

    db.run(sql, (a) => {
        console.log(a)
        res.end();
    });
    
    
});

app.get('/load', (req, res) => {
    const sql = "SELECT save FROM savedata";
    db.all(sql, (err, row) => {
        if (err) {
            throw err;
          }
          console.log(row)
          res.send(row)
    });
});


