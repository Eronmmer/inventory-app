const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Purchase = require("../models/Purchase");
const authenticator = require("../middleware/authenticator");

// Route --------- GET api/purchases
// Description --- Get a user's purchases
// Access -------- Private
router.get("/", authenticator, async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id })
      .select(["-__v", "-user"])
      .sort({ date: -1 });
    res.json({ purchases });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- POST api/purchases
// Description --- add a purchases
// Access -------- Private
router.post(
  "/",
  [
    authenticator,
    [
      check("name")
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
      const findName = await Purchase.findOne({ name });
      const findUser = await Purchase.findOne({ user: req.user.id });
      if (findName && findUser) {
        return res.status(400).json({ msg: "Purchase already exists!!" });
      }

      let newPurchase;
      if (history) {
        history.forEach(elem => {
          elem.dateBought = new Date().toDateString();
        });
        newPurchase = new Purchase({
          name,
          history,
          user: req.user.id
        });
      } else {
        newPurchase = new Purchase({
          name,
          user: req.user.id
        });
      }

      let purchase = await newPurchase.save();
      res.json({ msg: "Purchase successfully added", purchase });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route --------- PUT api/purchases/:purchaseId
// Description --- edit a purchase's details
// Access -------- Private
router.put("/:purchaseId", authenticator, async (req, res) => {
  try {
    let purchase = await Purchase.findById(req.params.purchaseId);
    if (!purchase) {
      return res.status(400).json({ msg: "Purchase not found!" });
    }

    if (purchase.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    let { name, history } = req.body;
    let purchaseField = {};
    if (name) {
      purchaseField.name = name;
    }
    if (history) {
      purchaseField.history = history;
      purchaseField.history.forEach(elem => {
        elem.dateBought = new Date().toDateString();
      });
      const updatedHistory = [...purchase.history];
      updatedHistory.push(...purchaseField.history);
      purchaseField.history = updatedHistory;
    }

    purchase = await Purchase.findByIdAndUpdate(
      req.params.purchaseId,
      { $set: purchaseField },
      { new: true }
    );

    res.json({msg: "Purchase successfully updated", purchase})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- DELETE api/purchases/:purchaseId
// Description --- Delete a purchase
// Access -------- Private
router.delete("/:purchaseId", authenticator, async (req, res) => {
  try {
    let purchase = await Purchase.findById(req.params.purchaseId);
    if (!purchase) {
      return res.status(400).json({ msg: "Purchase not found!" });
    }

    if (purchase.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    purchase = await Purchase.findByIdAndDelete(req.params.purchaseId);
    res.json({ msg: "Purchase successfully deleted", purchase });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
