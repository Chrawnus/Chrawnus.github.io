const { response } = require('express');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db-uppgift.db');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/test', (req, res) => {
    db.all(
        "SELECT * FROM Companies", 
        
        (error, rows) => {
            res.render('index', {
                companies: rows
            });
/*             let html = "<html><body>";
            for(let i = 0; i < rows.length; i++) {
              html += rows[i].Name + ", " + rows[i].Country;
              html += '<br>';
            }
            html += "</body></html>" 
            res.send(html);*/
        });
    //res.send("Hello World!");
});

app.listen(3000);