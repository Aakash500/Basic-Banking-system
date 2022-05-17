const express = require("express");
const app = express();
const connect = require("../database/store")
const history = require("../database/History")

app.use(express.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", async(req, res) => {
    const data = await connect();
    const d = await data.find().toArray();
    res.send(d);
  });

app.patch("/", async(req, res)=>{
   const data = await connect();
   const transferData = await history();
   const [toamount, fromamount, fromName, toName] = req.body;
   const result = await data.find({name:toName}).toArray();
   if(result.length === 0){
     res.send([])
   }else{
     await data.updateOne({name:toName},{$inc:{balance:toamount}})
     await data.updateOne({name:fromName},{$set:{balance:fromamount}});
     await transferData.insertOne({From:fromName, To:toName, Amount:toamount});
     const d = await data.find().toArray();
     res.send(d);
   }
  
})

app.listen(5500, (err) => {
    if (err) throw err;
    else console.log("Server has been started");
});

