const mongoose = require("mongoose");

const SaleSchema = mongoose.Schema({
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
      soldTo: String,
      dateSold: {
        type: String
      },
      numberSold: Number,
    }
  ]
});

// Once changes has been made to matching customers soldTo, update the corresponding customer collection. itemsBought: {name: name, dateBought: dateSold, numberBought: numberSold}

module.exports = mongoose.model("sales", SaleSchema);
