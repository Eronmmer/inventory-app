const express = require("express");
const router = express.Router();

// Route --------- GET api/supplier
// Description --- Get a user's supplier
// Access -------- Private
router.get("/", (req, res) => {
  res.send("Get a user's suppliers");
});

// Route --------- POST api/suppliers
// Description --- add a supplier
// Access -------- Private
router.post("/", (req, res) => {
  res.send("Add a supplier");
});

// Route --------- PUT api/suppliers/:supplierId
// Description --- edit a sale's details
// Access -------- Private
router.put("/:supplierId", (req, res) => {
  res.send("Edited supplier's details");
});

// Route --------- DELETE api/suppliers/:supplierId
// Description --- Delete a supplier
// Access -------- Private
router.delete("/:supplierId", (req, res) => {
  res.send("Deleted supplier");
});

module.exports = router;
