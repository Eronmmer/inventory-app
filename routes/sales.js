const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sale = require("../models/Sale");
const Product = require("../models/Product")
const Customer = require("../models/Customer")
const authenticator = require("../middleware/authenticator");

// axios instance
const instance = require("../utilities/axiosInstance")

instance.defaults.headers.common["inventory-app-token"] = null;

// axios utility functions. This is the function that will be called in the various routes
const callAxios = require("../utilities/callAxios")

// Route --------- GET api/sales
// Description --- Get a user's sales
// Access -------- Private
router.get("/", authenticator, async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.user.id })
      .select(["-user", "-__v"])
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
      let saleUser = await Sale.findOne( { user: req.user.id } );
      // make sure product about to be sold actually exists
      let findProductName = await Product.find({ name });
      let productArr = findProductName.filter(elem => elem.user.toString() === req.user.id)
      if ( productArr.length === 0 ) {
        return res.status(400).send({msg: "This Product doesn't exist. Maybe you should consider purchasing it first"})
      }
      if ( productArr[ 0 ].amountAvailable < history[ history.length - 1 ].numberSold ) {
        return res.status(400).send({msg: "Insufficient products left."})
      }
      if (saleId && saleUser) {
        // since sale already exists, make PUT request
        saleId = await Sale.find({name})
        saleUser = await Sale.find( { user: req.user.id } )
        let saleArr = saleId.filter(elem => elem.user.toString() === req.user.id)
        let requiredSale = saleUser.find( elem => elem.name == saleArr[ 0 ].name )
        let id = requiredSale._id
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        callAxios("PUT", `/sales/${id}`, {
          history
        } );
        return res.status(200).json({ msg: "Sale already exists but has just being updated" });
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
      
      // after making sale, make necessary changes to product and customer
      instance.defaults.headers.common["inventory-app-token"] = req.header(
        "inventory-app-token"
      );
      let id = productArr[ 0 ]._id
      let productAmountLeft = productArr[ 0 ].amountAvailable
      let productAmountSold = history[ history.length - 1 ].numberSold
      let finalAmountAvailable;
      if ( productAmountLeft === productAmountSold ) {
        callAxios("DELETE", `/products/${id}`);
      } else {
        finalAmountAvailable = (productAmountLeft - productAmountSold) 
        callAxios("PUT", `/products/${id}`, {
          amountAvailable: finalAmountAvailable
        });
      }
      // check if customer exists. If yes, update. If not, create
      const checkCustomer = await Customer.find( { name: history[ history.length - 1 ].soldTo } )
      const customerArr = checkCustomer.filter( elem => elem.user.toString() === req.user.id )
      if ( customerArr.length === 0 ) {
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        callAxios("POST", "/customers", {
          name: history[history.length - 1].soldTo,
          history: [
            {
              name,
              numberBought: history[history.length - 1].numberSold
            }
          ]
        });
      } else {
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        let customerId = customerArr[0]._id
        callAxios("PUT", `/customers/${customerId}`, {
          history: [
            {
              name,
              numberBought: history[history.length - 1].numberSold
            }
          ]
        });
      }
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
        elem.dateSold = new Date().toDateString();
      });
      const updatedHistory = [...sale.history];
      updatedHistory.push(...history);
      // console.log(...history);
      saleField.history = updatedHistory;
    }
    // console.log(saleField)

    const findProduct = await Product.find({ name: sale.name });
    let requiredProduct;
    findProduct.forEach(item => {
      if (item.user.toString() === req.user.id) {
        requiredProduct = item;
      }
    });
    if ( requiredProduct === undefined ) {
      return res.status(400).send({msg: "Product does not exists"})
    }
    if ( history[ history.length - 1 ].numberSold > requiredProduct.amountAvailable ) {
      return res.status(400).send({ msg: "Insufficient products left" });
    }

    instance.defaults.headers.common["inventory-app-token"] = req.header(
      "inventory-app-token"
    );
    let id = requiredProduct._id;
    let productAmountLeft = requiredProduct.amountAvailable;
    let productAmountSold = history[history.length - 1].numberSold;
    let finalAmountAvailable;
    // console.log(productAmountLeft, productAmountSold)
    if (productAmountLeft == productAmountSold) {
      // callAxios("DELETE", `/products/${id}`);
      // console.log(id)
      let product = await Product.findById(id);
      // if (!product) {
      //   return res.status(404).json({ msg: "Product does not exist!" });
      // }

      // if (product.user.toString() !== req.user.id) {
      //   return res.status(401).json({ msg: "Not authorized" });
      // }

      product = await Product.findByIdAndDelete(id);


    } else {
      finalAmountAvailable = productAmountLeft - productAmountSold;
      callAxios("PUT", `/products/${id}`, {
        amountAvailable: finalAmountAvailable
      });
    }
    sale = await Sale.findByIdAndUpdate(
      req.params.saleId,
      {
        $set: saleField
      },
      { new: true }
    );

    // update customer
      const checkCustomer = await Customer.find( { name: history[ history.length - 1 ].soldTo } )
      const customerArr = checkCustomer.filter( elem => elem.user.toString() === req.user.id )
      if ( customerArr.length === 0 ) {
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        callAxios("POST", "/customers", {
          name: history[history.length - 1].soldTo,
          history: [
            {
              name,
              numberBought: history[history.length - 1].numberSold
            }
          ]
        });
      } else {
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        let customerId = customerArr[0]._id
        callAxios("PUT", `/customers/${customerId}`, {
          history: [
            {
              name: sale.name,
              numberBought: history[history.length - 1].numberSold
            }
          ]
        });
      }
    
    // console.log(requiredProduct);


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
