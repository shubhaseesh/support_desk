const mongoose = require("mongoose");
require('colors')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB host: ${conn.connection.host}`.cyan.underline );
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold)
    process.exit(1);
  }
};

module.exports = connectDB

