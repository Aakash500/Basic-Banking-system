const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const database = "customers"

const client = new MongoClient(url);

const connect = async()=>{
    const res = await client.connect();
    const db = await res.db(database);
    return db.collection(database);
}

module.exports = connect;