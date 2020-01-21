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
  costPrice: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
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

// Once a user makes a purchase, it should be added to their products collection. That means, amountAvailable in products should be increased based on the number of a product bought. Also, the corresponding supplier's history field should be updated depending on what was bought, who it was bought from and the number bought. Changes should be made only here in the purchase collection. From here, requests would be made to others endpoints to update values whenever necessary. In the history field, numberBought should be required(from the FE) If boughtFrom is supplied, necessary changes should be made on the Supplier collection

module.exports = mongoose.model("purchases", PurchaseSchema);
