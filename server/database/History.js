const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const database = "customers"
const collectionName = "history"

const client = new MongoClient(url);

const connect = async()=>{
    const res = await client.connect();
    const db = await res.db(database);
    return db.collection(collectionName);
}

module.exports = connect;