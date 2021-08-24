const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');



db.close();

const app = express();

app.use(express.static('public'));

app.listen(3000);