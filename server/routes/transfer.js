const express = require("express")
const app = express();
const history = require("../database/History")

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get("/",async(req, res)=>{
    const data = await history();
    const result = await data.find().toArray();
    res.send(result)
}).listen(5000,(err)=>{
    if (err) throw err;
    else console.log("Server has been started");
})