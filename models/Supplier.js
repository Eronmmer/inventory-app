const mongoose = require("mongoose");

// This schema is not stable now. More would be added or removed with time.
const SupplierSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  history: [
    {
      name: String,
      dateSold: {
        type: Date,
        default: Date.now
      },
      numberSold: Number
    }
  ]
});

// An individual supplier's name, address and array of objects of items sold.
module.exports = mongoose.model("suppliers", SupplierSchema);
