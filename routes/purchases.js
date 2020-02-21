const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const authenticator = require("../middleware/authenticator");
const axios = require("axios");

// axios instance
const instance = require("../utilities/axiosInstance")

instance.defaults.headers.common["inventory-app-token"] = null;

// axios utility functions. This is the function that will be called in the various routes
const callAxios = require("../utilities/callAxios")

// function to get token from header
// function getToken (reqHeader){
//   instance.defaults.headers.common["inventory-app-token"] = reqHeader(
//     "inventory-app-token"
//   );
// };


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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, history, costPrice, sellingPrice } = req.body;
    try {
      let findName = await Purchase.findOne({ name });
      let findUser = await Purchase.findOne({ user: req.user.id });
      if (findName && findUser) {
        // since purchase already exists, make PUT request to update history
        findName = await Purchase.find({name})
        findUser = await Purchase.find( { user: req.user.id } )
        let purchaseArr = findName.filter(name => name.user.toString() === req.user.id)
        let requiredPurchase = findUser.find( elem => elem.name == purchaseArr[ 0 ].name )
        let id = requiredPurchase._id
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        callAxios("PUT", `/purchases/${id}`, {
          history
        } );
        return res.status(200).json({ msg: "Purchase already exists but has just being updated" });
      }

      let newPurchase;
      if (history) {
        history.forEach(elem => {
          elem.dateBought = new Date().toDateString();
        });
        newPurchase = new Purchase({
          name,
          history,
          costPrice,
          sellingPrice,
          user: req.user.id
        });
      } else {
        newPurchase = new Purchase({
          name,
          costPrice,
          sellingPrice,
          user: req.user.id
        });
      }

      let purchase = await newPurchase.save();

      // Once a new purchase has been made, check if product already exists, if not, make a request to add it.

      // create new product
      // let newProduct = new Product({
      //   name,
      //   costPrice,
      //   sellingPrice,
      //   amountAvailable: history[history.length - 1].numberBought,
      //   user: req.user.id
      // });
      // let product = await newProduct.save();
      // instance.defaults.headers.common["inventory-app-token"] = req.header(
      //   "inventory-app-token"
      // );
      instance.defaults.headers.common["inventory-app-token"] = req.header(
        "inventory-app-token"
      );
      callAxios("POST", "/products", {
        name,
        costPrice,
        sellingPrice,
        amountAvailable: history[history.length - 1].numberBought
      });

      // Check if supplier already exists. If not, add him if yes. edit their history
      // const suppliersRes = await instance.get("/suppliers")

      // const suppliersArray = suppliersRes.data.suppliers
      // console.log(suppliersArray)
      const suppliers = await Supplier.find({ user: req.user.id });
      const checkSuppliersName = suppliers.filter(
        supplier => supplier.name === history[history.length - 1].boughtFrom
      );
      // console.log(checkSuppliersName)
      if (checkSuppliersName.length === 0) {
        // create new supplier
        let supplierHistory = [
          {
            name: name,
            numberSold: history[history.length - 1].numberBought
          }
        ];
        // let newSupplier;

        // supplierHistory.forEach(elem => {
        //   elem.dateSold = new Date().toDateString();
        // });
        // newSupplier = new Supplier({
        //   name: history[history.length - 1].boughtFrom,
        //   history: supplierHistory,
        //   user: req.user.id
        // });

        // const saveSupplier = await newSupplier.save();
        // instance.defaults.headers.common["inventory-app-token"] = req.header(
        //   "inventory-app-token"
        // );
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        callAxios("POST", "/suppliers", {
          name: history[history.length - 1].boughtFrom,
          history: supplierHistory
        });
      } else {
        const checkSupplier = await Supplier.find({
          name: history[history.length - 1].boughtFrom
        });
        let id;
        checkSupplier.forEach(obj => {
          if (obj.user.toString() === req.user.id) {
            id = obj._id;
          }
        });
        // supplier exists. So, just edit their info
        // instance.defaults.headers.common["inventory-app-token"] = req.header(
        //   "inventory-app-token"
        // );
        instance.defaults.headers.common["inventory-app-token"] = req.header(
          "inventory-app-token"
        );
        // const editRes = await instance.put(`/suppliers/${id}`, {
        //   history: [
        //     { name: name, numberSold: history[history.length - 1].numberBought }
        //   ]
        // } );
        callAxios("PUT", `/suppliers/${id}`, {
          history: [
            { name: name, numberSold: history[history.length - 1].numberBought }
          ]
        });
        // console.log(editRes)
      }

      res.json({
        msg: "Purchase successfully added",
        purchase
      });
    } catch (err) {
      console.error(err.message);
      // res.status(500).send("Server Error");
      next(err)
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

    let { name, history, sellingPrice, costPrice } = req.body;
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

    if (sellingPrice) {
      purchaseField.sellingPrice = sellingPrice;
    }

    if (costPrice) {
      purchaseField.costPrice = costPrice;
    }

    purchase = await Purchase.findByIdAndUpdate(
      req.params.purchaseId,
      { $set: purchaseField },
      { new: true }
    );

    // update amountAvailable in corresponding products and supplier's history
    // console.log(purchase.name)
    const findProduct = await Product.find({ name: purchase.name });
    let requiredProduct;
    findProduct.forEach(item => {
      if (item.user.toString() === req.user.id) {
        requiredProduct = item;
      }
    });
    // console.log(requiredProduct);

    instance.defaults.headers.common["inventory-app-token"] = req.header(
      "inventory-app-token"
    );
    callAxios( "PUT", `/products/${requiredProduct._id}`, {
      amountAvailable: requiredProduct.amountAvailable + history[history.length - 1].numberBought
    } )
    
    const findSupplier = await Supplier.find( { name: history[ history.length - 1 ].boughtFrom } )
    let requiredSupplier;
    if ( findSupplier ) {
      findSupplier.forEach(item => {
        if (item.user.toString() === req.user.id) {
          requiredSupplier = item;
        }
      });
    }
    if ( requiredSupplier == undefined ) {
      instance.defaults.headers.common["inventory-app-token"] = req.header(
        "inventory-app-token"
      );
      callAxios( "POST", "/suppliers", {
        name: history[history.length - 1].boughtFrom,
        history: [
          {
            name: purchase.name,
            numberSold: history[history.length - 1].numberBought
          }
        ]
      });
    } else {
      instance.defaults.headers.common["inventory-app-token"] = req.header(
        "inventory-app-token"
      );
      callAxios("PUT", `/suppliers/${requiredSupplier._id}`, {
        history: [
          {
            name: purchase.name,
            numberSold: history[history.length - 1].numberBought
          }
        ]
      });
    }

    res.json({ msg: "Purchase successfully updated", purchase });
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
