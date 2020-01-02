const mongoose = require("mongoose");

const PurchaseSchema = mongoose.Schema( {
  name: {
    type: String,
    required: true
  },
  dateBought: {
    // The type below should have been a date. As times goes on, this might change. I made it String now so that accessing via the client wouldn't be a pain in the neck
    type: String,
    required: true
  },
  numberBought: {
    type: Number,
    required: true
  },
  boughtFrom: {
    type: String,
    required: true
  }
});

// Once this has been updated, make necessary changes on the matching supplier's collection updating their itemsSold array {name: boughtFrom, dateSold: dateBought, numberSold: numberBought}
module.exports = mongoose.model("purchases", PurchaseSchema);
