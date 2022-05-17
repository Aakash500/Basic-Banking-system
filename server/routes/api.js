const express = require("express");
const app = express();
const connect = require("../database/store")
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
   const toName = req.body.to;
   const fromName = req.body.from;
    const toamount = req.body.toamount;
    const fromamount = req.body.fromamount;
   const result = await data.find({name:toName}).toArray();
   if(result.length === 0){
     res.send([])
   }else{
     const update1 = await data.updateOne({name:toName},{$inc:{balance:toamount}})
     const update2 = await data.updateOne({name:fromName},{$set:{balance:fromamount}});
     console.log(update1)
     console.log(update2)
     const d = await data.find().toArray();
     res.send(d);
   }
  
})

app.listen(5500, (err) => {
    if (err) throw err;
    else console.log("Server has been started");
});

