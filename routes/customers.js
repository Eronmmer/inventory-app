const express = require("express");
const router = express.Router();
const authenticator = require("../middleware/authenticator");
const { check, validationResult } = require("express-validator");
const Customer = require("../models/Customer");

// Route --------- GET api/customers
// Description --- Get a user's customers
// Access -------- Private
router.get("/", authenticator, async (req, res) => {
  // Get all of a user's customers
  try {
    const customers = await Customer.find({ user: req.user.id })
      .select(["-user", "-__v", "-date"])
      .sort({
        date: -1
      });
    res.json({ customers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- POST api/customers
// Description --- add a customer
// Access -------- Private
router.post(
  "/",
  [
    authenticator,
    [
      check("name", "Name of customer is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Create a customer by adding all or some fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, history } = req.body;

    // Check if customer already exists
    let customer = await Customer.findOne({ name });
    let customerUser = await Customer.findOne({ user: req.user.id });
    if (customer && customerUser) {
      return res.status(400).json({ msg: "You already have this customer!" });
    }

    try {
      let newCustomer;
      if ( history ) {
        history.forEach( elem => {
          elem.dateBought = new Date().toDateString()
        })
        newCustomer = new Customer({
          name,
          history,
          user: req.user.id
        });
      } else {
        newCustomer = new Customer({
          name,
          user: req.user.id
        });
      }

      customer = await newCustomer.save();
      
      res.json({ customer, msg: "Customer successfully added." });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route --------- PUT api/customers/:customerId
// Description --- edit a customers details
// Access -------- Private
router.put("/:customerId", authenticator, async (req, res) => {
  // Edit a customer's details. Definitely their history
  const { name, history } = req.body;

  customerFields = {};
  if (name) {
    customerFields.name = name;
  }

  if (history) {
    customerFields.history = history;
  }

  try {
    let customer = await Customer.findById(req.params.customerId);

    if (!customer) {
      return res.status(404).send("Customer not found!");
    }

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized!!" });
    }

    if (history) {
      // Manipulate history so that requests will just be pushed into the history array in the DB
      let customerHistoryCopy = [...customer.history];
      // Add a dateBought ppt to each object in the history array
      customerFields.history.forEach(elem => {
        elem.dateBought = new Date().toDateString();
      });
      customerHistoryCopy.push(...customerFields.history);
      customerFields.history = customerHistoryCopy;
    }
    customer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      { $set: customerFields },
      { new: true }
    );
    res.json({ msg: "Customer successfully updated.", customer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- DELETE api/customers/:customerId
// Description --- Delete a customer
// Access -------- Private
router.delete("/:customerId", authenticator, async (req, res) => {
  // Remove a customer from the database
  try {
    let customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status( 404 ).send( "Customer not found!" );
    }

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized!!");
    }

    customer = await Customer.findByIdAndDelete(req.params.customerId);
    res.json({ msg: "User successfully deleted", customer });
  } catch (err) {
    console.error(err);
    res.status(500).send("Sever Error");
  }
});

module.exports = router;
