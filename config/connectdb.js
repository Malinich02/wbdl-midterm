const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongodbsw13");
    console.log("MongooseDB connected successfully!");
  } catch (error) {
    console.error("Connection failed", error);
  }
};
module.exports = connectDB;
