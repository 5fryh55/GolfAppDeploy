
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;


/**
 * constants
 */
const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("scores").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
      console.info("deleting collection");
      await db.collection("scores").drop();
      }
    
    const load = loading("loading...").start();

    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "golf.json"), "utf8");
    await db.collection("scores").insertMany(JSON.parse(data));

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
