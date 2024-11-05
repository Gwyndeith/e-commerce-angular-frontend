const mongoose = require("mongoose");

const db = async (MONGODB_URL) => {
  try {
    const con = await mongoose.connect(MONGODB_URL);
    console.log(`Connected to MongoDB: ${con.connection.host}`);
  } catch (err) {
    console.error("Error while connecting to MongoDB.", err);
  }
};

module.exports = db;
