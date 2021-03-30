const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public")); //mappen som du lägger in index.html, style.css o.s.v.



app.get('/data', function(req, res){
  const Name = req.query.namn;
  res.end(Name);
});

app.listen(3000, function(req, res) {
  console.log("Uppkopplad på port 3000");
});