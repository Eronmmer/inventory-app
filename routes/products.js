const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authenticator = require("../middleware/authenticator");
const { check, validationResult } = require("express-validator");

// Route --------- GET api/products
// Description --- Get a user's products
// Access -------- Private
router.get("/", authenticator, async (req, res) => {
  try {
    let products = await Product.find({ user: req.user.id })
      .select(["-user", "-date", "-__v"])
      .sort({ date: -1 });

    return res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- POST api/products
// Description --- add a product
// Access -------- Private
router.post(
  "/",
  [
    authenticator,
    [
      check("name")
        .not()
        .isEmpty(),
      check("costPrice")
        .not()
        .isEmpty(),
      check("sellingPrice")
        .not()
        .isEmpty(),
      check("amountAvailable")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { name, costPrice, sellingPrice, amountAvailable } = req.body;

    try {
      let findProductName = await Product.findOne({ name });
      let findProductUser = await Product.findOne({ user: req.user.id });

      if (findProductName && findProductUser) {
        return res.status(400).json({ msg: "Product already exists!" });
      }

      let newProduct = new Product({
        name,
        costPrice,
        sellingPrice,
        amountAvailable,
        user: req.user.id
      });

      let product = await newProduct.save();
      res.send({ msg: "Product successfully added", product });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route --------- PUT api/products/:productId
// Description --- edit a product's details
// Access -------- Private
router.put("/:productId", authenticator, async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: "Product does not exist!" });
    }

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const { costPrice, sellingPrice, amountAvailable } = req.body;
    let productField = {};
    if (costPrice) {
      productField.costPrice = costPrice;
    }
    if (sellingPrice) {
      productField.sellingPrice = sellingPrice;
    }
    if (amountAvailable) {
      productField.amountAvailable = amountAvailable;
    }

    product = await Product.findOneAndUpdate(
      {_id: req.params.productId},
      {
        $set: productField
      },
      // { new: true }
    );

    res.json({ msg: "Product successfully updated", product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route --------- DELETE api/products/:productId
// Description --- Delete a product
// Access -------- Private
router.delete("/:productId", authenticator, async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: "Product does not exist!" });
    }

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    product = await Product.findByIdAndDelete(req.params.productId);
    res.json({ msg: "Product successfully deleted", product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
