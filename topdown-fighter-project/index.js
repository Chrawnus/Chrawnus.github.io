const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('saveprofiles.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.run('CREATE TABLE IF NOT EXISTS savedata (text);');

db.close();

const app = express();

app.use(express.static('public'));
app.use(express.json({extended: false})); //This is the line that you want to add

app.listen(3000);

app.post('/save', (req, res) => {
    const player = req.body.player;
    const enemy = req.body.enemy;
    const playerStats = req.body.playerStats;

    console.log(player, enemy, playerStats);
    res.status(200).send({ status: 'OK'});
    
/*     const sql = `
    INSERT INTO games(companyId, name)
    VALUES(${companyId}, '${name}')
    `;

    db.run(sql, () => {
        response.redirect('/game/' + companyId);
        response.end();
    }); */
});