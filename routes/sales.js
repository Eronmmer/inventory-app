const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sale = require("../models/Sale");
const authenticator = require("../middleware/authenticator");

// Route --------- GET api/sales
// Description --- Get a user's sales
// Access -------- Private
router.get("/", authenticator, async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.user.id })
      .select(["-user", "-_v"])
      .sort({ date: -1 });
    res.json({ sales });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- POST api/sales
// Description --- add a sale
// Access -------- Private
router.post(
  "/",
  [
    authenticator,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, history } = req.body;

    try {
      let saleId = await Sale.findOne({ name });
      let saleUser = await Sale.findOne({ user: req.user.id });
      if (saleId && saleUser) {
        return res.status(400).json({ msg: "Sale already exists" });
      }

      let newSale;
      if ( history ) {
        history.forEach( elem => {
          elem.dateSold = new Date().toDateString()
        })
        newSale = new Sale({
          name,
          history,
          user: req.user.id
        });
      } else {
        newSale = new Sale({
          name,
          user: req.user.id
        });
      }

      const sale = await newSale.save();
      res.json({ sale, msg: "Sale added" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route --------- PUT api/sales/:saleId
// Description --- edit a sale's details
// Access -------- Private
router.put("/:saleId", authenticator, async (req, res) => {
  const { name, history } = req.body;
  let saleField = {};
  if (name) {
    saleField.name = name;
  }
  if (history) {
    saleField.history = history;
  }

  try {
    let sale = await Sale.findById(req.params.saleId);
    if (!sale) {
      return res.status(404).json({ msg: "Sale not found!!" });
    }

    if (sale.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized!!" });
    }

    if (history) {
      saleField.history.forEach(elem => {
        elem.dateSold = new Date();
      });
      const updatedHistory = [...sale.history];
      updatedHistory.push(...history);
      console.log(...history);
      saleField.history = updatedHistory;
    }
    // console.log(saleField)

    sale = await Sale.findByIdAndUpdate(
      req.params.saleId,
      {
        $set: saleField
      },
      { new: true }
    );

    res.json({ sale, msg: "Sale successfully updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- DELETE api/sales/:saleId
// Description --- Delete a sale
// Access -------- Private
router.delete("/:saleId", authenticator, async (req, res) => {
  try {
    let sale = await Sale.findById(req.params.saleId);
    if (!sale) {
      return res.status(404).json({ msg: "Sale not found!" });
    }

    if (sale.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized!!" });
    }

    sale = await Sale.findByIdAndDelete(req.params.saleId);
    res.json({ sale, msg: "Sale successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
