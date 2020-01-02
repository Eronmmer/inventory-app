const mongoose = require("mongoose")
const config = require( "config" );
const db = config.get("mongoURI")
// The above will grab what the MongoDB info in default.json are

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
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = connectDB;
