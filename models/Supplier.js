const mongoose = require("mongoose");

// This schema is not stable now. More would be added or removed with time.
const SupplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  itemsSold: [ {
    name: String,
    dateSold: String,
    numberSold: Number
  }]
});

// An individual supplier's name, address and array of objects of items sold.
module.exports = mongoose.model("suppliers", SupplierSchema);
