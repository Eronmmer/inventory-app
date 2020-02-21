const mongoose = require("mongoose")
const config = require( "config" );
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect( db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    } );
    console.log("MongoDB Connected!! Hurray!")
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB;
