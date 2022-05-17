const express = require("express");
const app = express();
const connect = require("../database/store")

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", async(req, res) => {
    const data = await connect();
    const d = await data.find().toArray();
    res.send(d);
  })
  .listen(5500, (err) => {
    if (err) throw err;
    else console.log("Server has been started");
  });
