const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  // Create all the properties you want this model to have
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: String
    // Name of company property isn't required cause a user can decide to open an account for personal uses only
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("users", UserSchema);
