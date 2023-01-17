
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;


const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("scores").find({}).count();
  
    if (results) {
      console.info("deleting collection");
      await db.collection("scores").drop();
      await db.collection("golfers").drop();
      }
    
    const load = loading("loading...").start();


    const data = await fs.readFile(path.join(__dirname, "golf.json"), "utf8");
    await db.collection("scores").insertMany(JSON.parse(data));
    
    /*
    Group Golfers by scorecards
    */
    
    const golfersRef = await db.collection("scores").aggregate([
      {$match: {name: { $ne: null}}},
      {
        $group:{
          _id: "$name", 
          total_scorecards:{$sum: 1}, 
        },
      },
      {
        $project:{
          name: {$first: "$name"}, 
          scorecards: "$total_scorecards",
        },
      },
      {$set: {name: "$_id", _id:"$total_scorecards"}},
    ]);

    const golfers = await golfersRef.toArray();
    await db.collection("golfers").insertMany(golfers);

    load.stop();
    console.info(
      `Database set up! ⛳`
      );
    process.exit();    
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
