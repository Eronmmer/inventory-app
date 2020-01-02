const express = require("express");
const router = express.Router();

// Route --------- GET api/customers
// Description --- Get a user's customers
// Access -------- Private
router.get("/", (req, res) => {
  res.send("Get a user's customers");
});

// Route --------- POST api/customers
// Description --- add a customer
// Access -------- Private
router.post("/", (req, res) => {
  res.send("Add a customer");
});

// Route --------- PUT api/customers/:customerId
// Description --- edit a customers details
// Access -------- Private
router.put("/:customerId", (req, res) => {
  res.send("Edited customer's details");
});

// Route --------- DELETE api/customers/:customerId
// Description --- Delete a customer
// Access -------- Private
router.delete("/:customerId", (req, res) => {
  res.send("Deleted customer");
});

module.exports = router;
