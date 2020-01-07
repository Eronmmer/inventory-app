const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  costPrice: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  amountAvailable: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Once a matching product(use name) is sold or bought, the number of items available will be automatically changed here depending on the number of items sold or bought
module.exports = mongoose.model("products", ProductSchema);
