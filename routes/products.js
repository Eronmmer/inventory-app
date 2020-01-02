const express = require("express");
const router = express.Router();

// Route --------- GET api/products
// Description --- Get a user's products
// Access -------- Private
router.get("/", (req, res) => {
  res.send("Get a user's products");
});

// Route --------- POST api/products
// Description --- add a product
// Access -------- Private
router.post("/", (req, res) => {
  res.send("Add a product");
});

// Route --------- PUT api/products/:productId
// Description --- edit a product's details
// Access -------- Private
router.put("/:productId", (req, res) => {
  res.send("Edited product's details");
});

// Route --------- DELETE api/products/:productId
// Description --- Delete a product
// Access -------- Private
router.delete("/:productId", (req, res) => {
  res.send("Deleted product");
});

module.exports = router;
