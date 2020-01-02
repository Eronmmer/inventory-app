const express = require("express");
const router = express.Router();

// Route --------- GET api/sales
// Description --- Get a user's sales
// Access -------- Private
router.get("/", (req, res) => {
  res.send("Get a user's sales");
});

// Route --------- POST api/sales
// Description --- add a sale
// Access -------- Private
router.post("/", (req, res) => {
  res.send("Add a sale");
});

// Route --------- PUT api/sales/:saleId
// Description --- edit a sale's details
// Access -------- Private
router.put("/:saleId", (req, res) => {
  res.send("Edited sale's details");
});

// Route --------- DELETE api/sales/:saleId
// Description --- Delete a sale
// Access -------- Private
router.delete("/:saleId", (req, res) => {
  res.send("Deleted sale");
});

module.exports = router;
