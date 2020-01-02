const express = require("express");
const router = express.Router();

// Route --------- GET api/purchases
// Description --- Get a user's purchases
// Access -------- Private
router.get("/", (req, res) => {
  res.send("Get a user's purchases");
});

// Route --------- POST api/purchases
// Description --- add a purchases
// Access -------- Private
router.post("/", (req, res) => {
  res.send("Add a purchase");
});

// Route --------- PUT api/purchases/:purchaseId
// Description --- edit a purchase's details
// Access -------- Private
router.put("/:purchaseId", (req, res) => {
  res.send("Edited purchase's details");
});

// Route --------- DELETE api/purchases/:purchaseId
// Description --- Delete a purchase
// Access -------- Private
router.delete("/:purchaseId", (req, res) => {
  res.send("Deleted purchase");
});

module.exports = router;
