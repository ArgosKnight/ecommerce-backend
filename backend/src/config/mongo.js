const { MongoClient } = require("mongodb");

let db = null;

async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    db = client.db("ecommerce");
    console.log("✅ MongoDB conectado");

    return db;
  } catch (error) {
    console.error("❌ Error conectando a Mongo:", error);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("❌ Base de datos no inicializada. Llama connectDB() primero.");
  }
  return db;
}

module.exports = { connectDB, getDB };
