const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public")); //mappen som du lägger in index.html, style.css o.s.v.

mongoose.connect('mongodb://localhost:27017/db');

const db = mongoose.connection;
db.on('error', function(err) {
  console.error(err);
});
db.once('open', function(err){
  if (err) {
    console.log('Could not open database');
  } else {
    console.log('Connected to databases');
  }
});


app.get('/data', function(req, res){
  const Name = req.query.namn;
  res.end(Name);
});

app.listen(3000, function(req, res) {
  console.log("Uppkopplad på port 3000");
});