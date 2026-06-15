const mongoose = require("mongoose");
const Application = require("./src/models/Application.model");
require("dotenv").config();

const uri = process.env.MONGODB_URI || "mongodb://admin:G0kdxtozPxUgx7Oi@ac-odum70s-shard-00-00.vr0xlf7.mongodb.net:27017,ac-odum70s-shard-00-01.vr0xlf7.mongodb.net:27017,ac-odum70s-shard-00-02.vr0xlf7.mongodb.net:27017/?ssl=true&replicaSet=atlas-1envof-shard-0&authSource=admin&appName=Cluster0";

async function test() {
  await mongoose.connect(uri, { dbName: "zenvora_ai" });
  console.log("Connected to zenvora_ai");
  const apps = await Application.find({});
  console.log("Found applications in zenvora_ai:", apps.length);
  if (apps.length > 0) {
     console.log("Sample:", apps[0].name, apps[0].email, apps[0].resumeUrl);
  }

  await mongoose.connect(uri, { dbName: "zenvora" });
  console.log("Connected to zenvora");
  const apps2 = await Application.find({});
  console.log("Found applications in zenvora:", apps2.length);
  
  process.exit(0);
}

test();
