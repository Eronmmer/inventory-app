const mongoose = require("mongoose");

const SaleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateSold: {
    // The type below should have been a date. As times goes on, this might change. I made it String now so that accessing via the client wouldn't be a pain in the neck. Later find out if it's possible to convert user input date to MongoDB understandable date format
    type: String,
    required: true
  },
  numberSold: {
    type: Number,
    required: true
  },
  soldTo: {
    type: String,
    required: true
  }
});

// Once changes has been made to matching customers soldTo, update the corresponding customer collection. itemsBought: {name: name, dateBought: dateSold, numberBought: numberSold}

module.exports = mongoose.model("sales", SaleSchema);

