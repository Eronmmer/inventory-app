const express = require("express");
const router = express.Router();
const authenticator = require("../middleware/authenticator");
const Supplier = require("../models/Supplier");
const { check, validationResult } = require("express-validator");

// Route --------- GET api/supplier
// Description --- Get a user's supplier
// Access -------- Private
router.get("/", authenticator, async (req, res) => {
  // Get all of a user's suppliers
  try {
    const suppliers = await Supplier.find({ user: req.user.id })
      .select(["-user", "-date"])
      .sort({ date: -1 });
    res.json({suppliers});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- POST api/suppliers
// Description --- add a supplier
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
    // Add a supplier
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, history } = req.body;

    try {
      // check if supplier already exists
      let findSupplierUser = await Supplier.findOne({ user: req.user.id });
      let findSupplierName = await Supplier.findOne({ name });

      if (findSupplierName && findSupplierUser) {
        return res.status(400).json({ msg: "Supplier already exists" });
      }

      let newSupplier;
      if ( history ) {
        history.forEach( elem => {
          elem.dateSold = new Date().toDateString()
        })
        newSupplier = new Supplier({
          name,
          history,
          user: req.user.id
        });
      } else {
        newSupplier = new Supplier({
          name,
          user: req.user.id
        });
      }

      const supplier = await newSupplier.save();

      res.json({ supplier, msg: "Supplier successfully saved" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route --------- PUT api/suppliers/:supplierId
// Description --- edit a sale's details
// Access -------- Private
router.put("/:supplierId", authenticator, async (req, res) => {
  // Edit some or all of a supplier's details
  const { name, history } = req.body;
  let supplierField = {};
  if (name) {
    supplierField.name = name;
  }
  if (history) {
    supplierField.history = history;
  }

  try {
    // check if user to be updated actually exist
    let supplier = await Supplier.findById(req.params.supplierId);
    if (!supplier) {
      return res.status(404).json({ msg: "Supplier does not exist!" });
    }

    // check if supplier is actually owned by user
    if (supplier.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized!!" });
    }

    // Do some update gymnastics
    if (history) {
      supplierField.history.forEach(elem => {
        elem.dateSold = new Date().toDateString();
      });
      const updatedHistory = [...supplier.history];
      updatedHistory.push(...history);
      supplierField.history = updatedHistory;
    }

    supplier = await Supplier.findByIdAndUpdate(
      req.params.supplierId,
      { $set: supplierField },
      { new: true }
    );
    res.json({ supplier, msg: "User successfully updated." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- DELETE api/suppliers/:supplierId
// Description --- Delete a supplier
// Access -------- Private
router.delete("/:supplierId", authenticator, async (req, res) => {
  // Delete a supplier
  try {
    let supplier = await Supplier.findById(req.params.supplierId);
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    if (supplier.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized!!" });
    }

    supplier = await Supplier.findByIdAndDelete(req.params.supplierId);
    res.json({ msg: "Supplier successfully deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error");
  }
});

module.exports = router;
