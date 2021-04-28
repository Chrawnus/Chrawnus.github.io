const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db-uppgift.db');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
    // Följande sql-kommando hämtar data från alla kolumner (*) från tabellen companies. 
    let sql = "SELECT * FROM companies";
    db.all(sql, (error, rows) => {

        response.render('index', {
            companies: rows
        });
    });
});

app.get('/game/:companyId', (request, response) => {
    // Följande sql-kommando hämtar data från alla kolumner (*) från tabellen games 
    // var kolumnen companyId matchar request.params.companyId
    let sql = "SELECT * FROM games WHERE companyId = " + request.params.companyId;
    db.all(sql, (error, rows) => {
        response.render('games', {
            games: rows,
            companyId: request.params.companyId
        });
    });
});

app.post('/game/:companyId', (request, response) => {
    const name = request.body.name;
    const companyId = request.params.companyId;
    const sql = `
    INSERT INTO games(companyId, name)
    VALUES(${companyId}, '${name}')
    `;

    db.run(sql, () => {
        response.redirect('/game/' + companyId);
        response.end();
    });
});

app.post('/game/:companyId/update/', (request, response) => {
    const name = request.body.name;
    const id = request.body.id;
    const companyId = request.params.companyId;
    const sql = `
      UPDATE games SET
        name = '${name}'
      WHERE id = ${id}
    `;
    db.run(sql, () => {
      response.redirect('/game/' + companyId);
      response.end();
    });
  });


app.listen(3000);