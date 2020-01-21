const mongoose = require("mongoose");

// This schema is not stable for now. More would be added or removed with time
const CustomerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  memberSince: {
    type: String,
    default: new Date().toDateString()
  },
  history: [
    {
      name: String,
      dateBought: {
        type: String
        // default: new Date()
      },
      numberBought: Number
    }
  ]
});
// customer's name, and array of items bought which will be edited via PUT by pushing to the array. Note that itemsBought is an array of objects.

module.exports = mongoose.model("customers", CustomerSchema);
