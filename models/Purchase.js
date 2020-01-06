const mongoose = require("mongoose");

const PurchaseSchema = mongoose.Schema({
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
  history: [
    {
      dateBought: {
        type: String
      },
      numberBought: Number,
      boughtFrom: String
    }
  ]
});

// Once this has been updated, make necessary changes on the matching supplier's collection updating their itemsSold array {name: boughtFrom, dateSold: dateBought, numberSold: numberBought}
module.exports = mongoose.model("purchases", PurchaseSchema);
